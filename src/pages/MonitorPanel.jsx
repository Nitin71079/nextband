import { useEffect, useState, useMemo } from "react";
import {
  getFirestore, collection, getDocs, query, orderBy, limit,
} from "firebase/firestore";
import { app } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Crown, BarChart3, BookOpen, Headphones, PenLine, Mic,
  Search, RefreshCw, TrendingUp, Calendar, ChevronDown, ChevronUp,
  Activity, Award, Eye, X, CheckCircle, XCircle, Clock,
  Gamepad2, BrainCircuit,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

const db = getFirestore(app);

// ─── helpers ─────────────────────────────────────────────────────────────────
function fmtDate(val) {
  if (!val) return "—";
  const d = val?.toDate ? val.toDate() : new Date(val);
  return isNaN(d) ? "—" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtTime(val) {
  if (!val) return "—";
  const d = val?.toDate ? val.toDate() : new Date(val);
  return isNaN(d) ? "—" : d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}
function ago(val) {
  if (!val) return "—";
  const d = val?.toDate ? val.toDate() : new Date(val);
  if (isNaN(d)) return "—";
  const diff = Date.now() - d.getTime();
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}
const BAND_COLORS = { "9": "#22c55e", "8": "#4ade80", "7": "#86efac", "6": "#fbbf24", "5": "#f97316", "4": "#ef4444" };
function bandColor(b) {
  const n = Math.floor(Number(b));
  return BAND_COLORS[String(n)] || "#94a3b8";
}
const ACCENT = { blue: "#2563eb", purple: "#8b5cf6", green: "#22c55e", amber: "#f59e0b", red: "#ef4444", cyan: "#06b6d4" };

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color, trend }) {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "20px", padding: "24px",
      boxShadow: "0 4px 20px rgba(0,0,0,.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ width: 42, height: 42, borderRadius: "12px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={color} />
        </div>
        {trend !== undefined && (
          <span style={{ fontSize: 12, fontWeight: 700, color: trend >= 0 ? ACCENT.green : ACCENT.red }}>
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div style={{ fontSize: 32, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6, fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title, icon: Icon, color = ACCENT.blue }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={17} color={color} />
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", margin: 0 }}>{title}</h2>
    </div>
  );
}

// ─── User detail modal ────────────────────────────────────────────────────────
function UserModal({ user, results, onClose }) {
  if (!user) return null;
  const userResults = results.filter(r => r.userId === user.id);
  const modules = ["reading", "listening", "writing", "speaking"];
  const avgByModule = modules.map(m => {
    const r = userResults.filter(x => x.module === m || x.type === m);
    const avg = r.length ? (r.reduce((s, x) => s + Number(x.band || x.score || 0), 0) / r.length).toFixed(1) : null;
    return { module: m, avg, count: r.length };
  });
  const icons = { reading: BookOpen, listening: Headphones, writing: PenLine, speaking: Mic };
  const colors = { reading: ACCENT.cyan, listening: ACCENT.purple, writing: ACCENT.amber, speaking: ACCENT.green };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)",
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: .94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: .94, y: 16 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 24,
          padding: 32, width: "100%", maxWidth: 700, maxHeight: "85vh",
          overflowY: "auto", position: "relative",
          boxShadow: "0 30px 80px rgba(0,0,0,.25)",
        }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#4f46e5,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>
              {(user.displayName || user.email || "?")[0].toUpperCase()}
            </span>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }}>
              {user.displayName || user.email?.split("@")[0] || "Unknown"}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{user.email}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Joined {fmtDate(user.createdAt)}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 999, background: user.premium ? "#dcfce7" : "#fee2e2", color: user.premium ? "#166534" : "#991b1b" }}>
              {user.premium ? "👑 Premium" : "Free"}
            </span>
          </div>
        </div>

        {/* Module stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
          {avgByModule.map(({ module, avg, count }) => {
            const Icon = icons[module];
            return (
              <div key={module} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${colors[module]}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={colors[module]} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "capitalize", fontWeight: 600 }}>{module}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: avg ? bandColor(avg) : "var(--text-secondary)" }}>{avg ?? "—"}</div>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{count} test{count !== 1 ? "s" : ""}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent results */}
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>Recent Activity ({userResults.length} total)</div>
        {userResults.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-secondary)", fontSize: 14 }}>No test results recorded</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {userResults.slice(0, 12).map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", textTransform: "capitalize", minWidth: 70 }}>{r.module || r.type || "—"}</span>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{r.testTitle || r.testId || "—"}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: bandColor(r.band || r.score) }}>{r.band || r.score || "—"}</span>
                  <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{ago(r.completedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function MonitorPanel() {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all"); // all | premium | free
  const [sortBy, setSortBy] = useState("joined"); // joined | name | tests | band
  const [sortDir, setSortDir] = useState("desc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | users | results

  async function fetchData(silent = false) {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const [usersSnap, resultsSnap] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "results")),
      ]);
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setResults(resultsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error("MonitorPanel fetch:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  // ── derived stats ─────────────────────────────────────────────────────────
  const premiumCount = useMemo(() => users.filter(u => u.premium).length, [users]);
  const freeCount = users.length - premiumCount;

  const avgBand = useMemo(() => {
    const valid = results.filter(r => Number(r.band) > 0);
    return valid.length ? (valid.reduce((s, r) => s + Number(r.band), 0) / valid.length).toFixed(1) : "—";
  }, [results]);

  const moduleBreakdown = useMemo(() => {
    const m = { reading: 0, listening: 0, writing: 0, speaking: 0 };
    results.forEach(r => { const k = (r.module || r.type || "").toLowerCase(); if (m[k] !== undefined) m[k]++; });
    return [
      { name: "Reading",   count: m.reading,   color: ACCENT.cyan },
      { name: "Listening", count: m.listening, color: ACCENT.purple },
      { name: "Writing",   count: m.writing,   color: ACCENT.amber },
      { name: "Speaking",  count: m.speaking,  color: ACCENT.green },
    ];
  }, [results]);

  // last 7 days signups
  const signupChart = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      return { label: d.toLocaleDateString("en-IN", { weekday: "short" }), date: d.toDateString(), count: 0 };
    });
    users.forEach(u => {
      const d = u.createdAt?.toDate ? u.createdAt.toDate() : new Date(u.createdAt || 0);
      const entry = days.find(x => x.date === d.toDateString());
      if (entry) entry.count++;
    });
    return days;
  }, [users]);

  // last 7 days activity (tests taken)
  const activityChart = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      return { label: d.toLocaleDateString("en-IN", { weekday: "short" }), date: d.toDateString(), count: 0 };
    });
    results.forEach(r => {
      const d = r.completedAt?.toDate ? r.completedAt.toDate() : new Date(r.completedAt || 0);
      const entry = days.find(x => x.date === d.toDateString());
      if (entry) entry.count++;
    });
    return days;
  }, [results]);

  // per-user result counts + avg bands
  const userStats = useMemo(() => {
    const map = {};
    results.forEach(r => {
      if (!r.userId) return;
      if (!map[r.userId]) map[r.userId] = { count: 0, bands: [] };
      map[r.userId].count++;
      if (Number(r.band) > 0) map[r.userId].bands.push(Number(r.band));
    });
    return map;
  }, [results]);

  // ── filtered / sorted user list ────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    let list = [...users];
    if (filterPlan === "premium") list = list.filter(u => u.premium);
    if (filterPlan === "free") list = list.filter(u => !u.premium);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(u =>
        (u.displayName || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let av, bv;
      if (sortBy === "name") { av = (a.displayName || a.email || "").toLowerCase(); bv = (b.displayName || b.email || "").toLowerCase(); }
      else if (sortBy === "tests") { av = userStats[a.id]?.count || 0; bv = userStats[b.id]?.count || 0; }
      else if (sortBy === "band") {
        const ab = userStats[a.id]?.bands || []; const bb = userStats[b.id]?.bands || [];
        av = ab.length ? ab.reduce((s, x) => s + x, 0) / ab.length : 0;
        bv = bb.length ? bb.reduce((s, x) => s + x, 0) / bb.length : 0;
      }
      else { // joined
        av = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
        bv = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
      }
      if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return list;
  }, [users, filterPlan, search, sortBy, sortDir, userStats]);

  function toggleSort(col) {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  }
  const SortIcon = ({ col }) => sortBy === col ? (sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />) : null;

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
        <RefreshCw size={32} style={{ animation: "spin .8s linear infinite", marginBottom: 12 }} />
        <div>Loading monitor data…</div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const TAB_STYLE = (t) => ({
    padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
    background: activeTab === t ? "var(--primary)" : "transparent",
    color: activeTab === t ? "#fff" : "var(--text-secondary)",
    transition: "all .2s",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* ── Page header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: "rgba(37,99,235,.10)", color: "var(--primary)", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
              <Eye size={13} /> MONITORING PANEL
            </div>
            <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "var(--text)", margin: 0, letterSpacing: "-1px" }}>
              User Analytics
            </h1>
            <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
              {users.length} total users · {results.length} test results · read-only view
            </p>
          </div>
          <button onClick={() => fetchData(true)} style={{
            display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 14,
            border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            <RefreshCw size={15} style={{ animation: refreshing ? "spin .8s linear infinite" : "none" }} />
            Refresh
          </button>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, padding: 4, width: "fit-content" }}>
          {["overview", "users", "results"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={TAB_STYLE(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ══════════ OVERVIEW TAB ══════════ */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
              <StatCard label="Total Users"    value={users.length}  icon={Users}     color={ACCENT.blue}   />
              <StatCard label="Premium Users"  value={premiumCount}  sub={`${freeCount} on Free`} icon={Crown} color={ACCENT.purple} />
              <StatCard label="Tests Completed" value={results.length} icon={BarChart3} color={ACCENT.cyan}  />
              <StatCard label="Avg Band Score" value={avgBand}       icon={TrendingUp} color={ACCENT.green}  />
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 28 }}>

              {/* Signups chart */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
                <SectionHeader title="New Signups (Last 7 Days)" icon={Calendar} color={ACCENT.blue} />
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={signupChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Bar dataKey="count" fill={ACCENT.blue} radius={[6, 6, 0, 0]} name="Signups" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Activity chart */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
                <SectionHeader title="Tests Taken (Last 7 Days)" icon={Activity} color={ACCENT.cyan} />
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={activityChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Line type="monotone" dataKey="count" stroke={ACCENT.cyan} strokeWidth={2.5} dot={{ r: 4, fill: ACCENT.cyan }} name="Tests" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Module breakdown */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
                <SectionHeader title="Tests by Module" icon={BookOpen} color={ACCENT.amber} />
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={moduleBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} width={70} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Tests">
                      {moduleBreakdown.map((m, i) => <Cell key={i} fill={m.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Plan split */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column" }}>
                <SectionHeader title="Plan Distribution" icon={Crown} color={ACCENT.purple} />
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={[{ name: "Premium", value: premiumCount }, { name: "Free", value: freeCount }]}
                      cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                      <Cell fill={ACCENT.purple} /> <Cell fill={ACCENT.blue} />
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 8 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: ACCENT.purple }}>{premiumCount}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Premium</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: ACCENT.blue }}>{freeCount}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Free</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top users by tests */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
              <SectionHeader title="Most Active Users" icon={Award} color={ACCENT.green} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[...users].sort((a, b) => (userStats[b.id]?.count || 0) - (userStats[a.id]?.count || 0)).slice(0, 8).map((u, i) => {
                  const st = userStats[u.id] || { count: 0, bands: [] };
                  const avg = st.bands.length ? (st.bands.reduce((s, x) => s + x, 0) / st.bands.length).toFixed(1) : null;
                  return (
                    <div key={u.id} onClick={() => setSelectedUser(u)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, cursor: "pointer", transition: "border-color .2s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                    >
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: `rgba(37,99,235,.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--primary)", flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {u.displayName || u.email?.split("@")[0] || u.id.slice(0, 8)}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{u.email}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{st.count} tests</span>
                        {avg && <span style={{ fontSize: 14, fontWeight: 800, color: bandColor(avg) }}>Band {avg}</span>}
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: u.premium ? "#dcfce7" : "#fee2e2", color: u.premium ? "#166534" : "#991b1b" }}>
                          {u.premium ? "Premium" : "Free"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════ USERS TAB ══════════ */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>

            {/* Filters row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
              <div style={{ position: "relative", flex: "1 1 240px" }}>
                <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or UID…"
                  style={{ width: "100%", padding: "10px 14px 10px 38px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <select value={filterPlan} onChange={e => setFilterPlan(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 13, cursor: "pointer" }}>
                <option value="all">All Plans</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
              </select>
            </div>

            {/* Table */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.6fr 80px 80px 90px 80px", gap: 0, padding: "12px 20px", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {[["Name / Email", "name"], ["Joined", "joined"], ["Tests", "tests"], ["Avg Band", "band"], ["Plan", null], ["Actions", null]].map(([label, col]) => (
                  <div key={label} onClick={col ? () => toggleSort(col) : undefined}
                    style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", cursor: col ? "pointer" : "default", display: "flex", alignItems: "center", gap: 4, userSelect: "none" }}>
                    {label} <SortIcon col={col} />
                  </div>
                ))}
              </div>

              {/* Table rows */}
              <div style={{ maxHeight: 580, overflowY: "auto" }}>
                {filteredUsers.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-secondary)", fontSize: 14 }}>No users match the filter</div>
                ) : (
                  filteredUsers.map(u => {
                    const st = userStats[u.id] || { count: 0, bands: [] };
                    const avg = st.bands.length ? (st.bands.reduce((s, x) => s + x, 0) / st.bands.length).toFixed(1) : null;
                    return (
                      <div key={u.id}
                        style={{ display: "grid", gridTemplateColumns: "2fr 1.6fr 80px 80px 90px 80px", gap: 0, padding: "14px 20px", borderBottom: "1px solid var(--border)", alignItems: "center", transition: "background .15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {u.displayName || u.email?.split("@")[0] || "—"}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                          <div>{fmtDate(u.createdAt)}</div>
                          <div style={{ fontSize: 11 }}>{ago(u.createdAt)}</div>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{st.count}</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: avg ? bandColor(avg) : "var(--text-secondary)" }}>{avg || "—"}</div>
                        <div>
                          <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: u.premium ? "#dcfce7" : "#fee2e2", color: u.premium ? "#166534" : "#991b1b" }}>
                            {u.premium ? "👑 Premium" : "Free"}
                          </span>
                        </div>
                        <div>
                          <button onClick={() => setSelectedUser(u)}
                            style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "none", color: "var(--primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                            <Eye size={13} /> View
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div style={{ padding: "10px 20px", background: "var(--surface)", borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-secondary)" }}>
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════ RESULTS TAB ══════════ */}
        {activeTab === "results" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
              {moduleBreakdown.map(m => (
                <div key={m.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "18px 20px" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: m.color }}>{m.count}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, fontWeight: 600 }}>{m.name} tests</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 90px 90px 110px 100px", padding: "12px 20px", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {["Module", "User", "Band", "Score", "Completed", "Time"].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px" }}>{h}</div>
                ))}
              </div>
              <div style={{ maxHeight: 600, overflowY: "auto" }}>
                {[...results].sort((a, b) => {
                  const at = a.completedAt?.toDate ? a.completedAt.toDate().getTime() : new Date(a.completedAt || 0).getTime();
                  const bt = b.completedAt?.toDate ? b.completedAt.toDate().getTime() : new Date(b.completedAt || 0).getTime();
                  return bt - at;
                }).slice(0, 200).map((r, i) => {
                  const u = users.find(x => x.id === r.userId);
                  const mod = (r.module || r.type || "—").toLowerCase();
                  const modColors = { reading: ACCENT.cyan, listening: ACCENT.purple, writing: ACCENT.amber, speaking: ACCENT.green };
                  return (
                    <div key={i}
                      style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 90px 90px 110px 100px", padding: "12px 20px", borderBottom: "1px solid var(--border)", alignItems: "center", transition: "background .15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: `${modColors[mod] || "#94a3b8"}18`, color: modColors[mod] || "#94a3b8", textTransform: "capitalize" }}>{mod}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {u ? (u.displayName || u.email?.split("@")[0]) : r.userId?.slice(0, 10) || "—"}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: bandColor(r.band) }}>{r.band || "—"}</div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{r.score != null ? `${r.score}/${r.total || "?"}` : "—"}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{fmtDate(r.completedAt)}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{fmtTime(r.completedAt)}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding: "10px 20px", background: "var(--surface)", borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-secondary)" }}>
                Showing latest {Math.min(200, results.length)} of {results.length} results
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* User detail modal */}
      <AnimatePresence>
        {selectedUser && (
          <UserModal user={selectedUser} results={results} onClose={() => setSelectedUser(null)} />
        )}
      </AnimatePresence>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
