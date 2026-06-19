import {
  generateRecommendations,
} from "../services/recommendationEngine";

export default function AIRecommendationCard({
  weakestSkill,
  currentBand,
}) {
  const plan =
    generateRecommendations(
      weakestSkill,
      currentBand
    );

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "30px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        AI Recommendations
      </h2>

      <p>
        Weakest Skill:
        {" "}
        <strong>
          {weakestSkill}
        </strong>
      </p>

      <ul
        style={{
          lineHeight:
            "2",
        }}
      >
        {plan.recommendations.map(
          (
            item,
            index
          ) => (
            <li
              key={index}
            >
              {item}
            </li>
          )
        )}
      </ul>

      <div
        style={{
          marginTop:
            "20px",
          padding:
            "15px",
          background:
            "#f8fafc",
          borderRadius:
            "12px",
        }}
      >
        <strong>
          Expected Gain
        </strong>

        <p>
          {
            plan.expectedGain
          }
        </p>
      </div>
    </div>
  );
}