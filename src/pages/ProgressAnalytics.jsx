import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3, TrendingUp, TrendingDown, Target, BookOpen,
  Headphones, PenSquare, Mic, Calendar, Clock, Award,
  Flame, ArrowRight, ChevronUp, ChevronDown, Minus,
  Sparkles, Lock,
} from "lucide-react";
import { getResults } from "../services/resultService";
import { useAuth } from "../context/AuthContext";
import "../styles/analytics.css";

/* ── helpers ─────────────────────────────────────────── */
const SKILL_META = {
  reading:   { label: "Reading",   Icon: BookOpen,   color: "#2563eb", bg: "#eff6ff" },
  listening: { label: "Listening", Icon: Headphones, color: "#8b5cf6", bg: "#f5f3ff" },
  writing:   { label: "Writing",   Icon: PenSquare,  color: "#f59e0b", bg: "#fffbeb" },
  speaking:  { label: "Speaking",  Icon: Mic,        color: "#22c55e", bg: "#f0fdf4" },
};

function bandColor(band) {
  if (band >= 8)   return "#16a34a";
  if (band >= 7)   return "#2563eb";
  if (band >= 6)   return "#f59e0b";
  if (band >= 5)   return "#f97316";
  return "#ef4444";
}

function bandLabel(band) {
  if (band >= 8.5) return "Expert";
  if (band >= 7.5) return "Very Good";
  if (band >= 6.5) return "Good";
  if (band >= 5.5) return "Competent";
  if (band >= 4.5) return "Modest";
  return "Limited";
}

function fmtDate(ts) {
  if (!ts) return "—";
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function fmtDuration(seconds) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  return `${m}m`;
}

function TrendIcon({ delta }) {
  if (delta > 0)  return <ChevronUp  size={14} color="#16a34a" />;
  if (delta < 0)  return <ChevronDown size={14} color="#ef4444" />;
  return <Minus size={14} color="#94a3b8" />;
}

