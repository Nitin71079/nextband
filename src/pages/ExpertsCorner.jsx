import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { startExpertCheckout } from "../services/billingService";
import AISessionRoomModal from "../components/AISessionRoomModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  UserCheck,
  BrainCircuit,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Award,
  Zap,
  Video,
  AlertCircle,
  X,
  CreditCard,
  RefreshCw,
  Gift,
  FileText,
  Lock,
  ArrowRight,
  DollarSign
} from "lucide-react";

import "../styles/dashboard/dashboard.css";

const SKILL_OPTIONS = [
  {
    id: "speaking",
    title: "IELTS Speaking Practice (60 Mins)",
    description: "Full Part 1, Part 2 Cue Card & Part 3 discussion with detailed fluency, pronunciation & band score feedback.",
    icon: "🎤",
  },
  {
    id: "writing-task2",
    title: "Writing Task 2 Essay Mastery (60 Mins)",
    description: "Line-by-line essay review, task achievement breakdown, vocabulary corrections, and band score report.",
    icon: "✍️",
  },
  {
    id: "writing-task1",
    title: "Writing Task 1 Graph & Letter Review (60 Mins)",
    description: "Academic chart/graph/map analysis or General Training formal & informal letter structure critique.",
    icon: "📊",
  },
  {
    id: "full-strategy",
    title: "Full 4-Section IELTS Band 8+ Strategy (60 Mins)",
    description: "Comprehensive diagnostic review covering Reading, Listening, Writing, and Speaking with custom study plan.",
    icon: "🎯",
  },
];

const TIME_SLOTS = [
  "Today, 06:00 PM - 07:00 PM",
  "Today, 08:00 PM - 09:00 PM",
  "Tomorrow, 10:00 AM - 11:00 AM",
  "Tomorrow, 02:00 PM - 03:00 PM",
  "Tomorrow, 06:00 PM - 07:00 PM",
  "Day After, 11:00 AM - 12:00 PM",
];

