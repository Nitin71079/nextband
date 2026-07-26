import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { app } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Users, TrendingUp, Medal, Crown, Radio } from "lucide-react";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  glass: { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", backdropFilter: "blur(22px)", borderRadius: "22px" },
  gradientText: { background: "linear-gradient(90deg,#4f46e5,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" },
  badge: { display: "inline-flex", alignItems: "center", gap: "7px", padding: "7px 16px", borderRadius: "999px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", fontSize: ".82rem", fontWeight: 700, color: "var(--text)", letterSpacing: "1px" },
};

const RANK_CFG = [
  { bg: "linear-gradient(135deg,rgba(234,179,8,.22),rgba(234,179,8,.06))", border: "1px solid rgba(234,179,8,.4)", color: "#fbbf24", glow: "0 20px 50px rgba(234,179,8,.25)", emoji: "🥇", label: "Champion", size: 1.15 },
  { bg: "linear-gradient(135deg,rgba(148,163,184,.18),rgba(148,163,184,.06))", border: "1px solid rgba(148,163,184,.38)", color: "#94a3b8", glow: "0 16px 40px rgba(148,163,184,.18)", emoji: "🥈", label: "Runner Up", size: 1 },
  { bg: "linear-gradient(135deg,rgba(180,83,9,.18),rgba(180,83,9,.06))", border: "1px solid rgba(234,88,12,.38)", color: "#f97316", glow: "0 16px 40px rgba(180,83,9,.18)", emoji: "🥉", label: "3rd Place", size: 0.9 },
];

function avatarGradient(name = "") {
  const g = ["linear-gradient(135deg,#4f46e5,#2563eb)","linear-gradient(135deg,#06b6d4,#2563eb)","linear-gradient(135deg,#22c55e,#06b6d4)","linear-gradient(135deg,#f59e0b,#ef4444)","linear-gradient(135deg,#8b5cf6,#4f46e5)"];
  let h = 0; for (const c of name) h += c.charCodeAt(0);
  return g[h % g.length];
}

function Avatar({ name, size = 44 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: avatarGradient(name), display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: size * 0.38, flexShrink: 0 }}>
      {(name || "A")[0].toUpperCase()}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div style={{ ...T.glass, padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
      <div style={{ width: "28px", height: "16px", borderRadius: "6px", background: "rgba(255,255,255,.07)" }} />
      <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,.07)", flexShrink: 0 }} />
      <div style={{ flex: 1, height: "13px", borderRadius: "7px", background: "rgba(255,255,255,.07)", maxWidth: "40%" }} />
      <div style={{ width: "50px", height: "24px", borderRadius: "10px", background: "rgba(255,255,255,.07)" }} />
    </div>
  );
}

