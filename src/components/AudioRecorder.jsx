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
    const recognition =
      new SpeechRecognition();

    recognition.continuous =
      true;

    recognition.interimResults =
      true;

    recognition.lang =
      "en-US";

recognition.onresult =
  (event) => {
    console.log(
      "Speech event:",
      event
    );

    let transcript =
      "";

    for (
      let i = 0;
      i <
      event.results.length;
      i++
    ) {
      transcript +=
        event.results[i][0]
          .transcript +
        " ";
    }

    console.log(
      "Transcript:",
      transcript
    );

    transcriptRef.current =
      transcript;
  };

recognition.start();

console.log(
  "Speech recognition started"
);

    recognitionRef.current =
      recognition;
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
