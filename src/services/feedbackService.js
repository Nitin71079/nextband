import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

/**
 * Save feedback after completing a test
 */
export async function saveTestFeedback({
  userId,
  userName,
  userEmail,
  testType,
  testId,
  rating,
  difficulty,
  feedbackText,
  recommend,
}) {
  try {
    const docRef = await addDoc(collection(db, "testFeedback"), {
      userId: userId || "anonymous",
      userName: userName || "Anonymous User",
      userEmail: userEmail || "",
      testType: testType || "General Mock",
      testId: testId || "unknown",
      rating: Number(rating) || 5,
      difficulty: difficulty || "Medium",
      feedbackText: feedbackText || "",
      recommend: recommend ?? true,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving test feedback:", error);
    throw error;
  }
}

/**
 * Fetch all test feedback (for admin dashboard / reporting)
 */
export async function getAllTestFeedback() {
  try {
    const q = query(
      collection(db, "testFeedback"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching test feedback:", error);
    return [];
  }
}
