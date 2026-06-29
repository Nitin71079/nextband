import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getEssay } from "../repositories/essayRepository";

export default function useEssay(essayId) {
  const { user } = useAuth();

  const [essay, setEssay] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  async function refresh() {
    if (!user || !essayId) {
      setEssay(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data =
        await getEssay(
          user.uid,
          essayId
        );

      setEssay(data);
    } catch (err) {
      console.error(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [user, essayId]);

  return {
    essay,
    loading,
    error,
    refresh,
  };
}