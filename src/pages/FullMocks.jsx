import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock, BookOpen, Headphones, PenLine, Mic, ArrowRight, Sparkles, GraduationCap, Users, Crown, Lock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { isFullMockLocked } from "../services/freePlanLimits";

// ─── Shared section metadata ──────────────────────────────────────────────────
const SECTIONS = [
  { icon: BookOpen,    label: "Reading",   duration: "60 min",    color: "#06b6d4" },
  { icon: Headphones,  label: "Listening", duration: "40 min",    color: "#8b5cf6" },
  { icon: PenLine,     label: "Writing",   duration: "60 min",    color: "#f59e0b" },
  { icon: Mic,         label: "Speaking",  duration: "11–14 min", color: "#22c55e" },
];

// ─── The two exam types ───────────────────────────────────────────────────────
const MOCKS = [
  {
    key: "academic",
    icon: GraduationCap,
    label: "Academic",
    badge: "IELTS Academic",
    duration: "2h 55m",
    path: "/mock/academic",
    tagline: "University admission & professional registration",
    description:
      "Designed for students applying to undergraduate or postgraduate programmes and those seeking professional registration. Tests advanced reading passages, graph/diagram writing tasks, and formal spoken interaction.",
    accentFrom: "#4f46e5",
    accentTo: "#2563eb",
    glowColor: "rgba(79,70,229,.28)",
  },
  {
    key: "general",
    icon: Users,
    label: "General Training",
    badge: "IELTS General",
    duration: "2h 55m",
    path: "/mock/general",
    tagline: "Work experience, migration & secondary education",
    description:
      "Suited for people migrating to English-speaking countries or applying for secondary education and work experience programmes. Features everyday reading texts, letter-writing tasks, and practical conversation topics.",
    accentFrom: "#0891b2",
    accentTo: "#06b6d4",
    glowColor: "rgba(6,182,212,.25)",
  },
];

// ─── Floating particle (decorative) ──────────────────────────────────────────
function Orb({ style }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%",
      filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      ...style,
    }} />
  );
}

