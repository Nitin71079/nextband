import toast from "react-hot-toast";
import { auth } from "../firebase";

export async function createOrder(plan) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan }),
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

export async function startCheckout(plan) {
  const user = auth.currentUser;

  if (!user) {
    toast.error("Please login first.");
    return;
  }

  const { order, key } =
    await createOrder(plan);

  const options = {
    key,

    order_id: order.id,

    amount: order.amount,

    currency: order.currency,

    name: "Knarrow",

    description: plan,

    theme: {
      color: "#2563eb",
    },

    handler: async function (payment) {
      try {
        const result =
          await verifyPayment({
            uid: user.uid,
            plan,

            razorpay_order_id:
              payment.razorpay_order_id,

            razorpay_payment_id:
              payment.razorpay_payment_id,

            razorpay_signature:
              payment.razorpay_signature,
          });

        if (result.success) {
          toast.success(
            "🎉 Premium Activated!"
          );

         toast.success(
    "🎉 Premium Activated!"
);
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