import React, { useState } from "react";
import { Star, CheckCircle, X, Sparkles, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";
import { saveTestFeedback } from "../services/feedbackService";
import { useAuth } from "../context/AuthContext";

export default function TestFeedbackModal({ isOpen, onClose, testType = "Mock Test", testId = "1" }) {
  const { user, name } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [difficulty, setDifficulty] = useState("Medium");
  const [feedbackText, setFeedbackText] = useState("");
  const [recommend, setRecommend] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await saveTestFeedback({
        userId: user?.uid || "guest",
        userName: name || user?.email?.split("@")[0] || "Student",
        userEmail: user?.email || "",
        testType,
        testId,
        rating,
        difficulty,
        feedbackText,
        recommend,
      });

      setSubmitted(true);
      toast.success("Thank you! Your feedback helps us make Knarrow better.");
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    } catch (err) {
      toast.error("Could not save feedback. Please try again.");
    } finally {
      setSubmitting(false);
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
          maxWidth: "520px",
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

        {submitted ? (
          <div style={{ textAlign: "center", padding: "40px 10px" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                background: "#dcfce7",
                color: "#16a34a",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <CheckCircle size={40} />
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>Feedback Received!</h2>
            <p style={{ color: "#64748b", marginTop: "8px" }}>
              Your rating and insights help us continuously refine test accuracy and user experience.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "#ffffff",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Sparkles size={14} /> TEST COMPLETED
              </span>
            </div>

            <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
              How was this test?
            </h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
              Share your rating and feedback for <strong style={{ color: "#0891b2" }}>{testType}</strong>.
            </p>

            {/* STAR RATING */}
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Overall Rating
              </label>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
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
                      transform: (hoverRating || rating) >= star ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    <Star
                      size={36}
                      fill={(hoverRating || rating) >= star ? "#f59e0b" : "transparent"}
                      color={(hoverRating || rating) >= star ? "#f59e0b" : "#cbd5e1"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* DIFFICULTY */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Perceived Difficulty
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {["Easy", "Medium", "Hard", "Very Hard"].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    style={{
                      padding: "10px 4px",
                      borderRadius: "12px",
                      border: difficulty === diff ? "2px solid #0284c7" : "1px solid #e2e8f0",
                      background: difficulty === diff ? "#e0f2fe" : "#f8fafc",
                      color: difficulty === diff ? "#0369a1" : "#475569",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* RECOMMEND */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Would you recommend this test to friends?
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setRecommend(true)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "12px",
                    border: recommend === true ? "2px solid #16a34a" : "1px solid #e2e8f0",
                    background: recommend === true ? "#f0fdf4" : "#f8fafc",
                    color: recommend === true ? "#15803d" : "#64748b",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <ThumbsUp size={16} /> Yes, Absolutely
                </button>
                <button
                  type="button"
                  onClick={() => setRecommend(false)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "12px",
                    border: recommend === false ? "2px solid #ef4444" : "1px solid #e2e8f0",
                    background: recommend === false ? "#fef2f2" : "#f8fafc",
                    color: recommend === false ? "#b91c1c" : "#64748b",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <ThumbsDown size={16} /> Could be better
                </button>
              </div>
            </div>

            {/* TEXT COMMENTS */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Feedback / Comments (Optional)
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What did you like or think can be improved about this test?"
                rows={3}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  padding: "12px",
                  fontSize: "14px",
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #0891b2, #2563eb)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "14px",
                fontWeight: "700",
                fontSize: "16px",
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: "0 4px 14px rgba(8, 145, 178, 0.35)",
              }}
            >
              {submitting ? "Submitting Feedback..." : "Submit Feedback ✨"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