export default function FullMocks() {
  const navigate = useNavigate();
  const { premium } = useAuth();

  function handleStart(mock) {
    if (isFullMockLocked(mock.key, premium)) {
      navigate("/pricing");
      return;
    }
    navigate(mock.path);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      fontFamily: "Inter, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient orbs */}
      <Orb style={{ width: 600, height: 600, top: -200, left: -200, background: "rgba(79,70,229,.09)" }} />
      <Orb style={{ width: 500, height: 500, bottom: -150, right: -150, background: "rgba(6,182,212,.08)" }} />

      {/* Grid texture */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
        backgroundSize: "44px 44px", opacity: .5, pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 24px 96px", position: "relative", zIndex: 1 }}>

        {/* ── Hero header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "7px 18px", borderRadius: "999px", marginBottom: "24px",
            background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)",
            fontSize: ".78rem", fontWeight: 700, color: "var(--text)", letterSpacing: "1.2px",
          }}>
            <Sparkles size={12} color="#fbbf24" />
            FULL SIMULATION
          </div>

          <h1 style={{
            fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900,
            letterSpacing: "-1.5px", lineHeight: 1.1, margin: "0 0 18px",
            background: "linear-gradient(135deg,#e2e8f0 0%,#94a3b8 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Choose Your<br />
            <span style={{
              background: "linear-gradient(135deg,#4f46e5,#2563eb,#06b6d4)",
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>IELTS Mock Test</span>
          </h1>

          <p style={{
            color: "var(--text-secondary)", fontSize: "1.05rem",
            maxWidth: "500px", margin: "0 auto", lineHeight: 1.75,
          }}>
            Full 2h 45m simulations covering all four sections — exactly as you'll face on exam day.
          </p>
        </motion.div>

        {/* ── Two mock cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
          gap: "28px",
          marginBottom: "72px",
        }}>
          {MOCKS.map((mock, idx) => {
            const Icon = mock.icon;
            const locked = isFullMockLocked(mock.key, premium);
            return (
              <motion.div
                key={mock.key}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{
                  y: -6,
                  boxShadow: locked
                    ? "0 24px 60px rgba(245,158,11,.2)"
                    : `0 24px 60px ${mock.glowColor}`,
                  transition: { duration: 0.25 },
                }}
                style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "28px",
                  background: locked ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.05)",
                  border: locked
                    ? "1px solid rgba(245,158,11,.25)"
                    : "1px solid rgba(255,255,255,.10)",
                  backdropFilter: "blur(24px)",
                  padding: "40px",
                  cursor: "pointer",
                  boxShadow: `0 8px 32px rgba(0,0,0,.12)`,
                  opacity: locked ? 0.85 : 1,
                }}
                onClick={() => handleStart(mock)}
              >
                {/* Gradient top-edge glow */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: locked
                    ? "linear-gradient(90deg, transparent, #f59e0b, #d97706, transparent)"
                    : `linear-gradient(90deg, transparent, ${mock.accentFrom}, ${mock.accentTo}, transparent)`,
                }} />

                {/* Background radial */}
                <div style={{
                  position: "absolute", top: -60, right: -60,
                  width: 280, height: 280, borderRadius: "50%",
                  background: locked
                    ? "radial-gradient(circle, rgba(245,158,11,.1), transparent 70%)"
                    : `radial-gradient(circle, ${mock.accentFrom}18, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Badge + icon row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    padding: "6px 14px", borderRadius: "999px",
                    background: locked ? "rgba(245,158,11,.15)" : `${mock.accentFrom}20`,
                    border: locked ? "1px solid rgba(245,158,11,.35)" : `1px solid ${mock.accentFrom}40`,
                    fontSize: ".75rem", fontWeight: 800, letterSpacing: ".8px",
                    color: locked ? "#f59e0b" : mock.accentFrom,
                  }}>
                    {locked ? "PREMIUM — Already Used" : mock.badge}
                  </div>
                  <div style={{
                    width: 52, height: 52, borderRadius: "16px", flexShrink: 0,
                    background: locked
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : `linear-gradient(135deg, ${mock.accentFrom}, ${mock.accentTo})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: locked ? "0 12px 28px rgba(245,158,11,.3)" : `0 12px 28px ${mock.glowColor}`,
                  }}>
                    {locked ? <Crown size={24} color="#fff" /> : <Icon size={24} color="#fff" />}
                  </div>
                </div>

                {/* Title + tagline */}
                <h2 style={{
                  fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-.6px",
                  color: "var(--text)", margin: "0 0 8px",
                }}>
                  {mock.label}
                </h2>
                <p style={{
                  fontSize: ".83rem", fontWeight: 700, letterSpacing: ".3px",
                  color: locked ? "#f59e0b" : mock.accentFrom, margin: "0 0 16px",
                }}>
                  {locked ? "You've used your free attempt — upgrade to take unlimited mocks" : mock.tagline}
                </p>
                <p style={{
                  color: "var(--text-secondary)", fontSize: ".9rem",
                  lineHeight: 1.7, margin: "0 0 32px",
                }}>
                  {mock.description}
                </p>

                {/* Section pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                  {SECTIONS.map((s) => {
                    const SIcon = s.icon;
                    return (
                      <div key={s.label} style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "6px 12px", borderRadius: "10px",
                        background: `${s.color}12`, border: `1px solid ${s.color}25`,
                      }}>
                        <SIcon size={13} color={s.color} />
                        <span style={{ fontSize: ".75rem", fontWeight: 700, color: s.color }}>{s.label}</span>
                        <span style={{ fontSize: ".7rem", color: "rgba(148,163,184,.7)", marginLeft: "2px" }}>{s.duration}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Duration + CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <Clock size={15} color="var(--text-secondary)" />
                    <span style={{ fontSize: ".85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                      {mock.duration} total
                    </span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={(e) => { e.stopPropagation(); handleStart(mock); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "12px 24px", borderRadius: "14px", border: "none",
                      background: locked
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : `linear-gradient(135deg, ${mock.accentFrom}, ${mock.accentTo})`,
                      color: "#fff", fontWeight: 700, fontSize: ".9rem",
                      cursor: "pointer",
                      boxShadow: locked
                        ? "0 8px 24px rgba(245,158,11,.3)"
                        : `0 8px 24px ${mock.glowColor}`,
                    }}
                  >
                    {locked ? <><Crown size={15} /> Upgrade to Unlock</> : <>Start Test <ArrowRight size={16} /></>}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── What's included strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            borderRadius: "24px",
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.09)",
            backdropFilter: "blur(20px)",
            padding: "36px 40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
            <Sparkles size={16} color="#fbbf24" />
            <span style={{ fontSize: ".8rem", fontWeight: 800, letterSpacing: "1px", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              What's included in every full mock
            </span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}>
            {SECTIONS.map((s) => {
              const SIcon = s.icon;
              return (
                <div key={s.label} style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "18px 20px", borderRadius: "16px",
                  background: `${s.color}0a`, border: `1px solid ${s.color}20`,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "12px", flexShrink: 0,
                    background: `${s.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <SIcon size={18} color={s.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".9rem" }}>{s.label}</div>
                    <div style={{ fontSize: ".75rem", color: "var(--text-secondary)", marginTop: "2px" }}>{s.duration}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
