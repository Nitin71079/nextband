import ExamProgressHeader from "../components/ExamProgressHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MockReading from "./MockReading";
import MockListening from "./MockListening";
import MockWriting from "./MockWriting";
import MockSpeaking from "./MockSpeaking";

import { saveExamSession } from "../services/examSession";
import { updateStreak } from "../services/streakService";

export default function CBTExamEngine() {
  const navigate = useNavigate();

  const [stage, setStage] =
    useState("intro");

  const [results, setResults] =
    useState({
      reading: null,
      listening: null,
      writing: null,
      speaking: null,
    });

  function finishExam(
    finalResults
  ) {
    updateStreak();

    saveExamSession({
      ...finalResults,
      completedAt:
        new Date().toLocaleString(),
    });

    navigate(
      "/exam-results"
    );
  }

  if (stage === "reading") {
    return (
      <>
        <ExamProgressHeader
          currentSection="reading"
        />

        <MockReading
          onComplete={(band) => {
            setResults((prev) => ({
              ...prev,
              reading: band,
            }));

            setStage(
              "listening"
            );
          }}
        />
      </>
    );
  }

  if (stage === "listening") {
    return (
      <>
        <ExamProgressHeader
          currentSection="listening"
        />

        <MockListening
          onComplete={(band) => {
            setResults((prev) => ({
              ...prev,
              listening: band,
            }));

            setStage(
              "writing"
            );
          }}
        />
      </>
    );
  }

  if (stage === "writing") {
    return (
      <>
        <ExamProgressHeader
          currentSection="writing"
        />

        <MockWriting
          onComplete={(band) => {
            setResults((prev) => ({
              ...prev,
              writing: band,
            }));

            setStage(
              "speaking"
            );
          }}
        />
      </>
    );
  }

  if (stage === "speaking") {
    return (
      <>
        <ExamProgressHeader
          currentSection="speaking"
        />

        <MockSpeaking
         onComplete={(band) => {

  const finalResults = {
    ...results,
    speaking: band,
  };

  const overall = (
    (
      Number(finalResults.reading || 0) +
      Number(finalResults.listening || 0) +
      Number(finalResults.writing || 0) +
      Number(finalResults.speaking || 0)
    ) / 4
  ).toFixed(1);

  finishExam({
    ...finalResults,
    overall,
  });

}}
        />
      </>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1>
          IELTS CBT Exam
        </h1>

        <p>
          Complete Reading,
          Listening, Writing
          and Speaking under
          exam conditions.
        </p>

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