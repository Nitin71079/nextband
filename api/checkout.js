import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { plan } = req.body;

    const prices = {
      "Premium Monthly": 29900,
      "Premium 3 Months": 79900,
    };

    const amount = prices[plan];

    if (!amount) {
      return res.status(400).json({
        error: "Invalid plan",
      });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `plan_${Date.now()}`,
    });

    res.status(200).json({
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
  console.error("Checkout Error:", err);

  return res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
}
}