import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

try {
  const order = await razorpay.orders.create({
    amount: 100,
    currency: "INR",
    receipt: "test_receipt",
  });

  console.log("✅ SUCCESS");
  console.log(order);

} catch (err) {
  console.log("========== FULL ERROR ==========");
  console.dir(err, { depth: null });
  console.log("================================");

  if (err.response) {
    console.log("Response:");
    console.dir(err.response, { depth: null });
  }
}