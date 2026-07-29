import { useEffect, useState, useMemo } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  TrendingUp, TrendingDown, Minus, BookOpen, Headphones,
  PenSquare, Mic, Target, Flame, Trophy, BrainCircuit,
  Calendar, BarChart3, ArrowRight, AlertCircle, CheckCircle2,
  Zap
} from "lucide-react";
import "../styles/insights.css";

/* ── helpers ── */
const band = (v) => Number(v || 0).toFixed(1);
const bandClass = (v) => v >= 7 ? "high" : v >= 5.5 ? "medium" : "low";

function SparklineSVG({ data = [], color = "#4f8ef7", height = 70 }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height * 0.8) - height * 0.1;
    return `${x},${y}`;
  });
  const area = `M${pts[0]} ` + pts.slice(1).map(p => `L${p}`).join(" ")
    + ` L${w},${height} L0,${height} Z`;
  const line = `M${pts[0]} ` + pts.slice(1).map(p => `L${p}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="sparkline-svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${color.replace('#','')})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadialRing({ value, max = 9, color, size = 80, stroke = 7 }) {
  const r = (size / 2) - stroke;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,.05)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset .9s cubic-bezier(.34,1.56,.64,1)" }}
      />
    </svg>
  );
}

function DonutChart({ segments, size = 140, stroke = 18 }) {
  const r = (size / 2) - stroke;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const total = segments.reduce((a, s) => a + s.value, 0);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,.05)" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circ;
        const el = (
          <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transition: "stroke-dashoffset .9s ease" }}
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

/* ── Heatmap helpers ── */
function buildHeatmap(results) {
  const map = {};
  results.forEach(r => {
    const d = r.completedAt?.toDate ? r.completedAt.toDate() : new Date(r.completedAt || 0);
    const key = d.toISOString().slice(0, 10);
    map[key] = (map[key] || 0) + 1;
  });
  const cells = [];
  for (let i = 181; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const cnt = map[key] || 0;
    cells.push({ key, cnt, level: cnt === 0 ? 0 : cnt === 1 ? 1 : cnt === 2 ? 2 : cnt === 3 ? 3 : 4 });
  }
  return cells;
}

/* ── Mock history for demo (when no Firestore data) ── */
const DEMO_HISTORY = [
  { section: "Listening", band: 8.0, score: 35, total: 40, date: "Jul 25", testName: "Listening Test 002" },
  { section: "Reading",   band: 7.5, score: 33, total: 40, date: "Jul 23", testName: "Reading Test 001" },
  { section: "Listening", band: 7.5, score: 32, total: 40, date: "Jul 20", testName: "Listening Test 001" },
  { section: "Writing",   band: 7.0, score: null, total: null, date: "Jul 18", testName: "Writing Task 2" },
  { section: "Speaking",  band: 6.5, score: null, total: null, date: "Jul 15", testName: "Speaking Cue Card" },
  { section: "Reading",   band: 7.0, score: 30, total: 40, date: "Jul 12", testName: "Reading Test 002" },
  { section: "Listening", band: 7.0, score: 30, total: 40, date: "Jul 10", testName: "Listening Test 003" },
  { section: "Writing",   band: 6.5, score: null, total: null, date: "Jul 8",  testName: "Writing Task 1" },
];

const SKILL_COLORS = {
  Reading: "#4f8ef7", Listening: "#22d3ee", Writing: "#8b5cf6", Speaking: "#22d3a5"
};
const SKILL_ICONS = {
  Reading: <BookOpen size={16} />, Listening: <Headphones size={16} />,
  Writing: <PenSquare size={16} />, Speaking: <Mic size={16} />
};

const TABS = ["Overview", "Skills", "History", "Goals"];

export default function Insights() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    async function fetchResults() {
      try {
        if (!user) { setLoading(false); return; }
        const db = getFirestore(app);
        const q = query(collection(db, "mockResults"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(data.length ? data : DEMO_HISTORY);
      } catch { setResults(DEMO_HISTORY); }
      finally { setLoading(false); }
    }
    fetchResults();
  }, [user]);

  const allData = results.length ? results : DEMO_HISTORY;

  const avgBySection = useMemo(() => {
    const map = {};
    ["Reading", "Listening", "Writing", "Speaking"].forEach(s => {
      const items = allData.filter(r => r.section === s);
      map[s] = items.length ? items.reduce((a, r) => a + Number(r.band || 0), 0) / items.length : 0;
    });
    return map;
  }, [allData]);

  const overall = useMemo(() => {
    const vals = Object.values(avgBySection).filter(v => v > 0);
    return vals.length ? (vals.reduce((a, v) => a + v, 0) / vals.length).toFixed(1) : "—";
  }, [avgBySection]);

  const totalTests  = allData.length;
  const streak      = 18; // from analytics hook (mock)
  const weeklyGoal  = 82;

  const strongest = Object.entries(avgBySection).sort((a, b) => b[1] - a[1])[0];
  const weakest   = Object.entries(avgBySection).filter(([,v]) => v > 0).sort((a, b) => a[1] - b[1])[0];

  const trendData = {
    Listening: [6.5, 7.0, 7.0, 7.5, 7.5, 8.0],
    Reading:   [6.5, 7.0, 7.0, 7.0, 7.5, 7.5],
    Writing:   [5.5, 6.0, 6.0, 6.5, 6.5, 7.0],
    Speaking:  [5.5, 6.0, 6.0, 6.5, 6.5, 6.5],
  };

  const heatCells = useMemo(() => buildHeatmap(allData), [allData]);

  const targets = { Reading: 8.0, Listening: 8.5, Writing: 7.5, Speaking: 7.5 };

  const recs = [
    { icon: "✍️", bg: "rgba(139,92,246,.12)", title: "Focus on Writing Task 2", desc: "Improve coherence and lexical resource. Practice 3 essays this week.", priority: "high" },
    { icon: "🎤", bg: "rgba(34,211,165,.12)", title: "Speaking Fluency Drills", desc: "Record yourself for 10 min daily. Use AI Speaking tool for instant feedback.", priority: "medium" },
    { icon: "📖", bg: "rgba(79,142,247,.12)", title: "Reading Speed Training", desc: "Complete one timed passage daily. Focus on skimming and scanning techniques.", priority: "low" },
    { icon: "🧠", bg: "rgba(249,115,22,.12)", title: "Vocabulary Expansion", desc: "Learn 10 academic words daily using the AI flashcard system.", priority: "medium" },
  ];

  /* ── Overview tab content ── */
  const overviewContent = (
    <>
      {/* KPI row */}
      <div className="insights-kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon"><TrendingUp size={18} color="#4f8ef7" /></div>
          <div className="kpi-value">{overall}</div>
          <div className="kpi-label">Overall Band</div>
          <div className="kpi-delta up">↑ +0.5 this month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><Flame size={18} color="#22d3a5" /></div>
          <div className="kpi-value">{streak}</div>
          <div className="kpi-label">Day Streak</div>
          <div className="kpi-delta up">↑ Personal best</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><Trophy size={18} color="#f97316" /></div>
          <div className="kpi-value">{totalTests}</div>
          <div className="kpi-label">Tests Completed</div>
          <div className="kpi-delta neutral">All time</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><Target size={18} color="#f87171" /></div>
          <div className="kpi-value">{weeklyGoal}%</div>
          <div className="kpi-label">Weekly Goal</div>
          <div className="kpi-delta up">↑ On track</div>
        </div>
      </div>

      {/* Row 1: sparklines + donut */}
      <div className="insights-row wide" style={{ marginBottom: 20 }}>
        {/* Band trend sparklines */}
        <div className="ins-card">
          <div className="ins-card-header">
            <div><p className="ins-card-title">Band Trends</p><p className="ins-card-sub">Last 6 attempts per skill</p></div>
            <span className="ins-card-badge">Live</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {Object.entries(trendData).map(([skill, data]) => {
              const last = data[data.length - 1];
              const prev = data[data.length - 2];
              const up = last >= prev;
              return (
                <div key={skill} className="sparkline-wrap">
                  <div className="sparkline-header">
                    <div>
                      <div style={{ fontSize: 12, color: "var(--in-muted)", fontWeight: 600, marginBottom: 2 }}>{skill}</div>
                      <div className="sparkline-big" style={{ color: SKILL_COLORS[skill] }}>{last}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: up ? "var(--in-green)" : "var(--in-red)", fontWeight: 700 }}>
                      {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {up ? "+" : ""}{(last - prev).toFixed(1)}
                    </div>
                  </div>
                  <SparklineSVG data={data} color={SKILL_COLORS[skill]} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Score distribution donut */}
        <div className="ins-card">
          <div className="ins-card-header">
            <div><p className="ins-card-title">Score Distribution</p><p className="ins-card-sub">Tests by skill</p></div>
          </div>
          <div className="donut-wrap">
            <div className="donut-ring">
              <DonutChart segments={[
                { value: allData.filter(r => r.section === "Listening").length || 1, color: "#22d3ee" },
                { value: allData.filter(r => r.section === "Reading").length   || 1, color: "#4f8ef7" },
                { value: allData.filter(r => r.section === "Writing").length   || 1, color: "#8b5cf6" },
                { value: allData.filter(r => r.section === "Speaking").length  || 1, color: "#22d3a5" },
              ]} />
              <div className="donut-center">
                <span className="donut-center-val">{totalTests}</span>
                <span className="donut-center-lbl">Tests</span>
              </div>
            </div>
            <div className="donut-legend">
              {["Listening","Reading","Writing","Speaking"].map(s => (
                <div key={s} className="donut-legend-row">
                  <span className="donut-dot" style={{ background: SKILL_COLORS[s] }} />
                  <span style={{ color: "var(--in-muted)", fontSize: 13 }}>{s}</span>
                  <span>{allData.filter(r => r.section === s).length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: heatmap + strong/weak */}
      <div className="insights-row" style={{ marginBottom: 20 }}>
        <div className="ins-card">
          <div className="ins-card-header">
            <div><p className="ins-card-title">Study Activity</p><p className="ins-card-sub">Last 6 months</p></div>
          </div>
          <div className="heatmap-wrap">
            <div className="heatmap-grid">
              {heatCells.map(c => (
                <div key={c.key} className="heatmap-cell" data-level={c.level} title={`${c.key}: ${c.cnt} session(s)`} />
              ))}
            </div>
            <div className="heatmap-legend">
              Less
              <div className="heatmap-legend-cells">
                {[0,1,2,3,4].map(l => (
                  <div key={l} className="heatmap-legend-cell heatmap-cell" data-level={l} />
                ))}
              </div>
              More
            </div>
          </div>
        </div>

        <div className="ins-card">
          <div className="ins-card-header">
            <div><p className="ins-card-title">Strongest vs Weakest</p></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {strongest && (
              <div style={{ padding: "16px", borderRadius: 12, background: "rgba(34,211,165,.07)", border: "1px solid rgba(34,211,165,.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <CheckCircle2 size={16} color="var(--in-green)" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--in-green)", textTransform: "uppercase", letterSpacing: ".5px" }}>Strongest</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--in-text)" }}>{strongest[0]}</div>
                <div style={{ fontSize: 13, color: "var(--in-muted)", marginTop: 4 }}>Band {band(strongest[1])} — Keep it up!</div>
              </div>
            )}
            {weakest && (
              <div style={{ padding: "16px", borderRadius: 12, background: "rgba(248,113,113,.07)", border: "1px solid rgba(248,113,113,.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <AlertCircle size={16} color="var(--in-red)" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--in-red)", textTransform: "uppercase", letterSpacing: ".5px" }}>Needs Work</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--in-text)" }}>{weakest[0]}</div>
                <div style={{ fontSize: 13, color: "var(--in-muted)", marginTop: 4 }}>Band {band(weakest[1])} — Focus here</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  /* ── Skills tab ── */
  const skillsContent = (
    <>
      {/* Radial module comparison */}
      <div className="ins-card" style={{ marginBottom: 20 }}>
        <div className="ins-card-header">
          <div><p className="ins-card-title">Module Bands</p><p className="ins-card-sub">Radial comparison (max 9)</p></div>
        </div>
        <div className="radial-grid">
          {Object.entries(avgBySection).map(([skill, val]) => (
            <div key={skill} className="radial-item">
              <div className="radial-ring">
                <RadialRing value={val} color={SKILL_COLORS[skill]} size={80} stroke={7} />
                <div className="radial-center">{val ? band(val) : "—"}</div>
              </div>
              <div className="radial-label">{skill}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Target band tracker */}
      <div className="ins-card" style={{ marginBottom: 20 }}>
        <div className="ins-card-header">
          <div><p className="ins-card-title">Target Band Progress</p><p className="ins-card-sub">Current vs goal</p></div>
          <span className="ins-card-badge">Band 8 Target</span>
        </div>
        <div className="target-track">
          {Object.entries(avgBySection).map(([skill, val]) => {
            const goal = targets[skill];
            const pct = Math.min((val / goal) * 100, 100);
            const goalPct = (goal / 9) * 100;
            return (
              <div key={skill} className="target-row">
                <div className="target-name">{skill}</div>
                <div className="target-bars">
                  <div className="target-bar-bg" />
                  <div className="target-bar-current" style={{ width: `${(val/9)*100}%`, background: SKILL_COLORS[skill] }} />
                  <div className="target-bar-goal-marker" style={{ left: `${goalPct}%` }} title={`Goal: ${goal}`} />
                </div>
                <div className="target-scores">
                  <span className="target-current-val" style={{ color: SKILL_COLORS[skill] }}>{band(val)}</span>
                  <span className="target-goal-val">/ {goal}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bar chart of averages */}
      <div className="ins-card">
        <div className="ins-card-header">
          <div><p className="ins-card-title">Average Band Score</p><p className="ins-card-sub">Across all attempts</p></div>
        </div>
        <div className="bar-chart">
          {Object.entries(avgBySection).map(([skill, val]) => (
            <div key={skill} className="bar-row">
              <div className="bar-label">{skill}</div>
              <div className="bar-track">
                <div className={`bar-fill ${skill.toLowerCase()}`} style={{ width: val ? `${(val / 9) * 100}%` : "0%" }} />
              </div>
              <div className="bar-val">{val ? band(val) : "—"}</div>
            </div>
          ))}
          <div className="bar-row">
            <div className="bar-label">Overall</div>
            <div className="bar-track">
              <div className="bar-fill overall" style={{ width: overall !== "—" ? `${(parseFloat(overall) / 9) * 100}%` : "0%" }} />
            </div>
            <div className="bar-val">{overall}</div>
          </div>
        </div>
      </div>
    </>
  );

  /* ── History tab ── */
  const historyContent = (
    <div className="ins-card">
      <div className="ins-card-header">
        <div><p className="ins-card-title">Test History</p><p className="ins-card-sub">{allData.length} attempts recorded</p></div>
        <span className="ins-card-badge">All Time</span>
      </div>
      <div className="score-table-wrap">
        <table className="score-table">
          <thead>
            <tr>
              <th>Test</th><th>Module</th><th>Date</th><th>Band</th><th>Score</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{r.testName || r.title || "—"}</td>
                <td>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:6, color: SKILL_COLORS[r.section] || "inherit", fontWeight:600, fontSize:13 }}>
                    {SKILL_ICONS[r.section]}{r.section}
                  </span>
                </td>
                <td style={{ color: "var(--in-muted)" }}>{r.date || "—"}</td>
                <td>
                  <span className={`score-badge ${bandClass(r.band)}`}>{band(r.band)}</span>
                </td>
                <td style={{ color: "var(--in-muted)" }}>
                  {r.score != null ? `${r.score}/${r.total}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ── Goals tab (AI Recommendations) ── */
  const goalsContent = (
    <>
      <div className="ins-card" style={{ marginBottom: 20 }}>
        <div className="ins-card-header">
          <div><p className="ins-card-title">AI Recommendations</p><p className="ins-card-sub">Personalised to your performance</p></div>
          <span style={{ fontSize:12, color:"var(--in-accent)", fontWeight:700, display:"flex", alignItems:"center", gap:4 }}><BrainCircuit size={13} />AI Powered</span>
        </div>
        <div className="rec-list">
          {recs.map((r, i) => (
            <div key={i} className="rec-item">
              <div className="rec-icon" style={{ background: r.bg }}>{r.icon}</div>
              <div className="rec-body">
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
              <span className={`rec-priority ${r.priority}`}>{r.priority}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ins-card">
        <div className="ins-card-header">
          <div><p className="ins-card-title">Weekly Study Plan</p><p className="ins-card-sub">Recommended schedule</p></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8 }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => {
            const tasks = [["Listening","Writing"],["Reading"],["Speaking","Listening"],["Writing"],["Reading","Speaking"],["Full Mock"],["Rest"]][i];
            return (
              <div key={day} style={{ background:"rgba(255,255,255,.03)", border:"1px solid var(--in-border)", borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--in-muted)", marginBottom:10, textTransform:"uppercase", letterSpacing:".5px" }}>{day}</div>
                {tasks.map(t => (
                  <div key={t} style={{ fontSize:11, fontWeight:600, color: SKILL_COLORS[t] || "var(--in-accent)", background: t === "Full Mock" ? "rgba(79,142,247,.12)" : "rgba(255,255,255,.04)", borderRadius:6, padding:"4px 6px", marginBottom:5 }}>{t}</div>
                ))}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop:20, textAlign:"center" }}>
          <Link to="/ai-center">
            <button style={{ background:"linear-gradient(135deg,#4f8ef7,#3b6fd4)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:10, fontWeight:700, fontSize:14, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8 }}>
              <Zap size={15} /> Open AI Coach <ArrowRight size={15} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );

  /* ── Main render ── */
  return (
    <div className="insights-page">
      <div className="insights-inner">
        {/* Header */}
        <div className="insights-page-header">
          <h1>Analytics &amp; Insights</h1>
          <p>Deep-dive into your IELTS performance across all modules.</p>
        </div>

        {/* Tabs */}
        <div className="insights-tabs">
          {TABS.map(t => (
            <button key={t} className={`insights-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {loading ? (
          <div className="insights-empty">
            <div style={{ fontSize: 32 }}>⏳</div>
            <h3>Loading your data…</h3>
          </div>
        ) : (
          <>
            {activeTab === "Overview"  && overviewContent}
            {activeTab === "Skills"    && skillsContent}
            {activeTab === "History"   && historyContent}
            {activeTab === "Goals"     && goalsContent}
          </>
        )}
      </div>
    </div>
  );
}
