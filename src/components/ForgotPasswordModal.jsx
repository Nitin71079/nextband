import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { X, Mail, CheckCircle, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  async function handleResetPassword(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "460px",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          animation: "modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748b",
          }}
        >
          <X size={20} />
        </button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "30px 10px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "#dcfce7",
                color: "#16a34a",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <CheckCircle size={36} />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>Reset Email Sent!</h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "8px", lineHeight: "1.6" }}>
              We sent a password reset link to <strong>{email}</strong>. Check your inbox (and spam folder) to set a new password.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: "24px",
                width: "100%",
                background: "#0284c7",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "12px",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#e0f2fe",
                color: "#0284c7",
                borderRadius: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <KeyRound size={28} />
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
              Reset Password
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "8px" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    padding: "12px 14px 12px 40px",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #0284c7, #2563eb)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "14px",
                fontWeight: "700",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 14px rgba(2, 132, 199, 0.35)",
              }}
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link 📧"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
