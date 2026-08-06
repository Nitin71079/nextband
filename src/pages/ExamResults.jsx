import { useState } from "react";
import AICoachCard from "../components/AICoachCard";
import BandBreakdown from "../components/BandBreakdown";
import ForecastCard from "../components/ForecastCard";
import WritingReport from "../components/WritingReport";
import SpeakingReport from "../components/SpeakingReport";

import {
  getExamSession,
} from "../services/examSession";

import {
  getGoals,
} from "../services/goalService";

import {
  generateForecast,
} from "../services/forecastEngine";
import { useNavigate } from "react-router-dom";
export default function ExamResults() {
  const navigate = useNavigate();
  const session = getExamSession();
  const [activeSectionTab, setActiveSectionTab] = useState("writing");

  if (!session) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h1>
          No Exam Data Available
        </h1>

        <p>
          Complete a full mock
          test first.
        </p>
      </div>
    );
  }

  const l = Number(session.listening || 0);
  const r = Number(session.reading || 0);
  const w = Number(session.writing || 0);
  const s = Number(session.speaking || 0);
  const rawAvg = (l + r + w + s) / 4;
  const overallBand = session.overall || (Math.round(rawAvg * 2) / 2).toFixed(1);

  const scores = {
    Reading: Number(
      session.reading || 0
    ),

    Listening: Number(
      session.listening || 0
    ),

    Writing: Number(
      session.writing || 0
    ),

    Speaking: Number(
      session.speaking || 0
    ),
  };
 

  const strongestSkill =
    Object.keys(scores).reduce(
      (a, b) =>
        scores[a] >
        scores[b]
          ? a
          : b
    );

  const weakestSkill =
    Object.keys(scores).reduce(
      (a, b) =>
        scores[a] <
        scores[b]
          ? a
          : b
    );

  const defaultTargetBand =
    (
      Number(overallBand) +
      0.5
    ).toFixed(1);

  const goals =
    getGoals();

  const targetBand =
    goals.goalBand ||
    defaultTargetBand;

  const forecast =
    generateForecast({
      currentBand:
        overallBand,

      targetBand,

      dailyHours:
        goals.dailyHours ||
        1,
    });

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        IELTS Exam Results
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
          textAlign:
            "center",
        }}
      >
        <h2>
          Overall Band Score
        </h2>

        <div
          style={{
            fontSize: "72px",
            fontWeight:
              "bold",
           color:
  overallBand >= 8
    ? "#22c55e"
    : overallBand >= 7
    ? "#3b82f6"
    : overallBand >= 6
    ? "#f59e0b"
    : "#ef4444",
            marginTop:
              "10px",
          }}
        >
          {overallBand}
        </div>
        <p
  style={{
    color: "#64748b",
    marginTop: "12px",
    fontWeight: 600,
  }}
>
  Completed on{" "}
  {new Date(
    session.completedAt
  ).toLocaleString()}
</p>
      </div>

      <BandBreakdown
        reading={
          session.reading
        }
        listening={
          session.listening
        }
        writing={
          session.writing
        }
        speaking={
          session.speaking
        }
      />

      <AICoachCard
        overallBand={
          overallBand
        }
        strongestSkill={
          strongestSkill
        }
        weakestSkill={
          weakestSkill
        }
      />

      <ForecastCard
        currentBand={
          overallBand
        }
        targetBand={
          targetBand
        }
        weeks={
          forecast.weeks
        }
        confidence={
          forecast.confidence
        }
      />

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "30px",
          borderRadius:
            "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
       <h2
  style={{
    marginBottom: "20px",
  }}
>
  Section Scores
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  }}
>

  {[
    {
      title: "📖 Reading",
      band: session.reading,
    },
    {
      title: "🎧 Listening",
      band: session.listening,
    },
    {
      title: "✍️ Writing",
      band: session.writing,
    },
    {
      title: "🎤 Speaking",
      band: session.speaking,
    },
  ].map((item) => (
    <div
      key={item.title}
      style={{
        background: "#f8fafc",
        borderRadius: "18px",
        padding: "25px",
        textAlign: "center",
      }}
    >
      <h3>{item.title}</h3>

      <div
        style={{
          fontSize: "42px",
          fontWeight: "800",
          color: "#0891b2",
        }}
      >
        {item.band}
      </div>
    </div>
  ))}

</div>
      </div>

      {/* 📊 DETAILED SECTION AI REPORTS */}
      {(session.writingReport || session.speakingReport) && (
        <div
          style={{
            marginTop: "30px",
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "16px" }}>Detailed Section AI Evaluations</h2>
          <p style={{ color: "#64748b", marginTop: 0, marginBottom: "20px" }}>
            Comprehensive band score diagnostics and feedback for Writing and Speaking.
          </p>

          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            {session.writingReport && (
              <button
                onClick={() => setActiveSectionTab("writing")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "14px",
                  fontWeight: "800",
                  fontSize: "15px",
                  border: "none",
                  cursor: "pointer",
                  background: activeSectionTab === "writing" ? "linear-gradient(135deg,#f97316,#ea580c)" : "#f1f5f9",
                  color: activeSectionTab === "writing" ? "#ffffff" : "#475569",
                  boxShadow: activeSectionTab === "writing" ? "0 8px 20px rgba(249,115,22,0.3)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                ✍️ Writing Evaluation
              </button>
            )}
            {session.speakingReport && (
              <button
                onClick={() => setActiveSectionTab("speaking")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "14px",
                  fontWeight: "800",
                  fontSize: "15px",
                  border: "none",
                  cursor: "pointer",
                  background: activeSectionTab === "speaking" ? "linear-gradient(135deg,#0f766e,#0d9488)" : "#f1f5f9",
                  color: activeSectionTab === "speaking" ? "#ffffff" : "#475569",
                  boxShadow: activeSectionTab === "speaking" ? "0 8px 20px rgba(13,148,136,0.3)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                🎤 Speaking Evaluation
              </button>
            )}
          </div>

          {activeSectionTab === "writing" && session.writingReport && (
            <WritingReport report={session.writingReport} />
          )}

          {activeSectionTab === "speaking" && session.speakingReport && (
            <SpeakingReport report={session.speakingReport} />
          )}
        </div>
      )}

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "30px",
          borderRadius:
            "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          Personalized
          Feedback
        </h2>

        <ul
          style={{
            lineHeight:
              "2",
          }}
        >
          <li>
            Strongest Area:
            {" "}
            {
              strongestSkill
            }
          </li>

          <li>
            Priority Focus:
            {" "}
            {
              weakestSkill
            }
          </li>

          <li>
            Improving{" "}
            {
              weakestSkill
            }
            {" "}
            by 0.5 bands
            could raise
            your overall
            score.
          </li>

          <li>
            Continue
            regular mock
            testing and
            review your
            mistakes.
          </li>

          <li>
            Current Goal:
            {" "}
            Band{" "}
            {
              targetBand
            }
          </li>

          <li>
            Forecast:
            {" "}
            {
              forecast.weeks
            }
            {" "}
            weeks
            (
            {
              forecast.confidence
            }
            {" "}
            confidence)
          </li>
        </ul>
      </div>
      <div
  style={{
    marginTop: "30px",
    textAlign: "center",
  }}
>
  <button
    className="primary-btn"
onClick={() => {
  navigate("/history");
}}
  >
    View Exam History
  </button>
  <button
  className="primary-btn"
  style={{
    marginLeft: "12px",
  }}
 onClick={() => {
  navigate("/cbt-exam/1");
}}
>
  Retake Exam
</button>
</div>

</div>
);
}