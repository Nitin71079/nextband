import {
  getAIUsage,
} from "../services/aiUsage";
import {
  AI_CONFIG,
} from "../config/aiConfig";

export default function AIStatusCard() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
        marginTop: "20px",
      }}
    >
      <h2>
        AI Evaluation
      </h2>

      <p>
        Status:
        {" "}
        {AI_CONFIG.enabled
          ? "Enabled"
          : "Disabled"}
      </p>

      <p>
        Model:
        {" "}
        {
          AI_CONFIG.model
        }
      </p>
    </div>
  );
}