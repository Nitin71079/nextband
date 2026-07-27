import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { app } from "../firebase";

const db = getFirestore(app);

export async function saveResult(data) {
  return await addDoc(
    collection(db, "results"),
    {
      ...data,
      completedAt: serverTimestamp(),
    }
  );
}

export async function getResults(userId) {
  // No orderBy — avoids composite index requirement. Sort client-side instead.
  const q = query(
    collection(db, "results"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Sort descending by completedAt client-side
  return docs.sort((a, b) => {
    const aTime = a.completedAt?.toDate ? a.completedAt.toDate().getTime() : new Date(a.completedAt || 0).getTime();
    const bTime = b.completedAt?.toDate ? b.completedAt.toDate().getTime() : new Date(b.completedAt || 0).getTime();
    return bTime - aTime;
  });
}