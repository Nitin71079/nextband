/**
 * gameStatsService.js
 * Persists game results and study time to Firestore users/{uid}.
 *
 * Fields added/incremented on users doc:
 *   gameWins        – total wins across all games
 *   gameLosses      – total losses
 *   gameTies        – total ties
 *   gamesPlayed     – total games played
 *   vocabBattleWins / readingRaceWins / …  per-game win counters
 *   timeSpentMinutes – cumulative study/game minutes
 */

import { doc, updateDoc, increment, getFirestore } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

/**
 * Save the outcome of a game.
 * @param {string} userId
 * @param {"vocab-battle"|"reading-race"|string} gameType
 * @param {"win"|"loss"|"tie"} outcome
 */
export async function saveGameResult(userId, gameType, outcome) {
  if (!userId) return;

  const perGameWinField = {
    "vocab-battle": "vocabBattleWins",
    "reading-race": "readingRaceWins",
    "band-blitz":   "bandBlitzWins",
    "word-chain":   "wordChainWins",
    "synonym-sprint":"synonymSprintWins",
    "sentence-fix": "sentenceFixWins",
  };

  const updates = {
    gamesPlayed: increment(1),
    ...(outcome === "win"  && { gameWins:   increment(1) }),
    ...(outcome === "loss" && { gameLosses: increment(1) }),
    ...(outcome === "tie"  && { gameTies:   increment(1) }),
  };

  const winField = perGameWinField[gameType];
  if (winField && outcome === "win") {
    updates[winField] = increment(1);
  }

  try {
    await updateDoc(doc(db, "users", userId), updates);
  } catch (err) {
    console.error("[gameStatsService] saveGameResult:", err);
  }
}

/**
 * Add study / session minutes for a user.
 * Call this at the end of any timed session (mock tests, reading, etc.).
 * @param {string} userId
 * @param {number} minutes – can be fractional (e.g. 1.5)
 */
export async function addStudyTime(userId, minutes) {
  if (!userId || !minutes || minutes <= 0) return;
  try {
    await updateDoc(doc(db, "users", userId), {
      timeSpentMinutes: increment(Math.round(minutes)),
    });
  } catch (err) {
    console.error("[gameStatsService] addStudyTime:", err);
  }
}