export default function ExpertsCorner() {
  const { user, premium } = useAuth();
  const navigate = useNavigate();

  // Booking Form State
  const [selectedSkill, setSelectedSkill] = useState(SKILL_OPTIONS[0]);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [sessionType, setSessionType] = useState("human"); // "human" or "ai"
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // AI Live Room Modal
  const [isAIRoomOpen, setIsAIRoomOpen] = useState(false);
  const [activeAITopic, setActiveAITopic] = useState("Speaking Mock");

  // Pricing calculation
  const basePriceINR = sessionType === "human" ? 1499 : 349;
  const isFreeForPremium = sessionType === "ai" && premium;
  const finalPriceINR = isFreeForPremium ? 0 : Math.round(basePriceINR * (1 - discountPercent / 100));

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "EXPERT50") {
      setDiscountPercent(50);
      setCouponMsg("✓ Coupon EXPERT50 Applied! 50% OFF your session.");
      toast.success("Coupon EXPERT50 Applied (50% OFF)");
    } else if (code === "AIBOTFREE") {
      setDiscountPercent(100);
      setCouponMsg("✓ Coupon AIBOTFREE Applied! 100% FREE AI Session.");
      toast.success("Coupon AIBOTFREE Applied (100% FREE)");
    } else {
      setDiscountPercent(0);
      setCouponMsg("❌ Invalid coupon code");
      toast.error("Invalid coupon code");
    }
  };

  /* -------------------------------------------------------------
     PAYMENT & BOOKING HANDLER (Razorpay Official Integration)
  ------------------------------------------------------------- */
  const handleStartBookingAndPayment = async () => {
    if (!agreedTerms) {
      toast.error("Please agree to the Terms & Guarantee Policy before booking.");
      return;
    }

    setIsProcessingPayment(true);

    if (finalPriceINR > 0) {
      startExpertCheckout({
        sessionTitle: `${selectedSkill.title} (${sessionType === "human" ? "Live Tutor" : "AI Coach"})`,
        amountINR: finalPriceINR,
        user,
        onSuccess: (paymentId) => completeBooking(paymentId),
        onError: (err) => {
          setIsProcessingPayment(false);
          toast.error(err || "Payment cancelled or failed.");
        },
      });
    } else {
      setTimeout(() => {
        completeBooking(`free_pass_${Date.now()}`);
      }, 500);
    }
  };

  const completeBooking = (paymentId) => {
    setIsProcessingPayment(false);

    const booking = {
      expertId: sessionType === "human" ? "live-expert" : "ai-bot",
      expertName: sessionType === "human" ? "Senior Certified IELTS Tutor" : "Knarrow AI Band Coach",
      expertRole: selectedSkill.title,
      isAIBot: sessionType === "ai",
      date: new Date().toISOString().split("T")[0],
      timeSlot: selectedSlot,
      duration: 60,
      skillFocus: selectedSkill.title,
      status: "Upcoming",
      pricePaid: finalPriceINR === 0 ? "FREE" : `₹${finalPriceINR}`,
      paymentId: paymentId,
      paymentGateway: "Razorpay 100% Verified",
      refundGuaranteePolicy: "50% Instant Refund via Razorpay on Expert Absence",
      teacherStatus: "Confirmed",
    };

    createBooking(booking);

    toast.success(`🎉 Session Booked via Razorpay! Ref: ${paymentId}`);

    if (sessionType === "ai") {
      setActiveAITopic(selectedSkill.title);
      setIsAIRoomOpen(true);
    } else {
      navigate("/my-sessions");
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: 60 }}>
      
      {/* ═════════════════════════════════════════════════════════════
          DASHBOARD HERO CARD
      ═════════════════════════════════════════════════════════════ */}
      <section className="dashboard-hero">
        <div style={{ position: "relative", zIndex: 2 }}>
          
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            color: "#2563eb",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 16,
          }}>
            <Sparkles size={14} />
            <span>Knarrow Experts Corner • 1-Hour Live & AI Coaching</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "var(--text, #0f172a)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 14,
            maxWidth: 900,
          }}>
            Book Your 1-Hour{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              IELTS Session
            </span>
          </h1>

          <p style={{
            fontSize: 15,
            color: "var(--text-muted, #64748b)",
            maxWidth: 720,
            lineHeight: 1.6,
            marginBottom: 24,
          }}>
            Select your skill focus, date & time slot below. Book a certified live teacher or instant AI Coach with full money-back & AI takeover guarantee.
          </p>

          {/* Guarantee Highlight Strip */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            padding: "14px 20px",
            borderRadius: 18,
            maxWidth: 780,
            color: "#1e40af",
            fontSize: 13,
            fontWeight: 600,
          }}>
            <ShieldCheck size={22} style={{ color: "#2563eb", flexShrink: 0 }} />
            <div>
              <strong>100% Teacher Availability Guarantee:</strong> If a live teacher is unavailable at your session time, our advanced AI Assistant (Band 9 trained) takes the 1-hour class instantly and <strong>50% of your fee is automatically refunded</strong>!
            </div>
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          BOOKING & PAYMENT HUB
      ═════════════════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--surface, #ffffff)",
        border: "1px solid var(--border, #e2e8f0)",
        borderRadius: 28,
        padding: 32,
        boxShadow: "0 10px 30px rgba(15,23,42,.04)",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}>

        {/* STEP 1: Select Skill Focus */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{
              width: 28, height: 28, borderRadius: 999, background: "#2563eb", color: "white",
              fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyCenter: "center",
              lineHeight: 1,
            }}>1</span>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
              Select 60-Minute Skill Focus
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
          }}>
            {SKILL_OPTIONS.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  style={{
                    background: isSelected ? "rgba(37,99,235,.04)" : "var(--surface-2, #f8fafc)",
                    border: isSelected ? "2px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                    borderRadius: 20,
                    padding: 18,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{skill.icon}</span>
                    {isSelected && <CheckCircle2 size={20} style={{ color: "#2563eb" }} />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)", marginBottom: 4 }}>
                    {skill.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted, #64748b)", lineHeight: 1.4 }}>
                    {skill.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Choose Mode & Time Slot */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
          borderTop: "1px solid var(--border, #e2e8f0)",
          paddingTop: 24,
        }}>
          
          {/* Mode */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 999, background: "#2563eb", color: "white",
                fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyCenter: "center",
                lineHeight: 1,
              }}>2</span>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                Choose Session Mode
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                onClick={() => setSessionType("human")}
                style={{
                  background: sessionType === "human" ? "rgba(37,99,235,.04)" : "var(--surface-2, #f8fafc)",
                  border: sessionType === "human" ? "2px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                  borderRadius: 18,
                  padding: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)" }}>
                    Live Certified Tutor (1-on-1 Video/Audio)
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted, #64748b)", marginTop: 2 }}>
                    Scheduled 60-min session • 50% refund if teacher offline
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#2563eb" }}>₹1,499</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", textDecoration: "line-through" }}>₹2,999</div>
                </div>
              </div>

              <div
                onClick={() => setSessionType("ai")}
                style={{
                  background: sessionType === "ai" ? "rgba(37,99,235,.04)" : "var(--surface-2, #f8fafc)",
                  border: sessionType === "ai" ? "2px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                  borderRadius: 18,
                  padding: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)", display: "flex", alignItems: "center", gap: 6 }}>
                    Direct 24/7 AI Band Coach
                    {premium && <span style={{ fontSize: 10, background: "#fef3c7", color: "#92400e", padding: "2px 6px", borderRadius: 6, fontWeight: 800 }}>FREE</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted, #64748b)", marginTop: 2 }}>
                    Instant 1-hour session • Zero wait time
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#0284c7" }}>
                    {premium ? "FREE" : "₹349"}
                  </div>
                  {!premium && <div style={{ fontSize: 10, color: "#94a3b8", textDecoration: "line-through" }}>₹999</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{
                width: 28, height: 28, borderRadius: 999, background: "#2563eb", color: "white",
                fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyCenter: "center",
                lineHeight: 1,
              }}>3</span>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                Select Preferred Date & Time
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 14,
                    fontSize: 13,
                    textAlign: "left",
                    fontWeight: selectedSlot === slot ? 800 : 600,
                    background: selectedSlot === slot ? "rgba(37,99,235,.08)" : "var(--surface-2, #f8fafc)",
                    border: selectedSlot === slot ? "1px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                    color: selectedSlot === slot ? "#2563eb" : "var(--text, #0f172a)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Clock size={16} /> {slot}
                  </span>
                  {selectedSlot === slot && <CheckCircle2 size={18} style={{ color: "#2563eb" }} />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* STEP 3: Promo Code & Terms Agreement */}
        <div style={{
          borderTop: "1px solid var(--border, #e2e8f0)",
          paddingTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}>
          {/* Promo code */}
          <div style={{ maxWidth: 460 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: "var(--text, #0f172a)", display: "block", marginBottom: 6 }}>
              Have a Promo Code?
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="Try EXPERT50 or AIBOTFREE"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  flex: 1,
                  background: "var(--surface-2, #f8fafc)",
                  border: "1px solid var(--border, #e2e8f0)",
                  borderRadius: 14,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "var(--text, #0f172a)",
                  textTransform: "uppercase",
                  outline: "none",
                }}
              />
              <button
                onClick={handleApplyCoupon}
                style={{
                  padding: "10px 20px",
                  background: "var(--text, #0f172a)",
                  color: "white",
                  border: "none",
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <div style={{ fontSize: 12, fontWeight: 700, color: couponMsg.startsWith("✓") ? "#16a34a" : "#dc2626", marginTop: 4 }}>
                {couponMsg}
              </div>
            )}
          </div>

          {/* Terms & Conditions Checkbox */}
          <div style={{
            background: "var(--surface-2, #f8fafc)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: 18,
            padding: 16,
          }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                style={{ marginTop: 2, width: 18, height: 18, accentColor: "#2563eb" }}
              />
              <div style={{ fontSize: 13, color: "var(--text, #0f172a)", lineHeight: 1.5 }}>
                <strong>I agree to the Terms & Guarantee Policy:</strong> If a live human teacher is unavailable or offline at the session time, an advanced AI assistant will take the 1-hour class, and <strong>50% of the class fee will be automatically refunded</strong>.
              </div>
            </label>
          </div>

          {/* Final Checkout Button */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            padding: 24,
            borderRadius: 22,
          }}>
            <div>
              <div style={{ fontSize: 12, color: "#1e40af", fontWeight: 700 }}>Total Investment</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1e3a8a" }}>
                {finalPriceINR === 0 ? "FREE" : `₹${finalPriceINR}`}
              </div>
              {discountPercent > 0 && finalPriceINR > 0 && (
                <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 800 }}>({discountPercent}% Discount Applied)</div>
              )}
            </div>

            <button
              onClick={handleStartBookingAndPayment}
              disabled={isProcessingPayment}
              style={{
                padding: "16px 36px",
                borderRadius: 18,
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white",
                border: "none",
                fontWeight: 900,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 12px 30px rgba(37,99,235,.3)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: isProcessingPayment ? 0.7 : 1,
              }}
            >
              {isProcessingPayment ? (
                <>
                  <RefreshCw size={20} className="animate-spin" /> Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard size={20} /> Pay & Book 1-Hour Session (Razorpay)
                </>
              )}
            </button>
          </div>
        </div>

      </section>

      {/* ═════════════════════════════════════════════════════════════
          AI SESSION ROOM LAUNCHER MODAL
      ═════════════════════════════════════════════════════════════ */}
      <AISessionRoomModal
        isOpen={isAIRoomOpen}
        onClose={() => setIsAIRoomOpen(false)}
        topic={activeAITopic}
      />

    </div>
  );
}
