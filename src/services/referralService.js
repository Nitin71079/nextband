import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

/**
 * Generate or fetch unique referral code for a user
 */
export async function getOrCreateReferralCode(user) {
  if (!user) return null;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists() && userSnap.data().referralCode) {
    return userSnap.data().referralCode;
  }

  // Generate unique code: REF- + 6 alphanumeric characters
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const code = `REF-${randomStr}`;

  // Save to user profile & referrals collection
  await updateDoc(userRef, {
    referralCode: code,
    referralBalance: userSnap.data()?.referralBalance || 0,
    totalReferrals: userSnap.data()?.totalReferrals || 0,
  }).catch(async () => {
    await setDoc(userRef, { referralCode: code, referralBalance: 0, totalReferrals: 0 }, { merge: true });
  });

  const refDoc = doc(db, "referrals", code);
  await setDoc(refDoc, {
    ownerUid: user.uid,
    ownerEmail: user.email || "",
    ownerName: user.displayName || user.email?.split("@")[0] || "User",
    code,
    count: 0,
    totalEarnings: 0,
    createdAt: serverTimestamp(),
  }, { merge: true });

  return code;
}

/**
 * Validate a referral code and return owner details
 */
export async function validateReferralCode(code) {
  if (!code || typeof code !== "string") return { valid: false, message: "Invalid code" };
  const cleanCode = code.trim().toUpperCase();

  const q = query(collection(db, "users"), where("referralCode", "==", cleanCode));
  const snap = await getDocs(q);

  if (snap.empty) {
    return { valid: false, message: "Referral code not found" };
  }

  const ownerDoc = snap.docs[0];
  return {
    valid: true,
    referrerUid: ownerDoc.id,
    code: cleanCode,
    ownerName: ownerDoc.data().name || ownerDoc.data().email || "a fellow student",
  };
}

/**
 * Apply referral code to a newly registered or existing user
 */
export async function applyReferralCode(currentUserId, referralCode) {
  if (!currentUserId || !referralCode) return;
  const validation = await validateReferralCode(referralCode);

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  if (validation.referrerUid === currentUserId) {
    throw new Error("You cannot use your own referral code.");
  }

  const currentUserRef = doc(db, "users", currentUserId);
  const snap = await getDoc(currentUserRef);

  if (snap.exists() && snap.data().referredByCode) {
    throw new Error("Referral code already applied to your account.");
  }

  await updateDoc(currentUserRef, {
    referredByCode: validation.code,
    referredByUid: validation.referrerUid,
    referredAt: new Date().toISOString(),
  });

  // Also increment totalReferrals counter on referrer's profile
  const referrerRef = doc(db, "users", validation.referrerUid);
  await updateDoc(referrerRef, {
    totalReferrals: increment(1),
  }).catch(() => {});

  return validation;
}

/**
 * Process referral reward when referred user purchases Premium.
 * Commission = 20% of the first premium plan price.
 */
export async function processReferralCommissionOnPremium({ userId, planPrice, planName }) {
  try {
    const userSnap = await getDoc(doc(db, "users", userId));
    if (!userSnap.exists()) return;

    const userData = userSnap.data();

    // Only reward on first premium purchase
    if (userData.hasEarnedReferralCommission) return;
    if (!userData.referredByUid) return;

    const priceNum = Number(planPrice) || (planName?.includes("3") ? 799 : 299);
    const commission = Number((priceNum * 0.20).toFixed(2)); // 20% of first premium plan

    const referrerUid = userData.referredByUid;
    const referrerRef = doc(db, "users", referrerUid);

    // Update referrer's balance and log earnings history
    await updateDoc(referrerRef, {
      referralBalance: increment(commission),
      referralEarningsTotal: increment(commission),
      referralHistory: arrayUnion({
        referredUserId: userId,
        referredUserEmail: userData.email || "User",
        planName,
        planPrice: priceNum,
        commissionAmount: commission,
        date: new Date().toISOString(),
      }),
    });

    // Mark current user as processed for referral reward
    await updateDoc(doc(db, "users", userId), {
      hasEarnedReferralCommission: true,
      referralCommissionAmount: commission,
    });

    console.log(`Referral commission of ₹${commission} awarded to user ${referrerUid}`);
  } catch (error) {
    console.error("Error processing referral commission:", error);
  }
}
