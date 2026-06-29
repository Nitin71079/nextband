import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getAnalytics,
  initializeAnalytics,
} from "../repositories/analyticsRepository";

export default function useAnalytics() {
  const { user } = useAuth();

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  async function refresh() {
    if (!user) {
      setAnalytics(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      await initializeAnalytics(
        user.uid
      );

      const data =
        await getAnalytics(user.uid);

      setAnalytics(data);
    } catch (err) {
      console.error(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [user]);

  return {
    analytics,
    loading,
    error,
    refresh,
  };
}