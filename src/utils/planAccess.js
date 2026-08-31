/**
 * KNARROW PLAN ACCESS & CONTENT GATING SYSTEM
 * Enforces Free Quotas and Paid Plan Access Rules across all Exam Tracks and Arcade Games
 *
 * FREE TIER RULES:
 * 1. Full Mocks: Mocks #1, #2, #3 are FREE for every exam track (IELTS, DET, TOEFL, PTE, GRE, CAT, ACT, SAT, GMAT).
 * 2. IELTS Sectional Practice: 2 Reading, 2 Writing, 2 Listening, 2 Speaking tests are FREE.
 * 3. Arcade Games: 3 Games unlocked for free users (Word Chain, Sentence Fixer, Band Blitz).
 *
 * PAID TIER RULES:
 * 1. Individual Exam Pass (e.g. DET Pass, GMAT Pass): Unlocks ALL 100 mocks & sectionals for that track + ALL Arcade Games.
 * 2. All-Access / Lifetime Pass: Unlocks ALL 8 Exam Tracks (800+ mocks), ALL sectionals, and ALL Arcade Games.
 */

import { auth, db } from "../firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";

// Helper to check user subscription state from localStorage or context
export function getActiveUserPlan() {
  try {
    const raw = localStorage.getItem("knarrow_user_plan");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.type === "ALL_ACCESS" || (parsed.unlockedTracks && parsed.unlockedTracks.length > 0))) {
        return parsed;
      }
    }
  } catch {}

  return { type: "FREE", planId: "free", unlockedTracks: [] };
}

/**
 * Saves purchased plan to localStorage and syncs with Firestore for logged-in user
 */
export async function activateUserPlan(planId, packType, trackId = null, duration = "monthly") {
  const current = getActiveUserPlan();
  const unlockedTracks = new Set(current.unlockedTracks || []);

  if (packType === "all_access" || planId.includes("lifetime") || planId.includes("all_access") || planId.includes("Monthly") || planId.includes("Yearly")) {
    // All access pass unlocks all exam tracks
    ["IELTS", "DET", "TOEFL", "PTE", "GRE", "CAT", "ACT", "SAT", "GMAT"].forEach(t => unlockedTracks.add(t));
  } else if (trackId) {
    unlockedTracks.add(trackId.toUpperCase());
  }

  const payload = {
    type: packType === "all_access" || planId.includes("all_access") || planId.includes("Monthly") ? "ALL_ACCESS" : "SINGLE_TRACK",
    planId,
    duration,
    trackId: trackId ? trackId.toUpperCase() : null,
    unlockedTracks: Array.from(unlockedTracks),
    activatedAt: new Date().toISOString()
  };

  localStorage.setItem("knarrow_user_plan", JSON.stringify(payload));

  // Sync to Firestore if user is logged in
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, {
        premium: true,
        premiumPlan: planId,
        unlockedTracks: Array.from(unlockedTracks),
        premiumExpires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year default extension
        updatedAt: new Date()
      }, { merge: true });
    } catch (err) {
      console.error("Error syncing premium status to Firestore:", err);
    }
  }

  // Fire custom event so components re-render immediately
  window.dispatchEvent(new Event("knarrow_plan_changed"));
  return payload;
}

/**
 * Checks if a specific Full Mock test is accessible
 * @param {string} trackId - e.g. "IELTS", "DET", "GMAT", "CAT", "SAT", "ACT", "TOEFL", "PTE", "GRE"
 * @param {number} mockIndex - 1-indexed mock number (e.g. 1, 2, 3, 4...)
 */
export function isMockUnlocked(trackId = "IELTS", mockIndex = 1) {
  // Mocks #1, #2, #3 are ALWAYS FREE for every exam track
  if (mockIndex <= 3) return true;

  const plan = getActiveUserPlan();
  if (plan.type === "ALL_ACCESS") return true;
  if (plan.unlockedTracks?.includes(trackId.toUpperCase())) return true;

  // Check if current user in auth is premium
  const currentUser = auth.currentUser;
  if (currentUser) {
    const raw = localStorage.getItem("knarrow_user_plan");
    if (raw) return true;
  }

  return false;
}

/**
 * Checks if an IELTS Sectional Practice test is accessible
 * @param {string} section - "reading" | "writing" | "listening" | "speaking"
 * @param {number} testIndex - 1-indexed sectional test number
 */
export function isIELTSSectionUnlocked(section = "reading", testIndex = 1) {
  // 2 Sectional Tests FREE for each section
  if (testIndex <= 2) return true;

  const plan = getActiveUserPlan();
  if (plan.type === "ALL_ACCESS") return true;
  if (plan.unlockedTracks?.includes("IELTS")) return true;

  // Check if current user in auth is premium
  const currentUser = auth.currentUser;
  if (currentUser) {
    const raw = localStorage.getItem("knarrow_user_plan");
    if (raw) return true;
  }

  return false;
}

/**
 * Checks if an Arcade Game is accessible
 * @param {string} gameId - e.g. "word-chain", "sentence-fixer", "band-blitz", "speaking-showdown"...
 */
export function isGameUnlocked(gameId = "") {
  // 3 Games UNLOCKED for Free Users: Word Chain, Sentence Fixer, Band Blitz
  const freeGames = ["word-chain", "sentence-fixer", "sentence-fix", "band-blitz"];
  if (freeGames.includes(gameId.toLowerCase())) return true;

  // Any paid plan unlocks ALL arcade games
  const plan = getActiveUserPlan();
  if (plan.type === "ALL_ACCESS" || (plan.unlockedTracks && plan.unlockedTracks.length > 0)) {
    return true;
  }

  const currentUser = auth.currentUser;
  if (currentUser) {
    const raw = localStorage.getItem("knarrow_user_plan");
    if (raw) return true;
  }

  return false;
}
