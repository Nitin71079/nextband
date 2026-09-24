import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { plan, amount, trackId, packType, duration } = req.body;

    // Price lookup table or explicit passed amount in paise
    const prices = {
      "Premium Monthly": 29900,
      "Premium 3 Months": 79900,
    };

    const finalAmount = amount ? amount * 100 : (prices[plan] || 119900);

    const order = await razorpay.orders.create({
      amount: finalAmount,
      currency: "INR",
      receipt: `plan_${trackId || 'ALL'}_${Date.now()}`,
      notes: {
        plan: plan || "Knarrow VIP",
        trackId: trackId || "ALL_ACCESS",
        packType: packType || "all_access",
        duration: duration || "monthly"
      }
    });

    res.status(200).json({
      order,
      key: keyId,
    });
  } catch (err) {
    console.error("Checkout Error:", err);

    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
}