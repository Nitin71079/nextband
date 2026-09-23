import { useEffect, useState, useMemo } from "react";
import { getFirestore, collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import { getExamAnalyticsConfig } from "../config/examAnalyticsConfig";
import { Link, useSearchParams } from "react-router-dom";
import {
  TrendingUp, TrendingDown, BookOpen, Headphones,
  PenSquare, Mic, Target, Flame, Trophy, BrainCircuit,
  BarChart3, ArrowRight, AlertCircle, CheckCircle2,
  Zap, Layers, Sparkles, Activity, Radio
} from "lucide-react";
import "../styles/insights.css";

/* ── helpers ── */
function formatVal(v, max = 9) {
  if (v == null || isNaN(v) || v === 0) return "—";
  if (max <= 10) return Number(v).toFixed(1);
  if (max <= 100 && max > 90) return `${Number(v).toFixed(1)}%`;
  return Math.round(v).toString();
}

function bandClass(v, max = 9) {
  const pct = (v / max) * 100;
  return pct >= 75 ? "high" : pct >= 55 ? "medium" : "low";
}

function calculateStreak(allResults) {
  if (!allResults || !allResults.length) return 0;
  const dates = new Set(allResults.map(r => {
    const d = r.completedAt?.toDate ? r.completedAt.toDate()
            : r.createdAt?.toDate ? r.createdAt.toDate()
            : new Date(r.completedAt || r.createdAt || Date.now());
    return d.toISOString().slice(0, 10);
  }));

  let streak = 0;
  let curr = new Date();
  while (true) {
    const key = curr.toISOString().slice(0, 10);
    if (dates.has(key)) {
      streak++;
      curr.setDate(curr.getDate() - 1);
    } else {
      if (streak === 0) {
        curr.setDate(curr.getDate() - 1);
        const prevKey = curr.toISOString().slice(0, 10);
        if (dates.has(prevKey)) {
          streak++;
          curr.setDate(curr.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }
  return streak;
}

function calculateWeeklyGoalPct(allResults) {
  if (!allResults || !allResults.length) return 0;
  const oneWeekAgo = Date.now() - 7 * 86400000;
  const count = allResults.filter(r => {
    const d = r.completedAt?.toDate ? r.completedAt.toDate()
            : r.createdAt?.toDate ? r.createdAt.toDate()
            : new Date(r.completedAt || r.createdAt || Date.now());
    return d.getTime() > oneWeekAgo;
  }).length;
  return Math.min(100, Math.round((count / 5) * 100));
}

function SparklineSVG({ data = [], color = "#4f8ef7", height = 70 }) {
  if (!data || data.length < 2) return null;
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
  const pct = Math.min((value || 0) / max, 1);
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
  const total = segments.reduce((a, s) => a + (s.value || 0), 0) || 1;
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

/* ── Heatmap helper ── */
function buildHeatmap(results) {
  const map = {};
  (results || []).forEach(r => {
    const d = r.completedAt?.toDate ? r.completedAt.toDate()
            : r.createdAt?.toDate ? r.createdAt.toDate()
            : new Date(r.completedAt || r.createdAt || 0);
    if (!isNaN(d.getTime())) {
      const key = d.toISOString().slice(0, 10);
      map[key] = (map[key] || 0) + 1;
    }
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

const TABS = ["Overview", "Skills", "History", "Goals"];

const SKILL_ICONS_MAP = {
  Listening: <Headphones size={16} />,
  Reading: <BookOpen size={16} />,
  Writing: <PenSquare size={16} />,
  Speaking: <Mic size={16} />,
  "Reading & Writing": <BookOpen size={16} />,
  Mathematics: <BarChart3 size={16} />,
  Quantitative: <BarChart3 size={16} />,
  "Quantitative Reasoning": <BarChart3 size={16} />,
  "Verbal Reasoning": <BookOpen size={16} />,
  "Analytical Writing": <PenSquare size={16} />,
  "Data Insights": <BrainCircuit size={16} />,
  "Speaking & Writing": <Mic size={16} />,
  Literacy: <BookOpen size={16} />,
  Comprehension: <Headphones size={16} />,
  Conversation: <Mic size={16} />,
  Production: <PenSquare size={16} />,
  VARC: <BookOpen size={16} />,
  DILR: <BrainCircuit size={16} />,
  QA: <BarChart3 size={16} />,
};

export default function Insights() {
  const { user } = useAuth();
  const { activeTrack } = useExam();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTab = searchParams.get("tab") || "Overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [liveRawResults, setLiveRawResults] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active exam analytics configuration
  const examConfig = useMemo(() => getExamAnalyticsConfig(activeTrack), [activeTrack]);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && TABS.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // Real-time Firestore Listeners (onSnapshot) for Live Updates
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const db = getFirestore(app);

    // 1. Live User Document Listener
    const userUnsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) setUserProfile(snap.data());
    }, () => {});

    let mockData = [];
    let resultsData = [];

    const updateMergedResults = () => {
      const mergedMap = new Map();
      [...mockData, ...resultsData].forEach(item => mergedMap.set(item.id, item));
      const sorted = Array.from(mergedMap.values()).sort((a, b) => {
        const ta = a.completedAt?.toDate ? a.completedAt.toDate()
                 : a.createdAt?.toDate ? a.createdAt.toDate()
                 : new Date(a.completedAt || a.createdAt || 0);
        const tb = b.completedAt?.toDate ? b.completedAt.toDate()
                 : b.createdAt?.toDate ? b.createdAt.toDate()
                 : new Date(b.completedAt || b.createdAt || 0);
        return tb - ta;
      });
      setLiveRawResults(sorted);
      setLoading(false);
    };

    // 2. Real-time Listener on "mockResults" collection
    const q1 = query(collection(db, "mockResults"), where("userId", "==", user.uid));
    const unsubMock = onSnapshot(q1, (snap) => {
      mockData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      updateMergedResults();
    }, () => updateMergedResults());

    // 3. Real-time Listener on "results" collection
    const q2 = query(collection(db, "results"), where("userId", "==", user.uid));
    const unsubResults = onSnapshot(q2, (snap) => {
      resultsData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      updateMergedResults();
    }, () => updateMergedResults());

    return () => {
      userUnsub();
      unsubMock();
      unsubResults();
    };
  }, [user]);

  // Real-time track-filtered results
  const trackResults = useMemo(() => {
    if (!liveRawResults.length) return [];
    return liveRawResults.filter(r => {
      const trackVal = (r.track || r.examType || r.exam || "").toUpperCase();
      if (!trackVal) return true; // Include if general test
      return trackVal === activeTrack.toUpperCase();
    });
  }, [liveRawResults, activeTrack]);

  const hasLiveTrackData = trackResults.length > 0;
  const displayData = hasLiveTrackData ? trackResults : examConfig.demoHistory;

  // Real-time calculated sectional averages
  const avgBySection = useMemo(() => {
    const map = {};
    examConfig.skills.forEach(s => {
      if (hasLiveTrackData) {
        const items = trackResults.filter(r => {
          const sec = (r.section || r.module || r.type || "").toLowerCase();
          return sec === s.id.toLowerCase() || sec === s.label.toLowerCase();
        });
        map[s.id] = items.length
          ? items.reduce((a, r) => a + Number(r.band || r.score || s.defaultVal), 0) / items.length
          : s.defaultVal;
      } else {
        map[s.id] = s.defaultVal;
      }
    });
    return map;
  }, [trackResults, examConfig, hasLiveTrackData]);

  // Real-time overall score
  const overallVal = useMemo(() => {
    const vals = Object.values(avgBySection);
    if (!vals.length) return examConfig.overallScoreDefault;
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return formatVal(avg, examConfig.overallMax);
  }, [avgBySection, examConfig]);

  // Real-time streak & weekly progress calculated from actual live timestamps
  const streak = useMemo(() => {
    if (userProfile?.studyStreak != null) return userProfile.studyStreak;
    return calculateStreak(liveRawResults);
  }, [liveRawResults, userProfile]);

  const weeklyGoal = useMemo(() => {
    return calculateWeeklyGoalPct(liveRawResults);
  }, [liveRawResults]);

  const totalTests = hasLiveTrackData ? trackResults.length : examConfig.demoHistory.length;

  const strongest = Object.entries(avgBySection).sort((a, b) => b[1] - a[1])[0];
  const weakest = Object.entries(avgBySection).sort((a, b) => a[1] - b[1])[0];

  const heatCells = useMemo(() => buildHeatmap(displayData), [displayData]);

  const handleTabChange = (t) => {
    setActiveTab(t);
    setSearchParams({ tab: t });
  };

  /* ── Overview tab content ── */
  const overviewContent = (
    <>
      {/* KPI row */}
      <div className="insights-kpi-row">
        <div className="kpi-card" style={{ background: "linear-gradient(135deg, rgba(79,142,247,.08), rgba(124,58,237,.08))", borderColor: "rgba(79,142,247,.3)" }}>
          <div className="kpi-icon"><TrendingUp size={18} color="#4f8ef7" /></div>
          <div className="kpi-value" style={{ color: "#ffffff" }}>{overallVal}</div>
          <div className="kpi-label">{examConfig.overallMetricLabel} ({examConfig.shortName})</div>
          <div className="kpi-delta up">{examConfig.deltaText}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><Flame size={18} color="#22d3a5" /></div>
          <div className="kpi-value">{streak}</div>
          <div className="kpi-label">Live Day Streak</div>
          <div className="kpi-delta up">↑ Real-time count</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><Trophy size={18} color="#f97316" /></div>
          <div className="kpi-value">{totalTests}</div>
          <div className="kpi-label">Tests Completed</div>
          <div className="kpi-delta neutral">{hasLiveTrackData ? "Live Firestore Log" : "Demo Baseline"}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon"><Target size={18} color="#f87171" /></div>
          <div className="kpi-value">{weeklyGoal}%</div>
          <div className="kpi-label">Weekly Goal Pace</div>
          <div className="kpi-delta up">↑ 7-day window</div>
        </div>
      </div>

      {/* Row 1: sparklines + donut */}
      <div className="insights-row wide" style={{ marginBottom: 20 }}>
        {/* Band/Score trend sparklines */}
        <div className="ins-card">
          <div className="ins-card-header">
            <div>
              <p className="ins-card-title">{examConfig.shortName} Performance Trends</p>
              <p className="ins-card-sub">Real-time sectional progress for {examConfig.fullName}</p>
            </div>
            <span className="ins-card-badge" style={{ background: "rgba(34,211,165,.15)", color: "#22d3a5", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Radio size={12} style={{ animation: "pulse 1.5s infinite" }} /> Live Sync
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: examConfig.skills.length > 3 ? "1fr 1fr" : "repeat(" + examConfig.skills.length + ", 1fr)", gap: 20 }}>
            {examConfig.skills.map((skillObj) => {
              let data = skillObj.trend || [skillObj.defaultVal];
              if (hasLiveTrackData) {
                const rows = trackResults.filter(r => {
                  const sec = (r.section || r.module || r.type || "").toLowerCase();
                  return sec === skillObj.id.toLowerCase() || sec === skillObj.label.toLowerCase();
                }).reverse();
                const scores = rows.map(r => Number(r.band || r.score || 0)).filter(Boolean);
                if (scores.length >= 2) data = scores.slice(-8);
              }
              const last = data[data.length - 1] || skillObj.defaultVal;
              const prev = data[data.length - 2] || last;
              const up = last >= prev;
              return (
                <div key={skillObj.id} className="sparkline-wrap">
                  <div className="sparkline-header">
                    <div>
                      <div style={{ fontSize: 12, color: "var(--in-muted)", fontWeight: 600, marginBottom: 2 }}>{skillObj.label}</div>
                      <div className="sparkline-big" style={{ color: skillObj.color }}>{formatVal(last, skillObj.max)}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: up ? "var(--in-green)" : "var(--in-red)", fontWeight: 700 }}>
                      {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {up ? "+" : ""}{(last - prev).toFixed(1)}
                    </div>
                  </div>
                  <SparklineSVG data={data} color={skillObj.color} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Score distribution donut */}
        <div className="ins-card">
          <div className="ins-card-header">
            <div><p className="ins-card-title">Practice Distribution</p><p className="ins-card-sub">Tests completed by module</p></div>
          </div>
          <div className="donut-wrap">
            <div className="donut-ring">
              <DonutChart segments={examConfig.skills.map(s => ({
                value: displayData.filter(r => {
                  const sec = (r.section || r.module || r.type || "").toLowerCase();
                  return sec === s.id.toLowerCase() || sec === s.label.toLowerCase();
                }).length || 1,
                color: s.color
              }))} />
              <div className="donut-center">
                <span className="donut-center-val">{totalTests}</span>
                <span className="donut-center-lbl">Tests</span>
              </div>
            </div>
            <div className="donut-legend">
              {examConfig.skills.map(s => (
                <div key={s.id} className="donut-legend-row">
                  <span className="donut-dot" style={{ background: s.color }} />
                  <span style={{ color: "var(--in-muted)", fontSize: 13 }}>{s.label}</span>
                  <span>{displayData.filter(r => {
                    const sec = (r.section || r.module || r.type || "").toLowerCase();
                    return sec === s.id.toLowerCase() || sec === s.label.toLowerCase();
                  }).length}</span>
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
            <div><p className="ins-card-title">Study Activity Heatmap</p><p className="ins-card-sub">Live 6-month practice activity</p></div>
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
            {strongest && (() => {
              const skillObj = examConfig.skills.find(s => s.id === strongest[0]) || { label: strongest[0], max: examConfig.overallMax };
              return (
                <div style={{ padding: "16px", borderRadius: 12, background: "rgba(34,211,165,.07)", border: "1px solid rgba(34,211,165,.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <CheckCircle2 size={16} color="var(--in-green)" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--in-green)", textTransform: "uppercase", letterSpacing: ".5px" }}>Strongest Area</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--in-text)" }}>{skillObj.label}</div>
                  <div style={{ fontSize: 13, color: "var(--in-muted)", marginTop: 4 }}>Score {formatVal(strongest[1], skillObj.max)} — Highest section performance!</div>
                </div>
              );
            })()}

            {weakest && (() => {
              const skillObj = examConfig.skills.find(s => s.id === weakest[0]) || { label: weakest[0], max: examConfig.overallMax };
              return (
                <div style={{ padding: "16px", borderRadius: 12, background: "rgba(248,113,113,.07)", border: "1px solid rgba(248,113,113,.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <AlertCircle size={16} color="var(--in-red)" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--in-red)", textTransform: "uppercase", letterSpacing: ".5px" }}>Needs Focus</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "var(--in-text)" }}>{skillObj.label}</div>
                  <div style={{ fontSize: 13, color: "var(--in-muted)", marginTop: 4 }}>Score {formatVal(weakest[1], skillObj.max)} — High priority target for improvement</div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </>
  );

  /* ── Skills tab ── */
  const skillsContent = (
    <>
      <div className="ins-card" style={{ marginBottom: 20 }}>
        <div className="ins-card-header">
          <div><p className="ins-card-title">{examConfig.shortName} Skill Breakdown</p><p className="ins-card-sub">Radial progress indicator relative to max scores</p></div>
        </div>
        <div className="radial-grid">
          {examConfig.skills.map((skillObj) => {
            const val = avgBySection[skillObj.id] || skillObj.defaultVal;
            return (
              <div key={skillObj.id} className="radial-item">
                <div className="radial-ring">
                  <RadialRing value={val} max={skillObj.max} color={skillObj.color} size={80} stroke={7} />
                  <div className="radial-center">{formatVal(val, skillObj.max)}</div>
                </div>
                <div className="radial-label">{skillObj.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ins-card" style={{ marginBottom: 20 }}>
        <div className="ins-card-header">
          <div><p className="ins-card-title">Target Score Progress</p><p className="ins-card-sub">Current standing vs {examConfig.shortName} goal benchmark</p></div>
          <span className="ins-card-badge" style={{ background: "rgba(139,92,246,.15)", color: "#8b5cf6" }}>Target Goal: {examConfig.targetVal}</span>
        </div>
        <div className="target-track">
          {examConfig.skills.map((skillObj) => {
            const val = avgBySection[skillObj.id] || skillObj.defaultVal;
            const goal = skillObj.target;
            const goalPct = (goal / skillObj.max) * 100;
            const curPct = Math.min((val / skillObj.max) * 100, 100);
            return (
              <div key={skillObj.id} className="target-row">
                <div className="target-name">{skillObj.label}</div>
                <div className="target-bars">
                  <div className="target-bar-bg" />
                  <div className="target-bar-current" style={{ width: `${curPct}%`, background: skillObj.color }} />
                  <div className="target-bar-goal-marker" style={{ left: `${Math.min(goalPct, 98)}%` }} title={`Goal: ${goal}`} />
                </div>
                <div className="target-scores">
                  <span className="target-current-val" style={{ color: skillObj.color }}>{formatVal(val, skillObj.max)}</span>
                  <span className="target-goal-val">/ {goal}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ins-card">
        <div className="ins-card-header">
          <div><p className="ins-card-title">Average Sectional Comparison</p><p className="ins-card-sub">Across all {examConfig.shortName} attempts</p></div>
        </div>
        <div className="bar-chart">
          {examConfig.skills.map((skillObj) => {
            const val = avgBySection[skillObj.id] || skillObj.defaultVal;
            const pct = Math.min((val / skillObj.max) * 100, 100);
            return (
              <div key={skillObj.id} className="bar-row">
                <div className="bar-label">{skillObj.label}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%`, background: skillObj.color }} />
                </div>
                <div className="bar-val">{formatVal(val, skillObj.max)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  /* ── History tab ── */
  const historyContent = (
    <div className="ins-card">
      <div className="ins-card-header">
        <div>
          <p className="ins-card-title">{examConfig.shortName} Test History</p>
          <p className="ins-card-sub">{totalTests} attempt(s) recorded live in {examConfig.fullName}</p>
        </div>
        <span className="ins-card-badge">{hasLiveTrackData ? "Real-time Firestore Log" : "Demo Preview Log"}</span>
      </div>
      <div className="score-table-wrap">
        <table className="score-table">
          <thead>
            <tr>
              <th>Test Title</th><th>Section / Module</th><th>Date</th><th>Score</th><th>Raw Detail</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((r, i) => {
              const secName = r.section || r.module || r.type || "Section";
              const skillObj = examConfig.skills.find(s => s.id.toLowerCase() === secName.toLowerCase() || s.label.toLowerCase() === secName.toLowerCase()) || examConfig.skills[i % examConfig.skills.length];
              const dateStr = r.completedAt?.toDate ? r.completedAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            : r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            : r.date || "Just now";
              const scoreDisplay = formatVal(r.band || r.score || skillObj.defaultVal, skillObj.max);
              return (
                <tr key={r.id || i}>
                  <td style={{ fontWeight: 600 }}>{r.testName || r.testTitle || r.title || `${examConfig.shortName} Practice Test`}</td>
                  <td>
                    <span style={{ display:"inline-flex", alignItems:"center", gap:6, color: skillObj.color, fontWeight:600, fontSize:13 }}>
                      {SKILL_ICONS_MAP[skillObj.id] || <Layers size={14} />}{skillObj.label}
                    </span>
                  </td>
                  <td style={{ color: "var(--in-muted)" }}>{dateStr}</td>
                  <td>
                    <span className={`score-badge ${bandClass(r.band || r.score || skillObj.defaultVal, skillObj.max)}`}>
                      {scoreDisplay}
                    </span>
                  </td>
                  <td style={{ color: "var(--in-muted)" }}>
                    {r.score != null && r.total != null ? `${r.score}/${r.total}` : "Completed"}
                  </td>
                </tr>
              );
            })}
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
          <div><p className="ins-card-title">{examConfig.shortName} Live AI Recommendations</p><p className="ins-card-sub">Strategic action items calculated from your live performance data</p></div>
          <span style={{ fontSize:12, color:"var(--in-accent)", fontWeight:700, display:"flex", alignItems:"center", gap:4 }}><BrainCircuit size={13} />Live AI Engine</span>
        </div>
        <div className="rec-list">
          {examConfig.recs.map((r, i) => (
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
          <div><p className="ins-card-title">Live Dynamic Study Schedule</p><p className="ins-card-sub">Real-time study routine optimized for {examConfig.shortName}</p></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8 }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => {
            const skill1 = examConfig.skills[i % examConfig.skills.length]?.label || "Practice";
            const skill2 = examConfig.skills[(i + 1) % examConfig.skills.length]?.label || "Review";
            const tasks = [
              [skill1, skill2],
              [skill1],
              [skill2, skill1],
              [skill2],
              [skill1, "AI Review"],
              ["Full Mock"],
              ["Rest & Sync"]
            ][i];
            return (
              <div key={day} style={{ background:"rgba(255,255,255,.03)", border:"1px solid var(--in-border)", borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--in-muted)", marginBottom:10, textTransform:"uppercase", letterSpacing:".5px" }}>{day}</div>
                {tasks.map(t => (
                  <div key={t} style={{ fontSize:11, fontWeight:600, color: t === "Full Mock" ? "#4f8ef7" : "var(--in-accent)", background: t === "Full Mock" ? "rgba(79,142,247,.12)" : "rgba(255,255,255,.04)", borderRadius:6, padding:"4px 6px", marginBottom:5 }}>{t}</div>
                ))}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop:20, textAlign:"center" }}>
          <Link to="/ai-assistant">
            <button style={{ background:"linear-gradient(135deg,#4f8ef7,#3b6fd4)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:10, fontWeight:700, fontSize:14, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8 }}>
              <Zap size={15} /> Launch {examConfig.shortName} AI Assistant <ArrowRight size={15} />
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
        <div className="insights-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 99, background: "rgba(34,211,165,.12)", border: "1px solid rgba(34,211,165,.3)", fontSize: 12, fontWeight: 700, color: "#22d3a5", marginBottom: 10 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#22d3a5", boxShadow: "0 0 10px #22d3a5", animation: "pulse 1.5s infinite" }} />
              Live Firestore Real-Time Sync Active ({examConfig.shortName})
            </div>
            <h1>Analytics &amp; Insights — {examConfig.shortName}</h1>
            <p>{examConfig.subtitle}</p>
          </div>

          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid var(--in-border)", padding: "10px 18px", borderRadius: 14, textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "var(--in-muted)", fontWeight: 600, textTransform: "uppercase" }}>Active Track</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#4f8ef7", marginTop: 2 }}>{examConfig.shortName}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="insights-tabs">
          {TABS.map(t => (
            <button key={t} className={`insights-tab ${activeTab === t ? "active" : ""}`} onClick={() => handleTabChange(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {loading ? (
          <div className="insights-empty" style={{ padding: "60px 0", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>⚡</div>
            <h3>Connecting to Live Firestore Real-Time Sync…</h3>
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
