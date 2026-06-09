import Stripe from "stripe";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  doc,
  updateDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    process.env
      .VITE_FIREBASE_API_KEY,

  authDomain:
    process.env
      .VITE_FIREBASE_AUTH_DOMAIN,

  projectId:
    process.env
      .VITE_FIREBASE_PROJECT_ID,

  storageBucket:
    process.env
      .VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env
      .VITE_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env
      .VITE_FIREBASE_APP_ID
};

const app =
  initializeApp(
    firebaseConfig
  );

const db =
  getFirestore(app);

const stripe =
  new Stripe(
    process.env
      .STRIPE_SECRET_KEY
  );

export default async function handler(
  req,
  res
) {
  try {
    const sig =
      req.headers[
        "stripe-signature"
      ];

    const webhookSecret =
      process.env
        .STRIPE_WEBHOOK_SECRET;

    const event =
      stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );

    switch (event.type) {
  case "checkout.session.completed": {
  const session =
    event.data.object;

  const uid =
    session.metadata?.uid;

  if (uid) {
    await updateDoc(
      doc(
        db,
        "users",
        uid
      ),
      {
        premium: true
      }
    );

    console.log(
      `Premium activated for ${uid}`
    );
  }

  break;
}

      case "customer.subscription.deleted":
        console.log(
          "Subscription cancelled"
        );

        break;

      default:
        console.log(
          `Unhandled event: ${event.type}`
        );
    }

    res.status(200).json({
      received: true
    });
  } catch (error) {
    console.error(error);

    res.status(400).send(
      `Webhook Error: ${error.message}`
    );
  }
}