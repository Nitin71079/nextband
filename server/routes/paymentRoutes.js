    import express from "express";
    import {
    createCheckout,
    verifyPayment,
    } from "../controllers/paymentController.js";

    const router = express.Router();

    router.post("/checkout", createCheckout);

    router.post(
    "/verify-payment",
    verifyPayment
    );

    export default router;