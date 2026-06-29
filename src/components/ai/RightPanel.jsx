import {
  BrainCircuit,
  Target,
  Trophy,
  Activity,
  Crown,
  Cpu,
  Flame,
  TrendingUp,
  Calendar,
  CheckCircle2
} from "lucide-react";

export default function RightPanel() {

  return (

    <aside className="right-panel">

      {/* =========================
          BAND PREDICTION
      ========================== */}

      <div className="right-card prediction-card">

        <span className="card-label">

          BAND PREDICTION

        </span>

        <h1>

          7.5

        </h1>

        <div className="prediction-bar">

          <div
            className="prediction-fill"
            style={{
              width:"75%"
            }}
          />

        </div>

        <p>

          Target Band 8.0

        </p>

      </div>



      {/* =========================
          AI MEMORY
      ========================== */}

      <div className="right-card">

        <div className="card-title">

          <BrainCircuit size={20}/>

          AI Memory

        </div>

        <div className="memory-row">

          <span>

            Strongest Skill

          </span>

          <strong>

            Listening

          </strong>

        </div>

        <div className="memory-row">

          <span>

            Weakest Skill

          </span>

          <strong>

            Grammar

          </strong>

        </div>

        <div className="memory-row">

          <span>

            Target

          </span>

          <strong>

            Band 8

          </strong>

        </div>

        <div className="memory-row">

          <span>

            Streak

          </span>

          <strong>

            18 Days

          </strong>

        </div>

      </div>



      {/* =========================
          TODAY'S MISSION
      ========================== */}

      <div className="right-card">

        <div className="card-title">

          <Target size={20}/>

          Today's Mission

        </div>

        <div className="mission">

          <CheckCircle2 size={18}/>

          Writing Task 2

        </div>

        <div className="mission">

          <CheckCircle2 size={18}/>

          20 min Speaking

        </div>

        <div className="mission">

          <CheckCircle2 size={18}/>

          Vocabulary Review

        </div>

        <div className="mission">

          <CheckCircle2 size={18}/>

          Grammar Practice

        </div>

      </div>



      {/* =========================
          MODELS
      ========================== */}

      <div className="right-card">

        <div className="card-title">

          <Cpu size={20}/>

          AI Models

        </div>

        <div className="model active-model">

          <span>

            ⚡ Groq

          </span>

          <small>

            Active

          </small>

        </div>

        <div className="model">

          <span>

            Gemini

          </span>

          <small>

            Ready

          </small>

        </div>

        <div className="model">

          <span>

            GPT-5

          </span>

          <small>

            Premium

          </small>

        </div>

        <div className="model">

          <span>

            Claude

          </span>

          <small>

            Premium

          </small>

        </div>

      </div>



      {/* =========================
          ACTIVITY
      ========================== */}

      <div className="right-card">

        <div className="card-title">

          <Activity size={20}/>

          Recent Activity

        </div>

        <div className="timeline-item">

          <Flame size={16}/>

          <div>

            <strong>

              Essay Evaluated

            </strong>

            <p>

              Band 7.5

            </p>

          </div>

        </div>

        <div className="timeline-item">

          <TrendingUp size={16}/>

          <div>

            <strong>

              Speaking Improved

            </strong>

            <p>

              Yesterday

            </p>

          </div>

        </div>

        <div className="timeline-item">

          <Calendar size={16}/>

          <div>

            <strong>

              Study Plan

            </strong>

            <p>

              Monday

            </p>

          </div>

        </div>

      </div>



      {/* =========================
          PREMIUM
      ========================== */}

      <div className="premium-box">

        <Crown size={34}/>

        <h2>

          Premium AI

        </h2>

        <p>

          GPT-5

          Unlimited Evaluations

          Voice Mode

          AI Memory

          Faster Queue

        </p>

        <button>

          Upgrade

        </button>

      </div>



      {/* =========================
          ACHIEVEMENTS
      ========================== */}

      <div className="right-card">

        <div className="card-title">

          <Trophy size={20}/>

          Achievements

        </div>

        <div className="achievement">

          🔥

          18 Day Streak

        </div>

        <div className="achievement">

          🏆

          50 Essays

        </div>

        <div className="achievement">

          🎯

          Band 7+

        </div>

      </div>

    </aside>

  );

}a