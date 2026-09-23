import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import {
  Send, Bot, User, Sparkles, Zap, BrainCircuit, Target, Activity,
  Cpu, Flame, TrendingUp, Calendar, CheckCircle2, Trophy, Crown, ArrowLeft, RotateCcw,
} from "lucide-react";
import PremiumGate from "../components/PremiumGate";
import { askGroq } from "../services/aiService";
import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import { useLiveData } from "../hooks/useLiveData";
import { getExamAiConfig } from "../config/examAiConfig";
import "../styles/ai-assistant.css";

export default function AIAssistant() {
  const navigate = useNavigate();
  const { name, user } = useAuth();
  const { analytics } = useLiveData();
  const { activeTrack } = useExam();
  
  const currentTrack = activeTrack || localStorage.getItem("knarrow_active_track") || "IELTS";
  const aiConfig = getExamAiConfig(currentTrack);

  const firstName = name || user?.email?.split("@")[0] || "Student";

  const band       = analytics?.averageBand    || "—";
  const streak     = analytics?.studyStreak    || 0;
  const weakSkill  = analytics?.ai?.weakestSkill || "Writing";
  const totalTests = analytics?.testsCompleted  || 0;

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: aiConfig.welcomeMessage(firstName),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  // Update initial message when track changes
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: aiConfig.welcomeMessage(firstName),
      },
    ]);
  }, [currentTrack, firstName]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text) {
    const content = (text || input).trim();
    if (!content || loading) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await askGroq([
        { role: "system", content: aiConfig.systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content }
      ]);
      setMessages((prev) => [...prev, { role: "assistant", content: aiReply || "How else can I assist with your prep?" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ Unable to reach ${aiConfig.title}. Please try again.` },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content: aiConfig.welcomeMessage(firstName),
      },
    ]);
  }

  return (
    <PremiumGate>
      <div className="ai-studio">

        {/* ── Sidebar ── */}
        <aside className="ai-sidebar">

          {/* Back */}
          <button className="sidebar-back" onClick={() => navigate("/ai-center")}>
            <ArrowLeft size={16} />
            AI Studio
          </button>

          {/* Brand */}
          <div className="sidebar-brand">
            <div className="sidebar-orb">
              <Cpu size={28} />
            </div>
            <div>
              <h2>{aiConfig.title}</h2>
              <span className="online-badge">
                <span className="green-pulse" />
                Groq · {aiConfig.name} Mode
              </span>
            </div>
          </div>

          {/* Target Score Prediction */}
          <div className="sidebar-card">
            <p className="card-label">{aiConfig.name} TARGET SCORE</p>
            <div className="band-score">{band !== "—" ? band : aiConfig.name}</div>
            <div className="band-bar">
              <div className="band-fill" style={{ width: "85%" }} />
            </div>
            <p className="band-target">{aiConfig.targetScore}</p>
          </div>

          {/* AI Memory */}
          <div className="sidebar-card">
            <div className="card-title-row">
              <BrainCircuit size={18} />
              AI Memory ({aiConfig.name})
            </div>
            {[
              ["Strongest", analytics?.listening >= analytics?.reading ? "Listening" : "Reading"],
              ["Weakest",   weakSkill.replace(" Accuracy", "")],
              ["Target",    aiConfig.targetScore.replace("Target: ", "")],
              ["Streak",    `🔥 ${streak} Day${streak !== 1 ? "s" : ""}`],
            ].map(([label, val]) => (
              <div key={label} className="memory-row">
                <span>{label}</span>
                <strong>{val}</strong>
              </div>
            ))}
          </div>

          {/* Today's Mission */}
          <div className="sidebar-card">
            <div className="card-title-row">
              <Target size={18} />
              Today's Mission ({aiConfig.name})
            </div>
            {aiConfig.mission.map((task) => (
              <div key={task} className="mission-row">
                <CheckCircle2 size={15} />
                {task}
              </div>
            ))}
          </div>

          {/* AI Models */}
          <div className="sidebar-card">
            <div className="card-title-row">
              <Cpu size={18} />
              AI Models
            </div>
            {[
              { name: "⚡ Groq", status: "Active", active: true },
              { name: "Gemini", status: "Ready", active: false },
              { name: "GPT-5", status: "Premium", active: false },
              { name: "Claude", status: "Premium", active: false },
            ].map((m) => (
              <div key={m.name} className={`model-row ${m.active ? "active" : ""}`}>
                <span>{m.name}</span>
                <small>{m.status}</small>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="sidebar-card">
            <div className="card-title-row">
              <Activity size={18} />
              Recent Activity
            </div>
            {(analytics ? [
              { icon: <Flame size={15} />,     title: `${analytics.writing || "—"} Writing Band`,    sub: "Latest evaluation" },
              { icon: <TrendingUp size={15} />, title: `${analytics.speaking || "—"} Speaking Band`,  sub: "Latest evaluation" },
              { icon: <Calendar size={15} />,   title: `${totalTests} Total Tests`,                    sub: "All time" },
            ] : [
              { icon: <Flame size={15} />,     title: "No data yet", sub: "Take a test" },
            ]).map((a) => (
              <div key={a.title} className="activity-row">
                {a.icon}
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="sidebar-card">
            <div className="card-title-row">
              <Trophy size={18} />
              Achievements
            </div>
            {[
              streak > 0   ? `🔥 ${streak} Day Streak`               : null,
              totalTests >= 10 ? `🏆 ${totalTests} Tests Completed`   : null,
              band !== "—" && Number(band) >= 7 ? `🎯 Band ${band}+`  : null,
              totalTests === 0 ? "🚀 Just getting started"             : null,
            ].filter(Boolean).slice(0, 3).map((a) => (
              <div key={a} className="achievement-chip">{a}</div>
            ))}
          </div>

          {/* Premium CTA */}
          <div className="sidebar-premium">
            <Crown size={28} />
            <h3>Premium AI</h3>
            <p>GPT-5 · Voice Mode · AI Memory · Unlimited Evaluations</p>
            <button onClick={() => navigate("/pricing")}>Upgrade →</button>
          </div>

        </aside>

        {/* ── Main Chat ── */}
        <main className="ai-main">

          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar-header">
                <Bot size={22} />
              </div>
              <div>
                <h1>{aiConfig.title}</h1>
                <span>
                  <Zap size={13} />
                  Powered by Groq · {aiConfig.name} Expert Mode
                </span>
              </div>
            </div>
            <div className="chat-header-right">
              <button className="header-btn" onClick={clearChat} title="Clear chat">
                <RotateCcw size={16} />
                New Chat
              </button>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts">
            <p className="quick-label">
              <Sparkles size={14} />
              Quick Prompts ({aiConfig.name})
            </p>
            <div className="quick-chips">
              {aiConfig.quickPrompts.map((q) => (
                <button
                  key={q.label}
                  className="quick-chip"
                  onClick={() => sendMessage(q.text)}
                  disabled={loading}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className={`msg-avatar ${msg.role === "assistant" ? "ai-av" : "user-av"}`}>
                  {msg.role === "assistant" ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className={`msg-bubble ${msg.role}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg assistant">
                <div className="msg-avatar ai-av">
                  <Bot size={18} />
                </div>
                <div className="msg-bubble assistant typing-bubble">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <textarea
                ref={inputRef}
                className="chat-input"
                placeholder={aiConfig.placeholder}
                value={input}
                rows={1}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                className={`send-btn ${loading || !input.trim() ? "disabled" : ""}`}
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>
          </div>

        </main>
      </div>
    </PremiumGate>
  );
}
