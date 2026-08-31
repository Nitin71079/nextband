import { useState } from "react";
import { ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

export default function InteractiveReadingRenderer({ item, onSubmit, submitting }) {
  const [stepIndex, setStepIndex] = useState(0); // 0: Missing Sentence, 1: Comprehension, 2: Main Idea, 3: Best Title
  const [stepAnswers, setStepAnswers] = useState({});

  if (!item) return null;

  const irData = item.interactiveReading || {
    passageTitle: item.passageTitle || "Academic Reading",
    part1: item.passageText || "Cities can support a variety of living organisms. Green roofs are becoming common. ________.",
    missingSentenceText: "They help regulate building temperatures and manage rainwater runoff.",
    part2: "Access to natural spaces provides opportunities for recreation and relaxation.",
    part3: "The structural connectivity between green corridors influences which species survive.",
    step1MissingSentence: {
      prompt: "Select the sentence that best completes the passage.",
      options: [
        "They help regulate building temperatures and manage rainwater runoff.",
        "Most major cities have completely eliminated natural habitats.",
        "Buildings are generally constructed without thermal insulation.",
        "Birds are unable to nest in urban environments."
      ],
      correctIndex: 0
    },
    step2Comprehension: {
      prompt: "According to the passage, what is one benefit of green roofs?",
      options: [
        "They help regulate building temperatures and create habitats.",
        "They completely replace public urban parks.",
        "They prevent all city flooding during heavy storms.",
        "They reduce the number of buildings in metropolitan areas."
      ],
      correctIndex: 0
    },
    step3MainIdea: {
      prompt: "What is the main idea of the passage?",
      options: [
        "Urban environments can support biodiversity and benefit people when green spaces are thoughtfully implemented.",
        "Modern cities are completely unsuitable for any living organisms.",
        "Green roofs are built exclusively to reduce construction expenses.",
        "Urban population growth has destroyed all ecological systems."
      ],
      correctIndex: 0
    },
    step4BestTitle: {
      prompt: "Which title best describes the passage?",
      options: [
        "Biodiversity in Urban Environments",
        "The History of Modern Architectural Design",
        "Why Cities Are Expanding Globally",
        "The Economic Cost of Green Roof Construction"
      ],
      correctIndex: 0
    }
  };

  const steps = [
    { key: "step1MissingSentence", label: "TASK 1 — MISSING SENTENCE", data: irData.step1MissingSentence },
    { key: "step2Comprehension", label: "TASK 2 — COMPREHENSION", data: irData.step2Comprehension },
    { key: "step3MainIdea", label: "TASK 3 — MAIN IDEA", data: irData.step3MainIdea },
    { key: "step4BestTitle", label: "TASK 4 — BEST TITLE", data: irData.step4BestTitle },
  ];

  const currentStep = steps[stepIndex];

  const handleSelectOption = (oIdx) => {
    setStepAnswers((prev) => ({ ...prev, [stepIndex]: oIdx }));
  };

  const handleNextStep = () => {
    if (stepAnswers[stepIndex] === undefined) {
      toast.error("Please select an option to continue.");
      return;
    }
    if (stepIndex < steps.length - 1) {
      setStepIndex((s) => s + 1);
    } else {
      let correct = 0;
      steps.forEach((st, idx) => {
        if (stepAnswers[idx] === st.data.correctIndex) correct += 1;
      });
      const accuracy = correct / steps.length;
      onSubmit(stepAnswers, accuracy);
    }
  };

  // Build progressive passage reveal text
  const getProgressivePassageContent = () => {
    if (stepIndex === 0) {
      return (
        <div>
          <span>{irData.part1.replace("________.", "").replace("________", "")}</span>{" "}
          <span style={{ fontWeight: 700, color: "var(--det-text-muted, #64748b)" }}>
            [ ________ ]
          </span>
        </div>
      );
    }

    if (stepIndex === 1) {
      return (
        <div>
          <span>{irData.part1.replace("________.", "").replace("________", "")}</span>{" "}
          <span>
            {irData.missingSentenceText}
          </span>{" "}
          <p style={{ marginTop: 12 }}>{irData.part2}</p>
        </div>
      );
    }

    // Step 2 & 3: Full passage revealed
    return (
      <div>
        <span>{irData.part1.replace("________.", "").replace("________", "")}</span>{" "}
        <span>
          {irData.missingSentenceText}
        </span>{" "}
        <p style={{ marginTop: 12 }}>{irData.part2}</p>
        <p style={{ marginTop: 12 }}>{irData.part3}</p>
      </div>
    );
  };

  return (
    <div className="det-test-card" style={{ maxWidth: "980px", margin: "0 auto" }}>
      {/* ── TOP BADGE & PROGRESS STEPS ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: 12 }}>
        <span className="det-hero-badge" style={{ background: "#58cc02", color: "#fff", padding: "6px 16px", borderRadius: 999, fontWeight: 900, fontSize: 13 }}>
          INTERACTIVE READING
        </span>

        <div style={{ display: "flex", gap: 8 }}>
          {steps.map((st, idx) => (
            <span
              key={st.key}
              style={{
                fontSize: 11,
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: 999,
                background: idx === stepIndex ? "#10b981" : idx < stepIndex ? "rgba(16,185,129,0.2)" : "var(--det-surface-2)",
                color: idx === stepIndex ? "#ffffff" : idx < stepIndex ? "#10b981" : "var(--det-text-muted)",
                border: idx === stepIndex ? "1px solid #10b981" : "none",
              }}
            >
              Step {idx + 1}
            </span>
          ))}
        </div>
      </div>

      {/* ── 2-COLUMN SPLIT VIEW ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Left Column: Progressive Revealed Passage */}
        <div
          style={{
            padding: "24px",
            background: "var(--det-surface-2)",
            borderRadius: "20px",
            fontSize: "15px",
            lineHeight: "1.75",
            maxHeight: "440px",
            overflowY: "auto",
            border: "1px solid var(--det-border)",
            color: "var(--det-text)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: "#10b981", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <BookOpen size={14} /> Progressive Reading Passage
          </div>
          <h4 style={{ margin: "0 0 14px 0", fontSize: "17px", fontWeight: "900", color: "var(--det-text)" }}>
            {irData.passageTitle}
          </h4>
          {getProgressivePassageContent()}
        </div>

        {/* Right Column: Step Tasks */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 900, color: "#10b981", letterSpacing: "0.5px", marginBottom: 8 }}>
            {currentStep.label}
          </div>
          <h3 style={{ fontSize: "17px", fontWeight: "800", marginBottom: "18px", color: "var(--det-text)", lineHeight: 1.4 }}>
            {currentStep.data.prompt}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {currentStep.data.options.map((opt, oIdx) => {
              const selected = stepAnswers[stepIndex] === oIdx;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(oIdx)}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    fontWeight: "600",
                    fontSize: "14px",
                    textAlign: "left",
                    lineHeight: "1.5",
                    border: selected ? "2px solid #10b981" : "1px solid var(--det-border)",
                    background: selected ? "rgba(16,185,129,0.12)" : "var(--det-surface)",
                    color: selected ? "#10b981" : "var(--det-text)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <button
            className="det-btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "16px",
              fontWeight: 900,
              fontSize: "16px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)",
              transition: "all 0.15s ease"
            }}
            onClick={handleNextStep}
          >
            {stepIndex < steps.length - 1 ? "Submit & Continue Step →" : "Finish Interactive Reading →"}
          </button>
        </div>
      </div>
    </div>
  );
}
