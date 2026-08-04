import { getEvaluations } from "../services/evaluationStorage";
import { Link } from "react-router-dom";
import {
  FileText,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  PenTool,
  Mic,
  ArrowUpRight
} from "lucide-react";

import "../styles/dashboard/dashboard.css";

export default function EvaluationHistory() {
  const evaluations = getEvaluations() || [];

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
            <FileText size={14} />
            <span>AI Writing & Speaking Evaluation Archive</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 12 }}>
            Evaluation History & Feedback Log
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 680 }}>
            Detailed line-by-line feedback, band score breakdowns, grammar corrections, and vocabulary recommendations for your past submissions.
          </p>
        </div>
      </section>

      {/* FEED */}
      <main style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {evaluations.length === 0 ? (
          <div style={{
            background: "var(--surface, #ffffff)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: 28,
            padding: 40,
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          }}>
            <FileText size={48} style={{ color: "#94a3b8", marginBottom: 12 }} />
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
              No Evaluations Found
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted, #64748b)", marginTop: 6, marginBottom: 20 }}>
              Submit an essay or speaking recording to receive instant AI evaluation.
            </p>
            <Link to="/mock/writing" style={{
              padding: "12px 24px", borderRadius: 16, background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 10px 25px rgba(37,99,235,.2)"
            }}>
              Evaluate Writing Essay
            </Link>
          </div>
        ) : (
          evaluations.map((item, index) => (
            <div
              key={index}
              style={{
                background: "var(--surface, #ffffff)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 10px 30px rgba(15,23,42,.04)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                    {item.type || "Writing Task 2 Essay Evaluation"}
                  </h3>
                  <span style={{
                    fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999,
                    background: "rgba(37,99,235,.08)", color: "#2563eb", border: "1px solid rgba(37,99,235,.2)"
                  }}>
                    AI Assessed
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted, #64748b)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar size={14} /> {new Date(item.createdAt || Date.now()).toLocaleString()}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>Overall Band</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#2563eb" }}>
                    Band {item.overallBand || 7.5}
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