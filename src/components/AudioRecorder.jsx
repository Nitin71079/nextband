import { useState, useRef } from "react";

export default function AudioRecorder({
onRecordingComplete,
onTranscriptGenerated,
}) {
const [recording, setRecording] =
useState(false);

const mediaRecorderRef =
useRef(null);

const recognitionRef =
useRef(null);

const transcriptRef =
useRef("");

const chunksRef =
useRef([]);

async function startRecording() {
try {
transcriptRef.current = "";


  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

    console.log(
  "SpeechRecognition:",
  SpeechRecognition
);

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let newFinal = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          newFinal += res[0].transcript + " ";
        } else {
          interimTranscript += res[0].transcript;
        }
      }

      if (newFinal) {
        finalTranscript += newFinal;
      }

      const combined = (finalTranscript + " " + interimTranscript).replace(/\s+/g, " ").trim();
      transcriptRef.current = combined;
    };

    recognition.onend = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        try { recognition.start(); } catch {}
      }
    };

    recognition.start();

    console.log("Speech recognition started");
    recognitionRef.current = recognition;
  }

  const stream =
    await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
      }
    );

  const recorder =
    new MediaRecorder(
      stream
    );

  chunksRef.current = [];

  recorder.ondataavailable =
    (event) => {
      chunksRef.current.push(
        event.data
      );
    };

  recorder.onstop =
    () => {
      const blob =
        new Blob(
          chunksRef.current,
          {
            type:
              "audio/webm",
          }
        );

      onRecordingComplete(
        blob
      );

      if (
        onTranscriptGenerated
      ) {
        onTranscriptGenerated(
          transcriptRef.current
        );
      }
    };

  recorder.start();

  mediaRecorderRef.current =
    recorder;

  setRecording(true);
} catch (error) {
  console.error(
    "Recording Error:",
    error
  );

  alert(
    error?.message ||
    JSON.stringify(error)
  );
}

}

function stopRecording() {
mediaRecorderRef.current?.stop();

recognitionRef.current?.stop();

setRecording(false);

}

return ( <div>
{!recording ? (
<button
className="primary-btn"
onClick={
startRecording
}
>
🎤 Start Recording </button>
) : (
<button
onClick={
stopRecording
}
>
⏹ Stop Recording </button>
)} </div>
);
}
