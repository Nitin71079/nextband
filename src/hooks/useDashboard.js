import { useEffect, useState, useCallback } from "react";

import { useAuth } from "../context/AuthContext";

export function useDashboard() {
  const {
    user,
    name,
    premium,
  } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [analytics, setAnalytics] =
    useState(null);

  const [memory, setMemory] =
    useState(null);

  const [activities, setActivities] =
    useState([]);

  const loadDashboard =
    useCallback(async () => {
      try {
        setLoading(true);

        /*
        =======================================
        Firestore comes in Part 1C

        This hook already matches the final
        architecture.

        Replace the hardcoded data below
        with dashboardService()
        =======================================
        */

        setAnalytics({
          studyStreak: 18,

          averageBand: 7.5,

          weeklyProgress: 82,

          testsCompleted: 34,

          reading: 7.5,

          listening: 8,

          writing: 6.5,

          speaking: 6.5,

          dailyGoal: {
            title:
              "Complete One Listening Test",

            time: "30 Minutes",

            progress: 60,

            completed: false,
          },

          recommendation: {
            title:
              "Focus on Grammar Accuracy",

            description:
              "Improve Grammar Range & Accuracy and Task Response to consistently achieve Band 8.",

            priority:
              "High Priority",

            estimatedGain:
              "+0.5 Band",

            studyTime:
              "30 mins",
          },

          ai: {
            currentBand: 7.5,

            confidence: 92,

            weakestSkill:
              "Grammar Accuracy",

            recommendation: [
              "Complete one Writing Task 2 today.",

              "Review complex sentence structures.",

              "Practice speaking for 15 minutes.",
            ],
          },
        });

        setMemory({
          profile: {
            targetBand: 8,
          },

          progress: {
            lastModule:
              "/listening",

            lastLesson:
              "Listening Test 1",

            currentSection:
              "Section 3",

            remainingTime:
              "12 minutes",

            completion: 72,
          },
        });

        setActivities([
          {
            title:
              "Reading Practice",

            description:
              "Completed Reading Test 3",

            time:
              "Today",

            type:
              "reading",
          },

          {
            title:
              "Writing Evaluation",

            description:
              "AI estimated Band 7.0",

            time:
              "Yesterday",

            type:
              "writing",
          },

          {
            title:
              "Speaking Practice",

            description:
              "Cue Card Evaluation Complete",

            time:
              "2 Days Ago",

            type:
              "speaking",
          },

          {
            title:
              "AI Coach",

            description:
              "Generated New Study Plan",

            time:
              "3 Days Ago",

            type:
              "ai",
          },
        ]);

        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    loading,

    error,

    analytics,

    memory,

    activities,

    premium,

    firstName:
      name ||
      user?.email?.split("@")[0] ||
      "Student",

    refresh:
      loadDashboard,
  };
}