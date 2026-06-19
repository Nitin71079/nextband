const KEY =
  "ai_usage";

export function trackAIUsage() {
  const count =
    Number(
      localStorage.getItem(
        KEY
      ) || 0
    );

  localStorage.setItem(
    KEY,
    count + 1
  );
}

export function getAIUsage() {
  return Number(
    localStorage.getItem(
      KEY
    ) || 0
  );
}

export function canUseAI() {
  return true;
}