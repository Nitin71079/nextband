import crypto from "crypto";
import razorpay from "../razorpay.js";
import { db } from "../firebaseAdmin.js";
import { FieldValue } from "firebase-admin/firestore";

export async function createCheckout(req, res) {
  try {
    console.log("===== CREATE CHECKOUT =====");
    console.log(req.body);

    const { plan } = req.body;

    let amount;

    switch (plan) {
      case "Premium Monthly":
        amount = 29900;
        break;

      case "Premium 3 Months":
        amount = 79900;
        break;

      default:
        return res.status(400).json({
          success: false,
          error: "Invalid plan",
        });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    console.log("✅ Razorpay Order Created");
    console.log(order);

    return res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });

  } catch (err) {
    console.error("CREATE CHECKOUT ERROR");
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export async function verifyPayment(req, res) {
  try {

    console.log("=================================");
    console.log("🔥 VERIFY PAYMENT HIT");
    console.log(req.body);
    console.log("=================================");

    const {
      uid,
      plan,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Invalid Signature");

      return res.status(400).json({
        success: false,
        error: "Invalid Signature",
      });
    }

    console.log("✅ Signature Verified");

    const expiresAt = new Date();

    if (plan === "Premium Monthly") {
      expiresAt.setDate(expiresAt.getDate() + 30);
    } else {
      expiresAt.setDate(expiresAt.getDate() + 90);
    }

    console.log("Writing Premium to Firestore...");

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

    console.log("✅ Firestore Updated Successfully");

    return res.json({
      success: true,
    });

  } catch (err) {

    console.error("=================================");
    console.error("VERIFY PAYMENT ERROR");
    console.error(err);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}