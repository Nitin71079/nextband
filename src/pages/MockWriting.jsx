
import {
  getAIUsage,
} from "../services/aiUsage";
import {
  saveEvaluation,
} from "../services/evaluationStorage";
import {
  useAuth,
} from "../context/AuthContext";
import {
  useExam,
} from "../context/ExamContext";
import { useEffect, useState } from "react";

import {
  evaluateWritingGPT,
} from "../services/evaluateWritingGPT";

import {
  trackAIUsage,
  canUseAI,
} from "../services/aiUsage";

import WritingReport from "../components/WritingReport";

export default function MockWriting({
  onComplete,
})
 {
 const { premium } =
  useAuth();

  const [task1, setTask1] =
    useState("");

  const [task2, setTask2] =
    useState("");
const [report, setReport] =
  useState(null);

const [loading, setLoading] =
  useState(false);

  const [timeLeft, setTimeLeft] =
    useState(60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  const task1Words =
    task1
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  const task2Words =
    task2
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

async function handleEvaluation() {
  if (!canUseAI()) {
    alert(
      "Free AI evaluation limit reached."
    );
    return;
  }

  if (task2Words < 50) {
    alert(
      "Essay is too short for IELTS evaluation."
    );
    return;
  }

  setLoading(true);

  try {
    
   const result = await evaluateWritingGPT(essay);

    trackAIUsage();

    setReport(result);

    saveEvaluation({
      type: "writing",
      overallBand:
        result.overallBand,
      report: result,
    });

    console.log(
  "Writing Band:",
  result.overallBand
);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
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
    >
      
     <div>
  <div
    style={{
      background:
        "#0f172a",
      color: "white",
      padding:
        "15px 25px",
      borderRadius:
        "12px",
      fontWeight:
        "bold",
      fontSize:
        "24px",
      textAlign:
        "center",
    }}
  >
    {minutes}:
    {String(
      seconds
    ).padStart(2, "0")}
  </div>

  <div
    style={{
      marginTop:
        "10px",
      fontWeight:
        "bold",
      textAlign:
        "center",
    }}
  >
    AI Evaluations Used:
    {" "}
    {getAIUsage()}
    /10
  </div>
</div>

      <div
        style={{
          background:
            "#ffffff",
          padding:
            "25px",
          borderRadius:
            "16px",
          marginBottom:
            "30px",
        }}
      >
        <h2>
          Writing Task 1
        </h2>

        <p>
          The chart below
          shows renewable
          energy adoption
          rates in five
          countries between
          2015 and 2025.

          Summarise the
          information by
          selecting and
          reporting the main
          features and make
          comparisons where
          relevant.
        </p>

        <textarea
          value={task1}
          onChange={(e) =>
            setTask1(
              e.target.value
            )
          }
          rows={12}
          placeholder="Write your Task 1 response here..."
          style={{
            width: "100%",
            marginTop:
              "15px",
            padding:
              "15px",
            borderRadius:
              "12px",
            border:
              "1px solid #cbd5e1",
            fontSize:
              "16px",
          }}
        />

        <div
          style={{
            marginTop:
              "10px",
            fontWeight:
              "bold",
          }}
        >
          Word Count:
          {" "}
          {task1Words}
        </div>
      </div>

      <div
        style={{
          background:
            "#ffffff",
          padding:
            "25px",
          borderRadius:
            "16px",
          marginBottom:
            "30px",
        }}
      >
        <h2>
          Writing Task 2
        </h2>

        <p>
          Some people
          believe that
          governments should
          invest more in
          public transport
          than in road
          infrastructure.

          To what extent do
          you agree or
          disagree?
        </p>

        <textarea
          value={task2}
          onChange={(e) =>
            setTask2(
              e.target.value
            )
          }
          rows={18}
          placeholder="Write your Task 2 essay here..."
          style={{
            width: "100%",
            marginTop:
              "15px",
            padding:
              "15px",
            borderRadius:
              "12px",
            border:
              "1px solid #cbd5e1",
            fontSize:
              "16px",
          }}
        />

        <div
          style={{
            marginTop:
              "10px",
            fontWeight:
              "bold",
          }}
        >
          Word Count:
          {" "}
          {task2Words}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom:
            "30px",
        }}
      >
        <button
  className="primary-btn"
  onClick={
    handleEvaluation
  }
  disabled={loading}
>
  {loading
    ? "Evaluating..."
    : "AI Evaluate Essay"}
</button>

        <button
          onClick={() => {
            setTask1("");
            setTask2("");
            setReport(null);
          }}
        >
          Reset Test
        </button>
      </div>

     {report && (
  <>
    <WritingReport
      report={report}
    />

    <div
      style={{
        marginTop: "20px",
        textAlign: "center",
      }}
    >
      <button
        className="primary-btn"
        onClick={() => {
          if (onComplete) {
            onComplete(
              report.overallBand || 6
            );
          }
        }}
      >
        Continue To Speaking →
      </button>
    </div>
  </>
)}
    </div>
  );
}