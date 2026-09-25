import React, { useState } from "react";
import { Video, Clock, Users, BookOpen, CheckCircle, Bell, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const MASTERCLASS_TOPICS = [
  {
    id: 1,
    title: "IELTS Writing Task 2: Advanced Essay Structuring & Coherence",
    focus: "Essay templates, paragraph linking, and band 7.0+ vocabulary strategies.",
    duration: "60 mins",
    exam: "IELTS Academic & General",
    level: "Intermediate to Advanced"
  },
  {
    id: 2,
    title: "GRE Verbal Reasoning: Text Completion & Sentence Equivalence Strategy",
    focus: "Context clue identification, elimination techniques, and high-yield vocabulary.",
    duration: "75 mins",
    exam: "GRE General",
    level: "All Levels"
  },
  {
    id: 3,
    title: "CAT Data Interpretation & Logical Reasoning Masterclass",
    focus: "Set selection algorithms, calculation shortcuts, and time management.",
    duration: "90 mins",
    exam: "CAT MBA Entrance",
    level: "Advanced"
  },
  {
    id: 4,
    title: "Duolingo DET Interactive Speaking & Production Workshop",
    focus: "Picture description technique, Read Aloud fluency, and 120+ subscore tactics.",
    duration: "60 mins",
    exam: "Duolingo DET",
    level: "All Levels"
  }
];

export default function LiveClasses() {
  const [registeredIds, setRegisteredIds] = useState([]);

  const handleRegister = (cls) => {
    if (registeredIds.includes(cls.id)) {
      toast.error(`You are already registered for alerts on ${cls.title}`);
      return;
    }
    setRegisteredIds((prev) => [...prev, cls.id]);
    toast.success(`Registered for notifications on "${cls.title}"! We'll notify you when the session opens.`, { id: `reg-${cls.id}` });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      padding: "40px 24px 80px",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(37,99,235,0.08) 100%)",
          border: "1px solid rgba(16,185,129,0.25)",
          borderRadius: "24px",
          padding: "36px",
          marginBottom: "36px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <div style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(16,185,129,0.3)"
            }}>
              <Video size={26} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: "1px" }}>
                LIVE MASTERCLASSES & STUDY SESSIONS
              </span>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 900, margin: "2px 0 0" }}>
                Interactive Live Learning Hub
              </h1>
            </div>
          </div>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "780px" }}>
            Participate in upcoming interactive study sessions, strategy workshops, and group live practice modules. Register below to receive notifications and access links when live streams go live.
          </p>
        </div>

        {/* UPCOMING CLASSES LIST */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
              Live Workshop Curriculum
            </h2>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "6px 14px", borderRadius: "20px" }}>
              Notification Registration
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {MASTERCLASS_TOPICS.map((cls) => {
              const isReg = registeredIds.includes(cls.id);
              return (
                <div
                  key={cls.id}
                  style={{
                    background: "var(--card-bg, rgba(255,255,255,0.03))",
                    border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#2563eb", background: "rgba(37,99,235,0.1)", padding: "4px 10px", borderRadius: "6px" }}>
                        {cls.exam}
                      </span>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "10px 0 6px" }}>
                        {cls.title}
                      </h3>
                      <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {cls.focus}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRegister(cls)}
                      style={{
                        background: isReg ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg, #10b981, #059669)",
                        color: isReg ? "#10b981" : "#ffffff",
                        border: isReg ? "1px solid rgba(16,185,129,0.4)" : "none",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      {isReg ? <CheckCircle size={18} /> : <Bell size={18} />}
                      {isReg ? "Notification Set" : "Notify Me"}
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "20px", fontSize: "0.85rem", color: "var(--text-secondary)", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={16} color="#10b981" /> Duration: {cls.duration}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Users size={16} color="#10b981" /> Target Level: {cls.level}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}