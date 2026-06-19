import {
  getStreak,
} from "../services/streakService";

export default function StudyStreakCard() {
  const streak =
    getStreak();

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
        🔥 Study Streak
      </h2>

      <h1>
        {
          streak.current
        }{" "}
        Days
      </h1>

      <p>
        Current Streak
      </p>

      <hr
        style={{
          margin:
            "20px 0",
        }}
      />

      <p>
        Longest Streak:
        {" "}
        {
          streak.longest
        }{" "}
        Days
      </p>
    </div>
  );
}