import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { app } from "../firebase";

const db =
  getFirestore(app);

export async function saveResult(
  result
) {
  try {
    await addDoc(
      collection(
        db,
        "results"
      ),
      result
    );

    return true;
  } catch (error) {
    console.error(
      error
    );

    return false;
  }
}

export async function fetchResults() {
  try {
    const q = query(
      collection(
        db,
        "results"
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  } catch (error) {
    console.error(
      error
    );

    return [];
  }
}