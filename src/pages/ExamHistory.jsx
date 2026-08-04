import { useNavigate, Link } from "react-router-dom";
import { getExamHistory } from "../services/examSession";
import {
  Award,
  Calendar,
  Sparkles,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3
} from "lucide-react";

import "../styles/dashboard/dashboard.css";

export default function ExamHistory() {
  const navigate = useNavigate();
  const history = getExamHistory().reverse();

  return (
    <div className="dashboard-page" style={{ paddingBottom: 60 }}>
      
      {/* HERO */}
      <section className="dashboard-hero">
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            color: "#2563eb",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 16,
          }}>
            <BarChart3 size={14} />
            <span>Official CBT Mock Test Archive</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 12 }}>
            Official Exam History & Scorecards
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
            Track every official Computer Based Test (CBT) attempt. Review detailed module scores, completion timestamps, and band performance breakdown.
          </p>
        </div>
      </section>

      {/* EXAM LIST */}
      <main style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {history.length === 0 ? (
          <div style={{
            background: "var(--surface, #ffffff)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: 28,
            padding: 48,
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          }}>
            <Award size={48} style={{ color: "#94a3b8", marginBottom: 14 }} />
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
              No Exam Sessions Recorded Yet
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted, #64748b)", marginTop: 6, marginBottom: 24 }}>
              Take your first official computer-based IELTS mock exam to generate your score report.
            </p>
            <button
              onClick={() => navigate("/cbt-exam")}
              style={{
                padding: "14px 28px",
                borderRadius: 18,
                background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                color: "white",
                border: "none",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(37,99,235,.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Zap size={18} /> Take First Official CBT Mock
            </button>
          </div>
        ) : (
          history.map((exam, i) => (
            <div
              key={exam.id || i}
              style={{
                background: "var(--surface, #ffffff)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: 28,
                padding: 28,
                boxShadow: "0 10px 30px rgba(15,23,42,.04)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyBetween: "space-between", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 800, padding: "3px 10px", borderRadius: 999,
                      background: "rgba(37,99,235,.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,.2)"
                    }}>
                      Attempt #{history.length - i}
                    </span>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                      Official CBT IELTS Mock Test
                    </h2>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted, #64748b)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={14} /> Completed: {new Date(exam.completedAt || Date.now()).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>Overall Band</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: "#2563eb" }}>
                      Band {exam.overall || 7.5}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/exam-results")}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                      color: "white",
                      border: "none",
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    View Scorecard <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* 4 Module Scores Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 12,
                paddingTop: 16,
                borderTop: "1px solid var(--border, #e2e8f0)",
              }}>
                <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: 14, borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#1e40af", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                    📖 Reading
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#1e3a8a", marginTop: 4 }}>
                    Band {exam.reading || 7.5}
                  </div>
                </div>

                <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", padding: 14, borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#0369a1", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                    🎧 Listening
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0c4a6e", marginTop: 4 }}>
                    Band {exam.listening || 8.0}
                  </div>
                </div>

                <div style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", padding: 14, borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#6d28d9", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                    ✍️ Writing
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#4c1d95", marginTop: 4 }}>
                    Band {exam.writing || 6.5}
                  </div>
                </div>

                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: 14, borderRadius: 16 }}>
                  <div style={{ fontSize: 12, color: "#b45309", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                    🎤 Speaking
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#78350f", marginTop: 4 }}>
                    Band {exam.speaking || 7.0}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

    </div>
  );
}