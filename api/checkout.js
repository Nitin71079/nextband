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
    const { plan, isTrial, customAmount, itemTitle, isFirstTime } = req.body;

    const prices = {
      "Premium Monthly": isFirstTime ? 49900 : 99900,
      "Premium Monthly (First Time)": 49900,
      "Premium 3 Months": isFirstTime ? 124900 : 249900,
      "Premium 3 Months (First Time)": 124900,
      "Premium Lifetime": 499900,
      "Lifetime Access": 499900,
    };

    // Amount in paise
    let amount;
    if (customAmount) {
      amount = Math.round(Number(customAmount) * 100);
    } else if (isTrial) {
      amount = 100;
    } else {
      amount = prices[plan] || (isFirstTime ? 49900 : 99900);
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
        plan: plan || itemTitle || "Knarrow Premium",
        isTrial: isTrial ? "true" : "false",
        isFirstTime: isFirstTime ? "true" : "false",
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