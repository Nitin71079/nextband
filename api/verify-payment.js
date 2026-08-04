import crypto from "crypto";
import admin from "firebase-admin";

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    uid,
    plan,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    isTrial,
  } = req.body;

  if (!uid || !plan || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("===== VERIFY PAYMENT =====");
  console.log("UID:", uid);
  console.log("Plan:", plan);
  console.log("Is Trial:", isTrial);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  console.log("Expected:", expectedSignature);
  console.log("Received:", razorpay_signature);

  if (expectedSignature !== razorpay_signature) {
    console.log("❌ Signature mismatch");
    return res.status(400).json({ success: false, error: "Invalid signature" });
  }

  console.log("✅ Signature verified");

  // ── Calculate expiry ──────────────────────────────────────────────────────
  // Trial: 2 days free, then the selected plan auto-renews (stored as autoRenew)
  // Premium Monthly: 30 days
  // Premium 3 Months: 90 days
  const now = new Date();
  let expiresAt;
  let premiumPlan = plan;

  if (isTrial) {
    // 2-day trial period
    expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    premiumPlan = `${plan} (Trial)`;
  } else if (plan === "Premium Monthly") {
    expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  } else if (plan === "Premium 3 Months") {
    expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  } else {
    expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  }

  console.log("Writing to Firestore...");
  console.log("Expires:", expiresAt.toISOString());

  try {
    await db.collection("users").doc(uid).set(
      {
        premium: true,
        premiumPlan,
        // Store plan for auto-renew (the base plan without Trial suffix)
        autoRenewPlan: plan === "Premium 3 Months" ? "Premium 3 Months" : "Premium Monthly",
        autoRenew: plan === "Premium 3 Months", // auto-renew only for 3-month plan
        isTrial: isTrial || false,
        trialPlan: isTrial ? plan : null,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        activatedAt: FieldValue.serverTimestamp(),
        premiumExpires: admin.firestore.Timestamp.fromDate(expiresAt),
        // legacy field name support
        expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
      },
      { merge: true }
    );

    console.log("✅ Firestore write successful");
    return res.json({
      success: true,
      expiresAt: expiresAt.toISOString(),
      isTrial: isTrial || false,
    });
  } catch (err) {
    console.error("Firestore write error:", err);
    return res.status(500).json({ error: "Failed to activate premium" });
  }
}
