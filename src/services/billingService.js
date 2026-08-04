import toast from "react-hot-toast";
import { auth } from "../firebase";
import { processReferralCommissionOnPremium } from "./referralService";

export async function createOrder(plan, isTrial = false) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan, isTrial }),
  });

  // 👇 Show the raw response
  const text = await response.text();

  console.log("Status:", response.status);
  console.log("Response:", text);

  if (!response.ok) {
    throw new Error(
      `Checkout failed (${response.status}): ${text}`
    );
  }

  return JSON.parse(text);
}

export async function verifyPayment(data) {
  const response = await fetch(
    "/api/verify-payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Payment verification failed."
    );
  }

  return result;
}

export async function startCheckout(plan, isTrial = false) {
  const user = auth.currentUser;

  if (!user) {
    toast.error("Please login first.");
    return;
  }

  const { order, key } =
    await createOrder(plan, isTrial);

  const trialDescription =
    "2-day FREE trial — ₹1 authorization only. Auto-renews to 3-Month Premium after trial.";

  const options = {
    key,

    order_id: order.id,

    amount: order.amount,

    currency: order.currency,

    name: "Knarrow",

    description: isTrial
      ? trialDescription
      : plan === "Premium Monthly"
      ? "Unlimited mocks · AI Writing & Speaking · Study Planner · Analytics · Accent Lab"
      : "Everything in Monthly · Unlimited AI · Accent Lab · Priority features · Save ₹98",

    theme: {
      color: "#2563eb",
    },

    handler: async function (payment) {
      try {
        const result =
          await verifyPayment({
            uid: user.uid,
            plan,
            isTrial,

            razorpay_order_id:
              payment.razorpay_order_id,

            razorpay_payment_id:
              payment.razorpay_payment_id,

            razorpay_signature:
              payment.razorpay_signature,
          });

        if (result.success) {
          if (isTrial) {
            toast.success(
              "🎉 2-Day Free Trial Started! Auto-renews to 3-Month Premium."
            );
          } else {
            toast.success(
              "🎉 Premium Activated!"
            );
          }

          // Process 20% commission for referrer if user was referred
          const planPrice = plan === "Premium 3 Months" ? 799 : 299;
          await processReferralCommissionOnPremium({
            userId: user.uid,
            planPrice: isTrial ? 1 : planPrice,
            planName: plan,
          });
        } else {
          toast.error(
            "Payment verification failed."
          );
        }
      } catch (err) {
        console.error(err);

        toast.error(
          err.message ||
            "Verification failed."
        );
      }
    },

    modal: {
      ondismiss() {
        toast("Payment cancelled.");
      },
    },

    prefill: {
      email: user.email,
    },
  };

  const razorpay =
    new window.Razorpay(options);

  razorpay.open();
}