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
    const { uid } = req.body;

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        line_items: [
          {
            price:
              "price_1TaUbCQhiTO43lNuwLH00Xvf",
            quantity: 1,
          },
        ],

        metadata: {
          uid,
        },

        success_url:
          `${req.headers.origin}/success`,

        cancel_url:
          `${req.headers.origin}/pricing`,
      });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Stripe Error:",
      error
    );

    return res.status(500).json({
      error:
        error.message ||
        "Checkout failed",
    });
  }
}