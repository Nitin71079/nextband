/**
 * useLiveData — provides real-time user analytics for the dashboard.
 *
 * Data sources:
 *   - Firestore "results" collection  → per-skill scores, band history
 *   - Firestore "users/{uid}"         → streak, goalBand, targetBand (via AuthContext onSnapshot)
 *   - localStorage knarrow_exam       → in-progress / last CBT session
 *   - localStorage knarrow_history    → full CBT history
 */

import { useEffect, useState, useCallback } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { getExamHistory, getExamSession } from "../services/examSession";

// ─── helpers ─────────────────────────────────────────────────────────────────

function timeAgo(ts) {
  if (!ts) return "Recently";
  const date = ts?.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 3600)  return "Today";
  if (diff < 86400) return "Today";
  if (diff < 172800) return "Yesterday";
  const days = Math.floor(diff / 86400);
  return `${days} Days Ago`;
}

function bandFromResults(results, type) {
  const typed = results.filter(r => r.type === type && r.band);
  if (!typed.length) return null;
  return Number(typed[0].band);
}

function avgBand(results) {
  const bands = results.filter(r => r.band).map(r => Number(r.band));
  if (!bands.length) return null;
  return +(bands.reduce((a, b) => a + b, 0) / bands.length).toFixed(1);
}

function weeklyProgress(results) {
  const oneWeekAgo = Date.now() - 7 * 86400000;
  const thisWeek = results.filter(r => {
    const ts = r.completedAt?.toDate ? r.completedAt.toDate() : new Date(r.completedAt || 0);
    return ts.getTime() > oneWeekAgo;
  });
  // Target: 5 tests/week → percentage
  return Math.min(100, Math.round((thisWeek.length / 5) * 100));
}

function weakestSkill(skills) {
  const entries = Object.entries(skills).filter(([, v]) => v !== null);
  if (!entries.length) return "Writing";
  return entries.sort((a, b) => a[1] - b[1])[0][0];
}

function typeLabel(type) {
  return { reading: "Reading Practice", listening: "Listening Practice", writing: "Writing Evaluation", speaking: "Speaking Practice", ai: "AI Coach" }[type] || "Practice";
}

// ─── Default analytics (used while loading or if Firestore permission denied) ──
const DEFAULT_ANALYTICS = {
  studyStreak: 0,
  averageBand: 0,
  weeklyProgress: 0,
  testsCompleted: 0,
  reading: 0,
  listening: 0,
  writing: 0,
  speaking: 0,
  bestBand: 0,
  dailyGoal: {
    title: "Complete a practice test today",
    time: "30 Minutes",
    progress: 0,
    completed: false,
  },
  recommendation: {
    title: "Start Practising",
    description: "Complete your first test to get personalised AI recommendations.",
    priority: "High Priority",
    estimatedGain: "+0.5 Band",
    studyTime: "30 mins",
  },
  ai: {
    currentBand: 0,
    confidence: 0,
    weakestSkill: "Writing Accuracy",
    recommendation: [
      "Complete your first IELTS practice test.",
      "Try the AI Writing Evaluation.",
      "Explore the Study Planner.",
    ],
  },
};

const DEFAULT_MEMORY = {
  profile: { targetBand: 8 },
  progress: {
    lastModule: "/listening",
    lastLesson: "Start your first lesson",
    currentSection: "Section 1",
    remainingTime: "60 minutes",
    completion: 0,
  },
};

