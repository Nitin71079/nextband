import {
  getGoals,
} from "../services/goalService";

export default function GoalTracker({
  currentBand,
}) {
  const goals =
    getGoals();

  const goalBand =
    Number(
      goals.goalBand || 8
    );

  const current =
    Number(
      currentBand || 0
    );

  const progress =
    Math.min(
      100,
      Math.round(
        (current /
          goalBand) *
          100
      )
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
        Goal Tracker
      </h2>

      <p>
        Current Band:
        {" "}
        {currentBand}
      </p>

      <p>
        Goal Band:
        {" "}
        {goalBand}
      </p>

      <p>
        Progress:
        {" "}
        {progress}%
      </p>

      <div
        style={{
          width: "100%",
          height: "20px",
          background:
            "#e2e8f0",
          borderRadius:
            "999px",
          overflow:
            "hidden",
          marginTop:
            "15px",
        }}
      >
        <div
          style={{
            width:
              `${progress}%`,
            height:
              "100%",
            background:
              "#22c55e",
          }}
        />
      </div>
    </div>
  );
}