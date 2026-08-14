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
  Timer, Compass, Layers, ExternalLink, Sparkles, Star, MessageSquare,
  ThumbsUp, ThumbsDown, Download, Target, ShieldAlert, Zap, Filter,
  PieChart as PieIcon, LineChart as LineIcon, Flame, ArrowUpRight
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { getRouteLabel } from "../services/telemetryService";
import { getAllUserFeedback } from "../services/feedbackService";

const db = getFirestore(app);

// ─── Helpers ─────────────────────────────────────────────────────────────────
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
  if (!tDoc) return { minutesStr: "0 mins", totalMins: 0, topVisited: "—", topTimeSpent: "—", lastPath: "—", lastActive: null };

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
    lastActive: tDoc.lastUpdated || tDoc.updatedAt || null,
  };
}

const BAND_COLORS = { "9": "#22c55e", "8": "#4ade80", "7": "#86efac", "6": "#fbbf24", "5": "#f97316", "4": "#ef4444" };
function bandColor(b) {
  const n = Math.floor(Number(b));
  return BAND_COLORS[String(n)] || "#94a3b8";
}

const ACCENT = {
  blue: "#2563eb",
  purple: "#8b5cf6",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  cyan: "#06b6d4",
  pink: "#ec4899",
  indigo: "#6366f1"
};

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color, badgeText, badgeColor }) {
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "20px", padding: "22px 24px",
      boxShadow: "0 4px 20px rgba(0,0,0,.06)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ width: 44, height: 44, borderRadius: "14px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} color={color} />
        </div>
        {badgeText && (
          <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999, background: badgeColor || `${color}18`, color: color }}>
            {badgeText}
          </span>
        )}
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, color: "var(--text)", lineHeight: 1.1, wordBreak: "break-word" }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6, fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, opacity: 0.85 }}>{sub}</div>}
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, icon: Icon, color = ACCENT.blue, rightElement }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={color} />
        </div>
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "var(--text)", margin: 0 }}>{title}</h2>
          {subtitle && <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "2px 0 0 0" }}>{subtitle}</p>}
        </div>
      </div>
      {rightElement}
    </div>
  );
}

