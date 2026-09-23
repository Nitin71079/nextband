/**
 * KNARROW GMAT 2026 — EXAM SESSION & ANSWER PERSISTENCE MANAGER
 * Reliably persists active exam attempt state to LocalStorage and Firestore.
 * Prevents loss of test progress on refresh, network blips, or accidental navigation.
 */

const LOCAL_STORAGE_PREFIX = "knarrow_gmat_session_";

export const saveGMATSessionState = (testId, sessionData) => {
  if (!testId) return;
  try {
    const key = `${LOCAL_STORAGE_PREFIX}${testId}`;
    const payload = {
      ...sessionData,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (err) {
    console.warn("Failed to persist GMAT session state to LocalStorage:", err);
  }
};

export const loadGMATSessionState = (testId) => {
  if (!testId) return null;
  try {
    const key = `${LOCAL_STORAGE_PREFIX}${testId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to load GMAT session state from LocalStorage:", err);
    return null;
  }
};

export const clearGMATSessionState = (testId) => {
  if (!testId) return;
  try {
    const key = `${LOCAL_STORAGE_PREFIX}${testId}`;
    localStorage.removeItem(key);
  } catch (err) {
    console.warn("Failed to clear GMAT session state:", err);
  }
};
