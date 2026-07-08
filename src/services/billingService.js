export async function startCheckout(plan, uid){
    try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Checkout failed");
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,

      name: "Knarrow",

      description: plan,

      handler: async function (payment) {
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            plan,

            razorpay_order_id:
              payment.razorpay_order_id,

            razorpay_payment_id:
              payment.razorpay_payment_id,

            razorpay_signature:
              payment.razorpay_signature,
          }),
        });

        const result = await verify.json();

        if (result.success) {
          alert("🎉 Premium Activated!");

          window.location.href = "/dashboard";
        } else {
          alert("Payment verification failed.");
        }
      },

      theme: {
        color: "#06b6d4",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}