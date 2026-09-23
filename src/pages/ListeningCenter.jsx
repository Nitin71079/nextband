import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Headphones, Sparkles, Zap, Award, Clock, Play } from "lucide-react";
import listeningTests from "../data/listening/tests";

export default function ListeningCenter() {
  const navigate = useNavigate();

  const handleStartRandomTest = () => {
    if (!listeningTests || listeningTests.length === 0) return;
    const randomIndex = Math.floor(Math.random() * listeningTests.length);
    const selectedTest = listeningTests[randomIndex];
    navigate(`/mock/listening/${selectedTest.id}`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "Inter, sans-serif",
      padding: "40px 24px 80px",
      transition: "background 0.3s, color 0.3s"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* HERO BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glossy-card"
          style={{
            padding: "40px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.08) 100%)",
            border: "1px solid rgba(6,182,212,0.25)",
            marginBottom: "36px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "linear-gradient(135deg, #06b6d4, #0891b2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 25px rgba(6,182,212,0.3)"
            }}>
              <Headphones size={28} color="#ffffff" />
            </div>
            <div>
              <span style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#06b6d4",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                OFFICIAL IELTS LISTENING MODULE
              </span>
              <h1 style={{ fontSize: "2.4rem", fontWeight: 900, margin: "2px 0 0", color: "var(--text)" }}>
                Listening Center
              </h1>
            </div>
          </div>

          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 28, maxWidth: "780px" }}>
            Experience official IELTS Academic &amp; General Listening exam conditions. Each session presents full-length audio tracks (Social Dialogue, Monologue, Academic Discussion, and University Lecture) with 40 questions and authentic timing.
          </p>

          {/* PRECIOUS & RANDOMIZED NOTICE CARD */}
          <div style={{
            background: "rgba(6,182,212,0.08)",
            border: "1px solid rgba(6,182,212,0.3)",
            borderRadius: "16px",
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "32px",
            boxShadow: "0 4px 16px rgba(6,182,212,0.08)"
          }}>
            <Sparkles size={22} color="#06b6d4" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", lineHeight: 1.5 }}>
              <strong style={{ color: "#06b6d4" }}>Notice:</strong> Listening content is precious and randomized to simulate authentic exam conditions.
            </div>
          </div>

          {/* MAIN START RANDOM TEST BUTTON */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <button
              onClick={handleStartRandomTest}
              className="glossy-btn"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                padding: "18px 36px",
                borderRadius: "18px",
                border: "none",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1.05rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 12px 30px rgba(6,182,212,0.35)",
                transition: "transform 0.2s"
              }}
            >
              <Play size={20} fill="#ffffff" /> Start Listening Practice
            </button>
          </div>
        </motion.div>

        {/* EXAM STRUCTURE & GUIDELINES */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <div className="glossy-card" style={{ padding: 24, borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Clock size={20} color="#06b6d4" />
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>40 Minutes Duration</h3>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              30 minutes of listening audio playback followed by 10 minutes of dedicated answer review and transfer time.
            </p>
          </div>

          <div className="glossy-card" style={{ padding: 24, borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Zap size={20} color="#06b6d4" />
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>4 Exam Sections</h3>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Section 1 (Social Dialogue), Section 2 (Talk/Presentation), Section 3 (Academic Discussion), Section 4 (University Lecture).
            </p>
          </div>

          <div className="glossy-card" style={{ padding: 24, borderRadius: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Award size={20} color="#06b6d4" />
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Instant Band Scoring</h3>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Get immediate Band 0–9.0 conversion, answer keys, explanations, and skill breakdown upon submission.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}