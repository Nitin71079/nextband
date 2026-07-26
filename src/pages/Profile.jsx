import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Crown, BookOpen, Headphones, PenSquare, Mic,
  Target, Flame, TrendingUp, Award, Calendar,
  Mail, Shield, ChevronRight, Sparkles, Star,
  BarChart3, Clock,
} from "lucide-react";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { getExamHistory } from "../services/examSession";
import "../styles/profile.css";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const glass = {
  background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.10)",
  backdropFilter: "blur(22px)",
  borderRadius: "22px",
};

const lightCard = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "22px",
  boxShadow: "0 4px 20px rgba(15,23,42,.06)",
};

function StatCard({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      style={{ ...lightCard, padding: "24px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", background: color }} />
      <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: "2rem", fontWeight: 900, color: "#0f172a", letterSpacing: "-1px", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: ".82rem", color: "#64748b", fontWeight: 600, marginTop: "6px" }}>{label}</div>
    </motion.div>
  );
}

export default function Profile() {
  const { user, name, premium, premiumPlan, premiumExpires } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;
    const db = getFirestore(app);
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) setProfile(snap.data());
    });
  }, [user]);

  const history = getExamHistory();
  const testsCompleted = history.length;
  const averageBand = history.length
    ? (history.reduce((s, e) => s + Number(e.overall || 0), 0) / history.length).toFixed(1)
    : "—";
  const bestBand = history.length
    ? Math.max(...history.map((h) => Number(h.overall || 0)))
    : "—";

  const displayName = name || user?.displayName || user?.email?.split("@")[0] || "Student";
  const initials = displayName.slice(0, 2).toUpperCase();
  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  const planLabel = premium
    ? premiumPlan || "Premium"
    : "Free Plan";
  const planColor = premium ? "#f59e0b" : "#64748b";
  const planBg = premium ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : "linear-gradient(135deg,#94a3b8,#64748b)";

  // Skill scores from last exam
  const lastExam = history[0] || null;

  const skills = [
    { label: "Reading",   value: lastExam?.reading   || "—", icon: BookOpen,   color: "#2563eb" },
    { label: "Listening", value: lastExam?.listening || "—", icon: Headphones, color: "#8b5cf6" },
    { label: "Writing",   value: lastExam?.writing   || "—", icon: PenSquare,  color: "#f97316" },
    { label: "Speaking",  value: lastExam?.speaking  || "—", icon: Mic,        color: "#22c55e" },
  ];

  const stats = [
    { icon: BookOpen,   label: "Tests Completed",  value: testsCompleted,              color: "#2563eb" },
    { icon: TrendingUp, label: "Average Band",      value: averageBand,                 color: "#06b6d4" },
    { icon: Award,      label: "Best Band",         value: bestBand,                    color: "#22c55e" },
    { icon: Flame,      label: "Study Streak",      value: `${profile?.streak || 0}d`, color: "#f97316" },
    { icon: Target,     label: "Target Band",       value: profile?.goalBand || "—",   color: "#8b5cf6" },
    { icon: Calendar,   label: "Member Since",      value: memberSince,                 color: "#ec4899" },
  ];

  return (
    <div className="profile-page">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="profile-hero">
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(255,255,255,.06)", right: "-160px", top: "-160px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,.04)", left: "-80px", bottom: "-80px", pointerEvents: "none" }} />
        <div className="profile-hero-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.18)", fontSize: "12px", fontWeight: 700, color: "white", letterSpacing: "1px", marginBottom: "16px" }}>
              <Sparkles size={13} />
              MY PROFILE
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, color: "white", margin: 0, letterSpacing: "-1px" }}>
              {displayName}
            </h1>
            <p style={{ color: "rgba(255,255,255,.75)", fontSize: ".97rem", marginTop: "8px" }}>{user?.email}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Main content (overlaps banner) ──────────────────────────────── */}
      <div className="profile-content">
        <div className="profile-grid">

          {/* ── LEFT: Avatar Card ──────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div style={{ ...lightCard, padding: "36px 28px", textAlign: "center" }}>
              {/* Avatar with gradient ring */}
              <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
                <div style={{
                  width: "110px", height: "110px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#4f46e5,#2563eb,#06b6d4)",
                  padding: "4px",
                  margin: "0 auto",
                  boxShadow: "0 20px 50px rgba(79,70,229,.35)",
                }}>
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "3px solid white" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg,#4f46e5,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem", fontWeight: 800, border: "3px solid white" }}>
                      {initials}
                    </div>
                  )}
                </div>
                {premium && (
                  <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#fbbf24,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white", boxShadow: "0 4px 12px rgba(245,158,11,.4)" }}>
                    <Crown size={13} color="white" />
                  </div>
                )}
              </div>

              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
                {displayName}
              </h2>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 14px", borderRadius: "999px", background: planBg, color: "white", fontSize: "12px", fontWeight: 700, marginTop: "6px", boxShadow: premium ? "0 6px 18px rgba(245,158,11,.3)" : "none" }}>
                {premium ? <Crown size={12} /> : <Shield size={12} />}
                {planLabel}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", marginTop: "16px", color: "#64748b", fontSize: ".83rem" }}>
                <Mail size={14} />
                {user?.email}
              </div>

              <div style={{ height: "1px", background: "#e2e8f0", margin: "20px 0" }} />

              {premium && premiumExpires && (
                <div style={{ background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.2)", borderRadius: "12px", padding: "12px", fontSize: ".8rem", color: "#92400e", marginBottom: "16px" }}>
                  <strong>Premium active</strong><br />
                  Expires {new Date(premiumExpires?.toDate?.() || premiumExpires).toLocaleDateString()}
                </div>
              )}

              {!premium && (
                <Link to="/pricing" style={{ textDecoration: "none" }}>
                  <button style={{ width: "100%", padding: "12px", border: "none", borderRadius: "14px", background: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 8px 24px rgba(245,158,11,.3)" }}>
                    <Crown size={15} /> Upgrade to Premium
                  </button>
                </Link>
              )}

              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "View Analytics", icon: BarChart3, to: "/analytics" },
                  { label: "Study Planner",  icon: Calendar,  to: "/planner" },
                  { label: "Settings",       icon: Shield,    to: "/settings" },
                ].map(({ label, icon: I, to }) => (
                  <Link key={label} to={to} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", color: "#334155", fontSize: ".85rem", fontWeight: 600, cursor: "pointer", transition: "all .2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><I size={15} color="#2563eb" />{label}</div>
                      <ChevronRight size={15} color="#94a3b8" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT ──────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Stats grid */}
            <div>
              <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>Performance Overview</div>
              <div className="profile-stats-grid">
                {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.05} />)}
              </div>
            </div>

            {/* Skill breakdown from last exam */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.35 }}>
              <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>Latest Exam Skills</div>
              <div style={{ ...lightCard, padding: "24px" }}>
                {lastExam ? (
                  <div className="profile-skills-grid">
                    {skills.map(({ label, value, icon: I, color }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <I size={18} color={color} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: ".8rem", color: "#64748b", fontWeight: 600 }}>{label}</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{value}</div>
                          <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "999px", marginTop: "6px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${value !== "—" ? Number(value) / 9 * 100 : 0}%`, background: color, borderRadius: "999px", transition: "width 1s ease" }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "#64748b" }}>
                    <BarChart3 size={36} color="#cbd5e1" style={{ marginBottom: "12px" }} />
                    <p style={{ margin: 0, fontSize: ".9rem" }}>Complete a full mock exam to see your skill breakdown.</p>
                    <Link to="/mock/academic" style={{ textDecoration: "none" }}>
                      <button style={{ marginTop: "16px", padding: "10px 22px", border: "none", borderRadius: "12px", background: "linear-gradient(135deg,#2563eb,#4f46e5)", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
                        Take a Mock Exam
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Exam history */}
            {history.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.45 }}>
                <div style={{ fontSize: ".82rem", fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "14px" }}>Recent Exams</div>
                <div style={{ ...lightCard, padding: "0", overflow: "hidden" }}>
                  {history.slice(0, 5).map((exam, i) => (
                    <div key={i} className="profile-history-row" style={{ borderBottom: i < Math.min(history.length, 5) - 1 ? "1px solid #f1f5f9" : "none" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg,#eff6ff,#dbeafe)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Star size={18} color="#2563eb" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: ".88rem", color: "#0f172a" }}>Full Mock Exam</div>
                        <div style={{ fontSize: ".78rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                          <Clock size={11} />{exam.completedAt || "—"}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#2563eb" }}>{Number(exam.overall || 0).toFixed(1)}</div>
                        <div style={{ fontSize: ".72rem", color: "#94a3b8", fontWeight: 600 }}>Overall Band</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