/* ── mini bar chart ─────────────────────────────────── */
function MiniBar({ value, max = 9, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="ana-minibar-track">
      <div className="ana-minibar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

/* ── trend sparkline (pure CSS bars) ───────────────── */
function Sparkline({ data, color }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  return (
    <div className="ana-sparkline">
      {data.slice(-10).map((v, i) => (
        <div
          key={i}
          className="ana-spark-bar"
          style={{ height: `${(v / max) * 100}%`, background: color }}
          title={`Band ${v}`}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
═════════════════════════════════════════════════════ */
export default function ProgressAnalytics() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSkill, setActiveSkill] = useState("all");

  useEffect(() => {
    if (!user) return;
    getResults(user.uid).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [user]);

  /* ── derived stats ─────────────────────────────── */
  const stats = useMemo(() => {
    if (!results.length) return null;

    const bySkill = {};
    results.forEach((r) => {
      const s = (r.type || "reading").toLowerCase();
      if (!bySkill[s]) bySkill[s] = [];
      bySkill[s].push(r);
    });

    const skillStats = Object.entries(bySkill).map(([skill, rows]) => {
      const bands   = rows.map((r) => Number(r.band) || 0).filter(Boolean);
      const latest  = bands[0] || 0;
      const prev    = bands[1] || latest;
      const best    = Math.max(...bands);
      const avg     = bands.reduce((a, b) => a + b, 0) / (bands.length || 1);
      return { skill, rows, bands, latest, prev, best, avg: +avg.toFixed(1), count: rows.length };
    });

    const allBands  = results.map((r) => Number(r.band) || 0).filter(Boolean);
    const overallAvg = allBands.length
      ? +(allBands.reduce((a, b) => a + b, 0) / allBands.length).toFixed(1) : 0;
    const overallBest = allBands.length ? Math.max(...allBands) : 0;
    const streak = Math.min(results.length, 7); // simplified streak
    const totalTime = results.reduce((a, r) => a + (r.timeUsed || 0), 0);

    return { bySkill, skillStats, overallAvg, overallBest, streak, totalTime, total: results.length };
  }, [results]);

  const filteredResults = useMemo(() => {
    if (activeSkill === "all") return results.slice(0, 20);
    return results.filter((r) => (r.type || "").toLowerCase() === activeSkill).slice(0, 20);
  }, [results, activeSkill]);

  /* ── loading ───────────────────────────────────── */
  if (!user) {
    return (
      <div className="ana-page">
        <div className="ana-lock">
          <Lock size={48} color="#2563eb" strokeWidth={1.5} />
          <h2>Sign in to view Analytics</h2>
          <p>Your progress tracking requires an account.</p>
          <button className="ana-btn-primary" onClick={() => navigate("/login")}>Sign In</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ana-page">
        <div className="ana-loading">
          <div className="ana-spinner" />
          <p>Loading your analytics…</p>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="ana-page">
        <div className="ana-empty">
          <BarChart3 size={56} color="#2563eb" strokeWidth={1.5} />
          <h2>No data yet</h2>
          <p>Complete a mock test to start tracking your IELTS progress.</p>
          <button className="ana-btn-primary" onClick={() => navigate("/reading")}>
            Start Practicing <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ana-page">

      {/* ── Hero header ──────────────────────────── */}
      <motion.div className="ana-hero" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="ana-hero-left">
          <div className="ana-hero-badge"><Sparkles size={13} /> Progress Analytics</div>
          <h1>Your IELTS Journey</h1>
          <p>Track every test, spot every trend, close every gap.</p>
        </div>
        <div className="ana-hero-right">
          <div className="ana-overall-band" style={{ borderColor: bandColor(stats.overallAvg) }}>
            <div className="ana-band-num" style={{ color: bandColor(stats.overallAvg) }}>
              {stats.overallAvg || "—"}
            </div>
            <div className="ana-band-sub">Avg Band</div>
            <div className="ana-band-level">{bandLabel(stats.overallAvg)}</div>
          </div>
        </div>
      </motion.div>

      {/* ── Summary KPIs ─────────────────────────── */}
      <div className="ana-kpi-row">
        {[
          { icon: Target,   label: "Best Band",    value: stats.overallBest, sub: "all time",          color: "#2563eb" },
          { icon: BarChart3,label: "Tests Taken",  value: stats.total,       sub: "completed",         color: "#8b5cf6" },
          { icon: Flame,    label: "Day Streak",   value: stats.streak,      sub: "days active",       color: "#f59e0b" },
          { icon: Clock,    label: "Time Studied", value: fmtDuration(stats.totalTime), sub: "total", color: "#22c55e" },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div key={k.label} className="ana-kpi-card"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className="ana-kpi-icon" style={{ background: `${k.color}15`, color: k.color }}>
                <Icon size={20} />
              </div>
              <div>
                <div className="ana-kpi-value" style={{ color: k.color }}>{k.value}</div>
                <div className="ana-kpi-label">{k.label}</div>
                <div className="ana-kpi-sub">{k.sub}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Skill breakdown ──────────────────────── */}
      <div className="ana-section-title">
        <TrendingUp size={18} /> Skill Breakdown
      </div>

      <div className="ana-skill-grid">
        {Object.entries(SKILL_META).map(([skill, meta]) => {
          const Icon  = meta.Icon;
          const ss    = stats.skillStats.find((s) => s.skill === skill);
          const band  = ss?.latest || 0;
          const delta = ss ? ss.latest - ss.prev : 0;

          return (
            <motion.div key={skill} className="ana-skill-card"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              style={{ "--skill-color": meta.color }}
              whileHover={{ y: -4 }}>

              <div className="ana-skill-top">
                <div className="ana-skill-icon" style={{ background: meta.bg, color: meta.color }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div className="ana-skill-name">{meta.label}</div>
                  <div className="ana-skill-count">{ss?.count || 0} tests</div>
                </div>
              </div>

              <div className="ana-skill-band" style={{ color: bandColor(band) }}>
                {band || "—"}
                {ss && <span className="ana-skill-delta" style={{ color: delta > 0 ? "#16a34a" : delta < 0 ? "#ef4444" : "#94a3b8" }}>
                  <TrendIcon delta={delta} />
                  {delta !== 0 ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)}` : ""}
                </span>}
              </div>

              <MiniBar value={band} color={meta.color} />

              <div className="ana-skill-meta">
                <span>Best: <strong style={{ color: meta.color }}>{ss?.best || "—"}</strong></span>
                <span>Avg: <strong>{ss?.avg || "—"}</strong></span>
              </div>

              {ss?.bands && <Sparkline data={ss.bands.slice().reverse()} color={meta.color} />}
            </motion.div>
          );
        })}
      </div>

      {/* ── Recent tests table ───────────────────── */}
      <div className="ana-section-title" style={{ marginTop: "40px" }}>
        <Calendar size={18} /> Recent Tests
      </div>

      {/* Filter tabs */}
      <div className="ana-filter-tabs">
        {["all", "reading", "listening", "writing", "speaking"].map((s) => (
          <button
            key={s}
            className={`ana-filter-tab${activeSkill === s ? " active" : ""}`}
            onClick={() => setActiveSkill(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="ana-table-wrap">
        <div className="ana-table-head">
          <span>Test</span>
          <span>Skill</span>
          <span>Score</span>
          <span>Band</span>
          <span>Accuracy</span>
          <span>Time</span>
          <span>Date</span>
        </div>

        {filteredResults.map((r, i) => {
          const skill = (r.type || "reading").toLowerCase();
          const meta  = SKILL_META[skill] || SKILL_META.reading;
          const Icon  = meta.Icon;
          const band  = Number(r.band) || 0;

          return (
            <motion.div key={r.id || i} className="ana-table-row"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
              <span className="ana-row-title">{r.testTitle || r.type || "Test"}</span>
              <span>
                <span className="ana-row-skill" style={{ background: meta.bg, color: meta.color }}>
                  <Icon size={12} /> {meta.label}
                </span>
              </span>
              <span className="ana-row-score">{r.score ?? "—"}/{r.totalQuestions ?? "—"}</span>
              <span>
                <span className="ana-row-band" style={{ color: bandColor(band), background: `${bandColor(band)}15` }}>
                  {band || "—"}
                </span>
              </span>
              <span className="ana-row-acc">
                {r.accuracy != null ? `${Number(r.accuracy).toFixed(1)}%` : "—"}
              </span>
              <span className="ana-row-time">{fmtDuration(r.timeUsed)}</span>
              <span className="ana-row-date">{fmtDate(r.completedAt)}</span>
            </motion.div>
          );
        })}

        {filteredResults.length === 0 && (
          <div className="ana-table-empty">No {activeSkill === "all" ? "" : activeSkill} tests yet.</div>
        )}
      </div>

      {/* ── CTA ──────────────────────────────────── */}
      <motion.div className="ana-cta"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div>
          <h3>Ready to improve?</h3>
          <p>Pick a skill and start a practice session to push your band higher.</p>
        </div>
        <div className="ana-cta-btns">
          {Object.entries(SKILL_META).map(([skill, meta]) => {
            const Icon = meta.Icon;
            return (
              <button key={skill} className="ana-cta-skill-btn"
                style={{ "--sc": meta.color, "--sb": meta.bg }}
                onClick={() => navigate(`/${skill}`)}>
                <Icon size={15} /> {meta.label}
              </button>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}
