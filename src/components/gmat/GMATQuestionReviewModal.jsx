import React from "react";
import { Bookmark, CheckCircle2, AlertCircle, ArrowRight, Lock, Clock } from "lucide-react";

export default function GMATQuestionReviewModal({
  questionsList = [],
  userAnswers = {},
  flaggedQuestions = {},
  answerChangeCount = 0,
  maxChanges = 3,
  timeLeftFormatted = "00:00",
  onSelectQuestionToEdit,
  onFinishSectionReview
}) {
  const changesLeft = Math.max(0, maxChanges - answerChangeCount);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(9, 13, 22, 0.95)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "#0f172a",
          border: "2px solid #0284c7",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #1e293b", paddingBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
              GMAT Question Review & Edit Stage
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", margin: "4px 0 0 0" }}>
              Section Review Screen
            </h2>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ background: "#1e293b", border: "1px solid #334155", padding: "8px 14px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={16} color="#38bdf8" />
              <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>{timeLeftFormatted}</span>
            </div>

            <div style={{ background: changesLeft > 0 ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)", border: `1px solid ${changesLeft > 0 ? "#10b981" : "#ef4444"}`, padding: "8px 14px", borderRadius: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: changesLeft > 0 ? "#10b981" : "#ef4444" }}>
                {changesLeft} of {maxChanges} Answer Changes Remaining
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "20px", fontSize: "13px", color: "#94a3b8", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "14px", height: "14px", background: "#10b981", borderRadius: "4px" }} />
            <span>Answered</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "14px", height: "14px", background: "#334155", borderRadius: "4px" }} />
            <span>Unanswered</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Bookmark size={14} color="#facc15" />
            <span>Bookmarked</span>
          </div>
        </div>

        {/* Question Grid */}
        <div style={{ flex: 1, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "14px", paddingRight: "8px", marginBottom: "28px" }}>
          {questionsList.map((q, idx) => {
            const qNum = idx + 1;
            const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== null && userAnswers[q.id] !== "";
            const isBookmarked = Boolean(flaggedQuestions[q.id]);

            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestionToEdit(idx)}
                style={{
                  background: "#1e293b",
                  border: isBookmarked ? "2px solid #facc15" : "1px solid #334155",
                  borderRadius: "12px",
                  padding: "14px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.15s ease",
                  position: "relative"
                }}
              >
                {isBookmarked && (
                  <Bookmark size={14} color="#facc15" fill="#facc15" style={{ position: "absolute", top: 8, right: 8 }} />
                )}

                <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff" }}>
                  Q{qNum}
                </div>

                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: isAnswered ? "#10b981" : "#94a3b8" }}>
                    {isAnswered ? "Answered" : "Unanswered"}
                  </span>
                  {isAnswered ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : (
                    <AlertCircle size={16} color="#64748b" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1e293b", paddingTop: "20px" }}>
          <div style={{ fontSize: "13px", color: "#94a3b8" }}>
            Review any question above or click finish when ready to proceed.
          </div>

          <button
            onClick={onFinishSectionReview}
            style={{
              background: "linear-gradient(135deg, #0284c7, #10b981)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 28px",
              fontWeight: 800,
              fontSize: "15px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 4px 15px rgba(2, 132, 199, 0.4)"
            }}
          >
            Complete Section Review <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