// ─── User Detail Modal ────────────────────────────────────────────────────────
function UserModal({ user, results, telemetryDoc, feedbacks = [], onClose }) {
  if (!user) return null;
  const userResults = results.filter(r => r.userId === user.id);
  const userFeedbacks = feedbacks.filter(f => f.userId === user.id || f.userEmail === user.email);
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
      position: "fixed", inset: 0, background: "rgba(0,0,0,.70)", backdropFilter: "blur(8px)",
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: .94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: .94, y: 16 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 26,
          padding: 32, width: "100%", maxWidth: 780, maxHeight: "88vh",
          overflowY: "auto", position: "relative",
          boxShadow: "0 30px 90px rgba(0,0,0,.35)",
        }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
          <X size={18} />
        </button>

        {/* Candidate Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>
              {(user.displayName || user.email || "?")[0].toUpperCase()}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--text)" }}>
              {user.displayName || user.email?.split("@")[0] || "Unknown Candidate"}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{user.email} • UID: <code style={{ fontSize: 11, background: "var(--surface)", padding: "1px 6px", borderRadius: 4 }}>{user.id}</code></div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 3 }}>
              Joined {fmtDate(user.createdAt)} ({ago(user.createdAt)})
            </div>
          </div>
          <div>
            <span style={{ fontSize: 12, fontWeight: 800, padding: "6px 16px", borderRadius: 999, background: user.premium ? "#dcfce7" : "#fee2e2", color: user.premium ? "#166534" : "#991b1b" }}>
              {user.premium ? "👑 Premium Plan" : "Free Plan"}
            </span>
          </div>
        </div>

        {/* Telemetry Engagement Box */}
        <div style={{ background: "rgba(37,99,235,.06)", border: "1px solid rgba(37,99,235,.2)", borderRadius: 18, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--primary)", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Timer size={18} /> Candidate App Engagement &amp; Telemetry
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            <div style={{ background: "var(--card)", padding: 14, borderRadius: 14, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Total App Stay Time</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: ACCENT.blue, marginTop: 4 }}>{tInfo.minutesStr}</div>
            </div>
            <div style={{ background: "var(--card)", padding: 14, borderRadius: 14, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Most Visited Page</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT.purple, marginTop: 4 }}>{tInfo.topVisited}</div>
            </div>
            <div style={{ background: "var(--card)", padding: 14, borderRadius: 14, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Most Time Spent Page</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: ACCENT.green, marginTop: 4 }}>{tInfo.topTimeSpent}</div>
            </div>
          </div>
        </div>

        {/* Module Performance Grid */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Award size={16} color={ACCENT.cyan} /> IELTS Module Subscore Averages
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {avgByModule.map(({ module, avg, count }) => {
              const Icon = icons[module];
              return (
                <div key={module} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${colors[module]}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={colors[module]} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", textTransform: "capitalize", fontWeight: 700 }}>{module}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: avg ? bandColor(avg) : "var(--text-secondary)" }}>{avg ? `Band ${avg}` : "No Score"}</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{count} test{count !== 1 ? "s" : ""} completed</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submissions Timeline */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>Completed Tests ({userResults.length} total)</div>
          {userResults.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-secondary)", fontSize: 14, background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border)" }}>No test submissions recorded yet</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 220, overflowY: "auto" }}>
              {userResults.slice(0, 15).map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: colors[r.module?.toLowerCase()] || "var(--primary)", textTransform: "capitalize" }}>{r.module || r.type || "—"}</span>
                    <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}>{r.testTitle || r.testId || "CBT Practice Test"}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: bandColor(r.band || r.score) }}>{r.band ? `Band ${r.band}` : (r.score || "—")}</span>
                    <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{ago(r.completedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MonitorPanel() {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [telemetry, setTelemetry] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Tabs
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all"); // all | premium | free
  const [timeRange, setTimeRange] = useState("all"); // all | 30d | 7d | today
  const [sortBy, setSortBy] = useState("joined"); // joined | name | tests | band | stay
  const [sortDir, setSortDir] = useState("desc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | users | engagement | results | feedback | traffic

  // Feedback Tab Filter
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackRatingFilter, setFeedbackRatingFilter] = useState("all");

  // GA4 Traffic Data
  const [trafficData, setTrafficData] = useState(null);
  const [trafficLoading, setTrafficLoading] = useState(false);
  const [trafficError, setTrafficError] = useState(null);

  async function fetchData(silent = false) {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const [usersSnap, resultsSnap, telemetrySnap, allFeedbacks] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "results")),
        getDocs(collection(db, "telemetry")),
        getAllUserFeedback(),
      ]);
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setResults(resultsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTelemetry(telemetrySnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setFeedbacks(allFeedbacks);
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

  // Map Telemetry by User ID
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

  // Derived Stats & Deep Metrics
  const premiumCount = useMemo(() => users.filter(u => u.premium).length, [users]);
  const freeCount = users.length - premiumCount;

  const avgBand = useMemo(() => {
    const valid = results.filter(r => Number(r.band) > 0);
    return valid.length ? (valid.reduce((s, r) => s + Number(r.band), 0) / valid.length).toFixed(1) : "—";
  }, [results]);

  const targetAchieversCount = useMemo(() => {
    return results.filter(r => Number(r.band) >= 7.0).length;
  }, [results]);

  const band7PlusRate = useMemo(() => {
    const valid = results.filter(r => Number(r.band) > 0);
    if (!valid.length) return "0%";
    return Math.round((targetAchieversCount / valid.length) * 100) + "%";
  }, [results, targetAchieversCount]);

  // Band Score Histogram (4.0 to 9.0)
  const bandHistogram = useMemo(() => {
    const bands = ["9.0", "8.5", "8.0", "7.5", "7.0", "6.5", "6.0", "5.5", "5.0"];
    const counts = {};
    bands.forEach(b => counts[b] = 0);
    results.forEach(r => {
      if (r.band) {
        const val = Number(r.band).toFixed(1);
        if (counts[val] !== undefined) counts[val]++;
      }
    });
    return bands.map(b => ({ band: b, count: counts[b] }));
  }, [results]);

  // Radar Data for Module Skill Diagnostics
  const skillRadarData = useMemo(() => {
    const m = { reading: [], listening: [], writing: [], speaking: [] };
    results.forEach(r => {
      const k = (r.module || r.type || "").toLowerCase();
      if (m[k] && Number(r.band) > 0) m[k].push(Number(r.band));
    });
    const avg = k => m[k].length ? +(m[k].reduce((a, b) => a + b, 0) / m[k].length).toFixed(1) : 6.0;
    return [
      { module: "Reading", score: avg("reading"), target: 7.5 },
      { module: "Listening", score: avg("listening"), target: 7.5 },
      { module: "Writing", score: avg("writing"), target: 7.0 },
      { module: "Speaking", score: avg("speaking"), target: 7.0 },
    ];
  }, [results]);

  const moduleBreakdown = useMemo(() => {
    const m = { reading: 0, listening: 0, writing: 0, speaking: 0 };
    results.forEach(r => { const k = (r.module || r.type || "").toLowerCase(); if (m[k] !== undefined) m[k]++; });
    return [
      { name: "Reading", count: m.reading, color: ACCENT.cyan },
      { name: "Listening", count: m.listening, color: ACCENT.purple },
      { name: "Writing", count: m.writing, color: ACCENT.amber },
      { name: "Speaking", count: m.speaking, color: ACCENT.green },
    ];
  }, [results]);

  // Daily Signup vs Active Trend (Last 7 Days)
  const dailyActivityTrend = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      const dayEnd = dayStart + 86400000;

      const signups = users.filter(u => {
        const t = u.createdAt?.toDate ? u.createdAt.toDate().getTime() : new Date(u.createdAt || 0).getTime();
        return t >= dayStart && t < dayEnd;
      }).length;

      const submissions = results.filter(r => {
        const t = r.completedAt?.toDate ? r.completedAt.toDate().getTime() : new Date(r.completedAt || 0).getTime();
        return t >= dayStart && t < dayEnd;
      }).length;

      days.push({ label, signups, submissions });
    }
    return days;
  }, [users, results]);

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

  // Filtered / Sorted User List
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

  // Export Candidate Data CSV
  function exportCSV() {
    const headers = ["UID", "Name", "Email", "Plan", "Joined Date", "Total Stay Mins", "Top Page Visited", "Tests Completed", "Avg Band"];
    const rows = filteredUsers.map(u => {
      const st = userStats[u.id] || { count: 0, bands: [] };
      const tInfo = getTelemetryInfo(telemetryMap[u.id]);
      const avgB = st.bands.length ? (st.bands.reduce((a, b) => a + b, 0) / st.bands.length).toFixed(1) : "N/A";
      return [
        u.id,
        `"${u.displayName || u.email?.split("@")[0] || ""}"`,
        `"${u.email || ""}"`,
        u.premium ? "Premium" : "Free",
        fmtDate(u.createdAt),
        tInfo.totalMins,
        `"${tInfo.topVisited}"`,
        st.count,
        avgB
      ].join(",");
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Knarrow_Candidates_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
        <RefreshCw size={36} color="var(--primary)" style={{ animation: "spin .8s linear infinite", marginBottom: 14 }} />
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>Fetching Live Deep Analytics…</div>
        <div style={{ fontSize: 13, marginTop: 4 }}>Connecting to Firestore Telemetry &amp; Test Streams</div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const TAB_STYLE = (t) => ({
    padding: "9px 20px", borderRadius: 999, fontSize: 13, fontWeight: 800, border: "none", cursor: "pointer",
    background: activeTab === t ? "var(--primary)" : "transparent",
    color: activeTab === t ? "#fff" : "var(--text-secondary)",
    transition: "all .2s",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* ─── Top Live Control Header ───────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.3)", color: "#16a34a", fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
              LIVE MONITORING STREAM • REAL-TIME FIRESTORE
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem,3.2vw,2.5rem)", fontWeight: 900, color: "var(--text)", margin: 0, letterSpacing: "-1px" }}>
              Knarrow Executive Deep Analytics
            </h1>
            <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14, fontWeight: 500 }}>
              {users.length} Candidates • {platformEngagement.totalHoursSum} Total Stay Hours • {results.length} Test Submissions • {feedbacks.length} Live Feedbacks
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <button onClick={exportCSV} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 14,
              border: "1px solid rgba(37,99,235,.3)", background: "rgba(37,99,235,.1)", color: "var(--primary)",
              fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all .2s"
            }}>
              <Download size={16} /> Export Candidates CSV
            </button>

            <button onClick={() => fetchData(true)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 14,
              border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)",
              fontSize: 13, fontWeight: 800, cursor: "pointer",
            }}>
              <RefreshCw size={15} style={{ animation: refreshing ? "spin .8s linear infinite" : "none" }} />
              Refresh Analytics
            </button>
          </div>
        </div>

        {/* ─── Top KPI Cards Grid ────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 36 }}>
          <StatCard label="Total Candidate Stay" value={`${platformEngagement.totalMinutesSum} m`} sub={`${platformEngagement.totalHoursSum} total hours in-app`} icon={Timer} color={ACCENT.blue} badgeText="App Telemetry" />
          <StatCard label="Platform Avg Band" value={`Band ${avgBand}`} sub={`${band7PlusRate} score Band 7.0+`} icon={Award} color={ACCENT.green} badgeText="AI Evaluated" />
          <StatCard label="Candidate Base" value={users.length} sub={`${premiumCount} Premium · ${freeCount} Free`} icon={Users} color={ACCENT.purple} badgeText="Registered" />
          <StatCard label="Total Test Runs" value={results.length} sub={`${(results.length / Math.max(users.length, 1)).toFixed(1)} tests / candidate`} icon={BookOpen} color={ACCENT.amber} badgeText="Submissions" />
          <StatCard label="User Feedback Score" value={feedbacks.length ? (feedbacks.reduce((s, f) => s + Number(f.rating || 5), 0) / feedbacks.length).toFixed(1) + " ★" : "—"} sub={`${feedbacks.length} live pulse check-ins`} icon={Star} color={ACCENT.pink} badgeText="Pulse Checks" />
        </div>

        {/* ─── Navigation Tabs ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 8, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 999, padding: 5, width: "fit-content", marginBottom: 32, flexWrap: "wrap", boxShadow: "0 2px 10px rgba(0,0,0,.04)" }}>
          <button style={TAB_STYLE("overview")} onClick={() => setActiveTab("overview")}>Executive Overview</button>
          <button style={TAB_STYLE("users")} onClick={() => setActiveTab("users")}>Candidate Inspector ({users.length})</button>
          <button style={TAB_STYLE("engagement")} onClick={() => setActiveTab("engagement")}>Page &amp; Route Telemetry</button>
          <button style={TAB_STYLE("results")} onClick={() => setActiveTab("results")}>Test Submissions ({results.length})</button>
          <button style={TAB_STYLE("feedback")} onClick={() => setActiveTab("feedback")}>Live Feedback Stream ({feedbacks.length})</button>
          <button style={TAB_STYLE("traffic")} onClick={() => setActiveTab("traffic")}>GA4 Web Traffic</button>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* OVERVIEW TAB (DEEP ANALYTICS & DIAGNOSTICS)                          */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Row 1: Skill Diagnostic Radar + Band Distribution Histogram */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
              
              {/* Skill Subscore Health Diagnostic Radar */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
                <SectionHeader title="IELTS Skill Subscore Health Diagnostic" subtitle="Real-time average score vs. Target Band 7.5 across modules" icon={Target} color={ACCENT.purple} />
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillRadarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="module" tick={{ fill: "var(--text)", fontSize: 12, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 9]} tick={{ fill: "var(--text-secondary)", fontSize: 10 }} />
                    <Radar name="Platform Candidate Avg" dataKey="score" stroke={ACCENT.purple} fill={ACCENT.purple} fillOpacity={0.35} />
                    <Radar name="Target Band Threshold" dataKey="target" stroke={ACCENT.green} fill={ACCENT.green} fillOpacity={0.1} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Candidate Band Score Distribution Histogram */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
                <SectionHeader title="Candidate Band Score Distribution" subtitle="Histogram of student performance from Band 5.0 to 9.0" icon={BarChart3} color={ACCENT.cyan} />
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={bandHistogram}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="band" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Candidates Count">
                      {bandHistogram.map((entry, idx) => (
                        <Cell key={idx} fill={bandColor(entry.band)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Row 2: 7-Day Activity & Growth Trend + Module Breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
              
              {/* Daily Signups & Test Submissions Trend */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
                <SectionHeader title="Candidate Signups &amp; Daily Test Runs" subtitle="7-day activity velocity across platform" icon={TrendingUp} color={ACCENT.blue} />
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={dailyActivityTrend}>
                    <defs>
                      <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={ACCENT.blue} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={ACCENT.blue} stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={ACCENT.green} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={ACCENT.green} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Area type="monotone" dataKey="signups" stroke={ACCENT.blue} fillOpacity={1} fill="url(#colorSignups)" name="New Signups" />
                    <Area type="monotone" dataKey="submissions" stroke={ACCENT.green} fillOpacity={1} fill="url(#colorTests)" name="Test Submissions" />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Module Breakdown */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
                <SectionHeader title="Submissions Volume by IELTS Skill" subtitle="Distribution of candidate attempts per module" icon={BookOpen} color={ACCENT.amber} />
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={moduleBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "var(--text-secondary)", fontWeight: 700 }} width={80} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]} name="Test Submissions">
                      {moduleBreakdown.map((m, i) => <Cell key={i} fill={m.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Row 3: Top Time-Spent Pages + Top Candidates by Stay Time */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
              
              {/* Top Time-Spent Pages */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
                <SectionHeader title="Top Time-Spent Pages" subtitle="Routes where candidates spend maximum practice time" icon={Clock} color={ACCENT.green} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {platformEngagement.pageList.slice(0, 6).map((item, idx) => (
                    <div key={item.path} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 900, color: ACCENT.blue, width: 20 }}>#{idx + 1}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>{item.label}</div>
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

              {/* Top Candidates by Stay Time */}
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
                <SectionHeader title="Most Engaged Candidates" subtitle="Candidates with highest overall app practice stay duration" icon={Flame} color={ACCENT.amber} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[...users].sort((a, b) => (telemetryMap[b.id]?.totalSeconds || 0) - (telemetryMap[a.id]?.totalSeconds || 0)).slice(0, 6).map((u, i) => {
                    const tInfo = getTelemetryInfo(telemetryMap[u.id]);
                    const st = userStats[u.id] || { count: 0 };
                    return (
                      <div key={u.id} onClick={() => setSelectedUser(u)}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, cursor: "pointer", transition: "border-color .2s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--primary)"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                      >
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: `rgba(37,99,235,.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "var(--primary)", flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {u.displayName || u.email?.split("@")[0] || u.id.slice(0, 8)}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{u.email}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 14, fontWeight: 900, color: ACCENT.blue }}>{tInfo.minutesStr}</div>
                            <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{st.count} tests</div>
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999, background: u.premium ? "#dcfce7" : "#fee2e2", color: u.premium ? "#166534" : "#991b1b" }}>
                            {u.premium ? "Premium" : "Free"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* USERS & CANDIDATE INSPECTOR TAB                                      */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>

            {/* Filter Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24, alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 12, flex: "1 1 300px", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "1 1 240px" }}>
                  <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidate by name, email or UID…"
                    style={{ width: "100%", padding: "11px 14px 11px 40px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
                <select value={filterPlan} onChange={e => setFilterPlan(e.target.value)}
                  style={{ padding: "11px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
                  <option value="all">All Plans ({users.length})</option>
                  <option value="premium">👑 Premium ({premiumCount})</option>
                  <option value="free">Free Candidates ({freeCount})</option>
                </select>
              </div>

              <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>
                Showing <strong>{filteredUsers.length}</strong> candidates
              </div>
            </div>

            {/* Candidate Table */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.04)" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 100px 1.2fr 1.2fr 80px 90px", gap: 10, padding: "14px 22px", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {[["Candidate Name", "name"], ["Joined Date", "joined"], ["Stay Time", "stay"], ["Top Visited Page", null], ["Top Time Spent Page", null], ["Tests", "tests"], ["Actions", null]].map(([label, col]) => (
                  <div key={label} onClick={col ? () => toggleSort(col) : undefined}
                    style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px", cursor: col ? "pointer" : "default", display: "flex", alignItems: "center", gap: 4, userSelect: "none" }}>
                    {label} <SortIcon col={col} />
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div style={{ maxHeight: 620, overflowY: "auto" }}>
                {filteredUsers.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "50px 0", color: "var(--text-secondary)", fontSize: 14 }}>No candidates match the search filters</div>
                ) : (
                  filteredUsers.map(u => {
                    const st = userStats[u.id] || { count: 0, bands: [] };
                    const tInfo = getTelemetryInfo(telemetryMap[u.id]);
                    return (
                      <div key={u.id}
                        style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 100px 1.2fr 1.2fr 80px 90px", gap: 10, padding: "16px 22px", borderBottom: "1px solid var(--border)", alignItems: "center", transition: "background .15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {u.displayName || u.email?.split("@")[0] || "Candidate"}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          <div>{fmtDate(u.createdAt)}</div>
                          <div style={{ fontSize: 11, opacity: 0.8 }}>{ago(u.createdAt)}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 900, color: ACCENT.blue }}>{tInfo.minutesStr}</span>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {tInfo.topVisited}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT.green, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {tInfo.topTimeSpent}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>{st.count}</div>
                        <div>
                          <button onClick={() => setSelectedUser(u)}
                            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>
                            <Eye size={13} /> View
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* PAGE ENGAGEMENT TAB                                                   */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === "engagement" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26, marginBottom: 24 }}>
              <SectionHeader title="Page &amp; Route Telemetry Breakdown" subtitle="Detailed time spent and visit counts per application path" icon={Layers} color={ACCENT.purple} />
              
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 20px", background: "var(--surface)", borderBottom: "1px solid var(--border)", borderRadius: 12, marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Page / Application Route</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Total Visits</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Total Time Stayed</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Avg Stay / Visit</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {platformEngagement.pageList.map((item, idx) => (
                  <div key={item.path} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>#{idx + 1} {item.label}</div>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}><code style={{ background: "var(--card)", padding: "2px 6px", borderRadius: 4 }}>{item.path}</code></div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT.purple }}>{item.visits} visits</div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: ACCENT.green }}>{item.minutes} mins</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>{item.avgMins}m / visit</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* TEST RESULTS TAB                                                      */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === "results" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
              {moduleBreakdown.map(m => (
                <div key={m.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, padding: "20px 22px" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: m.color }}>{m.count}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, fontWeight: 700 }}>{m.name} Submissions</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 90px 90px 110px 100px", padding: "14px 22px", background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                {["Module", "Candidate", "Band", "Score", "Date", "Time Ago"].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: ".5px" }}>{h}</div>
                ))}
              </div>
              <div style={{ maxHeight: 620, overflowY: "auto" }}>
                {[...results].sort((a, b) => {
                  const at = a.completedAt?.toDate ? a.completedAt.toDate().getTime() : new Date(a.completedAt || 0).getTime();
                  const bt = b.completedAt?.toDate ? b.completedAt.toDate().getTime() : new Date(b.completedAt || 0).getTime();
                  return bt - at;
                }).slice(0, 200).map((r, i) => {
                  const u = users.find(x => x.id === r.userId);
                  const mod = (r.module || r.type || "—").toLowerCase();
                  const modColors = { reading: ACCENT.cyan, listening: ACCENT.purple, writing: ACCENT.amber, speaking: ACCENT.green };
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 90px 90px 110px 100px", padding: "14px 22px", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: modColors[mod] || "var(--text)", textTransform: "capitalize" }}>{r.module || r.type || "—"}</div>
                      <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {u?.displayName || u?.email?.split("@")[0] || r.userId || "Candidate"}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 900, color: bandColor(r.band || r.score) }}>{r.band ? `Band ${r.band}` : "—"}</div>
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

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* LIVE FEEDBACK STREAM TAB                                              */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === "feedback" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Feedback Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              <StatCard label="Total Feedbacks" value={feedbacks.length} sub="Registered candidate reviews" icon={MessageSquare} color={ACCENT.blue} />
              <StatCard label="Average Rating" value={feedbacks.length ? (feedbacks.reduce((s, f) => s + Number(f.rating || 5), 0) / feedbacks.length).toFixed(1) + " ★" : "—"} sub="Out of 5.0 score" icon={Star} color={ACCENT.amber} />
              <StatCard label="NPS Recommend Rate" value={feedbacks.length ? Math.round((feedbacks.filter(f => f.recommend === true).length / feedbacks.length) * 100) + "%" : "—"} sub="Candidates who recommend" icon={ThumbsUp} color={ACCENT.green} />
              <StatCard label="Routine Check-ins" value={feedbacks.filter(f => f.type === "periodic").length} sub="5-minute candidate pulse" icon={Timer} color={ACCENT.purple} />
            </div>

            {/* Filter Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <div style={{ position: "relative", flex: "1 1 260px" }}>
                <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
                <input value={feedbackSearch} onChange={e => setFeedbackSearch(e.target.value)} placeholder="Search feedback text, user email or page route…"
                  style={{ width: "100%", padding: "11px 14px 11px 40px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <select value={feedbackRatingFilter} onChange={e => setFeedbackRatingFilter(e.target.value)}
                style={{ padding: "11px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
                <option value="all">All Rating Scores</option>
                <option value="5">5 Stars ★★★★★</option>
                <option value="4">4 Stars ★★★★☆</option>
                <option value="3">3 Stars ★★★☆☆</option>
                <option value="2">2 Stars ★★☆☆☆</option>
                <option value="1">1 Star ★☆☆☆☆</option>
              </select>
            </div>

            {/* Stream List */}
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
              <SectionHeader title="Live Candidate Pulse &amp; Feedback Stream" subtitle="Direct candidate feedback submitted via 5-minute pulse checks" icon={MessageSquare} color={ACCENT.amber} />

              {feedbacks.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-secondary)", fontSize: 14 }}>No candidate feedbacks recorded yet</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {feedbacks
                    .filter(f => {
                      if (feedbackRatingFilter !== "all" && String(f.rating) !== feedbackRatingFilter) return false;
                      if (feedbackSearch.trim()) {
                        const q = feedbackSearch.toLowerCase();
                        const text = (f.feedbackText || "").toLowerCase();
                        const name = (f.userName || "").toLowerCase();
                        const email = (f.userEmail || "").toLowerCase();
                        const path = (f.pathName || "").toLowerCase();
                        return text.includes(q) || name.includes(q) || email.includes(q) || path.includes(q);
                      }
                      return true;
                    })
                    .map((f, i) => {
                      const candidate = users.find(u => u.id === f.userId || u.email === f.userEmail);
                      return (
                        <div key={f.id || i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: 20 }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>
                                {(f.userName || f.userEmail || "C")[0].toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>{f.userName || f.userEmail || "Candidate"}</div>
                                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{f.userEmail || "Anonymous"} {candidate?.premium ? " • 👑 Premium" : ""}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 16, color: "#f59e0b", letterSpacing: 1 }}>{"★".repeat(f.rating || 5)}{"☆".repeat(5 - (f.rating || 5))}</div>
                              <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{ago(f.createdAt)} • {fmtDate(f.createdAt)}</div>
                            </div>
                          </div>

                          <div style={{ background: "var(--card)", padding: 14, borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>
                            {f.feedbackText ? `"${f.feedbackText}"` : <span style={{ color: "var(--text-secondary)", italic: true }}>User submitted star rating &amp; metrics without written comments.</span>}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* GA4 TRAFFIC TAB                                                       */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {activeTab === "traffic" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              <StatCard label="Tracked Sessions" value={telemetry.length || users.length} sub="Active candidate sessions" icon={Users} color={ACCENT.blue} />
              <StatCard label="Total Route Views" value={platformEngagement.pageList.reduce((s, p) => s + p.visits, 0)} sub="Across all app pages" icon={Globe} color={ACCENT.purple} />
              <StatCard label="Total Platform Stay" value={`${platformEngagement.totalMinutesSum} m`} sub={`${platformEngagement.totalHoursSum} total hours`} icon={Clock} color={ACCENT.green} />
              <StatCard label="Avg Stay / Candidate" value={`${platformEngagement.avgUserMins} m`} sub="Minutes spent per candidate" icon={Activity} color={ACCENT.amber} />
            </div>

            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 22, padding: 26 }}>
              <SectionHeader title="Most Visited Application Pages &amp; Time Stayed" icon={Navigation} color={ACCENT.purple} />
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 20px", background: "var(--surface)", borderBottom: "1px solid var(--border)", borderRadius: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Page Route</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Page Views</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Total Time Stayed</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--text-secondary)", textTransform: "uppercase" }}>Avg Stay / Visit</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {platformEngagement.pageList.map((item, idx) => (
                  <div key={item.path} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>#{idx + 1} {item.label}</div>
                      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{item.path}</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: ACCENT.purple }}>{item.visits} views</div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: ACCENT.green }}>{item.minutes} mins</div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.avgMins}m</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Candidate Inspector Modal */}
      <AnimatePresence>
        {selectedUser && (
          <UserModal
            user={selectedUser}
            results={results}
            telemetryDoc={telemetryMap[selectedUser.id]}
            feedbacks={feedbacks}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
