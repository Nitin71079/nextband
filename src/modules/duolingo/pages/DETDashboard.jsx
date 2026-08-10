import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, BookOpen, Building, Clock, ShoppingCart, HelpCircle, CheckSquare,
  FileText, Headphones, Mic, PenTool, Play, ArrowRight, Layers
} from "lucide-react";
import "../styles/duolingo.css";

export default function DETDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("practice"); // my-tests | practice | test-info | institutions
  const [activeSkillFilter, setActiveSkillFilter] = useState("ALL"); // ALL | SPEAKING | WRITING | READING | LISTENING

  const PRACTICE_SKILLS = [
    {
      id: "read-and-select",
      title: "Read and Select",
      category: "READING",
      icon: CheckSquare,
      progress: "1/6",
      progressPct: 17,
      color: "#1cb0f6",
    },
    {
      id: "fill-in-the-blanks",
      title: "Fill in the Blanks",
      category: "READING",
      icon: Layers,
      progress: "6/6",
      progressPct: 100,
      color: "#58cc02",
    },
    {
      id: "read-and-complete",
      title: "Read and Complete",
      category: "READING",
      icon: FileText,
      progress: "2/6",
      progressPct: 33,
      color: "#1cb0f6",
    },
    {
      id: "listen-and-type",
      title: "Listen and Type",
      category: "LISTENING",
      icon: Headphones,
      progress: "0/6",
      progressPct: 0,
      color: "#ce82ff",
    },
    {
      id: "writing-sample",
      title: "Writing Sample",
      category: "WRITING",
      icon: PenTool,
      progress: "4/6",
      progressPct: 67,
      color: "#ff9600",
    },
    {
      id: "speaking-sample",
      title: "Speaking Sample",
      category: "SPEAKING",
      icon: Mic,
      progress: "3/6",
      progressPct: 50,
      color: "#ff9600",
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
      {/* ── TOP NAVBAR ── */}
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
        {/* Duolingo Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/")}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#58cc02",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: "900",
              fontSize: "18px",
            }}
          >
            🦉
          </div>
          <span style={{ fontSize: "20px", fontWeight: "800", color: "#58cc02", letterSpacing: "-0.5px" }}>
            duolingo english test
          </span>
        </div>

        {/* Top Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#1cb0f6", fontWeight: "800", fontSize: "14px" }}>
            <ShoppingCart size={18} />
            <span>1</span>
          </div>

          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#ce82ff",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "14px",
            }}
          >
            0
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
              background: activeNav === "my-tests" ? "#e0f2fe" : "transparent",
              color: activeNav === "my-tests" ? "#0284c7" : "#64748b",
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
              background: activeNav === "practice" ? "#e0f2fe" : "transparent",
              color: activeNav === "practice" ? "#0284c7" : "#64748b",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            <Layers size={18} /> PRACTICE
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
              background: activeNav === "test-info" ? "#e0f2fe" : "transparent",
              color: activeNav === "test-info" ? "#0284c7" : "#64748b",
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
              background: activeNav === "institutions" ? "#e0f2fe" : "transparent",
              color: activeNav === "institutions" ? "#0284c7" : "#64748b",
              fontWeight: "800",
              fontSize: "13px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            <Building size={18} /> INSTITUTIONS
          </button>
        </aside>

        {/* Main Content View Area */}
        <main style={{ flex: 1, padding: "40px 48px 80px 48px", maxWidth: "960px" }}>
          
          {/* Practice Hero Banner */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              padding: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "48px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: "0 0 20px 0" }}>
                Take a full length practice test
              </h1>

              <button
                onClick={() => navigate("/mock/det/1")}
                style={{
                  background: "#1cb0f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 28px",
                  fontSize: "14px",
                  fontWeight: "800",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 0 #0284c7",
                }}
              >
                PRACTICE FREE
              </button>
            </div>

            {/* Laptop graphic */}
            <div
              style={{
                width: "160px",
                height: "110px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #fef08a, #86efac)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              }}
            >
              💻
            </div>
          </div>

          {/* Practice Skills Section */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b", margin: "0 0 16px 0" }}>
              Practice skills
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
                    borderBottom: activeSkillFilter === tab ? "3px solid #1cb0f6" : "3px solid transparent",
                    background: "none",
                    color: activeSkillFilter === tab ? "#1cb0f6" : "#94a3b8",
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
                      alignItems: "center",
                      gap: "16px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#1cb0f6"}
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
                      <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#1e293b", margin: "0 0 10px 0" }}>
                        {skill.title}
                      </h3>

                      {/* Progress Bar & Counter */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ flex: 1, height: "8px", borderRadius: "999px", background: "#f1f5f9", overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${skill.progressPct}%`,
                              height: "100%",
                              background: skill.color,
                              borderRadius: "999px",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8" }}>
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
          color: "#0284c7",
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
        <HelpCircle size={16} /> HELP
      </button>
    </div>
  );
}
