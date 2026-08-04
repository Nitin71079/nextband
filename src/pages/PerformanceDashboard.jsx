import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchResults } from "../services/firebaseResults";
import { useAuth } from "../context/AuthContext";
import {
  TrendingUp,
  Award,
  Target,
  Flame,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
  ArrowUpRight,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Sparkles,
  Zap,
  ChevronRight,
  RotateCcw
} from "lucide-react";

import "../styles/dashboard/dashboard.css";

export default function PerformanceDashboard() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchResults();
      setResults(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  // Compute analytics
  const latest = results[results.length - 1] || {};
  const reading = Number(latest.reading || 7.5);
  const listening = Number(latest.listening || 8.0);
  const writing = Number(latest.writing || 6.5);
  const speaking = Number(latest.speaking || 7.0);

  const overallBand = Number(((reading + listening + writing + speaking) / 4).toFixed(1));
  const targetBand = 8.0;
  const remainingBand = Math.max(0, Number((targetBand - overallBand).toFixed(1)));

  const skills = [
    { title: "Reading", band: reading, icon: BookOpen, color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
    { title: "Listening", band: listening, icon: Headphones, color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd" },
    { title: "Writing", band: writing, icon: PenTool, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
    { title: "Speaking", band: speaking, icon: Mic, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  ];

  const sortedSkills = [...skills].sort((a, b) => b.band - a.band);
  const strongestSkill = sortedSkills[0];
  const weakestSkill = sortedSkills[sortedSkills.length - 1];

  if (loading) {
    return (
      <div className="dashboard-page" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Sparkles size={36} className="animate-spin" style={{ color: "#2563eb", margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)" }}>Loading Performance Analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page" style={{ paddingBottom: 60 }}>
      
      {/* ── HERO HEADER ── */}
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
            <span>Knarrow Performance Intelligence & Analytics</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "var(--text, #0f172a)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 14,
          }}>
            Performance & Band Score Matrix
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", maxWidth: 680, lineHeight: 1.6, margin: 0 }}>
            Real-time analytics across all 4 IELTS modules. Track overall estimated band score, module breakdowns, strengths, and AI score recommendations.
          </p>
        </div>
      </section>

      {/* ── MAIN OVERVIEW GRID ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
      }}>
        
        {/* OVERALL BAND DIAL CARD */}
        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted, #64748b)", marginBottom: 16 }}>
            Overall Estimated Band Score
          </div>

          {/* SVG Band Dial Graphic */}
          <div style={{ position: "relative", width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="90" cy="90" r="75" stroke="#e2e8f0" strokeWidth="14" fill="none" />
              <circle
                cx="90"
                cy="90"
                r="75"
                stroke="url(#bandGradient)"
                strokeWidth="14"
                fill="none"
                strokeDasharray={471}
                strokeDashoffset={471 - (471 * (overallBand / 9))}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
              <defs>
                <linearGradient id="bandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            <div style={{ position: "absolute", textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "var(--text, #0f172a)", lineHeight: 1 }}>
                {overallBand}
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", marginTop: 4 }}>
                Band {overallBand} / 9.0
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24, width: "100%" }}>
            <div style={{ flex: 1, padding: 12, borderRadius: 16, background: "var(--surface-2, #f8fafc)", border: "1px solid var(--border, #e2e8f0)" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>Target Band</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "var(--text, #0f172a)" }}>{targetBand}</div>
            </div>
            <div style={{ flex: 1, padding: 12, borderRadius: 16, background: "var(--surface-2, #f8fafc)", border: "1px solid var(--border, #e2e8f0)" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>Gap to Goal</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: remainingBand === 0 ? "#16a34a" : "#2563eb" }}>
                {remainingBand === 0 ? "Goal Met! 🎉" : `-${remainingBand} Band`}
              </div>
            </div>
          </div>
        </div>

        {/* AI DIAGNOSTICS CARD */}
        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 20,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <BrainCircuit size={22} style={{ color: "#2563eb" }} />
              <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                AI Diagnostic Insights
              </h3>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted, #64748b)", lineHeight: 1.5, margin: 0 }}>
              Based on your latest test results, here is your personalized performance breakdown:
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              borderRadius: 18,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <CheckCircle2 size={22} style={{ color: "#059669", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#047857" }}>Strongest Skill</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: "#065f46" }}>
                  {strongestSkill.title} (Band {strongestSkill.band})
                </div>
              </div>
            </div>

            <div style={{
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: 18,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <Zap size={22} style={{ color: "#d97706", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#b45309" }}>Focus Improvement Area</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: "#92400e" }}>
                  {weakestSkill.title} (Band {weakestSkill.band}) — Target +0.5 Gain
                </div>
              </div>
            </div>
          </div>

          <Link
            to={`/mock/${weakestSkill.title.toLowerCase()}`}
            style={{
              padding: "12px 20px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white",
              fontWeight: 800,
              fontSize: 13,
              textAlign: "center",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(37,99,235,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            Practice {weakestSkill.title} Mock Test <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>

      {/* ── 4 MODULES BREAKDOWN GRID ── */}
      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", marginBottom: 16 }}>
          Module Performance Breakdown
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}>
          {skills.map((s) => {
            const IconComp = s.icon;
            const progressPercent = Math.min(100, Math.round((s.band / 9) * 100));

            return (
              <div
                key={s.title}
                style={{
                  background: "var(--surface, #ffffff)",
                  border: "1px solid var(--border, #e2e8f0)",
                  borderRadius: 24,
                  padding: 24,
                  boxShadow: "0 10px 30px rgba(15,23,42,.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, background: s.bg, border: `1px solid ${s.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: s.color,
                  }}>
                    <IconComp size={22} />
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999,
                    background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                  }}>
                    Band {s.band}
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "var(--text, #0f172a)" }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted, #64748b)", marginTop: 2 }}>
                    {progressPercent}% Mastery Level
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ width: "100%", height: 8, background: "var(--surface-2, #f8fafc)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ width: `${progressPercent}%`, height: "100%", background: s.color, borderRadius: 999 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TEST RESULTS HISTORY TABLE ── */}
      <section style={{ marginTop: 36 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
            Recent Test History
          </h2>
          <Link to="/results-history" style={{ fontSize: 13, fontWeight: 800, color: "#2563eb", textDecoration: "none" }}>
            View All History →
          </Link>
        </div>

        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
        }}>
          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 14, color: "var(--text-muted, #64748b)" }}>No test results recorded yet.</div>
              <Link to="/full-mocks" style={{
                display: "inline-block", marginTop: 12, padding: "10px 20px", borderRadius: 14,
                background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "white", fontWeight: 800, fontSize: 13, textDecoration: "none"
              }}>
                Take Full Mock Test
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {results.slice(-5).reverse().map((res, i) => (
                <div key={res.id || i} style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center", justifyBetween: "space-between",
                  padding: 16, borderRadius: 16, background: "var(--surface-2, #f8fafc)", border: "1px solid var(--border, #e2e8f0)", gap: 12
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(37,99,235,.1)", color: "#2563eb", display: "flex", alignItems: "center", justifyCenter: "center", fontWeight: 900 }}>
                      #{results.length - i}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)" }}>
                        {res.testType || "Official Practice Mock"}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted, #64748b)" }}>
                        Completed: {res.createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted, #64748b)" }}>
                      R: {res.reading || 7.5} | L: {res.listening || 8.0} | W: {res.writing || 6.5} | S: {res.speaking || 7.0}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#2563eb", background: "rgba(37,99,235,.08)", padding: "6px 14px", borderRadius: 12, border: "1px solid rgba(37,99,235,.2)" }}>
                      Band {res.overallBand || res.band || overallBand}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}