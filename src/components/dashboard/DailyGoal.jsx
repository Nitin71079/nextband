import { Link } from "react-router-dom";
import {
  Target,
  Clock3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function DailyGoal({
  analytics = {},
}) {

  const goal = analytics.dailyGoal ?? {
    title: "Complete One Listening Test",
    time: "30 Minutes",
    progress: 60,
    completed: false,
  };

  return (

    <section className="dashboard-section">

      <div className="goal-card">

        <div className="goal-left">

          <span>

            TODAY'S GOAL

          </span>

          <h2>

            {goal.title}

          </h2>

          <p>

            Estimated Time: {goal.time}

          </p>

          <div className="goal-progress">

            <div
              className="goal-progress-fill"
              style={{
                width: `${goal.progress}%`,
              }}
            />

          </div>

          <small>

            {goal.progress}% Completed Today

          </small>

        </div>

        <div className="goal-right">

          <div className="goal-icon">

            {goal.completed ? (

              <CheckCircle2 size={46} />

            ) : (

              <Target size={46} />

            )}

          </div>

          <Link to="/planner">

            <button className="goal-btn">

              <Clock3 size={18} />

              {goal.completed
                ? "View Progress"
                : "Start Now"}

              <ArrowRight size={18} />

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

}