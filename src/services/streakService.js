const STREAK_KEY =
  "nextband_streak";

export function updateStreak() {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const streakData =
    JSON.parse(
      localStorage.getItem(
        STREAK_KEY
      ) || "{}"
    );

  if (
    streakData.lastVisit ===
    today
  ) {
    return streakData;
  }

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const yesterdayString =
    yesterday
      .toISOString()
      .split("T")[0];

  let current =
    streakData.current || 0;

  if (
    streakData.lastVisit ===
    yesterdayString
  ) {
    current += 1;
  } else {
    current = 1;
  }

  const longest =
    Math.max(
      current,
      streakData.longest || 0
    );

  const updated = {
    current,
    longest,
    lastVisit: today,
  };

  localStorage.setItem(
    STREAK_KEY,
    JSON.stringify(updated)
  );

  return updated;
}

export function getStreak() {
  return JSON.parse(
    localStorage.getItem(
      STREAK_KEY
    ) ||
      JSON.stringify({
        current: 0,
        longest: 0,
      })
  );
}