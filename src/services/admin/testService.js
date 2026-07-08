import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

const COLLECTION = "tests";

// CREATE
export async function addTest(type, data) {
  return await addDoc(
    collection(db, COLLECTION),
    {
      ...data,
      type,
      createdAt: serverTimestamp(),
    }
  );
}

// READ
export async function getTests(type) {
  const q = query(
    collection(db, COLLECTION),
    where("type", "==", type)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// UPDATE
export async function updateTest(
  id,
  data
) {
  await updateDoc(
    doc(db, COLLECTION, id),
    data
  );
}

// DELETE
export async function deleteTest(id) {
  await deleteDoc(
    doc(db, COLLECTION, id)
  );
}