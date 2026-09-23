import React from "react";
import { Ban, XCircle } from "lucide-react";

/**
 * SATAnswerEliminator Component & Utilities
 * Official Digital SAT Bluebook Answer Eliminator (Strikethrough Cross-Out Tool).
 * Allows students to cross off choices they wish to eliminate before selecting their final answer.
 */
export function SATAnswerEliminatorToggle({ isEliminatorActive, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: isEliminatorActive ? "rgba(239, 68, 68, 0.25)" : "rgba(255, 255, 255, 0.08)",
        color: isEliminatorActive ? "#f87171" : "#cbd5e1",
        border: isEliminatorActive ? "1px solid #f87171" : "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 10,
        padding: "8px 12px",
        fontSize: 12,
        fontWeight: 800,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.2s ease"
      }}
    >
      <Ban size={15} /> {isEliminatorActive ? "Eliminator Mode ON" : "Answer Eliminator"}
    </button>
  );
}

/**
 * Helper to toggle an option in the eliminated set
 */
export function toggleEliminatedOption(eliminatedMap, questionId, optionKey) {
  const current = eliminatedMap[questionId] || [];
  const exists = current.includes(optionKey);

  const updatedList = exists
    ? current.filter((item) => item !== optionKey)
    : [...current, optionKey];

  return {
    ...eliminatedMap,
    [questionId]: updatedList
  };
}
