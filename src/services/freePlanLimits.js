/**
 * Free Plan Limits
 * ─────────────────────────────────────────────────────────
 * Centralised helpers for enforcing free tier access rules.
 *
 * Free Tier Gating Rules:
 * - Full Mock Exams: Locked 100% until payment (0 free attempts).
 * - Academic Reading: 1 Test free (Test 1), rest locked.
 * - General Reading: 1 Test free (Test 1), rest locked.
 * - Writing: 1 Test free (Test 1), rest locked.
 * - Speaking: 1 Test free (Test 1), rest locked.
 * - Listening: 0 Tests free (ALL listening tests locked until payment).
 */

export const FREE_LIMITS = {
  academicReading: 1,
  generalReading:  1,
  writing:         1,
  speaking:        1,
  listening:       0,
};

import academicTests from "../data/reading/academic/academicTests";
import generalTests  from "../data/reading/general/generalTests";
import listeningTests from "../data/listening/tests";
import writingTests   from "../data/writing/tests";
import speakingTests  from "../data/speaking/tests";

export function isReadingTestLocked(testId, isGeneral, premium) {
  if (premium) return false;
  const tests = isGeneral ? generalTests : academicTests;
  const index = tests.findIndex((t) => String(t.id) === String(testId));
  const limit = isGeneral ? FREE_LIMITS.generalReading : FREE_LIMITS.academicReading;
  return index < 0 || index >= limit;
}

export function isListeningTestLocked(testId, premium) {
  if (premium) return false;
  return true; // All listening tests locked for free users until payment
}

export function isWritingTestLocked(testId, premium) {
  if (premium) return false;
  const index = writingTests.findIndex((t) => String(t.id) === String(testId));
  return index < 0 || index >= FREE_LIMITS.writing;
}

export function isSpeakingTestLocked(testId, premium) {
  if (premium) return false;
  const index = speakingTests.findIndex((t) => String(t.id) === String(testId));
  return index < 0 || index >= FREE_LIMITS.speaking;
}

const FULL_MOCK_KEY = "knarrow_full_mock_used";

function getFullMockUsed() {
  try {
    return JSON.parse(localStorage.getItem(FULL_MOCK_KEY) || "{}");
  } catch {
    return {};
  }
}

export function hasUsedFullMock(type) {
  return true;
}

export function markFullMockUsed(type) {
  const used = getFullMockUsed();
  used[type || "general"] = true;
  used.any = true;
  localStorage.setItem(FULL_MOCK_KEY, JSON.stringify(used));
}

export function isFullMockLocked(type, premium) {
  if (premium) return false;
  return true; // Full mocks locked 100% until payment
}
