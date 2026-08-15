import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Gift, Copy, Check, X, Sparkles, Share2, Award, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getOrCreateReferralCode } from "../services/referralService";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export default function ReferralPopup() {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);

  const isExamRoute =
    location.pathname.includes("/mock") ||
    location.pathname.includes("/cbt-exam") ||
    location.pathname.includes("/full-mocks");

  useEffect(() => {
    if (!user || isExamRoute) return;

    // Load or generate referral code
    getOrCreateReferralCode(user).then((code) => {
      if (code) setReferralCode(code);
    });

    const checkAndShowPopup = () => {
      const lastShown = localStorage.getItem("knarrow_last_referral_popup");
      const now = Date.now();

      if (!lastShown || now - Number(lastShown) >= FIVE_MINUTES_MS) {
        setIsOpen(true);
        localStorage.setItem("knarrow_last_referral_popup", now.toString());
      }
    };

    // Check once on mount (or initial delay)
    const initialTimer = setTimeout(checkAndShowPopup, 3000);

    // Set 5-minute recurring interval
    const interval = setInterval(checkAndShowPopup, FIVE_MINUTES_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [user, isExamRoute]);

  if (!isOpen || !user || !referralCode || isExamRoute) return null;

  function copyCode() {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2500);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 99998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #ffffff, #f8fafc)",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "480px",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(8, 145, 178, 0.3)",
          border: "2px solid #38bdf8",
          position: "relative",
          textAlign: "center",
          animation: "modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
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

        {/* CROWN / GIFT ICON */}
        <div
          style={{
            width: "72px",
            height: "72px",
            background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            color: "#ffffff",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            boxShadow: "0 10px 25px rgba(34, 211, 238, 0.4)",
          }}
        >
          <Gift size={36} />
        </div>

        <div style={{ display: "inline-block", background: "#e0f2fe", color: "#0369a1", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", marginBottom: "12px" }}>
          🎁 EXCLUSIVE REFERRAL REWARD
        </div>

        <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>
          Earn 5% Cash Commission!
        </h2>

        <p style={{ color: "#475569", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
          Invite your friends to Knarrow! Whenever a friend redeems your referral code and avails their <strong>first Premium plan</strong>, you instantly receive <strong>5% of their plan price</strong> directly into your referral balance!
        </p>

        {/* REFERRAL CODE BOX */}
        <div
          style={{
            background: "#f1f5f9",
            border: "2px dashed #0284c7",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
              Your Unique Code
            </span>
            <div style={{ fontSize: "24px", fontWeight: "900", color: "#0284c7", letterSpacing: "1px" }}>
              {referralCode}
            </div>
          </div>
          <button
            onClick={copyCode}
            style={{
              background: copied ? "#16a34a" : "#0284c7",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "10px 18px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        {/* BENEFIT HIGHLIGHTS */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "24px",
            fontSize: "13px",
            color: "#334155",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={16} color="#0284c7" /> <span><strong>5% Commission</strong> credited per premium subscriber</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Award size={16} color="#0284c7" /> <span>Unlimited referrals & reward accumulation</span>
          </div>
        </div>

        <button
          onClick={copyCode}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #0284c7, #2563eb)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "14px",
            fontWeight: "800",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
          }}
        >
          Share & Claim 5% Commission 🚀
        </button>
      </div>
    </div>
  );
}
