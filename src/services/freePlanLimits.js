/**
 * Free Plan Limits
 * ─────────────────────────────────────────────────────────
 * Centralised helpers for enforcing what free users can access.
 *
 * Tests are 0-indexed in their respective arrays.
 * Limits are EXCLUSIVE — index < limit means allowed.
 */

export const FREE_LIMITS = {
  academicReading: 3,   // tests 0,1,2 free (index 0–2)
  generalReading:  3,
  writing:         3,
  speaking:        3,
  listening:       1,   // test 0 free
};

/* ── Reading ── */
import academicTests from "../data/reading/academic/academicTests";
import generalTests  from "../data/reading/general/generalTests";
import listeningTests from "../data/listening/tests";
import writingTests   from "../data/writing/tests";
import speakingTests  from "../data/speaking/tests";

export function isReadingTestLocked(testId, isGeneral, premium) {
  if (premium) return false;
  const pool  = isGeneral ? generalTests : academicTests;
  const limit = isGeneral ? FREE_LIMITS.generalReading : FREE_LIMITS.academicReading;
  const idx   = pool.findIndex((t) => String(t.id) === String(testId));
  return idx === -1 || idx >= limit;
}

export function isListeningTestLocked(testId, premium) {
  if (premium) return false;
  const idx = listeningTests.findIndex((t) => t.id === testId);
  return idx === -1 || idx >= FREE_LIMITS.listening;
}

export function isWritingTestLocked(testId, premium) {
  if (premium) return false;
  const idx = writingTests.findIndex((t) => t.id === testId);
  return idx === -1 || idx >= FREE_LIMITS.writing;
}

export function isSpeakingTestLocked(testId, premium) {
  if (premium) return false;
  const idx = speakingTests.findIndex((t) => t.id === testId);
  return idx === -1 || idx >= FREE_LIMITS.speaking;
}

/* ── Full mock attempts (localStorage) ── */
const FULL_MOCK_KEY = "knarrow_full_mock_used";

function getFullMockUsed() {
  try {
    return JSON.parse(localStorage.getItem(FULL_MOCK_KEY) || "{}");
  } catch {
    return {};
  }
}

export function hasUsedFullMock(type) {
  const used = getFullMockUsed();
  // Free users get ONLY 1 full CBT mock attempt total (either academic OR general, only once)
  return Object.keys(used).length > 0 || !!used.academic || !!used.general || !!used.any;
}

export function markFullMockUsed(type) {
  const used = getFullMockUsed();
  used[type || "general"] = true;
  used.any = true;
  localStorage.setItem(FULL_MOCK_KEY, JSON.stringify(used));
}

export function isFullMockLocked(type, premium) {
  if (premium) return false;
  return hasUsedFullMock(type);
}
