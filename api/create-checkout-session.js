import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: [
          "card",
        ],

        mode: "subscription",

        line_items: [
          {
            price:
              "price_1TaUbCQhiTO43lNuwLH00Xvf",
            quantity: 1,
          },
        ],

        success_url:
          `${req.headers.origin}/dashboard`,

        cancel_url:
          `${req.headers.origin}/pricing`,
      });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Failed to create checkout session",
    });
  }
}