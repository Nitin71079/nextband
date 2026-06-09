import {
  useExam,
} from "../context/ExamContext";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import MockReading from "./MockReading";
import MockListening from "./MockListening";
import MockWriting from "./MockWriting";
import MockSpeaking from "./MockSpeaking";

import {
  saveExamSession,
} from "../services/examSession";

export default function CBTExamEngine() {
  const {
  readingBand,
  listeningBand,
  writingBand,
  speakingBand,
} = useExam();
  
  const navigate =
    useNavigate();

  const [stage, setStage] =
    useState("intro");
function finishExam() {
  console.log("READING", readingBand);
  console.log("LISTENING", listeningBand);
  console.log("WRITING", writingBand);
  console.log("SPEAKING", speakingBand);

  saveExamSession({
    reading: readingBand || 0,
    listening: listeningBand || 0,
    writing: writingBand || 0,
    speaking: speakingBand || 0,
    completedAt: new Date().toLocaleString(),
  });

  navigate("/exam-results");
}
function finishExam() {
  saveExamSession({
    reading:
      readingBand || 0,

    listening:
      listeningBand || 0,

    writing:
      writingBand || 0,

    speaking:
      speakingBand || 0,

    completedAt:
      new Date().toLocaleString(),
  });

  navigate(
    "/exam-results"
  );
}

  if (stage === "intro") {
    return (
      <div
        style={{
          minHeight:
            "100vh",
          display:
            "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          padding:
            "40px",
        }}
      >
        <div
          style={{
            background:
              "#fff",
            padding:
              "40px",
            borderRadius:
              "24px",
            maxWidth:
              "800px",
            width:
              "100%",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1>
            IELTS Computer
            Based Test
          </h1>

          <p>
            Complete all
            sections of the
            IELTS exam.
          </p>

          <div
            style={{
              marginTop:
                "20px",
            }}
          >
            <h3>
              Test Modules
            </h3>

            <ul>
              <li>
                Reading
                (60 mins)
              </li>

              <li>
                Listening
                (30 mins)
              </li>

              <li>
                Writing
                (60 mins)
              </li>

              <li>
                Speaking
                (11–14 mins)
              </li>
            </ul>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              setStage(
                "reading"
              )
            }
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  if (
    stage ===
    "reading"
  ) {
    return (
      <>
        <MockReading />

        <div
          style={{
            position:
              "fixed",
            bottom:
              "20px",
            right:
              "20px",
            zIndex:
              9999,
          }}
        >
          <button
            className="primary-btn"
            onClick={() =>
              setStage(
                "listening"
              )
            }
          >
            Continue →
            Listening
          </button>
        </div>
      </>
    );
  }

  if (
    stage ===
    "listening"
  ) {
    return (
      <>
        <MockListening />

        <div
          style={{
            position:
              "fixed",
            bottom:
              "20px",
            right:
              "20px",
            zIndex:
              9999,
          }}
        >
          <button
            className="primary-btn"
            onClick={() =>
              setStage(
                "writing"
              )
            }
          >
            Continue →
            Writing
          </button>
        </div>
      </>
    );
  }

  if (
    stage ===
    "writing"
  ) {
    return (
      <>
        <MockWriting />

        <div
          style={{
            position:
              "fixed",
            bottom:
              "20px",
            right:
              "20px",
            zIndex:
              9999,
          }}
        >
          <button
            className="primary-btn"
            onClick={() =>
              setStage(
                "speaking"
              )
            }
          >
            Continue →
            Speaking
          </button>
        </div>
      </>
    );
  }

  if (
    stage ===
    "speaking"
  ) {
    return (
      <>
        <MockSpeaking />

        <div
          style={{
            position:
              "fixed",
            bottom:
              "20px",
            right:
              "20px",
            zIndex:
              9999,
          }}
        >
          <button
            className="primary-btn"
            onClick={
              finishExam
            }
          >
            Finish Exam
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",
        display:
          "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
      }}
    >
      <h1>
        Loading...
      </h1>
    </div>
  );
}