// Top-3 podium card
function PodiumCard({ user: u, rank, delay }) {
  const cfg = RANK_CFG[rank - 1];
  const name = u.displayName || u.email?.split("@")[0] || "Anonymous";
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay }}
      style={{ background: cfg.bg, border: cfg.border, backdropFilter: "blur(22px)", borderRadius: "22px", padding: "28px 20px", textAlign: "center", boxShadow: cfg.glow, position: "relative", overflow: "hidden", transform: rank === 1 ? "scale(1.04)" : "none" }}>
      {rank === 1 && <div style={{ position: "absolute", top: "12px", right: "12px" }}><Crown size={18} color="#fbbf24" /></div>}
      <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{cfg.emoji}</div>
      <Avatar name={name} size={52} />
      <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".95rem", marginTop: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
      <div style={{ fontSize: ".75rem", color: cfg.color, fontWeight: 600, marginTop: "4px" }}>{cfg.label}</div>
      <div style={{ marginTop: "14px", padding: "10px 16px", borderRadius: "12px", background: rank === 1 ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : "rgba(255,255,255,.08)", color: rank === 1 ? "#0f172a" : "var(--text)", fontWeight: 800, fontSize: "1.4rem", display: "inline-block" }}>
        {u.averageBand ? Number(u.averageBand).toFixed(1) : "—"}
      </div>
    </motion.div>
  );
}

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const db = getFirestore(app);
    // onSnapshot fires immediately and on every change — true real-time
    const unsub = onSnapshot(
      collection(db, "users"),
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(data.sort((a, b) => (b.averageBand || 0) - (a.averageBand || 0)));
        setLastUpdated(new Date());
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsub(); // unsubscribe when component unmounts
  }, []);

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 20% 10%, rgba(99,102,241,.18), transparent 40%), radial-gradient(circle at 80% 90%, rgba(59,130,246,.15), transparent 40%), var(--bg)", fontFamily: "Inter, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: .4, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "72px 24px 60px", position: "relative", zIndex: 1 }}>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} style={{ marginBottom: "44px" }}>
          <span style={T.badge}><Star size={13} color="#fbbf24" />TOP PERFORMERS</span>
          <h1 style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", color: "var(--text)", margin: "14px 0 8px" }}>
            <span style={T.gradientText}>Leaderboard</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: ".97rem", lineHeight: 1.8, maxWidth: "440px" }}>
            Top IELTS performers on Knarrow, ranked by average band score.
          </p>
          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 0 rgba(34,197,94,.5)", animation: "livePulse 2s infinite" }} />
            <span style={{ fontSize: ".82rem", color: "#22c55e", fontWeight: 700 }}>LIVE</span>
            {lastUpdated && (
              <span style={{ fontSize: ".78rem", color: "var(--text-secondary)" }}>
                · Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
          </div>
          <style>{`
            @keyframes livePulse {
              0% { box-shadow: 0 0 0 0 rgba(34,197,94,.6); }
              70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
              100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
            }
          `}</style>
        </motion.div>

        {/* ── Side-by-side: Podium | Full List ─────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)", gap: "24px", alignItems: "start" }}>

          {/* LEFT — Podium */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
              <Trophy size={17} color="#fbbf24" />
              <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "var(--text)" }}>Top 3 Champions</h2>
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[1,2,3].map((i) => <div key={i} style={{ ...T.glass, padding: "28px", height: "160px" }} />)}
              </div>
            ) : top3.length === 0 ? (
              <div style={{ ...T.glass, padding: "50px", textAlign: "center" }}>
                <Users size={40} color="rgba(255,255,255,.18)" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {top3.map((u, i) => <PodiumCard key={u.id} user={u} rank={i + 1} delay={i * .08} />)}
              </div>
            )}

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
              {[{ label: "Total Players", value: users.length, icon: Users, color: "#4f46e5" }, { label: "Avg Band", value: users.length ? (users.reduce((a, u) => a + (u.averageBand || 0), 0) / users.length).toFixed(1) : "—", icon: TrendingUp, color: "#22c55e" }].map((s) => (
                <div key={s.label} style={{ ...T.glass, padding: "16px", textAlign: "center" }}>
                  <s.icon size={18} color={s.color} style={{ marginBottom: "6px" }} />
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--text-secondary)", marginTop: "3px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Full ranked list */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
              <Medal size={17} color="#4f46e5" />
              <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "var(--text)" }}>Full Rankings</h2>
              <span style={{ marginLeft: "auto", fontSize: ".75rem", padding: "3px 10px", borderRadius: "999px", background: "rgba(79,70,229,.15)", color: "#818cf8" }}>{users.length} players</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "70vh", overflowY: "auto", paddingRight: "4px" }}>
              {loading ? (
                [1,2,3,4,5,6].map((i) => <SkeletonRow key={i} />)
              ) : users.length === 0 ? (
                <div style={{ ...T.glass, padding: "50px", textAlign: "center" }}>
                  <Users size={42} color="rgba(255,255,255,.18)" style={{ marginBottom: "12px" }} />
                  <p style={{ color: "var(--text-secondary)" }}>No users found yet. Start practising to claim the top spot!</p>
                </div>
              ) : (
                users.map((u, idx) => {
                  const name = u.displayName || u.email?.split("@")[0] || "Anonymous";
                  const isTop = idx < 3;
                  const cfg = RANK_CFG[idx] ?? null;
                  return (
                    <motion.div key={u.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .35, delay: idx * .03 }}
                      style={{ background: isTop ? cfg.bg : "rgba(255,255,255,.04)", border: isTop ? cfg.border : "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(22px)", borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px", boxShadow: isTop ? cfg.glow : "none" }}>
                      {/* Rank */}
                      <div style={{ width: "28px", textAlign: "center", fontWeight: 800, fontSize: isTop ? "1.1rem" : ".88rem", color: isTop ? cfg.color : "var(--text-secondary)", flexShrink: 0 }}>
                        {isTop ? cfg.emoji : `#${idx + 1}`}
                      </div>
                      <Avatar name={name} size={38} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".88rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
                        {isTop && <div style={{ fontSize: ".72rem", color: cfg.color, fontWeight: 600, marginTop: "2px" }}>{cfg.label}</div>}
                      </div>
                      {/* Band pill */}
                      <div style={{ padding: "6px 14px", borderRadius: "10px", background: idx === 0 ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : "rgba(255,255,255,.08)", border: idx === 0 ? "none" : "1px solid rgba(255,255,255,.10)", color: idx === 0 ? "#0f172a" : "var(--text)", fontWeight: 800, fontSize: "1rem", flexShrink: 0 }}>
                        {u.averageBand ? Number(u.averageBand).toFixed(1) : "—"}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
