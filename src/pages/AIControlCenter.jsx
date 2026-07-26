import { useNavigate } from "react-router-dom";

import {
  Sparkles, BrainCircuit, PenSquare, Mic, BookOpen, Headphones,
  CalendarDays, BarChart3, ArrowRight, Bot, Cpu, Activity, Target, Zap,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useLiveData } from "../hooks/useLiveData";

import "../styles/ai-control-center.css";

export default function AIControlCenter() {
  const navigate = useNavigate();
  const { name, user } = useAuth();
  const { analytics } = useLiveData();

  const firstName = name || user?.email?.split("@")[0] || "Student";

  const band       = analytics?.averageBand    || "—";
  const confidence = analytics?.ai?.confidence || 0;
  const weakSkill  = analytics?.ai?.weakestSkill || "Writing";
  const reading    = analytics?.reading    || 0;
  const listening  = analytics?.listening  || 0;
  const writing    = analytics?.writing    || 0;
  const speaking   = analytics?.speaking   || 0;
  const totalTests = analytics?.testsCompleted || 0;

  const tools = [

    {
      title: "AI IELTS Coach",
      icon: <Bot size={34} />,
      subtitle: "Your personal AI mentor",
      route: "/ai-assistant",
      color: "#06b6d4",
    },

    {
      title: "Writing AI",
      icon: <PenSquare size={34} />,
      subtitle: "Essay Evaluation",
      route: "/mock/writing",
      color: "#f59e0b",
    },

    {
      title: "Speaking AI",
      icon: <Mic size={34} />,
      subtitle: "Band Prediction",
      route: "/mock/speaking",
      color: "#22c55e",
    },

    {
      title: "Reading AI",
      icon: <BookOpen size={34} />,
      subtitle: "Reading Analysis",
      route: "/mock/reading",
      color: "#3b82f6",
    },

    {
      title: "Listening AI",
      icon: <Headphones size={34} />,
      subtitle: "Listening Analysis",
      route: "/mock/listening",
      color: "#8b5cf6",
    },

    {
      title: "Study Planner",
      icon: <CalendarDays size={34} />,
      subtitle: "Daily Roadmap",
      route: "/planner",
      color: "#ec4899",
    },

    {
      title: "Analytics",
      icon: <BarChart3 size={34} />,
      subtitle: "Progress Reports",
      route: "/performance",
      color: "#14b8a6",
    },

  ];

  return (

    <div className="ai-page">

      {/* HERO */}

      <section className="ai-hero">

        <div className="hero-left">

          <span className="hero-badge">

            <Sparkles size={16} />

            KNARROW AI

          </span>

          <h1>

            Welcome back,

            <span>

              {" "}

              {firstName}

            </span>

          </h1>

          <p>

            Your personal AI workspace for IELTS.

            Ask questions, evaluate essays,

            improve speaking and receive

            intelligent recommendations.

          </p>

          <div className="hero-buttons">

            <button

              className="hero-btn"

              onClick={() =>
                navigate("/ai-assistant")
              }

            >

              Launch AI

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-metric">
            <BrainCircuit size={28} />
            <div>
              <h2>{band || "—"}</h2>
              <span>Predicted Band</span>
            </div>
          </div>

          <div className="hero-metric">
            <Activity size={28} />
            <div>
              <h2>{confidence ? `${confidence}%` : "—"}</h2>
              <span>Confidence</span>
            </div>
          </div>

          <div className="hero-metric">
            <Target size={28} />
            <div>
              <h2>{weakSkill.replace(" Accuracy","")}</h2>
              <span>Focus Area</span>
            </div>
          </div>

        </div>

      </section>
            {/* AI ORB */}

      <section className="ai-orb-section">

        <div className="orb-container">

          <div className="orb-ring ring-1"></div>

          <div className="orb-ring ring-2"></div>

          <div className="orb-ring ring-3"></div>

          <div className="orb-glow"></div>

          <div className="orb-core">

            <Cpu size={60} />

          </div>

          <div className="particle p1"></div>
          <div className="particle p2"></div>
          <div className="particle p3"></div>
          <div className="particle p4"></div>
          <div className="particle p5"></div>
          <div className="particle p6"></div>

        </div>

        <div className="orb-info">

          <span className="thinking">

            <Zap size={18}/>

            AI ACTIVE

          </span>

          <h2>

            Knarrow Intelligence

          </h2>

          <p>

            Your personal AI continuously
            analyzes your IELTS progress,
            predicts your band score,
            identifies weaknesses,
            and recommends exactly
            what to study next.

          </p>

          <div className="brain-stats">
            <div>
              <h3>{totalTests}</h3>
              <span>Tests Completed</span>
            </div>
            <div>
              <h3>{band || "—"}</h3>
              <span>Current Band</span>
            </div>
            <div>
              <h3>{analytics?.studyStreak ?? 0}d</h3>
              <span>Study Streak</span>
            </div>
          </div>

        </div>

      </section>



      {/* AI WORKSPACE */}

      <section className="workspace-section">

<div className="ai-workspace-header">
          <h2>

            AI Workspace

          </h2>

          <p>

            Every AI tool in one place.

          </p>

        </div>

<div className="ai-workspace-grid">
          {tools.map((tool)=>(

            <div

              key={tool.title}

className="ai-workspace-card"
              onClick={()=>

                navigate(tool.route)

              }

            >

              <div

className="ai-workspace-icon"
                style={{

                  background:tool.color

                }}

              >

                {tool.icon}

              </div>

              <h3>

                {tool.title}

              </h3>

              <p>

                {tool.subtitle}

              </p>

              <button>

                Launch →

              </button>

            </div>

          ))}

        </div>

      </section>
            {/* AI INTELLIGENCE */}

      <section className="intelligence-section">

        <div className="section-title">

          <h2>

            AI Intelligence

          </h2>

          <p>

            Real-time analysis powered by your
            learning history.

          </p>

        </div>

<div className="ai-intelligence-grid">
          {/* LEFT */}

          <div className="prediction-card">

            <span>CURRENT BAND</span>
            <h1>{band || "—"}</h1>
            <p>AI Confidence</p>

            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${confidence}%` }}
              />
            </div>

            <h3>{confidence}%</h3>

          </div>

          {/* RIGHT */}

          <div className="ai-recommendation-card">
            <div className="recommendation-header">
              <BrainCircuit size={32}/>
              <h3>Today's Recommendation</h3>
            </div>

            <div className="recommendation-item">
              <span>{weakSkill}</span>
              <strong>HIGH PRIORITY</strong>
            </div>

            <div className="recommendation-item">
              <span>Vocabulary Range</span>
              <strong>MEDIUM</strong>
            </div>

            <div className="recommendation-item">
              <span>Speaking Fluency</span>
              <strong>GOOD</strong>
            </div>

            <button
              className="improve-button"
              onClick={() => navigate("/planner")}
            >
              Generate Study Plan
            </button>

          </div>

        </div>

      </section>





      {/* AI TIMELINE */}

      <section className="timeline-section">

        <div className="section-title">

          <h2>

            AI Timeline

          </h2>

          <p>

            Everything your AI has done recently.

          </p>

        </div>

        <div className="timeline">

          <div className="timeline-item">

            <div className="timeline-dot"/>

            <div>

              <h3>

                Essay Evaluated

              </h3>

              <p>

                Overall Band 7.5

              </p>

            </div>

            <span>

              Today

            </span>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot"/>

            <div>

              <h3>

                Speaking Feedback

              </h3>

              <p>

                Fluency Improved

              </p>

            </div>

            <span>

              Yesterday

            </span>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot"/>

            <div>

              <h3>

                Study Plan Generated

              </h3>

              <p>

                30 Day Roadmap

              </p>

            </div>

            <span>

              Monday

            </span>

          </div>

          <div className="timeline-item">

            <div className="timeline-dot"/>

            <div>

              <h3>

                Vocabulary Review

              </h3>

              <p>

                48 New Words

              </p>

            </div>

            <span>

              Last Week

            </span>

          </div>

        </div>

      </section>





      {/* PREMIUM AI */}

      <section className="premium-ai">

        <div>

          <span>

            PREMIUM AI

          </span>

          <h2>

            Unlock Every AI Model

          </h2>

          <p>

            Switch between Groq,
            Gemini,
            GPT,
            Claude
            and future AI models
            from one workspace.

          </p>

        </div>

        <div className="model-grid">

          <div className="model-card active">

            <h3>

              ⚡ Groq

            </h3>

            <p>

              Active

            </p>

          </div>

          <div className="model-card">

            <h3>

              Gemini

            </h3>

            <p>

              Coming Soon

            </p>

          </div>

          <div className="model-card">

            <h3>

              GPT-5

            </h3>

            <p>

              Premium

            </p>

          </div>

          <div className="model-card">

            <h3>

              Claude

            </h3>

            <p>

              Premium

            </p>

          </div>

        </div>

      </section>
            {/* LIVE AI STATUS */}

      <section className="live-ai-section">

        <div className="section-title">

          <h2>

            Live AI Status

          </h2>

          <p>

            Your intelligence engine is always learning.

          </p>

        </div>

        <div className="live-grid">

          <div className="live-card">

            <span>Model</span>

            <h2>Groq</h2>

            <small>Llama 3.3 70B</small>

            <div className="status-online">

              <span className="green-dot"></span>

              Online

            </div>

          </div>

          <div className="live-card">

            <span>Latency</span>

            <h2>61 ms</h2>

            <small>Extremely Fast</small>

          </div>

          <div className="live-card">

            <span>Today's AI Requests</span>

            <h2>43</h2>

            <small>Writing + Speaking</small>

          </div>

          <div className="live-card">

            <span>Memory</span>

            <h2>Learning</h2>

            <small>Adaptive Recommendations</small>

          </div>

        </div>

      </section>



      {/* AI SKILLS */}

      <section className="skills-dashboard">

        <div className="section-title">

          <h2>

            AI Skill Analysis

          </h2>

          <p>

            Your strengths and weaknesses.

          </p>

        </div>

        <div className="skill-analysis">

          {[
            { label: "Reading",   value: reading,   width: reading   ? (reading   / 9 * 100).toFixed(0) : 0 },
            { label: "Listening", value: listening, width: listening ? (listening / 9 * 100).toFixed(0) : 0 },
            { label: "Writing",   value: writing,   width: writing   ? (writing   / 9 * 100).toFixed(0) : 0 },
            { label: "Speaking",  value: speaking,  width: speaking  ? (speaking  / 9 * 100).toFixed(0) : 0 },
          ].map(({ label, value, width }) => (
            <div key={label}>
              <div className="analysis-item">
                <div>{label}</div>
                <strong>{value || "—"}</strong>
              </div>
              <div className="analysis-bar">
                <div style={{ width: `${width}%` }} />
              </div>
            </div>
          ))}

        </div>

      </section>



      {/* QUICK AI */}

      <section className="quick-ai">

        <div className="section-title">

          <h2>

            Quick AI Tools

          </h2>

          <p>

            One-click intelligent helpers.

          </p>

        </div>

        <div className="quick-ai-grid">

          <button>Grammar Checker</button>

          <button>Vocabulary Builder</button>

          <button>Essay Rewrite</button>

          <button>Band Predictor</button>

          <button>Idea Generator</button>

          <button>Task 1 Assistant</button>

          <button>Task 2 Assistant</button>

          <button>Synonym Finder</button>

          <button>Collocation AI</button>

          <button>Cue Card Generator</button>

          <button>Pronunciation Coach</button>

          <button>Sentence Improver</button>

        </div>

      </section>
            {/* AI MISSION CONTROL */}

      <section className="mission-control">

        <div className="section-title">

          <h2>

            AI Mission Control

          </h2>

          <p>

            Live intelligence powered by Groq.

          </p>

        </div>

        <div className="mission-grid">

          <div className="mission-card">

            <span>

              CURRENT TASK

            </span>

            <h2>

              Essay Evaluation

            </h2>

            <div className="terminal">

              <div>

                Initializing AI...

              </div>

              <div>

                Connecting to Groq...

              </div>

              <div>

                Reading Essay...

              </div>

              <div>

                Checking Grammar...

              </div>

              <div>

                Evaluating Vocabulary...

              </div>

              <div>

                Predicting Band...

              </div>

              <div className="terminal-active">

                Waiting for Prompt...

              </div>

            </div>

          </div>

          <div className="mission-card">

            <span>

              LIVE METRICS

            </span>

            <div className="metric-row">

              <strong>

                Tokens/sec

              </strong>

              <span>

                542

              </span>

            </div>

            <div className="metric-row">

              <strong>

                AI Accuracy

              </strong>

              <span>

                94%

              </span>

            </div>

            <div className="metric-row">

              <strong>

                Response Time

              </strong>

              <span>

                0.8 sec

              </span>

            </div>

            <div className="metric-row">

              <strong>

                Requests Today

              </strong>

              <span>

                43

              </span>

            </div>

            <div className="metric-row">

              <strong>

                Success Rate

              </strong>

              <span>

                99.9%

              </span>

            </div>

          </div>

        </div>

      </section>





      {/* AI CHAT PREVIEW */}

      <section className="chat-preview">

        <div className="section-title">

          <h2>

            AI Conversation

          </h2>

          <p>

            Your personal IELTS mentor.

          </p>

        </div>

        <div className="chat-window">

          <div className="chat-message user">

            <div className="avatar">

              N

            </div>

            <div className="bubble">

              How can I improve
              Task Response?

            </div>

          </div>

          <div className="chat-message ai">

            <div className="avatar ai-avatar">

              AI

            </div>

            <div className="bubble">

              Task Response measures how
              completely you answer every
              part of the question.

              Focus on:

              • Answer every bullet point.

              • Give relevant examples.

              • Develop your ideas.

              • Avoid repetition.

            </div>

          </div>

          <div className="chat-message user">

            <div className="avatar">

              N

            </div>

            <div className="bubble">

              Can you generate a study
              plan?

            </div>

          </div>

          <div className="chat-message ai">

            <div className="avatar ai-avatar">

              AI

            </div>

            <div className="bubble">

              Absolutely.

              I recommend:

              ✔ 30 mins Reading

              ✔ 45 mins Writing

              ✔ 20 mins Speaking

              ✔ Vocabulary Revision

            </div>

          </div>

        </div>

      </section>





      {/* FUTURE AI */}

      <section className="future-ai">

        <div>

          <span>

            NEXT GENERATION

          </span>

          <h2>

            Future AI Features

          </h2>

          <p>

            Voice conversations, AI Memory,
            Screen Analysis,
            Live Speaking Feedback,
            AI Tutor and much more.

          </p>

        </div>

        <div className="future-grid">

          <div>

            🎙 Voice Mode

          </div>

          <div>

            🧠 AI Memory

          </div>

          <div>

            📸 Camera Evaluation

          </div>

          <div>

            🌍 Accent Trainer

          </div>

          <div>

            🪄 Essay Rewrite

          </div>

          <div>

            ⚡ GPT-5 Integration

          </div>

        </div>

      </section>

    </div>

  );

}