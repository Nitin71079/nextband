import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { app } from "../firebase";

const db =
  getFirestore(app);

export async function saveResult(
  userId,
  section,
  score,
  band
) {
  try {
    await addDoc(
      collection(
        db,
        "mockResults"
      ),
      {
        userId,
        section,
        score,
        band:
          Number(band),
        createdAt:
          serverTimestamp()
      }
    );

    const userRef =
      doc(
        db,
        "users",
        userId
      );

    const snapshot =
      await getDoc(
        userRef
      );

    if (
      snapshot.exists()
    ) {
      const userData =
        snapshot.data();

      const previousAverage =
        userData.averageBand ||
        0;

      const testsTaken =
        userData.testsTaken ||
        0;

      const newAverage =
        (
          previousAverage *
            testsTaken +
          Number(band)
        ) /
        (testsTaken + 1);

      await updateDoc(
        userRef,
        {
          averageBand:
            Number(
              newAverage.toFixed(
                1
              )
            ),

          testsTaken:
            testsTaken + 1
        }
      );
    }

    console.log(
      "Result saved"
    );
  } catch (error) {
    console.error(
      error
    );
  }
}