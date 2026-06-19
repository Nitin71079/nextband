import {
  getReadinessScore,
} from "../services/readinessScore";

import {
  getAnalytics,
} from "../services/analyticsService";

import AnalyticsSummary from "../components/AnalyticsSummary";
import BandProgressChart from "../components/BandProgressChart";
import SkillHeatmap from "../components/SkillHeatmap";
import AchievementBadges from "../components/AchievementBadges";
import StudyStreakCard from "../components/StudyStreakCard";
import GoalTracker from "../components/GoalTracker";
import WeeklyPlanner from "../components/WeeklyPlanner";
import AIRecommendationCard from "../components/AIRecommendationCard";
import AIChatCoach from "../components/AIChatCoach";
import AIStatusCard from "../components/AIStatusCard";

import ReadinessCard from "../components/ReadinessCard";
import FocusAreaCard from "../components/FocusAreaCard";
import ForecastCard from "../components/ForecastCard";
import PremiumGate from "../components/PremiumGate";

export default function AnalyticsDashboard() {
  const analytics =
    getAnalytics();

  if (!analytics) {
    return (
      <div
        style={{
          minHeight: "100vh",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px",
        }}
      >
        <div
  style={{
    marginBottom: "30px",
  }}
>
  <h1>
    Analytics Dashboard
  </h1>

  <p
    style={{
      color: "#64748b",
      marginTop: "8px",
    }}
  >
    Track your IELTS progress,
    readiness score, strengths,
    weaknesses, and AI-powered
    recommendations.
  </p>
</div>

        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            marginTop: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2>
            No Analytics Data
          </h2>

          <p>
            Complete your first
            IELTS mock test to
            unlock advanced
            analytics.
          </p>
        </div>
      </div>
    );
  }

  const latest =
    analytics.latest;

  const skillScores = {
    Reading:
      Number(
        latest.reading
      ),

    Listening:
      Number(
        latest.listening
      ),

    Writing:
      Number(
        latest.writing
      ),

    Speaking:
      Number(
        latest.speaking
      ),
  };

  const weakestSkill =
    Object.keys(
      skillScores
    ).reduce(
      (a, b) =>
        skillScores[a] <
        skillScores[b]
          ? a
          : b
    );

  const strongestSkill =
    Object.keys(
      skillScores
    ).reduce(
      (a, b) =>
        skillScores[a] >
        skillScores[b]
          ? a
          : b
    );

  const currentOverall =
    (
      (
        Number(
          latest.reading
        ) +
        Number(
          latest.listening
        ) +
        Number(
          latest.writing
        ) +
        Number(
          latest.speaking
        )
      ) / 4
    ).toFixed(1);

  const score =
    getReadinessScore();

  return (
        <PremiumGate>

    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom:
            "30px",
        }}
      >
        Analytics Dashboard
      </h1>

      {/* SUMMARY */}
      <AnalyticsSummary
        analytics={analytics}
      />

      {/* READINESS */}
      <ReadinessCard
        score={score}
        currentOverall={
          currentOverall
        }
      />

      {/* BAND TREND */}
      <BandProgressChart />

      {/* FOCUS + FORECAST */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <FocusAreaCard
          weakestSkill={
            weakestSkill
          }
        />

        <ForecastCard
          currentBand={
            currentOverall
          }
        />
      </div>

      {/* SKILLS */}
      <SkillHeatmap
        reading={
          latest.reading
        }
        listening={
          latest.listening
        }
        writing={
          latest.writing
        }
        speaking={
          latest.speaking
        }
      />

      {/* GOALS */}
      <GoalTracker
        currentBand={
          currentOverall
        }
      />

      {/* WEEKLY PLAN */}
      <WeeklyPlanner
        weakestSkill={
          weakestSkill
        }
      />

      {/* AI RECOMMENDATIONS */}
      <AIRecommendationCard
        weakestSkill={
          weakestSkill
        }
        currentBand={
          currentOverall
        }
      />
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(350px,1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  <AchievementBadges />

  <StudyStreakCard />
</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(350px,1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  <AIChatCoach />

  <AIStatusCard />
</div>
      {/* PERFORMANCE CARD */}
      <div
        style={{
          marginTop:
            "30px",
          background:
            "#fff",
          padding:
            "30px",
          borderRadius:
            "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          Latest Exam
          Performance
        </h2>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap:
              "20px",
            marginTop:
              "20px",
          }}
        >
          <div>
            <strong>
              Reading
            </strong>

            <p>
              {
                latest.reading
              }
            </p>
          </div>

          <div>
            <strong>
              Listening
            </strong>

            <p>
              {
                latest.listening
              }
            </p>
          </div>

          <div>
            <strong>
              Writing
            </strong>

            <p>
              {
                latest.writing
              }
            </p>
          </div>

          <div>
            <strong>
              Speaking
            </strong>

            <p>
              {
                latest.speaking
              }
            </p>
          </div>
        </div>

        <hr
          style={{
            margin:
              "20px 0",
          }}
        />

        <h3>
          Current Overall
          Band
        </h3>

        <div
          style={{
            fontSize:
              "56px",
            fontWeight:
              "bold",
            color:
              "#22c55e",
          }}
        >
          {
            currentOverall
          }
        </div>
      </div>

      {/* PREMIUM AI INSIGHTS */}
      <div
        style={{
          marginTop:
            "30px",
          background:
            "#fff",
          padding:
            "30px",
          borderRadius:
            "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          AI Insights &
          Recommendations
        </h2>

        <ul
          style={{
            lineHeight:
              "2",
          }}
        >
          <li>
            Strongest Skill:
            {" "}
            <strong>
              {
                strongestSkill
              }
            </strong>
          </li>

          <li>
            Weakest Skill:
            {" "}
            <strong>
              {
                weakestSkill
              }
            </strong>
          </li>

          <li>
            Improving
            {" "}
            {
              weakestSkill
            }
            {" "}
            by 0.5 bands is
            likely to increase
            your overall IELTS
            score.
          </li>

          <li>
            Continue taking
            weekly full mock
            tests.
          </li>

          <li>
            Review all AI
            Writing and
            Speaking reports.
          </li>

          <li>
            Use AI Coach
            recommendations
            daily.
          </li>

          <li>
            Target Band:
            {" "}
            {(
              Number(
                currentOverall
              ) + 0.5
            ).toFixed(1)}
          </li>
        </ul>
      </div>
    </div>
        </PremiumGate>

  );
}