import React, { useState, useEffect } from "react";
import { Star, CheckCircle, X, Sparkles, MessageSquare, ThumbsUp, ThumbsDown, Clock, Heart, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { savePeriodicUserFeedback } from "../services/feedbackService";
import { useAuth } from "../context/AuthContext";

const FIVE_MINUTES_MS = 5 * 60 * 1000; // 5 minutes

export default function PeriodicFeedbackModal() {
  const { user, name } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [satisfaction, setSatisfaction] = useState("Satisfied");
  const [category, setCategory] = useState("General Platform");
  const [feedbackText, setFeedbackText] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsOpen(false);
      return;
    }

    // Initialize or check last prompt time
    const storageKey = `nextband_last_feedback_${user.uid}`;
    let lastPrompt = localStorage.getItem(storageKey);
    const now = Date.now();

    if (!lastPrompt) {
      localStorage.setItem(storageKey, now.toString());
      lastPrompt = now.toString();
    }

    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - Number(localStorage.getItem(storageKey) || Date.now());
      if (elapsed >= FIVE_MINUTES_MS && !isOpen) {
        setIsOpen(true);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkInterval);
  }, [user, isOpen]);

  const handleClose = (snooze = true) => {
    if (user) {
      const storageKey = `nextband_last_feedback_${user.uid}`;
      localStorage.setItem(storageKey, Date.now().toString());
    }
    setIsOpen(false);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const deviceInfo = `${window.innerWidth}x${window.innerHeight} (${navigator.platform || "Web"})`;

    try {
      await savePeriodicUserFeedback({
        userId: user?.uid || "anonymous",
        userName: name || user?.displayName || user?.email?.split("@")[0] || "Logged Candidate",
        userEmail: user?.email || "",
        rating,
        satisfaction,
        category,
        recommend,
        feedbackText,
        pathName: window.location.pathname,
        deviceInfo,
      });

      setSubmitted(true);
      toast.success("Thank you for your valuable feedback!");

      setTimeout(() => {
        handleClose(false);
        setFeedbackText("");
      }, 1600);
    } catch (err) {
      console.error("Error submitting periodic feedback:", err);
      toast.error("Could not save feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user || !isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "var(--card, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "540px",
          padding: "32px",
          boxShadow: "0 30px 70px -10px rgba(0, 0, 0, 0.35)",
          position: "relative",
          animation: "modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          color: "var(--text, #0f172a)",
        }}
      >
        {/* Snooze / Close button */}
        <button
          onClick={() => handleClose(true)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(148, 163, 184, 0.12)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-secondary, #64748b)",
            transition: "all 0.2s ease",
          }}
          title="Dismiss (Remind in 5 mins)"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "36px 12px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "rgba(34, 197, 94, 0.15)",
                color: "#22c55e",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <CheckCircle size={42} />
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", margin: "0 0 8px 0" }}>
              Feedback Saved to Monitor!
            </h2>
            <p style={{ color: "var(--text-secondary, #64748b)", fontSize: "14px", margin: 0 }}>
              Thank you! Your feedback has been registered in the admin monitor panel.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Header badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span
                style={{
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "#ffffff",
                  padding: "5px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  letterSpacing: "0.4px",
                }}
              >
                <Sparkles size={14} /> 5-MINUTE CANDIDATE CHECK-IN
              </span>

              <span style={{ fontSize: "12px", color: "var(--text-secondary, #64748b)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Clock size={13} /> Routine Pulse
              </span>
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "6px", letterSpacing: "-0.5px" }}>
              How is your experience so far?
            </h2>
            <p style={{ color: "var(--text-secondary, #64748b)", fontSize: "14px", marginBottom: "22px", lineHeight: "1.4" }}>
              Hi <strong>{name || user?.email?.split("@")[0]}</strong>, every detail you provide is recorded directly into our live monitor panel to help us serve you better.
            </p>

            {/* STAR RATING */}
            <div style={{ marginBottom: "20px", textAlign: "center", background: "var(--surface, #f8fafc)", padding: "16px", borderRadius: "16px", border: "1px solid var(--border, #e2e8f0)" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary, #64748b)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                Rate Your Current Session
              </label>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      transition: "transform 0.15s ease",
                      transform: (hoverRating || rating) >= star ? "scale(1.2)" : "scale(1)",
                    }}
                  >
                    <Star
                      size={32}
                      fill={(hoverRating || rating) >= star ? "#f59e0b" : "transparent"}
                      color={(hoverRating || rating) >= star ? "#f59e0b" : "#cbd5e1"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* CATEGORY SELECTOR */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary, #64748b)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Topic / Area of Feedback
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["General Platform", "Mock Tests & AI", "UI & Navigation", "Feature Request", "Performance / Speed"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: "7px 12px",
                      borderRadius: "10px",
                      border: category === cat ? "1.5px solid #2563eb" : "1px solid var(--border, #e2e8f0)",
                      background: category === cat ? "rgba(37, 99, 235, 0.1)" : "var(--surface, #f8fafc)",
                      color: category === cat ? "#2563eb" : "var(--text, #334155)",
                      fontWeight: "700",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* RECOMMENDATION */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary, #64748b)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Would you recommend Knarrow?
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setRecommend(true)}
                  style={{
                    flex: 1,
                    padding: "9px",
                    borderRadius: "10px",
                    border: recommend === true ? "2px solid #16a34a" : "1px solid var(--border, #e2e8f0)",
                    background: recommend === true ? "rgba(34, 197, 94, 0.1)" : "var(--surface, #f8fafc)",
                    color: recommend === true ? "#15803d" : "var(--text-secondary, #64748b)",
                    fontWeight: "700",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                >
                  <ThumbsUp size={15} /> Yes, Absolutely
                </button>
                <button
                  type="button"
                  onClick={() => setRecommend(false)}
                  style={{
                    flex: 1,
                    padding: "9px",
                    borderRadius: "10px",
                    border: recommend === false ? "2px solid #ef4444" : "1px solid var(--border, #e2e8f0)",
                    background: recommend === false ? "rgba(239, 68, 68, 0.1)" : "var(--surface, #f8fafc)",
                    color: recommend === false ? "#b91c1c" : "var(--text-secondary, #64748b)",
                    fontWeight: "700",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                >
                  <ThumbsDown size={15} /> Needs Work
                </button>
              </div>
            </div>

            {/* DETAILED COMMENTS */}
            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "var(--text-secondary, #64748b)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Detailed Feedback (Every detail counts!)
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us what's working well, what needs fixing, or any feature you'd love to see..."
                rows={3}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid var(--border, #cbd5e1)",
                  padding: "12px",
                  fontSize: "13px",
                  background: "var(--bg, #ffffff)",
                  color: "var(--text, #0f172a)",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => handleClose(true)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "14px",
                  border: "1px solid var(--border, #cbd5e1)",
                  background: "transparent",
                  color: "var(--text-secondary, #64748b)",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Later (5m)
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "12px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: submitting ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {submitting ? "Sending..." : "Submit to Monitor Panel ✨"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
