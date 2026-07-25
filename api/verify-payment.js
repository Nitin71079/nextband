console.log("===== VERIFY PAYMENT =====");
console.log("UID:", uid);
console.log("Plan:", plan);

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  .update(body)
  .digest("hex");

console.log("Expected:", expectedSignature);
console.log("Received:", razorpay_signature);

if (expectedSignature !== razorpay_signature) {
  console.log("❌ Signature mismatch");
  return res.status(400).json({
    success: false,
    error: "Invalid signature",
  });
}

console.log("✅ Signature verified");
console.log("Writing to Firestore...");

await db.collection("users").doc(uid).set(
  {
    premium: true,
    plan,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    activatedAt: FieldValue.serverTimestamp(),
    expiresAt,
  },
  { merge: true }
);

console.log("✅ Firestore write successful");

return res.json({ success: true });