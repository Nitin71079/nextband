import React, { useState, useEffect } from "react";
import { Flame, Shield, Award, Sparkles, Trophy, Users, Zap } from "lucide-react";

export default function GamifiedStreakTicker({ streakDays = 7, xpPoints = 1450 }) {
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);

  // Live Activity Ticker Stream
  const activityFeed = [
    { name: "Sarah K.", country: "🇬🇧 UK", action: "completed GMAT CAT #14", result: "710 Score" },
    { name: "Rahul M.", country: "🇮🇳 India", action: "finished CAT QA Practice #8", result: "99.4 Percentile" },
    { name: "Elena R.", country: "🇪🇸 Spain", action: "passed DET Full Mock #5", result: "135 Band" },
    { name: "Chen W.", country: "🇸🇬 Singapore", action: "won Speaking Showdown 2v2", result: "8.5 Band" },
    { name: "Marcus B.", country: "🇺🇸 USA", action: "completed SAT Math Drill #12", result: "790 Score" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % activityFeed.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activityFeed.length]);

  const activeActivity = activityFeed[currentTickerIndex];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "12px 24px", backdropFilter: "blur(12px)" }}>
      
      {/* Left: Streak & XP Counter */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        
        {/* Flame Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.2))", border: "1px solid rgba(245,158,11,0.4)", padding: "6px 14px", borderRadius: 999 }}>
          <Flame size={18} color="#f59e0b" style={{ filter: "drop-shadow(0 0 6px #f59e0b)" }} />
          <span style={{ fontSize: 13, fontWeight: 900, color: "#ffffff" }}>
            {streakDays} Day Streak 🔥
          </span>
        </div>

        {/* XP Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Trophy size={16} color="#facc15" />
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, color: "#ffffff" }}>{xpPoints} XP</div>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>Level 6 Scholar</div>
          </div>
        </div>

        {/* Streak Shield */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 800 }}>
          <Shield size={13} /> 1 Streak Freeze Active
        </div>

      </div>

      {/* Right: Live Social Proof Activity Stream Ticker */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 16px", borderRadius: 999, fontSize: 12, color: "#cbd5e1" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
        <span>
          <strong>{activeActivity.name}</strong> ({activeActivity.country}) {activeActivity.action} — <strong style={{ color: "#38bdf8" }}>{activeActivity.result}</strong>
        </span>
      </div>

    </div>
  );
}
