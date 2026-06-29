import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

/**
 * Analytics document path
 *
 * users/{uid}/analytics/summary
 */

const analyticsDoc = (uid) =>
  doc(db, "users", uid, "analytics", "summary");

/**
 * Create analytics if it doesn't exist
 */
export async function initializeAnalytics(uid) {
  const ref = analyticsDoc(uid);

  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  const initialData = {
    totalEssays: 0,
    totalWords: 0,

    averageBand: 0,
    highestBand: 0,

    grammarAverage: 0,
    lexicalAverage: 0,
    coherenceAverage: 0,
    taskAverage: 0,

    predictedBand: 0,

    updatedAt: serverTimestamp(),
  };

  await setDoc(ref, initialData);

  return initialData;
}

/**
 * Get analytics
 */
export async function getAnalytics(uid) {
  const ref = analyticsDoc(uid);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return initializeAnalytics(uid);
  }

  return snapshot.data();
}

/**
 * Increment essay count
 */
export async function incrementEssayCount(uid) {
  const ref = analyticsDoc(uid);

  await updateDoc(ref, {
    totalEssays: increment(1),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Increment total words
 */
export async function addWordCount(
  uid,
  words
) {
  const ref = analyticsDoc(uid);

  await updateDoc(ref, {
    totalWords: increment(words),
    updatedAt: serverTimestamp(),
  });
}