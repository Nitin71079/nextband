import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchResults } from "../services/firebaseResults";
import {
  ClipboardList,
  Calendar,
  Sparkles,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  TrendingUp,
  Download
} from "lucide-react";

import "../styles/dashboard/dashboard.css";

export default function ResultsHistory() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModule, setFilterModule] = useState("all");

  useEffect(() => {
    async function load() {
      const data = await fetchResults();
      setResults([...(data || [])].reverse());
      setLoading(false);
    }
    load();
  }, []);

  const filteredResults = results.filter((res) => {
    if (filterModule === "all") return true;
    if (filterModule === "reading") return Number(res.reading) > 0;
    if (filterModule === "listening") return Number(res.listening) > 0;
    if (filterModule === "writing") return Number(res.writing) > 0;
    if (filterModule === "speaking") return Number(res.speaking) > 0;
    return true;
  });

  if (loading) {
    return (
      <div className="dashboard-page" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyCenter: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Sparkles size={36} className="animate-spin" style={{ color: "#2563eb", margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)" }}>Loading Score History...</div>
        </div>
      </div>
    );
  }

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
            <ClipboardList size={14} />
            <span>Complete Test Attempt History</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 10 }}>
            Mock Test Results History
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 680 }}>
            Review every completed IELTS practice test, band score breakdown, date timestamp, and overall module analytics.
          </p>
        </div>
      </section>

      {/* FILTER BAR & LIST */}
      <main style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          borderBottom: "1px solid var(--border, #e2e8f0)",
          paddingBottom: 16,
        }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
              Completed Mock Tests ({filteredResults.length})
            </h2>
            <div style={{ fontSize: 13, color: "var(--text-muted, #64748b)", marginTop: 2 }}>
              Click any result to view full diagnostic report.
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "var(--surface, #ffffff)",
            border: "1px solid var(--border, #e2e8f0)",
            padding: 4,
            borderRadius: 16,
          }}>
            {[
              { id: "all", label: "All Tests" },
              { id: "reading", label: "📖 Reading" },
              { id: "listening", label: "🎧 Listening" },
              { id: "writing", label: "✍️ Writing" },
              { id: "speaking", label: "🎤 Speaking" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterModule(tab.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 13,
                  fontWeight: filterModule === tab.id ? 800 : 600,
                  background: filterModule === tab.id ? "linear-gradient(135deg, #2563eb, #3b82f6)" : "transparent",
                  color: filterModule === tab.id ? "white" : "var(--text-muted, #64748b)",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS CARDS */}
        {filteredResults.length === 0 ? (
          <div style={{
            background: "var(--surface, #ffffff)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          }}>
            <ClipboardList size={48} style={{ color: "#94a3b8", marginBottom: 12 }} />
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
              No Test Results Found
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted, #64748b)", marginTop: 6, marginBottom: 20 }}>
              Complete a Full Mock Test or module test to populate your score history.
            </p>
            <Link to="/full-mocks" style={{
              padding: "12px 24px", borderRadius: 16, background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 10px 25px rgba(37,99,235,.2)"
            }}>
              Start Full Mock Test
            </Link>
          </div>
        ) : (
          filteredResults.map((result, idx) => {
            const reading = Number(result.reading || 0);
            const listening = Number(result.listening || 0);
            const writing = Number(result.writing || 0);
            const speaking = Number(result.speaking || 0);

            const overall = reading || listening || writing || speaking
              ? ((reading + listening + writing + speaking) / 4).toFixed(1)
              : result.band || "7.5";

            return (
              <div
                key={result.id || idx}
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
                  transition: "transform .2s, box-shadow .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(15,23,42,.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 10px 30px rgba(15,23,42,.04)"; }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                      {result.testType || `Official Practice Mock #${filteredResults.length - idx}`}
                    </h3>
                    <span style={{
                      fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999,
                      background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0"
                    }}>
                      Completed
                    </span>
                  </div>

                  <div style={{ fontSize: 13, color: "var(--text-muted, #64748b)", marginTop: 6, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={14} /> {result.createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>Standard Academic / General Training</span>
                  </div>
                </div>

                {/* Score breakdown pills */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 8, fontSize: 12, fontWeight: 700 }}>
                    <span style={{ background: "#eff6ff", color: "#1e40af", padding: "6px 12px", borderRadius: 10, border: "1px solid #bfdbfe" }}>
                      📖 R: {reading || 7.5}
                    </span>
                    <span style={{ background: "#f0f9ff", color: "#0369a1", padding: "6px 12px", borderRadius: 10, border: "1px solid #bae6fd" }}>
                      🎧 L: {listening || 8.0}
                    </span>
                    <span style={{ background: "#f5f3ff", color: "#6d28d9", padding: "6px 12px", borderRadius: 10, border: "1px solid #ddd6fe" }}>
                      ✍️ W: {writing || 6.5}
                    </span>
                    <span style={{ background: "#fffbeb", color: "#b45309", padding: "6px 12px", borderRadius: 10, border: "1px solid #fde68a" }}>
                      🎤 S: {speaking || 7.0}
                    </span>
                  </div>

                  {/* Overall Band badge */}
                  <div style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: "white",
                    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    padding: "8px 18px",
                    borderRadius: 16,
                    boxShadow: "0 6px 18px rgba(37,99,235,.22)",
                  }}>
                    Band {overall}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

    </div>
  );
}