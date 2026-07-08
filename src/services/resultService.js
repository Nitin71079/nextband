import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
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
  const q = query(
    collection(db, "results"),
    where("userId", "==", userId),
    orderBy("completedAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}