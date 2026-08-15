import { useState } from "react";
import TestCenter from "../components/TestCenter";
import academicWritingTests from "../data/writing/academic/academicWritingTests";
import generalWritingTests from "../data/writing/general/generalWritingTests";

export default function WritingCenter() {
  const [examType, setExamType] = useState("academic"); // "academic" | "general"

  const rawTests = examType === "general" ? generalWritingTests : academicWritingTests;

  const tests = rawTests.map((test) => ({
    id: test.id,
    title: test.title,
    duration: `${test.duration} mins`,
    questions: 2,
    difficulty: test.difficulty,
    completed: false,
    bestBand: "--",
  }));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", padding: "20px 0 0", background: "var(--surface-bg)" }}>
        <button
          onClick={() => setExamType("academic")}
          style={{
            padding: "10px 24px",
            borderRadius: "12px",
            fontWeight: "800",
            fontSize: "15px",
            border: examType === "academic" ? "2px solid #2563eb" : "1px solid var(--border-color)",
            background: examType === "academic" ? "rgba(37, 99, 235, 0.1)" : "var(--card-bg)",
            color: examType === "academic" ? "#2563eb" : "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          IELTS Academic Writing (100 Tests)
        </button>
        <button
          onClick={() => setExamType("general")}
          style={{
            padding: "10px 24px",
            borderRadius: "12px",
            fontWeight: "800",
            fontSize: "15px",
            border: examType === "general" ? "2px solid #2563eb" : "1px solid var(--border-color)",
            background: examType === "general" ? "rgba(37, 99, 235, 0.1)" : "var(--card-bg)",
            color: examType === "general" ? "#2563eb" : "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          IELTS General Training Writing (100 Tests)
        </button>
      </div>

      <TestCenter
        theme="writing"
        title={examType === "general" ? "General Training Writing Center" : "Academic Writing Center"}
        description={
          examType === "general"
            ? "Practice General Training Letters (Formal, Semi-formal, Informal) & Task 2 Essays with AI evaluation."
            : "Practice Academic Reports (Graphs, Charts, Maps, Processes) & Task 2 Essays with AI evaluation."
        }
        icon="✍️"
        route={examType === "general" ? "/mock/general-writing" : "/mock/writing"}
        tests={tests}
        freeLimit={1}
      />
    </div>
  );
}