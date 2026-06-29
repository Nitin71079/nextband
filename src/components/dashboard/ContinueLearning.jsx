import { Link } from "react-router-dom";
import {
  PlayCircle,
  Clock3,
  ArrowRight,
} from "lucide-react";

export default function ContinueLearning({
  memory = {},
}) {

  const lastLesson =
    memory?.progress?.lastLesson ??
    "Listening Test 1";

  const currentSection =
    memory?.progress?.currentSection ??
    "Section 3";

  const remainingTime =
    memory?.progress?.remainingTime ??
    "12 minutes";

  const completion =
    memory?.progress?.completion ??
    72;

  const continuePath =
    memory?.progress?.lastModule ??
    "/listening";

  return (

    <section className="continue-learning">

      <div className="section-header">

        <div>

          <h2>

            Continue Learning

          </h2>

          <p>

            Pick up exactly where you left off.

          </p>

        </div>

      </div>

      <div className="continue-card">

        <div>

          <span className="continue-label">

            {lastLesson}

          </span>

          <h3>

            {currentSection}

          </h3>

          <p>

            {remainingTime} remaining

          </p>

          <div
            className="continue-progress"
          >

            <div
              className="continue-progress-fill"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>

          <small>

            {completion}% Complete

          </small>

        </div>

        <div className="continue-right">

          <Clock3 size={22} />

          <Link to={continuePath}>

            <button className="continue-btn">

              <PlayCircle size={18} />

              Continue

              <ArrowRight size={16} />

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

}