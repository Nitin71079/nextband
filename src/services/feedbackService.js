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
  pathName,
}) {
  try {
    const docRef = await addDoc(collection(db, "testFeedback"), {
      type: "test",
      userId: userId || "anonymous",
      userName: userName || "Anonymous User",
      userEmail: userEmail || "",
      testType: testType || "General Mock",
      testId: testId || "unknown",
      rating: Number(rating) || 5,
      difficulty: difficulty || "Medium",
      feedbackText: feedbackText || "",
      recommend: recommend ?? true,
      pathName: pathName || (typeof window !== "undefined" ? window.location.pathname : "/"),
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving test feedback:", error);
    throw error;
  }
}

/**
 * Save periodic user feedback (5-minute popup)
 */
export async function savePeriodicUserFeedback({
  userId,
  userName,
  userEmail,
  rating,
  satisfaction,
  category,
  recommend,
  feedbackText,
  pathName,
  deviceInfo,
}) {
  try {
    const docRef = await addDoc(collection(db, "userFeedback"), {
      type: "periodic",
      userId: userId || "anonymous",
      userName: userName || "Anonymous User",
      userEmail: userEmail || "",
      rating: Number(rating) || 5,
      satisfaction: satisfaction || "Satisfied",
      category: category || "General Platform",
      recommend: recommend ?? true,
      feedbackText: feedbackText || "",
      pathName: pathName || (typeof window !== "undefined" ? window.location.pathname : "/"),
      deviceInfo: deviceInfo || "",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving user periodic feedback:", error);
    throw error;
  }
}

/**
 * Fetch all test feedback documents
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

/**
 * Fetch combined user feedback from both testFeedback and userFeedback collections
 */
export async function getAllUserFeedback() {
  try {
    const q1 = query(collection(db, "testFeedback"), orderBy("createdAt", "desc"));
    const q2 = query(collection(db, "userFeedback"), orderBy("createdAt", "desc"));

    const [snap1, snap2] = await Promise.all([
      getDocs(q1).catch((err) => {
        console.warn("Could not query testFeedback:", err);
        return { docs: [] };
      }),
      getDocs(q2).catch((err) => {
        console.warn("Could not query userFeedback:", err);
        return { docs: [] };
      }),
    ]);

    const items1 = snap1.docs.map((doc) => ({ id: doc.id, collectionName: "testFeedback", ...doc.data() }));
    const items2 = snap2.docs.map((doc) => ({ id: doc.id, collectionName: "userFeedback", ...doc.data() }));

    const combined = [...items1, ...items2];
    combined.sort((a, b) => {
      const ta = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
      const tb = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
      return tb - ta;
    });

    return combined;
  } catch (error) {
    console.error("Error fetching all user feedback:", error);
    return [];
  }
}
