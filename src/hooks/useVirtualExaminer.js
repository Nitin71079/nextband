import { useState, useEffect, useRef } from "react";

export function useVirtualExaminer() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const selectedVoiceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const updateVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
      // Prefer British or English examiner voice
      const preferred = available.find(
        (v) => (v.lang === "en-GB" || v.lang === "en-US") && v.name.includes("Natural")
      ) || available.find((v) => v.lang === "en-GB" || v.lang === "en-US") || available[0];
      
      selectedVoiceRef.current = preferred;
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  const speak = (text, onEnd) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel(); // Stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Clear, deliberate examiner pace
    utterance.pitch = 1.0;
    if (selectedVoiceRef.current) {
      utterance.voice = selectedVoiceRef.current;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return {
    speak,
    stop,
    isSpeaking,
    voices,
  };
}
