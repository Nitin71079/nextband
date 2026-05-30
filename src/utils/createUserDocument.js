import {
  getFirestore,
  doc,
  setDoc
} from "firebase/firestore";

import { app } from "../firebase";

const db =
  getFirestore(app);

export async function createUserDocument(
  user
) {
  try {
    await setDoc(
      doc(
        db,
        "users",
        user.uid
      ),
      {
        email:
          user.email,

        premium:
          false
      }
    );
  } catch (error) {
    console.error(
      error
    );
  }
}