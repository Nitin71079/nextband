import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import paymentRoutes from "./routes/paymentRoutes.js";
import { db } from "./firebaseAdmin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Knarrow Backend Running");
});

/*
=========================================
TEMP FIRESTORE TEST
=========================================
*/

app.get("/test-firestore", async (req, res) => {
  try {
    const uid = "N3g0SxyWHKc8Qehtu34ySTPdjpv1";

    await db.collection("users").doc(uid).set(
      {
        premium: true,
        test: "working",
        updatedAt: new Date(),
      },
      { merge: true }
    );

    const doc = await db.collection("users").doc(uid).get();

    res.json({
      success: true,
      data: doc.data(),
    });

  } catch (err) {
    console.error("TEST FIRESTORE ERROR");
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }
});

/*
=========================================
PAYMENT ROUTES
=========================================
*/

app.use("/api", paymentRoutes);

/*
=========================================
404
=========================================
*/

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/*
=========================================
SERVER
=========================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});