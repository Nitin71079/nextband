import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, BookOpen, Building, Clock, HelpCircle, CheckSquare,
  FileText, Headphones, Mic, PenTool, Play, ArrowRight, Layers, Sparkles, Image as ImageIcon, Volume2, Award
} from "lucide-react";
import "../styles/duolingo.css";

export default function DETDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("practice"); // my-tests | practice | test-info | institutions
  const [activeSkillFilter, setActiveSkillFilter] = useState("ALL"); // ALL | SPEAKING | WRITING | READING | LISTENING

  const PRACTICE_SKILLS = [
    {
      id: "single-word-read-select",
      title: "Read and Select (Single Word)",
      category: "READING",
      icon: CheckSquare,
      progress: "5/6",
      progressPct: 83,
      color: "#2563eb",
      desc: "Identify real English words in 5 seconds per item."
    },
    {
      id: "fill-in-the-blanks",
      title: "Fill in the Blanks",
      category: "READING",
      icon: Layers,
      progress: "6/6",
      progressPct: 100,
      color: "#10b981",
      desc: "Complete sentence words with individual letter slots."
    },
    {
      id: "read-and-complete",
      title: "Read and Complete",
      category: "READING",
      icon: FileText,
      progress: "2/6",
      progressPct: 33,
      color: "#3b82f6",
      desc: "Fill in missing letters throughout C-Test passages."
    },
    {
      id: "listen-and-type",
      title: "Listen and Type",
      category: "LISTENING",
      icon: Headphones,
      progress: "3/6",
      progressPct: 50,
      color: "#8b5cf6",
      desc: "Dictation: transcribe audio statements accurately."
    },
    {
      id: "read-aloud",
      title: "Read Aloud",
      category: "SPEAKING",
      icon: Mic,
      progress: "4/6",
      progressPct: 67,
      color: "#f59e0b",
      desc: "Record your voice reading written sentences."
    },
    {
      id: "interactive-reading",
      title: "Interactive Reading",
      category: "READING",
      icon: BookOpen,
      progress: "2/6",
      progressPct: 33,
      color: "#0284c7",
      desc: "Multi-part passage comprehension & proof selection."
    },
    {
      id: "interactive-listening",
      title: "Interactive Listening",
      category: "LISTENING",
      icon: Volume2,
      progress: "1/6",
      progressPct: 17,
      color: "#7c3aed",
      desc: "5-stage scenario listening, dialogue & summary."
    },
    {
      id: "describe-image",
      title: "Write About the Image",
      category: "WRITING",
      icon: ImageIcon,
      progress: "3/6",
      progressPct: 50,
      color: "#ec4899",
      desc: "Write 1+ sentences describing image prompts in 60s."
    },
    {
      id: "speak-about-image",
      title: "Speak About the Image",
      category: "SPEAKING",
      icon: Mic,
      progress: "2/6",
      progressPct: 33,
      color: "#f97316",
      desc: "Describe an image out loud for 90 seconds."
    },
    {
      id: "interactive-writing",
      title: "Interactive Writing",
      category: "WRITING",
      icon: PenTool,
      progress: "4/6",
      progressPct: 67,
      color: "#06b6d4",
      desc: "5-minute main response + 3-minute follow-up."
    },
    {
      id: "interactive-speaking",
      title: "Interactive Speaking",
      category: "SPEAKING",
      icon: Mic,
      progress: "3/6",
      progressPct: 50,
      color: "#eab308",
      desc: "Speak about topic for 90s + follow-up prompt."
    },
    {
      id: "writing-sample",
      title: "Writing Sample",
      category: "WRITING",
      icon: PenTool,
      progress: "5/6",
      progressPct: 83,
      color: "#6366f1",
      desc: "Extended institutional writing sample essay."
    },
    {
      id: "speaking-sample",
      title: "Speaking Sample",
      category: "SPEAKING",
      icon: Mic,
      progress: "4/6",
      progressPct: 67,
      color: "#14b8a6",
      desc: "1 to 3 minute spoken video response sample."
    },
  ];

  const filteredSkills = activeSkillFilter === "ALL"
    ? PRACTICE_SKILLS
    : PRACTICE_SKILLS.filter(s => s.category === activeSkillFilter);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#1e293b",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── KNARROW TOP NAVBAR ── */}
      <header
        style={{
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
        }}
      >
        {/* Knarrow Brand Emblem */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <span style={{ fontSize: "18px", fontWeight: "900", color: "#1e293b", letterSpacing: "-0.5px" }}>
              knarrow
            </span>
            <span style={{ fontSize: "12px", fontWeight: "800", color: "#2563eb", marginLeft: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              DET Suite
            </span>
          </div>
        </div>

        {/* User Status Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f1f5f9", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: "700", color: "#475569" }}>
            <Award size={16} color="#2563eb" /> Knarrow Score Estimate: <strong style={{ color: "#2563eb" }}>125 / 160</strong>
          </div>
        </div>
      </header>

      {/* ── MAIN BODY WITH SIDEBAR ── */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left Sidebar */}
        <aside
          style={{
            width: "240px",
            borderRight: "1px solid #e2e8f0",
            padding: "32px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            background: "#ffffff",
          }}
        >
          <button
            onClick={() => setActiveNav("my-tests")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 18px",
              borderRadius: "14px",
              border: "none",
              background: activeNav === "my-tests" ? "#eff6ff" : "transparent",
              color: activeNav === "my-tests" ? "#2563eb" : "#64748b",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            <Home size={18} /> MY TESTS
          </button>

          <button
            onClick={() => setActiveNav("practice")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 18px",
              borderRadius: "14px",
              border: "none",
              background: activeNav === "practice" ? "#eff6ff" : "transparent",
              color: activeNav === "practice" ? "#2563eb" : "#64748b",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            <Layers size={18} /> PRACTICE SKILLS
          </button>

          <button
            onClick={() => setActiveNav("test-info")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 18px",
              borderRadius: "14px",
              border: "none",
              background: activeNav === "test-info" ? "#eff6ff" : "transparent",
              color: activeNav === "test-info" ? "#2563eb" : "#64748b",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            <BookOpen size={18} /> TEST INFO
          </button>

          <button
            onClick={() => setActiveNav("institutions")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 18px",
              borderRadius: "14px",
              border: "none",
              background: activeNav === "institutions" ? "#eff6ff" : "transparent",
              color: activeNav === "institutions" ? "#2563eb" : "#64748b",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            <Building size={18} /> INSTITUTIONS
          </button>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: "40px 48px 80px 48px", maxWidth: "980px" }}>
          
          {/* Hero Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              borderRadius: "24px",
              padding: "36px 40px",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "48px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
            }}
          >
            <div>
              <span
                style={{
                  background: "rgba(37, 99, 235, 0.2)",
                  color: "#60a5fa",
                  border: "1px solid rgba(96, 165, 250, 0.3)",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                  display: "inline-block",
                  marginBottom: "14px",
                }}
              >
                KNARROW ADAPTIVE ENGINE
              </span>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#ffffff", margin: "0 0 12px 0" }}>
                Take a Full-Length DET Practice Test
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 24px 0", maxWidth: "520px", lineHeight: "1.6" }}>
                Simulate official computer-adaptive DET conditions with instant subscore evaluation for Literacy, Comprehension, Conversation, and Production.
              </p>

              <button
                onClick={() => navigate("/mock/det/1")}
                style={{
                  background: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 28px",
                  fontSize: "14px",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Play size={16} fill="#ffffff" /> START ADAPTIVE MOCK EXAM
              </button>
            </div>

            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "16px",
              }}
            >
              <Award size={36} color="#60a5fa" />
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#ffffff", marginTop: "8px" }}>10-160</span>
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "700" }}>DET Score Scale</span>
            </div>
          </div>

          {/* Practice Skills Section */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b", margin: "0 0 16px 0" }}>
              Practice All 14 DET Question Types
            </h2>

            {/* Subtabs Bar */}
            <div style={{ display: "flex", gap: "24px", borderBottom: "2px solid #f1f5f9", marginBottom: "28px" }}>
              {["ALL", "SPEAKING", "WRITING", "READING", "LISTENING"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSkillFilter(tab)}
                  style={{
                    padding: "10px 4px",
                    border: "none",
                    borderBottom: activeSkillFilter === tab ? "3px solid #2563eb" : "3px solid transparent",
                    background: "none",
                    color: activeSkillFilter === tab ? "#2563eb" : "#94a3b8",
                    fontWeight: "800",
                    fontSize: "13px",
                    letterSpacing: "0.5px",
                    cursor: "pointer",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Skill Cards Grid (2xN) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
              {filteredSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.id}
                    onClick={() => navigate(`/det/practice/${skill.id}`)}
                    style={{
                      background: "#ffffff",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "18px",
                      padding: "20px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#2563eb"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: `${skill.color}15`,
                        color: skill.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#1e293b", margin: "0 0 4px 0" }}>
                        {skill.title}
                      </h3>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 12px 0", lineHeight: "1.4" }}>
                        {skill.desc}
                      </p>

                      {/* Progress Bar */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ flex: 1, height: "6px", borderRadius: "999px", background: "#f1f5f9", overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${skill.progressPct}%`,
                              height: "100%",
                              background: skill.color,
                              borderRadius: "999px",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8" }}>
                          {skill.progress}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Floating Bottom Right HELP Button */}
      <button
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "#ffffff",
          border: "1.5px solid #e2e8f0",
          borderRadius: "12px",
          padding: "10px 18px",
          color: "#2563eb",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: "0.5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
        }}
      >
        <HelpCircle size={16} /> KNARROW SUPPORT
      </button>
    </div>
  );
}
