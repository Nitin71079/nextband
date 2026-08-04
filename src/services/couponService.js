import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

/**
 * Validate and apply coupon code (e.g., FIRST50 for 50% off for first-time users)
 */
export async function validateAndApplyCoupon({ couponCode, user, originalPrice }) {
  if (!couponCode || typeof couponCode !== "string") {
    return { valid: false, message: "Please enter a valid coupon code." };
  }

  const code = couponCode.trim().toUpperCase();
  const price = Number(originalPrice) || 0;

  if (code === "FIRST50" || code === "WELCOME50" || code === "NEW50") {
    // Verify if user is a first time subscriber
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.hasSubscribedBefore || data.premium) {
          return {
            valid: false,
            message: "The 50% OFF coupon is only valid for your first Premium plan.",
          };
        }
      }
    }

    const discountPercentage = 50;
    const discountAmount = Number((price * 0.50).toFixed(2));
    const finalPrice = Math.max(0, price - discountAmount);

    return {
      valid: true,
      code,
      discountPercentage,
      discountAmount,
      finalPrice,
      message: "🎉 50% OFF First User Coupon applied successfully!",
    };
  }

  return { valid: false, message: "Invalid or expired coupon code." };
}
