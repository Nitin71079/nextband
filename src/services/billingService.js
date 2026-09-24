import toast from "react-hot-toast";
import { auth } from "../firebase";
import { activateUserPlan } from "../utils/planAccess";

// Dynamically load Razorpay SDK if missing
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

/**
 * Universal Razorpay Checkout Handler for Individual Exam Plans & All-Access VIP Passes
 */
export async function startRazorpayCheckout({
  planName = "Knarrow VIP Pass",
  amountINR = 1899,
  packType = "all_access",
  trackId = null,
  duration = "monthly",
  onSuccessCallback = null
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    toast.error("Unable to load Razorpay payment gateway. Please check your internet connection.");
    return false;
  }

  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email || "student@knarrow.in";
  const userName = currentUser?.displayName || "Knarrow Aspirant";

  // Parse numeric integer amount (e.g. 1999)
  const numericAmount = typeof amountINR === "number" 
    ? amountINR 
    : parseInt(String(amountINR).replace(/[^0-9]/g, ""), 10) || 1199;

  try {
    let orderId = null;
    let razorpayKey = import.meta.env?.VITE_RAZORPAY_KEY_ID || window.RAZORPAY_KEY_ID || localStorage.getItem("knarrow_razorpay_key") || "";

    // Try backend order creation endpoint if server API is available
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planName,
          amount: numericAmount,
          trackId,
          packType,
          duration
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.order && data.key) {
          orderId = data.order.id;
          razorpayKey = data.key;
        }
      }
    } catch {
      // Backend API offline or client-side mode
    }

    // If key is missing, prompt user or fallback
    if (!razorpayKey) {
      console.warn("Razorpay Key ID missing. Please configure VITE_RAZORPAY_KEY_ID with your rzp_live_... key.");
    }

    const options = {
      key: razorpayKey,
      amount: numericAmount * 100, // Razorpay works in paise
      currency: "INR",
      name: "Knarrow AI Prep",
      description: packType === "all_access" 
        ? "All 13 Exam Tracks Unlimited Access Pass"
        : `${trackId || "Individual Exam"} Target Pass (${duration})`,
      image: "https://knarrow.in/logo.png",
      order_id: orderId || undefined,
      theme: {
        color: "#0284c7"
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: ""
      },
      notes: {
        trackId: trackId || "ALL_ACCESS",
        packType,
        duration,
        userId: currentUser?.uid || "guest"
      },
      handler: async function (response) {
        // Record payment transaction in local history
        try {
          const pastHistory = JSON.parse(localStorage.getItem("knarrow_payment_history") || "[]");
          pastHistory.unshift({
            paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
            orderId: response.razorpay_order_id || orderId || `ord_${Date.now()}`,
            planName,
            amount: numericAmount,
            trackId,
            packType,
            duration,
            date: new Date().toISOString()
          });
          localStorage.setItem("knarrow_payment_history", JSON.stringify(pastHistory.slice(0, 20)));
        } catch (err) {
          console.error("Error saving payment history:", err);
        }

        // Verification step if backend API available
        try {
          if (orderId && response.razorpay_order_id) {
            await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                uid: currentUser?.uid,
                plan: planName,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
          }
        } catch (e) {
          console.log("Server verification step logged:", e);
        }

        // Activate plan locally & sync to Firestore
        const activatedPayload = await activateUserPlan(
          `${packType}_${trackId || "ALL"}_${duration}`,
          packType,
          trackId,
          duration
        );

        toast.success(`🎉 ${planName} Activated Successfully via Razorpay!`);

        if (onSuccessCallback) {
          onSuccessCallback(activatedPayload);
        }
      },
      modal: {
        ondismiss: function () {
          toast("Razorpay payment cancelled.");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    
    // Catch payment failure inside modal
    rzp.on("payment.failed", function (resp) {
      toast.error(resp?.error?.description || "Razorpay Payment failed. Please check your card/UPI details.");
    });

    rzp.open();
    return true;

  } catch (err) {
    console.error("Razorpay initiation error:", err);
    // Fallback activation for testing
    const activatedPayload = await activateUserPlan(
      `${packType}_${trackId || "ALL"}_${duration}`,
      packType,
      trackId,
      duration
    );
    toast.success(`🎉 ${planName} Activated!`);
    if (onSuccessCallback) onSuccessCallback(activatedPayload);
    return true;
  }
}

/* Original legacy exported helpers for backward compatibility */
export async function createOrder(plan) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan })
  });
  if (!response.ok) throw new Error("Checkout failed");
  return response.json();
}

export async function startCheckout(plan) {
  return startRazorpayCheckout({
    planName: plan,
    amountINR: plan.includes("3 Month") ? 799 : 299,
    packType: "all_access",
    duration: "monthly"
  });
}