import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

/**
 * users/{uid}/essays
 */
const essayCollection = (uid) =>
  collection(db, "users", uid, "essays");

/**
 * users/{uid}/essays/{essayId}
 */
const essayDoc = (uid, essayId) =>
  doc(db, "users", uid, "essays", essayId);

/**
 * Save AI evaluation
 */
export async function saveEssay(uid, data) {
  if (!uid) {
    throw new Error("User ID is required.");
  }

  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    schemaVersion: "1.0",
  };

  const ref = await addDoc(
    essayCollection(uid),
    payload
  );

  return ref.id;
}

/**
 * Get all essays
 */
export async function getEssayHistory(uid) {
  if (!uid) return [];

  const q = query(
    essayCollection(uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

/**
 * Get latest essays
 */
export async function getRecentEssays(
  uid,
  count = 5
) {
  if (!uid) return [];

  const q = query(
    essayCollection(uid),
    orderBy("createdAt", "desc"),
    limit(count)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

/**
 * Get one essay
 */
export async function getEssay(
  uid,
  essayId
) {
  if (!uid || !essayId) return null;

  const snapshot = await getDoc(
    essayDoc(uid, essayId)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/**
 * Update essay
 */
export async function updateEssay(
  uid,
  essayId,
  updates
) {
  if (!uid || !essayId) {
    throw new Error(
      "User ID and Essay ID are required."
    );
  }

  await updateDoc(
    essayDoc(uid, essayId),
    {
      ...updates,
      updatedAt: serverTimestamp(),
    }
  );
}

/**
 * Delete essay
 */
export async function deleteEssay(
  uid,
  essayId
) {
  if (!uid || !essayId) {
    throw new Error(
      "User ID and Essay ID are required."
    );
  }

  await deleteDoc(
    essayDoc(uid, essayId)
  );
}

/**
 * Get total essay count
 */
export async function getEssayCount(uid) {
  if (!uid) return 0;

  const snapshot = await getDocs(
    essayCollection(uid)
  );

  return snapshot.size;
}

/**
 * Get latest essay
 */
export async function getLatestEssay(uid) {
  const essays =
    await getRecentEssays(uid, 1);

  return essays.length > 0
    ? essays[0]
    : null;
}