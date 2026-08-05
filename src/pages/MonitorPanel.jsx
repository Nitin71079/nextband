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
  Gamepad2, BrainCircuit, Globe, MousePointer, Navigation, Wifi,
  Timer, Compass, Layers, ExternalLink, Sparkles
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { getRouteLabel } from "../services/telemetryService";

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

function fmtDuration(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return "0m";
  const mins = Math.round(totalSeconds / 60);
  if (mins < 60) return `${mins} mins`;
  const hrs = (mins / 60).toFixed(1);
  return `${hrs} hrs (${mins}m)`;
}

function getTelemetryInfo(tDoc) {
  if (!tDoc) return { minutesStr: "0 mins", totalMins: 0, topVisited: "—", topTimeSpent: "—", lastPath: "—" };

  const totalSecs = tDoc.totalSeconds || 0;
  const totalMins = Math.round(totalSecs / 60);
  const minutesStr = fmtDuration(totalSecs);

  // Top Visited Page
  let maxVisits = 0;
  let topVisitedPath = "—";
  if (tDoc.pageViews) {
    Object.entries(tDoc.pageViews).forEach(([key, count]) => {
      if (count > maxVisits) {
        maxVisits = count;
        topVisitedPath = tDoc.pathNames?.[key] || key;
      }
    });
  }
  const topVisited = maxVisits > 0 ? `${getRouteLabel(topVisitedPath)} (${maxVisits}v)` : "—";

  // Top Time Spent Page
  let maxSecs = 0;
  let topTimePath = "—";
  if (tDoc.pageDurations) {
    Object.entries(tDoc.pageDurations).forEach(([key, secs]) => {
      if (secs > maxSecs) {
        maxSecs = secs;
        topTimePath = tDoc.pathNames?.[key] || key;
      }
    });
  }
  const topTimeMins = Math.round(maxSecs / 60);
  const topTimeSpent = maxSecs > 0 ? `${getRouteLabel(topTimePath)} (${topTimeMins}m)` : "—";

  return {
    minutesStr,
    totalMins,
    topVisited,
    topTimeSpent,
    lastPath: getRouteLabel(tDoc.lastPath),
  };
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
      <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text)", lineHeight: 1.1, wordBreak: "break-word" }}>{value}</div>
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
function UserModal({ user, results, telemetryDoc, onClose }) {
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

  const tInfo = getTelemetryInfo(telemetryDoc);

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
          padding: 32, width: "100%", maxWidth: 720, maxHeight: "85vh",
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
              {user.displayName || user.email?.split("@")[0] || "Unknown Candidate"}
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

        {/* Telemetry Engagement Box */}
        <div style={{ background: "rgba(37,99,235,.06)", border: "1px solid rgba(37,99,235,.2)", borderRadius: 16, padding: 18, marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--primary)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Timer size={16} /> User App Telemetry &amp; Time Stayed
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
            <div style={{ background: "var(--card)", padding: 12, borderRadius: 12, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Total Time Stayed</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: ACCENT.blue, marginTop: 4 }}>{tInfo.minutesStr}</div>
            </div>
            <div style={{ background: "var(--card)", padding: 12, borderRadius: 12, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Most Visited Page</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT.purple, marginTop: 4 }}>{tInfo.topVisited}</div>
            </div>
            <div style={{ background: "var(--card)", padding: 12, borderRadius: 12, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Most Time Spent Page</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT.green, marginTop: 4 }}>{tInfo.topTimeSpent}</div>
            </div>
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
  const [telemetry, setTelemetry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all"); // all | premium | free
  const [sortBy, setSortBy] = useState("joined"); // joined | name | tests | band | stay
  const [sortDir, setSortDir] = useState("desc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | users | engagement | results | traffic

  // GA4 traffic data
  const [trafficData, setTrafficData] = useState(null);
  const [trafficLoading, setTrafficLoading] = useState(false);
  const [trafficError, setTrafficError] = useState(null);

  async function fetchData(silent = false) {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const [usersSnap, resultsSnap, telemetrySnap] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "results")),
        getDocs(collection(db, "telemetry")),
      ]);
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setResults(resultsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTelemetry(telemetrySnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error("MonitorPanel fetch error:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function fetchTrafficData() {
    setTrafficLoading(true);
    setTrafficError(null);
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load traffic data");
      setTrafficData(data);
    } catch (err) {
      setTrafficError(err.message);
    } finally {
      setTrafficLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    if (activeTab === "traffic" && !trafficData && !trafficLoading) {
      fetchTrafficData();
    }
  }, [activeTab]); // eslint-disable-line

  // Map telemetry by User ID
  const telemetryMap = useMemo(() => {
    const map = {};
    telemetry.forEach(t => {
      if (t.id || t.userId) map[t.id || t.userId] = t;
    });
    return map;
  }, [telemetry]);

  // Global Platform Engagement Stats
  const platformEngagement = useMemo(() => {
    let totalSecondsSum = 0;
    const viewsByPath = {};
    const durationByPath = {};

    telemetry.forEach(tDoc => {
      totalSecondsSum += (tDoc.totalSeconds || 0);

      if (tDoc.pageViews) {
        Object.entries(tDoc.pageViews).forEach(([key, count]) => {
          const pathName = tDoc.pathNames?.[key] || key;
          viewsByPath[pathName] = (viewsByPath[pathName] || 0) + Number(count || 0);
        });
      }
      if (tDoc.pageDurations) {
        Object.entries(tDoc.pageDurations).forEach(([key, secs]) => {
          const pathName = tDoc.pathNames?.[key] || key;
          durationByPath[pathName] = (durationByPath[pathName] || 0) + Number(secs || 0);
        });
      }
    });

    const allPaths = Array.from(new Set([...Object.keys(viewsByPath), ...Object.keys(durationByPath)]));

    const pageList = allPaths.map(path => {
      const visits = viewsByPath[path] || 0;
      const totalSecs = durationByPath[path] || 0;
      const minutes = Math.round(totalSecs / 60);
      const avgMins = visits > 0 ? +(minutes / visits).toFixed(1) : 0;
      return {
        path,
        label: getRouteLabel(path),
        visits,
        minutes,
        avgMins,
      };
    });

    const sortedByVisits = [...pageList].sort((a, b) => b.visits - a.visits);
    const sortedByMinutes = [...pageList].sort((a, b) => b.minutes - a.minutes);

    const mostVisited = sortedByVisits[0] || { label: "Dashboard", visits: 0 };
    const mostTimeSpent = sortedByMinutes[0] || { label: "Reading Center", minutes: 0 };

    const totalMinutesSum = Math.round(totalSecondsSum / 60);
    const avgUserMins = users.length > 0 ? (totalMinutesSum / users.length).toFixed(1) : 0;

    return {
      totalMinutesSum,
      totalHoursSum: (totalMinutesSum / 60).toFixed(1),
      avgUserMins,
      mostVisited,
      mostTimeSpent,
      pageList: sortedByMinutes,
    };
  }, [telemetry, users]);

  // Derived stats
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

  // Per-user result counts + avg bands
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

  // Filtered / sorted user list
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
      else if (sortBy === "stay") { av = telemetryMap[a.id]?.totalSeconds || 0; bv = telemetryMap[b.id]?.totalSeconds || 0; }
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
  }, [users, filterPlan, search, sortBy, sortDir, userStats, telemetryMap]);

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

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: "rgba(37,99,235,.10)", color: "var(--primary)", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
              <Eye size={13} /> MONITORING PANEL
            </div>
            <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "var(--text)", margin: 0, letterSpacing: "-1px" }}>
              User Analytics &amp; Time Engagement
            </h1>
            <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
              {users.length} registered candidates · {platformEngagement.totalHoursSum} hrs total stay time · {results.length} test submissions
            </p>
          </div>
          <button onClick={() => fetchData(true)} style={{
            display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 14,
            border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            <RefreshCw size={15} style={{ animation: refreshing ? "spin .8s linear infinite" : "none" }} />
            Refresh Data
          </button>
        </div>

        {/* Stat cards overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 36 }}>
          <StatCard label="Total App Stay Time" value={`${platformEngagement.totalMinutesSum} m`} sub={`${platformEngagement.totalHoursSum} hours across candidates`} icon={Timer} color={ACCENT.blue} />
          <StatCard label="Most Visited Page" value={platformEngagement.mostVisited.label} sub={`${platformEngagement.mostVisited.visits} total visits`} icon={Compass} color={ACCENT.purple} />
          <StatCard label="Most Time Spent Page" value={platformEngagement.mostTimeSpent.label} sub={`${platformEngagement.mostTimeSpent.minutes} mins spent total`} icon={Clock} color={ACCENT.green} />
          <StatCard label="Avg Stay per User" value={`${platformEngagement.avgUserMins} m`} sub="Average minutes per candidate" icon={Users} color={ACCENT.amber} />
          <StatCard label="Avg Platform Band" value={avgBand} sub="Across all test modules" icon={Award} color={ACCENT.cyan} />
        </div>

        {/* Nav Tabs */}
        <div style={{ display: "flex", gap: 8, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 999, padding: 4, width: "fit-content", marginBottom: 28 }}>
          <button style={TAB_STYLE("overview")} onClick={() => setActiveTab("overview")}>Overview</button>
          <button style={TAB_STYLE("users")} onClick={() => setActiveTab("users")}>Users &amp; Stay Time ({users.length})</button>
          <button style={TAB_STYLE("engagement")} onClick={() => setActiveTab("engagement")}>Page Engagement</button>
          <button style={TAB_STYLE("results")} onClick={() => setActiveTab("results")}>Test Results ({results.length})</button>
          <button style={TAB_STYLE("traffic")} onClick={() => setActiveTab("traffic")}>GA4 Web Traffic</button>
        </div>

        {/* ══════════ OVERVIEW TAB ══════════ */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
              {/* Page Engagement Ranking */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
                <SectionHeader title="Top Time-Spent Pages" icon={Clock} color={ACCENT.green} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {platformEngagement.pageList.slice(0, 6).map((item, idx) => (
                    <div key={item.path} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 900, color: ACCENT.blue, width: 18 }}>#{idx + 1}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{item.label}</div>
                          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{item.path} · {item.visits} visits</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: ACCENT.green }}>{item.minutes} mins</div>
                        <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>avg {item.avgMins}m / visit</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module breakdown */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
                <SectionHeader title="Tests by Module" icon={BookOpen} color={ACCENT.amber} />
                <ResponsiveContainer width="100%" height={230}>
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
            </div>

            {/* Top users by stay time */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24 }}>
              <SectionHeader title="Top Candidates by App Stay Time" icon={Timer} color={ACCENT.blue} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[...users].sort((a, b) => (telemetryMap[b.id]?.totalSeconds || 0) - (telemetryMap[a.id]?.totalSeconds || 0)).slice(0, 8).map((u, i) => {
                  const tInfo = getTelemetryInfo(telemetryMap[u.id]);
                  const st = userStats[u.id] || { count: 0 };
                  return (
                    <div key={u.id} onClick={() => setSelectedUser(u)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, cursor: "pointer", transition: "border-color .2s" }}
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
                      <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 14, fontWeight: 900, color: ACCENT.blue }}>{tInfo.minutesStr}</div>
                          <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>Top: {tInfo.topTimeSpent}</div>
                        </div>
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

        {/* ══════════ USERS & STAY TIME TAB ══════════ */}
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
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 100px 1.2fr 1.2fr 80px 80px", gap: 8, padding: "12px 20px", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {[["Candidate Name", "name"], ["Joined", "joined"], ["Time Stayed", "stay"], ["Most Visited Page", null], ["Most Time Spent Page", null], ["Tests", "tests"], ["Actions", null]].map(([label, col]) => (
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
                    const tInfo = getTelemetryInfo(telemetryMap[u.id]);
                    return (
                      <div key={u.id}
                        style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 100px 1.2fr 1.2fr 80px 80px", gap: 8, padding: "14px 20px", borderBottom: "1px solid var(--border)", alignItems: "center", transition: "background .15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {u.displayName || u.email?.split("@")[0] || "Candidate"}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          <div>{fmtDate(u.createdAt)}</div>
                          <div style={{ fontSize: 11 }}>{ago(u.createdAt)}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 800, color: ACCENT.blue }}>{tInfo.minutesStr}</span>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {tInfo.topVisited}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: ACCENT.green, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {tInfo.topTimeSpent}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{st.count}</div>
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
                Showing {filteredUsers.length} of {users.length} candidates
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════ PAGE ENGAGEMENT TAB ══════════ */}
        {activeTab === "engagement" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, marginBottom: 24 }}>
              <SectionHeader title="Page Engagement Breakdown (Time Spent &amp; Visits)" icon={Layers} color={ACCENT.purple} />
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 16px", background: "var(--surface)", borderBottom: "1px solid var(--border)", borderRadius: 10, marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Page Name / Route</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Total Visits</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Total Time Spent</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Avg Mins / Visit</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {platformEngagement.pageList.map((item) => (
                  <div key={item.path} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{item.path}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT.purple }}>{item.visits} visits</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: ACCENT.green }}>{item.minutes} mins</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.avgMins}m / visit</div>
                  </div>
                ))}
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
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 90px 90px 110px 100px", padding: "12px 20px", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: modColors[mod] || "var(--text)", textTransform: "capitalize" }}>{r.module || r.type || "—"}</div>
                      <div style={{ fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {u?.displayName || u?.email?.split("@")[0] || r.userId || "Anonymous"}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: bandColor(r.band || r.score) }}>{r.band || "—"}</div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{r.rawScore !== undefined ? `${r.rawScore}/${r.totalQuestions || 40}` : "—"}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{fmtDate(r.completedAt)}</div>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{ago(r.completedAt)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════ TRAFFIC TAB ══════════ */}
        {activeTab === "traffic" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
            {trafficLoading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>Loading GA4 analytics…</div>
            ) : trafficError ? (
              <div style={{ padding: 24, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 16, color: "#991b1b" }}>
                <strong>GA4 Connection Notice:</strong> {trafficError}
              </div>
            ) : trafficData ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  <StatCard label="Active Users (30d)" value={trafficData.activeUsers || "—"} icon={Users} color={ACCENT.blue} />
                  <StatCard label="Page Views" value={trafficData.screenPageViews || "—"} icon={Globe} color={ACCENT.purple} />
                  <StatCard label="Sessions" value={trafficData.sessions || "—"} icon={Activity} color={ACCENT.green} />
                </div>
              </div>
            ) : null}
          </motion.div>
        )}

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <UserModal
            user={selectedUser}
            results={results}
            telemetryDoc={telemetryMap[selectedUser.id]}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
