import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getEssayHistory,
} from "../repositories/essayRepository";

export default function useEssayHistory() {
  const { user } = useAuth();

  const [essays, setEssays] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  async function refresh() {
    if (!user) {
      setEssays([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const history =
        await getEssayHistory(user.uid);

      setEssays(history);
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
    essays,
    loading,
    error,
    refresh,
  };
}