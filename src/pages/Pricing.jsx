import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, CheckCircle2, Zap, ShieldCheck, Award, Layers,
  Lock, ArrowRight, HelpCircle, RefreshCw, Star, Check, X, Crown, Clock
} from "lucide-react";
import { getActiveUserPlan, activateUserPlan } from "../utils/planAccess";
import ExamTrackHeaderSwitcher from "../components/ExamTrackHeaderSwitcher";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function Pricing() {
  const navigate = useNavigate();

  // Active Plan State
  const [currentPlan, setCurrentPlan] = useState(getActiveUserPlan());
  const [billingCycle, setBillingCycle] = useState("monthly"); // "weekly" | "monthly" | "yearly" | "lifetime"
  const [packType, setPackType] = useState("all_access"); // "all_access" | "single_track"
  const [selectedTrack, setSelectedTrack] = useState("DET");
  const [successModal, setSuccessModal] = useState(null);

  useEffect(() => {
    const handlePlanChange = () => {
      setCurrentPlan(getActiveUserPlan());
    };
    window.addEventListener("knarrow_plan_changed", handlePlanChange);
    return () => window.removeEventListener("knarrow_plan_changed", handlePlanChange);
  }, []);

  // Pricing Matrix Configs
  const pricingData = {
    all_access: {
      weekly: { priceUSD: "$12", priceINR: "₹799", period: "per week", badge: "QUICK SPRINT", discount: null },
      monthly: { priceUSD: "$29", priceINR: "₹1,899", period: "per month", badge: "MOST POPULAR", discount: "SAVE 40%" },
      yearly: { priceUSD: "$99", priceINR: "₹5,999", period: "per year", badge: "BEST VALUE", discount: "SAVE 65%" },
      lifetime: { priceUSD: "$199", priceINR: "₹11,999", period: "one-time payment", badge: "LIFETIME VIP", discount: "PAY ONCE FOREVER" }
    },
    single_track: {
      weekly: { priceUSD: "$7", priceINR: "₹449", period: "per week", badge: "SINGLE EXAM SPRINT", discount: null },
      monthly: { priceUSD: "$19", priceINR: "₹1,199", period: "per month", badge: "RECOMMENDED FOR 1 EXAM", discount: "SAVE 35%" },
      yearly: { priceUSD: "$69", priceINR: "₹3,999", period: "per year", badge: "BEST VALUE", discount: "SAVE 60%" },
      lifetime: { priceUSD: "$149", priceINR: "₹7,999", period: "one-time payment", badge: "LIFETIME SINGLE TRACK", discount: "PERPETUAL ACCESS" }
    }
  };

  const currentPricing = pricingData[packType][billingCycle];

  const handleActivatePlan = (planId) => {
    const payload = activateUserPlan(planId, packType, packType === "single_track" ? selectedTrack : null, billingCycle);
    setSuccessModal(payload);
  };

  const tracksList = [
    { id: "IELTS", name: "IELTS Academic & General" },
    { id: "DET", name: "Duolingo English Test (DET)" },
    { id: "TOEFL", name: "TOEFL iBT 2026" },
    { id: "PTE", name: "PTE Academic" },
    { id: "GRE", name: "GRE General Test" },
    { id: "CAT", name: "CAT MBA Entrance" },
    { id: "ACT", name: "ACT 2026 Exam" },
    { id: "SAT", name: "Digital SAT 2026" },
    { id: "GMAT", name: "GMAT Exam 2026" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #0369a1 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── EXAM TRACK HEADER SWITCHER ── */}
        <ExamTrackHeaderSwitcher />

        {/* ── HERO BANNER ── */}
        <div style={{ textAlign: "center", marginBottom: 48, position: "relative" }}>
          
          {/* Decorative Floating Glass Danglers */}
          <FloatingDanglerPill
            icon={Crown}
            value="100% Unlocked"
            label="All Exam Tracks"
            variant="light"
            iconBg="rgba(250, 204, 21, 0.15)"
            iconColor="#facc15"
            floatDelay={0}
            style={{ position: "absolute", top: 10, right: 40 }}
          />

          <FloatingDanglerPill
            icon={ShieldCheck}
            value="7-Day Guarantee"
            label="Money-Back Promise"
            variant="light"
            iconBg="rgba(56, 189, 248, 0.15)"
            iconColor="#38bdf8"
            floatDelay={1.5}
            style={{ position: "absolute", bottom: 0, left: 40 }}
          />

          <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "6px 20px", borderRadius: 999, fontSize: 13, fontWeight: 900, letterSpacing: 0.5, display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={15} /> UNLOCK ALL 100 MOCKS &amp; AI EVALUATIONS
          </span>

          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1px" }}>
            Invest in Your High Exam Score
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "1.15rem", maxWidth: 750, margin: "0 auto 36px", lineHeight: 1.6 }}>
            Every exam includes <strong>3 Free Full Mocks</strong> &amp; <strong>3 Free Arcade Games</strong>. Upgrade to unlock all 100 Mocks per exam, 800+ total simulation tests, Groq AI feedback, and all 9 multiplayer arcade games!
          </p>

          {/* ── PACK TYPE TOGGLE (ALL ACCESS VS SINGLE EXAM) ── */}
          <div style={{ display: "inline-flex", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: 6, marginBottom: 28, backdropFilter: "blur(10px)" }}>
            <button
              onClick={() => setPackType("all_access")}
              style={{
                background: packType === "all_access" ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "transparent",
                color: "#ffffff",
                border: "none",
                borderRadius: 16,
                padding: "12px 28px",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: packType === "all_access" ? "0 6px 20px rgba(2,132,199,0.4)" : "none"
              }}
            >
              <Crown size={18} color="#facc15" /> All-Exam All-Access Pass (8 Tracks)
            </button>
            <button
              onClick={() => setPackType("single_track")}
              style={{
                background: packType === "single_track" ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "transparent",
                color: "#ffffff",
                border: "none",
                borderRadius: 16,
                padding: "12px 28px",
                fontWeight: 900,
                fontSize: 14,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: packType === "single_track" ? "0 6px 20px rgba(2,132,199,0.4)" : "none"
              }}
            >
              <Layers size={18} /> Single Exam Track Pass
            </button>
          </div>

          {/* Single Track Selector dropdown if single track chosen */}
          {packType === "single_track" && (
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, color: "#38bdf8", fontWeight: 800, marginRight: 10 }}>Select Target Exam Track:</label>
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                style={{ background: "#0f172a", color: "#ffffff", border: "2px solid #38bdf8", borderRadius: 12, padding: "8px 16px", fontSize: 14, fontWeight: 800, outline: "none", cursor: "pointer" }}
              >
                {tracksList.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* ── DURATION BILLING CYCLE TOGGLE ── */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {[
              { id: "weekly", label: "Weekly Pass" },
              { id: "monthly", label: "Monthly Pass" },
              { id: "yearly", label: "Yearly Pass (Save 65%)" },
              { id: "lifetime", label: "Lifetime Pass (VIP)" },
            ].map((cycle) => {
              const isActive = billingCycle === cycle.id;
              return (
                <button
                  key={cycle.id}
                  onClick={() => setBillingCycle(cycle.id)}
                  style={{
                    background: isActive ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#38bdf8" : "#cbd5e1",
                    border: isActive ? "2px solid #38bdf8" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 14,
                    padding: "10px 20px",
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  {cycle.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* ── PRICING CARDS DISPLAY ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 56 }}>
          
          {/* FREE PLAN CARD */}
          <div style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
                ALWAYS FREE TIER
              </span>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", margin: "16px 0 8px 0" }}>Free Practice Pass</h3>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff" }}>
                $0 <span style={{ fontSize: 14, color: "#94a3b8" }}>/ forever</span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: "12px 0 24px 0" }}>
                Explore the Knarrow platform with free starter mocks and games.
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "#cbd5e1" }}>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#22c55e" />
                  <span><strong>3 Full Mocks Free</strong> per exam track (#1, #2, #3)</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#22c55e" />
                  <span><strong>2 IELTS Sectional Tests</strong> per skill</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#22c55e" />
                  <span><strong>3 Arcade Games Unlocked</strong> (Word Chain, Fixer, Blitz)</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.5 }}>
                  <X size={16} color="#ef4444" />
                  <span>Mocks #4–100 (Locked)</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.5 }}>
                  <X size={16} color="#ef4444" />
                  <span>Groq AI Llama 3.3 Diagnostic Action Plan</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              style={{ width: "100%", background: "rgba(255,255,255,0.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 14, fontWeight: 800, marginTop: 32, cursor: "default" }}
            >
              Current Active Tier
            </button>
          </div>

          {/* PAID PLAN CARD (FEATURED) */}
          <div style={{ background: "linear-gradient(135deg, rgba(2,132,199,0.2) 0%, rgba(124,58,237,0.2) 100%)", border: "2px solid #38bdf8", borderRadius: 28, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 20px 50px rgba(2,132,199,0.3)", position: "relative" }}>
            
            {currentPricing.badge && (
              <span style={{ position: "absolute", top: -14, right: 28, background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", padding: "4px 16px", borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5, boxShadow: "0 4px 15px rgba(2,132,199,0.4)" }}>
                {currentPricing.badge}
              </span>
            )}

            <div>
              <span style={{ background: "rgba(56,189,248,0.25)", color: "#38bdf8", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>
                {packType === "all_access" ? "ALL-EXAM UNLIMITED PASS" : `${selectedTrack} EXAM PASS`}
              </span>

              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", margin: "16px 0 8px 0" }}>
                {packType === "all_access" ? "Knarrow All-Access VIP" : `Knarrow ${selectedTrack} Pass`}
              </h3>

              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff" }}>
                  {currentPricing.priceUSD} <span style={{ fontSize: 20, color: "#94a3b8" }}>({currentPricing.priceINR})</span>
                </div>
                <div style={{ fontSize: 14, color: "#cbd5e1" }}>/ {currentPricing.period}</div>
              </div>

              <p style={{ color: "#cbd5e1", fontSize: 13, margin: "12px 0 24px 0" }}>
                {packType === "all_access" ? "Unlocks all 8 exam tracks (IELTS, DET, TOEFL, PTE, GRE, CAT, ACT, SAT, GMAT)." : `Unlocks all 100 mocks, sectional drills, and games for ${selectedTrack}.`}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "#ffffff" }}>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#38bdf8" />
                  <span><strong>All 100 Full Mocks Unlocked</strong> ({packType === "all_access" ? "800+ Total Mocks" : `100 ${selectedTrack} Mocks`})</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#38bdf8" />
                  <span><strong>Groq AI Llama 3.3</strong> Instant Diagnostic Evaluation &amp; 7-Day Action Plan</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#38bdf8" />
                  <span><strong>All 9 Multiplayer Arcade Games Unlocked</strong> (Showdown, Duel, Sniper, etc.)</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#38bdf8" />
                  <span><strong>Unlimited AI Speaking &amp; Writing Feedback</strong></span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={16} color="#38bdf8" />
                  <span><strong>Score Improvement Guarantee</strong> (7-Day Money Back Promise)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleActivatePlan(`${packType}_${billingCycle}`)}
              style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 16, padding: 16, fontWeight: 900, fontSize: 16, cursor: "pointer", marginTop: 32, boxShadow: "0 8px 25px rgba(2,132,199,0.4)" }}
            >
              Activate {packType === "all_access" ? "All-Access Pass" : `${selectedTrack} Pass`} Now →
            </button>
          </div>

        </div>

        {/* ── COMPARISON MATRIX TABLE ── */}
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, marginBottom: 56 }}>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", textAlign: "center", marginBottom: 28 }}>
            Plan Feature Comparison Matrix
          </h3>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "#ffffff", textAlign: "left", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  <th style={{ padding: 16 }}>Platform Feature</th>
                  <th style={{ padding: 16, color: "#94a3b8" }}>Free Tier</th>
                  <th style={{ padding: 16, color: "#38bdf8" }}>Single Exam Pass</th>
                  <th style={{ padding: 16, color: "#c084fc" }}>All-Access VIP Pass</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Full Simulation Mocks per Track", free: "3 Free Mocks", single: "100 Mocks (Selected Track)", all: "800+ Mocks (All 8 Tracks)" },
                  { feature: "IELTS Sectional Practice", free: "2 Tests per Skill", single: "Unlimited (If IELTS Pass)", all: "Unlimited (All Skills)" },
                  { feature: "Arcade Games Access", free: "3 Free Games", single: "All 9 Games Unlocked", all: "All 9 Games Unlocked" },
                  { feature: "Groq AI Llama 3.3 Scoring", free: "Basic", single: "Full 7-Day Plan", all: "Full Unlimited AI Plan" },
                  { feature: "Computer-Adaptive CAT Engine", free: "✓", single: "✓", all: "✓" },
                  { feature: "On-Screen Tools (Desmos / Calc)", free: "✓", single: "✓", all: "✓" },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: 16, fontWeight: 700 }}>{row.feature}</td>
                    <td style={{ padding: 16, color: "#cbd5e1" }}>{row.free}</td>
                    <td style={{ padding: 16, color: "#38bdf8", fontWeight: 800 }}>{row.single}</td>
                    <td style={{ padding: 16, color: "#c084fc", fontWeight: 900 }}>{row.all}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── SUCCESS MODAL ── */}
        <AnimatePresence>
          {successModal && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(8,12,20,0.9)", backdropFilter: "blur(20px)", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ background: "#0f172a", border: "2px solid #38bdf8", borderRadius: 28, padding: 40, maxWidth: 500, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.2)", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", margin: "0 0 12px 0" }}>Plan Activated Successfully!</h3>
                <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
                  Your <strong>{successModal.type === "ALL_ACCESS" ? "All-Exam All-Access VIP Pass" : `${successModal.trackId} Pass`}</strong> is now active. All 100 Mocks, AI feedback, and Arcade Games are unlocked!
                </p>
                <button
                  onClick={() => {
                    setSuccessModal(null);
                    navigate(successModal.trackId ? `/${successModal.trackId.toLowerCase()}` : "/dashboard");
                  }}
                  style={{ width: "100%", background: "linear-gradient(135deg, #0284c7, #7c3aed)", color: "#ffffff", border: "none", borderRadius: 16, padding: 16, fontWeight: 900, fontSize: 16, cursor: "pointer" }}
                >
                  Start Practicing Now →
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
