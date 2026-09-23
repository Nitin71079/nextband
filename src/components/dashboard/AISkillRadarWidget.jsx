import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Sparkles, Target, Zap, Award, ArrowUpRight, TrendingUp } from "lucide-react";

export default function AISkillRadarWidget({ track = "DET", userScore = 125, targetScore = 140 }) {
  // Sample radar data tailored to current active track
  const data = [
    { subject: "Vocabulary", score: 85, target: 95 },
    { subject: "Grammar", score: 78, target: 90 },
    { subject: "Speed", score: 92, target: 95 },
    { subject: "Coherence", score: 70, target: 88 },
    { subject: "Accuracy", score: 82, target: 92 },
    { subject: "Adaptability", score: 88, target: 96 },
  ];

  const readinessPercent = Math.min(100, Math.round((userScore / targetScore) * 100));

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.8))", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 28, padding: 28, boxShadow: "0 12px 40px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
      
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={13} /> GROQ AI SKILL RADAR
          </span>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: "10px 0 4px 0" }}>
            {track} Target Exam Proficiency
          </h3>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
            Real-time sub-skill strength analysis vs. top 1% candidates
          </p>
        </div>

        {/* Circular Target Score Meter */}
        <div style={{ background: "rgba(15,23,42,0.8)", border: "2px solid #0284c7", borderRadius: 20, padding: "12px 20px", textAlign: "center", boxShadow: "0 4px 20px rgba(2,132,199,0.25)" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#cbd5e1", textTransform: "uppercase", letterSpacing: 0.5 }}>Exam Readiness</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#38bdf8", margin: "2px 0" }}>{readinessPercent}%</div>
          <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <TrendingUp size={12} /> {userScore} / {targetScore} Target
          </div>
        </div>
      </div>

      {/* Recharts Radar Chart */}
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.15)" />
            <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 700 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.1)" />
            <Radar name="Current Proficiency" dataKey="score" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.45} />
            <Radar name="Target Band" dataKey="target" stroke="#c084fc" fill="#a855f7" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight Pill */}
      <div style={{ marginTop: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 13, color: "#cbd5e1", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Zap size={16} color="#facc15" />
          <span><strong>AI Insight:</strong> Coherence is your highest growth opportunity for +10 points boost.</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>
          Drill Weak Spots <ArrowUpRight size={14} />
        </span>
      </div>

    </div>
  );
}
