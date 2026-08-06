import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_knarrow_demo",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "demo_secret",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { plan, isTrial, customAmount, itemTitle } = req.body;

    const prices = {
      "Premium Monthly": 29900,
      "Premium 3 Months": 79900,
    };

    // Amount in paise
    let amount;
    if (customAmount) {
      amount = Math.round(Number(customAmount) * 100);
    } else if (isTrial) {
      amount = 100;
    } else {
      amount = prices[plan];
    }

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        error: "Invalid plan or amount",
      });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        plan: plan || itemTitle || "Expert Session",
        isTrial: isTrial ? "true" : "false",
        refundGuarantee: "50% Instant Refund on Expert Absence",
      },
    });

    res.status(200).json({
      order,
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_knarrow_demo",
      isTrial: isTrial || false,
    });
  } catch (err) {
    console.error("Checkout Error:", err);

    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
}