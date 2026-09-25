import React, { useState } from "react";
import { Calendar, Video, Clock, Users, BookOpen, CheckCircle, Bell, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const UPCOMING_CLASSES = [
  {
    id: 1,
    title: "IELTS Writing Task 2: Band 8.0 Advanced Essay Structures",
    instructor: "Dr. Eleanor Vance",
    role: "Former Senior IELTS Examiner (12+ Yrs Experience)",
    date: "Tomorrow, 6:00 PM IST",
    duration: "60 mins",
    exam: "IELTS Academic & General",
    seatsLeft: 14,
    tags: ["Writing", "Band 8.0+", "Live Q&A"]
  },
  {
    id: 2,
    title: "GRE Verbal Reasoning: Cracking Text Completion & Sentence Equivalence",
    instructor: "Prof. Rajesh Kumar",
    role: "Quant & Verbal Strategist (IIT / IIM Alumnus)",
    date: "Saturday, 11:00 AM IST",
    duration: "75 mins",
    exam: "GRE General",
    seatsLeft: 8,
    tags: ["GRE Verbal", "330+ Strategy"]
  },
  {
    id: 3,
    title: "CAT 2026 Data Interpretation & Logical Reasoning Masterclass",
    instructor: "Vikram Sethi",
    role: "CAT 99.98%iler & Lead Mentor",
    date: "Sunday, 4:00 PM IST",
    duration: "90 mins",
    exam: "CAT MBA Entrance",
    seatsLeft: 22,
    tags: ["DILR", "CAT 99%ile", "Problem Sets"]
  },
  {
    id: 4,
    title: "Duolingo DET 120+ Interactive Speaking & Production Workshop",
    instructor: "Sarah Jenkins",
    role: "Certified ESL Trainer & DET Specialist",
    date: "Next Tuesday, 7:00 PM IST",
    duration: "60 mins",
    exam: "Duolingo DET",
    seatsLeft: 19,
    tags: ["DET Speaking", "Real-Time AI Eval"]
  }
];

export default function LiveClasses() {
  const [registeredIds, setRegisteredIds] = useState([]);

  const handleRegister = (cls) => {
    if (registeredIds.includes(cls.id)) {
      toast.error(`You are already registered for ${cls.title}`);
      return;
    }
    setRegisteredIds((prev) => [...prev, cls.id]);
    toast.success(`Seat reserved for "${cls.title}"! Reminder link sent to your email.`, { id: `reg-${cls.id}` });
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
                LIVE MASTERCLASSES & EXPERT SESSIONS
              </span>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 900, margin: "2px 0 0" }}>
                Knarrow Live Learning Hub
              </h1>
            </div>
          </div>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "780px" }}>
            Join interactive live masterclasses hosted by top exam mentors, former IELTS examiners, and 99th percentile strategists. Participate in real-time Q&A, strategy teardowns, and live mock test breakdowns.
          </p>
        </div>

        {/* UPCOMING CLASSES LIST */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
              Upcoming Live Masterclasses
            </h2>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "6px 14px", borderRadius: "20px" }}>
              Live Schedule Sync
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {UPCOMING_CLASSES.map((cls) => {
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
                      <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                        Instructor: <strong style={{ color: "var(--text)" }}>{cls.instructor}</strong> — {cls.role}
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
                      {isReg ? "Reserved & Registered" : "Reserve Free Seat"}
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "20px", fontSize: "0.85rem", color: "var(--text-secondary)", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Calendar size={16} color="#10b981" /> {cls.date}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={16} color="#10b981" /> {cls.duration}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Users size={16} color="#10b981" /> Only {cls.seatsLeft} seats remaining
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {cls.tags.map((tag, i) => (
                      <span key={i} style={{ fontSize: "0.75rem", fontWeight: 700, background: "rgba(255,255,255,0.06)", padding: "4px 10px", borderRadius: "6px" }}>
                        #{tag}
                      </span>
                    ))}
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