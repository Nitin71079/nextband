import { Link } from "react-router-dom";
import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Target,
  ArrowRight,
} from "lucide-react";

export default function AIStatus({
  analytics = {},
}) {

  const ai = analytics.ai ?? {

    currentBand: 7.5,
    confidence: 92,
    weakestSkill: "Grammar Accuracy",

    recommendation: [
      "Complete one Writing Task 2 today.",
      "Review complex sentence structures.",
      "Practice speaking for 15 minutes.",
    ],

  };

  return (

    <section className="dashboard-section">

      <div className="section-header">

        <div>

          <h2>

            Knarrow Intelligence

          </h2>

          <p>

            Live AI insights based on your latest performance.

          </p>

        </div>

      </div>

      <div className="ai-status-grid">

        {/* Card 1 */}

        <div className="ai-status-card">

          <span className="status-title">

            Current Band

          </span>

          <h1>

            {ai.currentBand}

          </h1>

          <div className="status-progress">

            <div
              className="status-fill"
              style={{
                width: `${ai.currentBand * 10}%`,
              }}
            />

          </div>

          <p>

            AI predicts you're close to Band 8.

          </p>

        </div>

        {/* Card 2 */}

        <div className="ai-status-card">

          <span className="status-title">

            Confidence

          </span>

          <h1>

            {ai.confidence}%

          </h1>

          <div className="status-progress">

            <div
              className="status-fill purple"
              style={{
                width: `${ai.confidence}%`,
              }}
            />

          </div>

          <p>

            Prediction confidence based on recent tests.

          </p>

        </div>

        {/* Card 3 */}

        <div className="ai-status-card">

          <span className="status-title">

            Needs Attention

          </span>

          <h2>

            {ai.weakestSkill}

          </h2>

          <p>

            This area currently has the highest impact on your overall IELTS score.

          </p>

          <Link to="/ai-center">

            <button className="improve-btn">

              Improve Now

              <ArrowRight size={16} />

            </button>

          </Link>

        </div>

        {/* Card 4 */}

        <div className="ai-status-card gradient">

          <div className="gradient-header">

            <BrainCircuit size={22} />

            <h3>

              AI Coach

            </h3>

          </div>

          <div className="recommendation-list">

            {ai.recommendation.map((tip, index) => (

              <div
                key={index}
                className="recommendation-item"
              >

                <ShieldCheck size={16} />

                <span>

                  {tip}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}