import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck, Sparkles } from "lucide-react";
import useNotifications from "../hooks/useNotifications";
import { useAuth } from "../context/AuthContext";

// ─── Design tokens ────────────────────────────────────────────────────────────
const glass = {
  background: "rgba(255,255,255,.055)",
  border: "1px solid rgba(255,255,255,.10)",
  backdropFilter: "blur(20px)",
  borderRadius: "20px",
};

const CATEGORY_META = {
  streak:       { label: "Streak",       bg: "rgba(249,115,22,.15)",  text: "#fb923c" },
  milestone:    { label: "Milestone",    bg: "rgba(34,197,94,.15)",   text: "#4ade80" },
  "target-nearing": { label: "Progress", bg: "rgba(37,99,235,.15)",   text: "#60a5fa" },
  weekly:       { label: "Achievement",  bg: "rgba(139,92,246,.15)",  text: "#a78bfa" },
  "first-test": { label: "Achievement",  bg: "rgba(6,182,212,.15)",   text: "#22d3ee" },
  welcome:      { label: "Welcome",      bg: "rgba(37,99,235,.15)",   text: "#60a5fa" },
  "ai-ready":   { label: "AI",           bg: "rgba(139,92,246,.15)",  text: "#a78bfa" },
};

function getCategoryMeta(id = "") {
  const key = Object.keys(CATEGORY_META).find((k) => id.startsWith(k));
  return CATEGORY_META[key] ?? { label: "Info", bg: "rgba(100,116,139,.15)", text: "#94a3b8" };
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ ...glass, padding: "72px 40px", textAlign: "center", marginTop: "24px" }}
    >
      <div style={{
        width: "80px", height: "80px", borderRadius: "24px", margin: "0 auto 24px",
        background: "rgba(37,99,235,.12)", border: "1px solid rgba(37,99,235,.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Bell size={34} color="#4f46e5" />
      </div>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", margin: "0 0 10px" }}>
        All caught up
      </h3>
      <p style={{ color: "var(--text-secondary)", fontSize: ".93rem", maxWidth: "320px", margin: "0 auto", lineHeight: 1.7 }}>
        Complete a mock test or practice session and your activity insights will appear here.
      </p>
    </motion.div>
  );
}

function NotificationCard({ n, index }) {
  const meta = getCategoryMeta(n.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.045 }}
      style={{
        ...glass,
        padding: "22px 24px",
        display: "flex",
        alignItems: "flex-start",
        gap: "18px",
        position: "relative",
        overflow: "hidden",
        borderLeft: `3px solid ${n.color}`,
        opacity: n.read ? 0.65 : 1,
        transition: "opacity .2s",
      }}
    >
      {/* Subtle glow behind icon */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "120px", height: "100%",
        background: `linear-gradient(90deg, ${n.color}0a, transparent)`,
        pointerEvents: "none",
      }} />

      {/* Icon */}
      <div style={{
        width: "48px", height: "48px", borderRadius: "16px", flexShrink: 0,
        background: `${n.color}18`,
        border: `1px solid ${n.color}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", position: "relative", zIndex: 1,
      }}>
        {n.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--text)" }}>{n.title}</span>
          <span style={{
            fontSize: ".7rem", fontWeight: 700, letterSpacing: ".5px",
            padding: "2px 10px", borderRadius: "999px",
            background: meta.bg, color: meta.text,
          }}>
            {meta.label.toUpperCase()}
          </span>
          {!n.read && (
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: n.color, flexShrink: 0,
              boxShadow: `0 0 6px ${n.color}88`,
            }} />
          )}
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: ".88rem", lineHeight: 1.65, margin: 0 }}>
          {n.message}
        </p>
        {n.time && (
          <span style={{ display: "inline-block", marginTop: "8px", fontSize: ".75rem", color: "rgba(148,163,184,.7)", fontWeight: 600 }}>
            {n.time}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Notifications() {
  const { user } = useAuth();
  const { notifications, unreadCount, markAllRead } = useNotifications();

  const unread = notifications.filter((n) => !n.read);
  const read   = notifications.filter((n) =>  n.read);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 18% 8%, rgba(99,102,241,.16), transparent 38%), radial-gradient(circle at 82% 92%, rgba(6,182,212,.13), transparent 38%), var(--bg)",
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Grid texture */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.035) 1px, transparent 1px)",
        backgroundSize: "44px 44px", opacity: .45, pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "72px 24px 80px", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "40px" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "6px 14px", borderRadius: "999px", marginBottom: "14px",
                background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)",
                fontSize: ".78rem", fontWeight: 700, color: "var(--text)", letterSpacing: "1px",
              }}>
                <Sparkles size={12} color="#fbbf24" />
                ACTIVITY FEED
              </div>
              <h1 style={{
                fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-1px",
                color: "var(--text)", margin: "0 0 8px",
                background: "linear-gradient(90deg,#4f46e5,#2563eb,#06b6d4)",
                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Notifications
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: ".95rem", margin: 0, lineHeight: 1.7 }}>
                Your progress insights, streaks, and milestones in one place.
              </p>
            </div>

            {/* Stats + mark read */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
              {unreadCount > 0 && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "5px 14px", borderRadius: "999px",
                  background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)",
                  fontSize: ".8rem", fontWeight: 700, color: "#f87171",
                }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "notifPulse 2s infinite" }} />
                  {unreadCount} unread
                </div>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={markAllRead}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 16px", borderRadius: "10px", border: "none", cursor: "pointer",
                    background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)",
                    color: "var(--text-secondary)", fontSize: ".82rem", fontWeight: 600,
                    transition: "all .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,.12)"; e.currentTarget.style.color = "#60a5fa"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  <CheckCheck size={14} />
                  Mark all read
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Content ── */}
        {notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Unread section */}
            {unread.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>
                    New · {unread.length}
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,.08)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <AnimatePresence>
                    {unread.map((n, i) => <NotificationCard key={n.id} n={n} index={i} />)}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Read section */}
            {read.length > 0 && (
              <div style={{ marginTop: unread.length > 0 ? "24px" : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase" }}>
                    Earlier · {read.length}
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,.08)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {read.map((n, i) => <NotificationCard key={n.id} n={n} index={i} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes notifPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.5); }
          50%      { box-shadow: 0 0 0 5px rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  );
}