export function useLiveData() {
  const { user, name, premium } = useAuth();
  const [loading, setLoading] = useState(true);
  // Initialize with defaults — components never receive null
  const [analytics, setAnalytics] = useState(DEFAULT_ANALYTICS);
  const [memory, setMemory] = useState(DEFAULT_MEMORY);
  const [activities, setActivities] = useState([]);
  const [userDoc, setUserDoc] = useState(null);

  const firstName = name || user?.email?.split("@")[0] || "Student";

  // ── Live Firestore: user document (streak, goalBand) ───────────────────────
  useEffect(() => {
    if (!user) return;
    const db = getFirestore(app);
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) setUserDoc(snap.data());
    });
    return () => unsub();
  }, [user]);

  // ── Live Firestore: results collection ────────────────────────────────────
  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const db = getFirestore(app);
    const q = query(
      collection(db, "results"),
      where("userId", "==", user.uid),
      limit(50)
    );

    const unsub = onSnapshot(q, (snap) => {
      // Sort client-side to avoid composite index requirement
      const results = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const ta = a.completedAt?.toDate ? a.completedAt.toDate() : new Date(a.completedAt || 0);
          const tb = b.completedAt?.toDate ? b.completedAt.toDate() : new Date(b.completedAt || 0);
          return tb - ta;
        });

      // ── Skill bands ──────────────────────────────────────────────────────
      const reading   = bandFromResults(results, "reading");
      const listening = bandFromResults(results, "listening");
      const writing   = bandFromResults(results, "writing");
      const speaking  = bandFromResults(results, "speaking");
      const avg       = avgBand(results) ?? 0;

      const skills = { reading, listening, writing, speaking };
      const weak   = weakestSkill({ Reading: reading, Listening: listening, Writing: writing, Speaking: speaking });

      // ── CBT history (localStorage) ───────────────────────────────────────
      const cbtHistory = getExamHistory();
      const lastCBT    = cbtHistory[0] || null;
      const cbtBands   = cbtHistory.map(h => Number(h.overall || 0)).filter(Boolean);
      const bestCBT    = cbtBands.length ? Math.max(...cbtBands) : null;

      // ── In-progress session ───────────────────────────────────────────────
      const session = getExamSession();

      // ── Daily goal ─────────────────────────────────────────────────────
      // Count tests done today
      const todayStart = new Date(); todayStart.setHours(0,0,0,0);
      const todayResults = results.filter(r => {
        const ts = r.completedAt?.toDate ? r.completedAt.toDate() : new Date(r.completedAt || 0);
        return ts >= todayStart;
      });
      const dailyTarget = 2;
      const dailyProgress = Math.min(100, Math.round((todayResults.length / dailyTarget) * 100));

      // ── Weekly progress ────────────────────────────────────────────────
      const weekly = weeklyProgress(results);

      // ── Recent activities (from Firestore results) ────────────────────
      const recentActivities = results.slice(0, 6).map(r => ({
        title: typeLabel(r.type),
        description: r.band ? `Band ${r.band} · ${r.testTitle || r.type}` : r.testTitle || r.type,
        time: timeAgo(r.completedAt),
        type: r.type || "reading",
      }));

      // ── Streak & target ────────────────────────────────────────────────
      const streak     = userDoc?.streak     ?? 0;
      const targetBand = userDoc?.goalBand   ?? userDoc?.targetBand ?? 8;

      // ── AI confidence: based on how many tests taken ───────────────────
      const confidence = Math.min(99, 60 + results.length * 2);

      // ── Recommendation: focus on weakest skill ────────────────────────
      const weakMap = {
        Reading:   { title: "Focus on Reading Strategies",  desc: "Practice skimming and scanning. Your Reading score has the most room for improvement." },
        Listening: { title: "Improve Listening Accuracy",    desc: "Focus on note-taking and distractor recognition in Listening tests." },
        Writing:   { title: "Focus on Writing Quality",      desc: "Improve Task Response and Grammar Range to boost your Writing band." },
        Speaking:  { title: "Practice Speaking Fluency",     desc: "Record yourself and work on pronunciation, vocabulary and fluency." },
      };
      const rec = weakMap[weak] || weakMap.Writing;

      setAnalytics({
        studyStreak:     streak,
        averageBand:     avg || (lastCBT ? Number(lastCBT.overall || 0) : 0),
        weeklyProgress:  weekly,
        testsCompleted:  results.length + cbtHistory.length,
        reading:         reading  ?? lastCBT?.reading  ?? 0,
        listening:       listening ?? lastCBT?.listening ?? 0,
        writing:         writing  ?? lastCBT?.writing  ?? 0,
        speaking:        speaking ?? lastCBT?.speaking ?? 0,
        bestBand:        bestCBT ?? avg,
        dailyGoal: {
          title:     todayResults.length === 0 ? "Complete a practice test today" : `Great! ${todayResults.length} test${todayResults.length > 1 ? "s" : ""} done today`,
          time:      "30 Minutes",
          progress:  dailyProgress,
          completed: dailyProgress >= 100,
        },
        recommendation: {
          title:         rec.title,
          description:   rec.desc,
          priority:      "High Priority",
          estimatedGain: "+0.5 Band",
          studyTime:     "30 mins",
        },
        ai: {
          currentBand:  avg || 0,
          confidence,
          weakestSkill: weak + " Accuracy",
          recommendation: [
            `Focus on ${weak} today for the fastest improvement.`,
            "Complete one full section practice.",
            "Review your previous test mistakes.",
          ],
        },
      });

      // ── Memory / continue learning ─────────────────────────────────────
      const moduleMap = { reading: "/reading", listening: "/listening", writing: "/writing", speaking: "/speaking" };
      const lastType  = results[0]?.type ?? "listening";
      setMemory({
        profile:  { targetBand },
        progress: {
          lastModule:      session?.lastModule    ?? moduleMap[lastType] ?? "/listening",
          lastLesson:      results[0]?.testTitle  ?? session?.lastLesson ?? "Continue where you left off",
          currentSection:  session?.section       ?? "Section 1",
          remainingTime:   session?.remainingTime ?? "60 minutes",
          completion:      session?.completion    ?? (results.length > 0 ? 15 : 0),
        },
      });

      setActivities(recentActivities);
      setLoading(false);
    }, (err) => {
      console.error("useLiveData error:", err);
      setLoading(false);
    });

    return () => unsub();
  }, [user, userDoc]);

  return { loading, analytics, memory, activities, premium, firstName };
}
