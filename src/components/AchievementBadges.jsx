import {
  getExamHistory,
} from "../services/examSession";

import {
  getAchievements,
} from "../services/achievementService";

export default function AchievementBadges() {
  const history =
    getExamHistory();

  const achievements =
    getAchievements(
      history
    );

  if (
    achievements.length === 0
  ) {
    return null;
  }

  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "30px",
        borderRadius:
          "20px",
        marginTop:
          "30px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        Achievements
      </h2>

      <div
        style={{
          display:
            "flex",
          flexWrap:
            "wrap",
          gap:
            "12px",
        }}
      >
        {achievements.map(
          (
            achievement,
            index
          ) => (
            <div
              key={index}
              style={{
                background:
                  "#f8fafc",
                padding:
                  "12px 18px",
                borderRadius:
                  "999px",
                fontWeight:
                  "600",
              }}
            >
              {
                achievement
              }
            </div>
          )
        )}
      </div>
    </div>
  );
}