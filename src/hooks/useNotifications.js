import { useEffect, useState } from "react";
import { getResults } from "../services/resultService";
import { useAuth } from "../context/AuthContext";

function formatTime(date) {
  if (!date) return null;
  const d = date.toDate ? date.toDate() : new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

function generateNotifications(results) {
  if (!results || results.length === 0) {
    return [
      {
        id: "welcome",
        icon: "👋",
        title: "Welcome to Knarrow",
        message:
          "Start your first mock test to get personalized insights and band predictions.",
        time: null,
        color: "#2563eb",
        read: false,
      },
      {
        id: "ai-ready",
        icon: "🤖",
        title: "AI Evaluation Ready",
        message:
          "Complete a Writing or Speaking test to get instant AI band scores and feedback.",
        time: null,
        color: "#8b5cf6",
        read: false,
      },
    ];
  }

  const notifications = [];

  // ── Streak ──────────────────────────────────────────────────────────────
  const sortedDates = results
    .map((r) => {
      const raw = r.completedAt;
      if (!raw) return null;
      const d = raw.toDate ? raw.toDate() : new Date(raw);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    })
    .filter(Boolean)
    .sort((a, b) => b - a);

  const uniqueDays = [
    ...new Map(sortedDates.map((d) => [d.getTime(), d])).values(),
  ].sort((a, b) => b - a);

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const diff =
      (uniqueDays[i - 1].getTime() - uniqueDays[i].getTime()) / 86400000;
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  if (streak >= 2) {
    notifications.push({
      id: "streak",
      icon: "🔥",
      title: "Study Streak",
      message: `You've been practicing ${streak} days in a row. Keep it up!`,
      time: formatTime(results[0]?.completedAt),
      color: "#f97316",
      read: false,
    });
  }

  // ── Band Milestone (band >= 7.0) ─────────────────────────────────────
  const milestone = results.find(
    (r) => parseFloat(r.band ?? r.score) >= 7.0
  );
  if (milestone) {
    notifications.push({
      id: "milestone",
      icon: "🏆",
      title: "Band Milestone",
      message: `You hit Band ${milestone.band ?? milestone.score} on ${milestone.type}! You're getting closer to your target.`,
      time: formatTime(milestone.completedAt),
      color: "#22c55e",
      read: false,
    });
  }

  // ── Target Band Nearing (avg >= 6.5) ────────────────────────────────
  const bandsWithValues = results
    .map((r) => parseFloat(r.band ?? r.score))
    .filter((v) => !isNaN(v));

  if (bandsWithValues.length > 0) {
    const avg =
      bandsWithValues.reduce((sum, v) => sum + v, 0) / bandsWithValues.length;
    if (avg >= 6.5) {
      notifications.push({
        id: "target-nearing",
        icon: "🎯",
        title: "Target Band Nearing",
        message: `Your average band is ${avg.toFixed(1)}. Band 7.0 is within reach!`,
        time: null,
        color: "#2563eb",
        read: false,
      });
    }
  }

  // ── Weekly Achievement (>= 3 results in last 7 days) ────────────────
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
  const recentResults = results.filter((r) => {
    const raw = r.completedAt;
    if (!raw) return false;
    const d = raw.toDate ? raw.toDate() : new Date(raw);
    return d >= sevenDaysAgo;
  });

  if (recentResults.length >= 3) {
    notifications.push({
      id: "weekly",
      icon: "⭐",
      title: "Weekly Achievement",
      message: `You completed ${recentResults.length} practice sessions this week. Great consistency!`,
      time: null,
      color: "#8b5cf6",
      read: false,
    });
  }

  // ── First Test Completed ─────────────────────────────────────────────
  if (results.length === 1) {
    notifications.push({
      id: "first-test",
      icon: "🎉",
      title: "First Mock Complete",
      message:
        "You've completed your first mock test. Check your results!",
      time: formatTime(results[0].completedAt),
      color: "#06b6d4",
      read: false,
    });
  }

  // ── Improvement (2+ results of same type, latest > previous) ────────
  const byType = {};
  results.forEach((r) => {
    if (!r.type) return;
    if (!byType[r.type]) byType[r.type] = [];
    byType[r.type].push(r);
  });

  Object.entries(byType).forEach(([type, typeResults]) => {
    if (typeResults.length < 2) return;

    // already sorted desc by completedAt from Firestore
    const latest = parseFloat(typeResults[0].band ?? typeResults[0].score);
    const previous = parseFloat(typeResults[1].band ?? typeResults[1].score);

    if (!isNaN(latest) && !isNaN(previous) && latest > previous) {
      const diff = (latest - previous).toFixed(1);
      notifications.push({
        id: `improvement-${type}`,
        icon: "📈",
        title: "Improvement Detected",
        message: `Your ${type} score improved by +${diff} bands. Keep practicing!`,
        time: formatTime(typeResults[0].completedAt),
        color: "#22c55e",
        read: false,
      });
    }
  });

  return notifications;
}

export default function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) {
      setNotifications(generateNotifications(null));
      return;
    }

    let cancelled = false;

    getResults(user.uid)
      .then((results) => {
        if (!cancelled) {
          setNotifications(generateNotifications(results));
        }
      })
      .catch((err) => {
        console.error("useNotifications: failed to fetch results", err);
        if (!cancelled) {
          setNotifications(generateNotifications(null));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return { notifications, unreadCount, markAllRead };
}
