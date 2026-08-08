import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DETHeader from "../components/DETHeader";
import DETQuestionRenderer from "../components/DETQuestionRenderer";
import { DETTestEngine } from "../engines/DETTestEngine";
import { detMockTests } from "../../../data/duolingo/mockTests";
import { detItemBank } from "../../../data/duolingo/itemBank";
import "../styles/duolingo.css";

export default function DETTestEnginePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [engine, setEngine] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const mock = detMockTests.find((m) => m.id === id);
    let newEngine;

    if (mock) {
      newEngine = new DETTestEngine(mock);
    } else {
      const singleItem = detItemBank.find((i) => i.id === id);
      const customMock = {
        id: id || "custom",
        itemIds: singleItem ? [singleItem.id] : ["rc-001", "rs-001", "lt-001", "ra-001", "iw-001"],
      };
      newEngine = new DETTestEngine(customMock);
    }

    setEngine(newEngine);
    setCurrentItem(newEngine.start());
  }, [id]);

  const handleSubmitAnswer = (itemId, answer, accuracy = 0.85) => {
    if (!engine) return;
    setSubmitting(true);

    setTimeout(() => {
      const next = engine.submitItemResponse(itemId, answer, accuracy);
      setSubmitting(false);

      if (engine.isComplete || !next) {
        const itemResponses = Object.keys(engine.itemScores).map((k) => {
          const item = detItemBank.find((i) => i.id === k);
          return {
            itemId: k,
            skill: item ? item.skill : "literacy",
            difficulty: item ? item.difficultyValue : 85,
            accuracy: engine.itemScores[k].accuracy,
            answer: engine.itemScores[k].answer,
          };
        });
        sessionStorage.setItem(`det_result_${id || "latest"}`, JSON.stringify(itemResponses));
        navigate(`/duolingo/results/${id || "latest"}`);
      } else {
        setCurrentItem(next);
      }
    }, 400);
  };

  if (!currentItem) {
    return (
      <div>
        <DETHeader title="Preparing DET Test..." />
        <div style={{ textAlign: "center", padding: "60px 20px" }}>Loading adaptive DET task...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--det-surface-2)" }}>
      <DETHeader
        title={currentItem.skill ? `${currentItem.skill.toUpperCase()} Task` : "DET Adaptive Test"}
        timeLimit={currentItem.timeLimit || 120}
        onTimeUp={() => handleSubmitAnswer(currentItem.id, "TIMEOUT")}
      />

      <div style={{ padding: "32px 16px" }}>
        <DETQuestionRenderer
          item={currentItem}
          onSubmitResponse={handleSubmitAnswer}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
