import { Link } from "react-router-dom";
import {
  generateRoadmap,
} from "../services/studyRoadmap";
import {
  getGoals,
} from "../services/goalService";
export default function AICoachCard({
  overallBand,
  strongestSkill,
  weakestSkill,
}) {
    const goals =
  getGoals();

  const currentBand =
    Number(overallBand);

  const targetBand =
    (
      currentBand + 0.5
    ).toFixed(1);

  const roadmap =
    generateRoadmap(
      weakestSkill
    );

  const estimatedWeeks =
    Math.max(
      4,
      Math.ceil(
        (targetBand -
          currentBand) *
          8
      )
    );

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
        marginTop: "30px",
      }}
    >
      <h2>
        AI Coach
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginTop: "20px",
          marginBottom:
            "25px",
        }}
      >
        <div>
          <strong>
            Current Band
          </strong>
<Link to="/listening-tests">
  <button className="primary-btn">
    Listening Tests
  </button>
</Link>
          <p>
            {overallBand}
          </p>
        </div>

        <div>
          <strong>
            Target Band
          </strong>

          <p>
            {targetBand}
          </p>
        </div>

        <div>
          <strong>
            Strongest Skill
          </strong>

          <p>
            {strongestSkill}
          </p>
        </div>

        <div>
          <strong>
            Weakest Skill
          </strong>

          <p>
            {weakestSkill}
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
        Today's Study Plan
      </h3>

      <ul
        style={{
          lineHeight:
            "2",
        }}
      >
        <li>
          30 minutes of{" "}
          {weakestSkill}
          {" "}
          practice
        </li>

        <li>
          Complete 1
          Full Mock Test
        </li>

        <li>
          Review mistakes
          and examiner
          feedback
        </li>

        <li>
          Vocabulary
          revision
        </li>

        <li>
          Focus on your
          weakest skill
          first
        </li>
      </ul>

      <hr
        style={{
          margin:
            "20px 0",
        }}
      />

      <h3>
        Weekly Roadmap
      </h3>

      <ul
        style={{
          lineHeight:
            "2",
        }}
      >
        {roadmap.map(
          (
            item,
            index
          ) => (
            <li
              key={index}
            >
              <strong>
                Week{" "}
                {index + 1}
              </strong>
              {" - "}
              {item}
            </li>
          )
        )}
      </ul>

      <hr
        style={{
          margin:
            "20px 0",
        }}
      />

      <h3>
        Improvement Forecast
      </h3>

      <p>
        Current Band:
        {" "}
        {overallBand}
      </p>

      <p>
        Target Band:
        {" "}
        {targetBand}
      </p>

      <p>
        Estimated Time:
        {" "}
        {
          estimatedWeeks
        }
        {" "}
        weeks
      </p>

      <p>
        If you complete
        your weekly study
        plan consistently,
        your projected band
        score could improve
        from{" "}
        <strong>
          {overallBand}
        </strong>
        {" "}
        to{" "}
        <strong>
          {targetBand}
        </strong>
        .
      </p>

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
          Coach Insight
        </strong>

        <p
          style={{
            marginTop:
              "10px",
          }}
        >
          Your strongest
          skill is{" "}
          <strong>
            {
              strongestSkill
            }
          </strong>
          . The fastest way
          to improve your
          overall IELTS band
          is by focusing on{" "}
          <strong>
            {
              weakestSkill
            }
          </strong>
          .
        </p>
      </div>
    </div>
  );
}