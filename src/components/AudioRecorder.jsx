  import { useState, useRef } from "react";

  export default function AudioRecorder({
    onRecordingComplete,
  }) {
    const [recording,
      setRecording] =
      useState(false);

    const mediaRecorderRef =
      useRef(null);

    const chunksRef =
      useRef([]);

    async function startRecording() {
      try {
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

        chunksRef.current =
          [];

        recorder.ondataavailable =
          (
            event
          ) => {
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
          };

        recorder.start();

        mediaRecorderRef.current =
          recorder;

        setRecording(
          true
        );
      } catch (error) {
        console.error(
          error
        );

        alert(
          "Microphone access denied."
        );
      }
    }

    function stopRecording() {
      mediaRecorderRef.current?.stop();

      setRecording(
        false
      );
    }

    return (
      <div>
        {!recording ? (
          <button
            className="primary-btn"
            onClick={
              startRecording
            }
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={
              stopRecording
            }
          >
            Stop Recording
          </button>
        )}
      </div>
    );
  }