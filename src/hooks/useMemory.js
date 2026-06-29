import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
  getMemory,
  initializeMemory,
} from "../repositories/memoryRepository";

export default function useMemory() {
  const { user } = useAuth();

  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function refresh() {
    if (!user) {
      setMemory(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      await initializeMemory(user.uid);

      const data = await getMemory(user.uid);

      setMemory(data);
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
    memory,
    loading,
    error,
    refresh,
  };
}