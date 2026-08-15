import toast from "react-hot-toast";
import { auth, app } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { processReferralCommissionOnPremium, applyReferralCode } from "./referralService";

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

export async function createOrder(plan, isTrial = false, checkoutParams = {}) {
  try {
    const primaryUrl = (typeof window !== "undefined" && window.location.origin.includes("knarrow.in"))
      ? `${window.location.origin}/api/checkout`
      : "https://knarrow.in/api/checkout";

    const payload = {
      plan,
      isTrial,
      customAmount: checkoutParams.customAmount,
      isFirstTime: checkoutParams.isFirstTime,
      appliedReferralCode: checkoutParams.appliedReferralCode,
    };

    let response = null;
    try {
      response = await fetch(primaryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.warn("Primary API URL fetch failed, trying fallback /api/checkout:", e);
    }

    if (!response || !response.ok) {
      response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Checkout API HTTP ${response.status}: ${text}`);
    }
    return JSON.parse(text);
  } catch (err) {
    console.error("createOrder error:", err);
    return null;
  }
}

export async function verifyPayment(data) {
  try {
    const primaryUrl = (typeof window !== "undefined" && window.location.origin.includes("knarrow.in"))
      ? `${window.location.origin}/api/verify-payment`
      : "https://knarrow.in/api/verify-payment";

    let response = null;
    try {
      response = await fetch(primaryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.warn("Primary verify payment URL fetch failed, trying fallback:", e);
    }

    if (!response || !response.ok) {
      response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

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

export async function startCheckout(plan, isTrial = false, checkoutParams = {}) {
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

  toast.loading("Connecting to secure payment gateway...", { id: "pwa-checkout-loading" });

  const orderData = await createOrder(plan, isTrial, checkoutParams);
  toast.dismiss("pwa-checkout-loading");

  if (!orderData || !orderData.order || !orderData.key) {
    toast.error(orderData?.error || "Could not initialize checkout. Please check internet connection and try again.");
    return;
  }

  const razorpayKey = orderData.key;
  const trialDescription = "2-day FREE trial — ₹1 authorization only. Auto-renews to 3-Month Premium after trial.";

  const options = {
    key: razorpayKey,
    order_id: orderData.order.id,
    amount: orderData.order.amount,
    currency: orderData.order.currency || "INR",
    name: "Knarrow",
    description: isTrial
      ? trialDescription
      : plan === "Lifetime Access"
      ? "Unlimited Lifetime Access — Full Mocks, AI Writing & Speaking Forever"
      : plan === "Premium Monthly"
      ? "Unlimited mocks · AI Writing & Speaking · Study Planner · Analytics"
      : "Everything in Monthly · Unlimited AI · Accent Lab · Priority features",
    theme: {
      color: "#2563eb",
    },
    handler: async function (payment) {
      try {
        await verifyPayment({
          uid: user.uid,
          plan,
          isTrial,
          razorpay_order_id: payment.razorpay_order_id,
          razorpay_payment_id: payment.razorpay_payment_id,
          razorpay_signature: payment.razorpay_signature,
        });

        // Update user document in Firestore with active plan & set hasPurchasedPremium: true
        try {
          const db = getFirestore(app);
          const userRef = doc(db, "users", user.uid);
          const expiresAt = new Date();
          if (isTrial) {
            expiresAt.setDate(expiresAt.getDate() + 2);
          } else if (plan === "Lifetime Access" || plan === "Premium Lifetime") {
            expiresAt.setFullYear(expiresAt.getFullYear() + 99);
          } else if (plan === "Premium 3 Months") {
            expiresAt.setMonth(expiresAt.getMonth() + 3);
          } else {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
          }

          await setDoc(userRef, {
            premium: true,
            premiumPlan: plan === "Lifetime Access" ? "Premium Lifetime" : plan,
            isTrial: isTrial,
            hasPurchasedPremium: true, // Mark user as no longer first-timer
            premiumExpires: expiresAt.toISOString(),
          }, { merge: true });

          // If referral code was applied during checkout, process ₹50 instant cashback
          if (checkoutParams.appliedReferralCode) {
            await applyReferralCode(user.uid, checkoutParams.appliedReferralCode).catch(console.error);
            await setDoc(userRef, {
              referralCashback: 50,
              cashbackStatus: "CREDITED",
              cashbackMessage: "₹50 Instant Bank Cashback via Referral",
            }, { merge: true }).catch(console.error);
            toast.success("🎉 ₹50 Bank Cashback Activated! Cashback credited to your referral balance.");
          }
        } catch (dbErr) {
          console.error("Firestore user update error:", dbErr);
        }

        if (isTrial) {
          toast.success("🎉 2-Day Free Trial Started! Auto-renews to 3-Month Premium.");
        } else if (plan === "Lifetime Access") {
          toast.success("🎉 Lifetime Unlimited Access Activated!");
        } else {
          toast.success("🎉 Premium Activated!");
        }

        const planPrice = Number(checkoutParams.customAmount) || (plan === "Premium 3 Months" ? 1249 : 499);
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

  await loadRazorpayScript();

  try {
    const primaryUrl = (typeof window !== "undefined" && window.location.origin.includes("knarrow.in"))
      ? `${window.location.origin}/api/checkout`
      : "https://knarrow.in/api/checkout";

    let orderData = null;
    try {
      const response = await fetch(primaryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customAmount: amountINR, itemTitle: sessionTitle }),
      });
      if (response.ok) {
        orderData = await response.json();
      }
    } catch (e) {
      console.warn("Backend order creation error:", e);
    }

    if (!orderData || !orderData.key || !orderData.order) {
      toast.error("Could not initialize payment for Expert Session.");
      if (onError) onError("Order creation failed");
      return;
    }

    const options = {
      key: orderData.key,
      amount: orderData.order.amount,
      currency: "INR",
      order_id: orderData.order.id,
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
      toast.error("Razorpay SDK not available.");
      if (onError) onError("Razorpay SDK missing");
    }
  } catch (err) {
    console.error("Razorpay Checkout Error:", err);
    toast.error("Razorpay payment initialization error");
    if (onError) onError(err.message);
  }
}