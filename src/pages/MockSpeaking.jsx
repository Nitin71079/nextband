import { useState } from "react";

import speakingTest001 from "../data/speaking/speakingTest001";

import { evaluateSpeaking } from "../services/speakingEvaluator";

import { speechToText } from "../services/speechToText";

import SpeakingReport from "../components/SpeakingReport";

import AudioRecorder from "../components/AudioRecorder";

import AudioPlayback from "../components/AudioPlayback";

import MicrophoneStatus from "../components/MicrophoneStatus";

export default function MockSpeaking() {
const [currentPart, setCurrentPart] =
useState(1);

const [response, setResponse] =
useState("");

const [report, setReport] =
useState(null);

const [audioBlob, setAudioBlob] =
useState(null);

const [audioUrl, setAudioUrl] =
useState("");

const [transcript, setTranscript] =
useState("");

const [transcribing, setTranscribing] =
useState(false);

const [evaluating, setEvaluating] =
useState(false);

function handleRecording(blob) {
setAudioBlob(blob);

const url =
  URL.createObjectURL(blob);

setAudioUrl(url);

}

async function generateTranscript() {
if (!audioBlob) {
alert(
"Please record audio first."
);
return;
}

setTranscribing(true);

try {
  const result =
    await speechToText(audioBlob);

  if (result.success) {
    setTranscript(
      result.transcript
    );

    setResponse(
      result.transcript
    );
  } else {
    alert(
      result.error ||
        "Unable to generate transcript."
    );
  }
} catch (error) {
  console.error(error);

  alert(
    "Transcript generation failed."
  );
} finally {
  setTranscribing(false);
}
}

async function handleEvaluation() {
if (!response.trim()) {
alert(
"Please provide a speaking response."
);
return;
}

setEvaluating(true);

try {
  const result =
    await evaluateSpeaking(
      response
    );

  if (result.success) {
    setReport(result);
  } else {
    alert(
      result.error ||
        "Evaluation failed."
    );
  }
} catch (error) {
  console.error(error);

  alert(
    "Evaluation failed."
  );
} finally {
  setEvaluating(false);
}

}

return (
<div
style={{
minHeight: "100vh",
maxWidth: "1200px",
margin: "0 auto",
padding: "30px",
}}
> <h1>
IELTS Speaking Test </h1>

  <p>
    Complete all three parts
    of the IELTS Speaking exam.
  </p>

  <div
    style={{
      display: "flex",
      gap: "10px",
      marginTop: "20px",
      marginBottom: "20px",
    }}
  >
    <button
      onClick={() =>
        setCurrentPart(1)
      }
    >
      Part 1
    </button>

    <button
      onClick={() =>
        setCurrentPart(2)
      }
    >
      Part 2
    </button>

    <button
      onClick={() =>
        setCurrentPart(3)
      }
    >
      Part 3
    </button>
  </div>

  <div
    style={{
      background: "#ffffff",
      padding: "25px",
      borderRadius: "16px",
      marginBottom: "25px",
    }}
  >
    {currentPart === 1 && (
      <>
        <h2>
          {
            speakingTest001.part1
              .title
          }
        </h2>

        <ul>
          {speakingTest001.part1.questions.map(
            (
              question,
              index
            ) => (
              <li
                key={index}
                style={{
                  marginBottom:
                    "10px",
                }}
              >
                {question}
              </li>
            )
          )}
        </ul>
      </>
    )}

    {currentPart === 2 && (
      <>
        <h2>
          {
            speakingTest001.part2
              .title
          }
        </h2>

        <div
          style={{
            whiteSpace:
              "pre-wrap",
            lineHeight: "1.8",
          }}
        >
          {
            speakingTest001.part2
              .cueCard
          }
        </div>
      </>
    )}

    {currentPart === 3 && (
      <>
        <h2>
          {
            speakingTest001.part3
              .title
          }
        </h2>

        <ul>
          {speakingTest001.part3.questions.map(
            (
              question,
              index
            ) => (
              <li
                key={index}
                style={{
                  marginBottom:
                    "10px",
                }}
              >
                {question}
              </li>
            )
          )}
        </ul>
      </>
    )}
  </div>

  <div
    style={{
      background: "#ffffff",
      padding: "25px",
      borderRadius: "16px",
      marginBottom: "25px",
    }}
  >
    <h2>
      Audio Recording
    </h2>

    <AudioRecorder
      onRecordingComplete={
        handleRecording
      }
    />

    <MicrophoneStatus
      audioBlob={audioBlob}
    />

    <AudioPlayback
      audioUrl={audioUrl}
    />

    <div
      style={{
        marginTop: "20px",
      }}
    >
      <button
        onClick={
          generateTranscript
        }
        disabled={
          transcribing
        }
        className="primary-btn"
      >
        {transcribing
          ? "Generating Transcript..."
          : "Generate Transcript"}
      </button>
    </div>

    {transcript && (
      <div
        style={{
          marginTop: "20px",
          background:
            "#f8fafc",
          padding: "15px",
          borderRadius:
            "12px",
        }}
      >
        <h3>
          Transcript
        </h3>

        <p>
          {transcript}
        </p>
      </div>
    )}
  </div>

  <div
    style={{
      background: "#ffffff",
      padding: "25px",
      borderRadius: "16px",
    }}
  >
    <h2>
      Speaking Response
    </h2>

    <textarea
      rows={10}
      value={response}
      onChange={(e) =>
        setResponse(
          e.target.value
        )
      }
      placeholder="Type or generate your speaking response..."
      style={{
        width: "100%",
        padding: "15px",
        border:
          "1px solid #cbd5e1",
        borderRadius:
          "10px",
      }}
    />

    <button
      className="primary-btn"
      style={{
        marginTop: "20px",
      }}
      onClick={
        handleEvaluation
      }
      disabled={
        evaluating
      }
    >
      {evaluating
        ? "Evaluating..."
        : "Evaluate Speaking"}
    </button>

    {report && (
      <SpeakingReport
        report={report}
      />
    )}
  </div>
</div>


);
}
