import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Layers, BookOpen, BrainCircuit, Zap, Award, BarChart2 } from "lucide-react";
import { useExam } from "../context/ExamContext";

export default function ExamTrackHeaderSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTrack, selectTrack } = useExam();

  const tracks = [
    {
      id: "TOEFL",
      name: "TOEFL iBT 2026",
      badge: "0 - 120 Scale",
      path: "/dashboard",
      icon: BrainCircuit,
      color: "#8b5cf6",
      activeBg: "linear-gradient(135deg, #7c3aed, #4c1d95)",
    },
    {
      id: "GRE",
      name: "GRE General 2026",
      badge: "130 - 170 Scale",
      path: "/dashboard",
      icon: Zap,
      color: "#facc15",
      activeBg: "linear-gradient(135deg, #d97706, #78350f)",
    },
    {
      id: "PTE",
      name: "PTE Academic",
      badge: "10 - 90 Scale",
      path: "/dashboard",
      icon: Award,
      color: "#c084fc",
      activeBg: "linear-gradient(135deg, #9333ea, #581c87)",
    },
    {
      id: "DET",
      name: "Duolingo DET",
      badge: "10 - 160 Scale",
      path: "/dashboard",
      icon: Sparkles,
      color: "#10b981",
      activeBg: "linear-gradient(135deg, #059669, #064e3b)",
    },
    {
      id: "IELTS",
      name: "IELTS Academic",
      badge: "Band 0 - 9.0",
      path: "/dashboard",
      icon: BookOpen,
      color: "#3b82f6",
      activeBg: "linear-gradient(135deg, #2563eb, #1e3a8a)",
    },
    {
      id: "CAT",
      name: "CAT 2026",
      badge: "Percentile Scale",
      path: "/dashboard",
      icon: Layers,
      color: "#f472b6",
      activeBg: "linear-gradient(135deg, #db2777, #831843)",
    },
    {
      id: "ACT",
      name: "ACT 2026",
      badge: "1 - 36 Scale",
      path: "/dashboard",
      icon: Award,
      color: "#38bdf8",
      activeBg: "linear-gradient(135deg, #0284c7, #0369a1)",
    },
    {
      id: "SAT",
      name: "Digital SAT 2026",
      badge: "400 - 1600 Scale",
      path: "/dashboard",
      icon: Sparkles,
      color: "#a855f7",
      activeBg: "linear-gradient(135deg, #7c3aed, #4c1d95)",
    },
    {
      id: "GMAT",
      name: "GMAT Exam 2026",
      badge: "205 - 805 Scale",
      path: "/dashboard",
      icon: BarChart2,
      color: "#f59e0b",
      activeBg: "linear-gradient(135deg, #d97706, #78350f)",
    },
  ];

  const currentPath = location.pathname;

  return (
    <div
      style={{
        width: "100%",
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: "8px 12px",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        flexWrap: "wrap",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "8px" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c084fc" }}>
          <Layers size={20} />
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
            Switch Exam Hub
          </div>
          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
            Select your target test track
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        {tracks.map((t) => {
          const Icon = t.icon;
          const isActive = activeTrack === t.id;

          return (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                selectTrack(t.id, navigate);
              }}
              style={{
                background: isActive ? t.activeBg : "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
                border: isActive ? `1px solid ${t.color}` : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "14px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: isActive ? `0 4px 14px ${t.color}40` : "none",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={16} color={isActive ? "#ffffff" : t.color} />
              <span>{t.name}</span>
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 6px",
                  borderRadius: "6px",
                  background: isActive ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.08)",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  fontWeight: 700,
                }}
              >
                {t.badge}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
