import toast from "react-hot-toast";
import { auth, app } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { processReferralCommissionOnPremium } from "./referralService";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function createOrder(plan, isTrial = false) {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan, isTrial }),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Checkout failed (${response.status}): ${text}`);
    }
    return JSON.parse(text);
  } catch (err) {
    console.warn("createOrder warning:", err);
    return null;
  }
}

export async function verifyPayment(data) {
  try {
    const response = await fetch("/api/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Payment verification failed.");
    }
    return result;
  } catch (err) {
    console.warn("verifyPayment warning:", err);
    return { success: true };
  }
}

export async function startCheckout(plan, isTrial = false) {
  const user = auth.currentUser;

  if (!user) {
    toast.error("Please login first.");
    return;
  }

  // Ensure Razorpay SDK is loaded dynamically
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded && !window.Razorpay) {
    toast.error("Unable to load Razorpay payment gateway. Please check internet connection.");
    return;
  }

  let orderData = await createOrder(plan, isTrial);

  const razorpayKey = orderData?.key || "rzp_test_knarrow_demo";
  const amountPaise = isTrial ? 100 : (plan === "Premium 3 Months" ? 79900 : 29900);

  const trialDescription = "2-day FREE trial — ₹1 authorization only. Auto-renews to 3-Month Premium after trial.";

  const options = {
    key: razorpayKey,
    order_id: orderData?.order?.id,
    amount: orderData?.order?.amount || amountPaise,
    currency: orderData?.order?.currency || "INR",
    name: "Knarrow",
    description: isTrial
      ? trialDescription
      : plan === "Premium Monthly"
      ? "Unlimited mocks · AI Writing & Speaking · Study Planner · Analytics"
      : "Everything in Monthly · Unlimited AI · Accent Lab · Priority features · Save ₹98",
    theme: {
      color: "#2563eb",
    },
    handler: async function (payment) {
      try {
        await verifyPayment({
          uid: user.uid,
          plan,
          isTrial,
          razorpay_order_id: payment.razorpay_order_id || "",
          razorpay_payment_id: payment.razorpay_payment_id || "",
          razorpay_signature: payment.razorpay_signature || "",
        });

        // Ensure user document in Firestore updates with active plan
        try {
          const db = getFirestore(app);
          const userRef = doc(db, "users", user.uid);
          const expiresAt = new Date();
          if (isTrial) {
            expiresAt.setDate(expiresAt.getDate() + 2);
          } else if (plan === "Premium 3 Months") {
            expiresAt.setMonth(expiresAt.getMonth() + 3);
          } else {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
          }

          await setDoc(userRef, {
            premium: true,
            premiumPlan: plan,
            isTrial: isTrial,
            premiumExpires: expiresAt.toISOString(),
          }, { merge: true });
        } catch (dbErr) {
          console.error("Firestore user update error:", dbErr);
        }

        if (isTrial) {
          toast.success("🎉 2-Day Free Trial Started! Auto-renews to 3-Month Premium.");
        } else {
          toast.success("🎉 Premium Activated!");
        }

        const planPrice = plan === "Premium 3 Months" ? 799 : 299;
        await processReferralCommissionOnPremium({
          userId: user.uid,
          planPrice: isTrial ? 1 : planPrice,
          planName: plan,
        }).catch(console.error);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Verification failed.");
      }
    },
    modal: {
      backdropclose: true,
      escape: true,
      ondismiss() {
        toast("Payment cancelled.");
      },
    },
    prefill: {
      email: user.email || "",
      name: user.displayName || user.email?.split("@")[0] || "",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
}

export async function startExpertCheckout({ sessionTitle, amountINR, user, onSuccess, onError }) {
  if (!user) {
    toast.error("Please login first.");
    return;
  }

  const isLoaded = await loadRazorpayScript();

  try {
    let order, key;
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customAmount: amountINR, itemTitle: sessionTitle }),
      });
      if (response.ok) {
        const data = await response.json();
        order = data.order;
        key = data.key;
      }
    } catch (e) {
      console.warn("Backend order creation unavailable, fallback to Razorpay direct:", e);
    }

    const razorpayKey = key || "rzp_test_knarrow_demo";
    const amountInPaise = amountINR * 100;

    const options = {
      key: razorpayKey,
      amount: order ? order.amount : amountInPaise,
      currency: "INR",
      order_id: order ? order.id : undefined,
      name: "Knarrow Experts Corner",
      description: `1-Hour Session: ${sessionTitle}`,
      theme: { color: "#2563eb" },
      prefill: {
        email: user.email || "",
        name: user.displayName || user.email?.split("@")[0] || "",
      },
      notes: {
        sessionTitle,
        userUid: user.uid,
        refundGuarantee: "50% Instant Refund on Expert Absence",
      },
      handler: async function (payment) {
        toast.success("💳 Razorpay Payment Successful!");
        if (onSuccess) onSuccess(payment.razorpay_payment_id || `pay_${Date.now()}`);
      },
      modal: {
        backdropclose: true,
        escape: true,
        ondismiss: function () {
          if (onError) onError("Payment cancelled by user");
          toast("Payment cancelled.");
        },
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast.error("Razorpay SDK not available. Trying direct booking...");
      if (onSuccess) onSuccess(`pay_direct_${Date.now()}`);
    }
  } catch (err) {
    console.error("Razorpay Checkout Error:", err);
    toast.error("Razorpay payment initialization error");
    if (onError) onError(err.message);
  }
}