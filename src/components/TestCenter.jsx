import { useNavigate } from "react-router-dom";
import { Trophy, BookOpen, Clock3, BarChart3, Lock, Crown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/testCenter.css";
export default function TestCenter({

title,

description,

tests,

route,

icon,

theme = "blue",

freeLimit,

}) {

const navigate = useNavigate();
const { premium } = useAuth();

const completed =
tests.filter(t=>t.completed).length;

const remaining =
tests.length-completed;

const bestBand =
Math.max(
...tests.map(t=>Number(t.bestBand)||0),
0
).toFixed(1);

const progress =
Math.round(
(completed/tests.length)*100
);

const lastTest =
tests.find(t=>!t.completed) || tests[0];

return(

<div className="test-center">

{/* HERO */}

{/* HERO */}

<div className={`hero-card ${theme}`}>
  <div className="hero-left">

    <div className="hero-icon">
      {icon}
    </div>

    <div>

      <h1>{title}</h1>

      <p>{description}</p>

      <div className="hero-features">

        <span>📚 {tests.length} Mock Tests</span>

        <span>🤖 AI Evaluation</span>

        <span>📈 Performance Tracking</span>

      </div>

    </div>

  </div>

  <div className="hero-right">

    <div className="hero-stats">

      <div>

        <span>⭐ Best Band</span>

        <strong>
          {bestBand === "0.0" ? "--" : bestBand}
        </strong>

      </div>

      <div>

        <span>🏆 Completed</span>

        <strong>
          {completed}/{tests.length}
        </strong>

      </div>

      <div>

        <span>📈 Progress</span>

        <strong>{progress}%</strong>

      </div>

    </div>

    <button

className={`continue-btn ${theme}`}
      onClick={() =>
        navigate(`${route}/${lastTest.id}`)
      }

    >

      ▶ Continue Practice

    </button>

  </div>

</div>

{/* STATS */}

<div className="stats-grid">

<div className="stat-card">

<Trophy size={34}/>

<div>

<h3>

Best Band

</h3>

<h2>

{bestBand==="0.0"?"--":bestBand}

</h2>

</div>

</div>

<div className="stat-card">

<BookOpen size={34}/>

<div>

<h3>

Completed

</h3>

<h2>

{completed}/{tests.length}

</h2>

</div>

</div>

<div className="stat-card">

<Clock3 size={34}/>

<div>

<h3>

Remaining

</h3>

<h2>

{remaining}

</h2>

</div>

</div>

<div className="stat-card">

<BarChart3 size={34}/>

<div>

<h3>

Progress

</h3>

<h2>

{progress}%

</h2>

</div>

</div>

</div>

{/* PROGRESS */}

<div className="progress-section">

<div className="progress-title">

<span>

Overall Progress

</span>

<span>

{progress}%

</span>

</div>

<div className="progress-bar">

<div

className={`progress-fill ${theme}`}
style={{

width:`${progress}%`

}}

></div>

</div>

</div>

{/* TEST GRID */}

<div className="test-grid">

{tests.map((test, index) => {
  const isLocked = freeLimit && !premium && index >= freeLimit;
  
  return (
    <div
      key={test.id}
      className={`test-card ${theme} ${isLocked ? "locked" : ""}`}
      style={{
        position: "relative",
        opacity: isLocked ? 0.7 : 1,
        pointerEvents: isLocked ? "none" : "auto",
      }}
    >

      {/* Lock Overlay */}
      {isLocked && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.92)",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            zIndex: 10,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => navigate("/pricing")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(15, 23, 42, 0.96)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(15, 23, 42, 0.92)";
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              borderRadius: "50%",
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(245, 158, 11, 0.4)",
            }}
          >
            <Crown size={32} color="#fff" strokeWidth={2.5} />
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: 800,
                margin: "0 0 6px 0",
              }}
            >
              Premium Only
            </h3>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                margin: 0,
                fontWeight: 600,
              }}
            >
              Unlock unlimited tests
            </p>
          </div>
          <button
            style={{
              padding: "10px 24px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Upgrade Now →
          </button>
        </div>
      )}

      <div className="card-top">

        <div>

          <h2>

            {test.title}

          </h2>

          <p>

            Practice IELTS Mock Test

          </p>

        </div>

        <span

          className={`difficulty ${(test.difficulty || "Medium").toLowerCase()}`}
        >

          {test.difficulty || "Medium"}
        </span>

      </div>
      <div className="card-info">

        <div>

          ⏱

          <span>

            {test.duration}

          </span>

        </div>

        <div>

          📄

          <span>

            {test.questions} Questions

          </span>

        </div>

      </div>

      <div className="band-section">

        <div>

          <span className="label">

            ⭐ Best Band

          </span>

          <h3>

            {test.bestBand}

          </h3>

        </div>

        <div>

          <span className="label">

            Status

          </span>

          <h3>

            {test.completed

              ?

              "🏅 Completed"

              :

              "🕓 Not Attempted"}

          </h3>

        </div>

      </div>

      <button

        className={`start-btn ${theme}`}
        onClick={() =>

          navigate(`${route}/${test.id}`)

        }

      >

        {test.completed

          ?

          "Continue Test →"

          :

          "Start Test →"}

      </button>

    </div>
  );
})}

</div>

</div>

);

}