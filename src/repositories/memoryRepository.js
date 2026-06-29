import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const memoryDoc = (uid) =>
  doc(db, "users", uid, "memory", "profile");

/**
 * Create memory document
 */
export async function initializeMemory(uid) {
  const ref = memoryDoc(uid);

  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return snapshot.data();
  }

  const initialMemory = {
    profile: {
      currentBand: 0,
      targetBand: 7.5,
    },

    progress: {
      strongestSkill: null,
      weakestSkill: null,
      totalStudyHours: 0,
      essaysCompleted: 0,
      speakingCompleted: 0,
      readingCompleted: 0,
      listeningCompleted: 0,
    },

    preferences: {
      preferredDifficulty: "adaptive",
      preferredStudyTime: null,
      dailyGoal: 2,
    },

    ai: {
      lastConversation: "",
      preferredExplanation: "detailed",
    },

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(ref, initialMemory);

  return initialMemory;
}

/**
 * Get memory
 */
export async function getMemory(uid) {
  const ref = memoryDoc(uid);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return initializeMemory(uid);
  }

  return snapshot.data();
}

/**
 * Update selected sections
 */
export async function updateMemory(uid, updates) {
  const ref = memoryDoc(uid);

  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}