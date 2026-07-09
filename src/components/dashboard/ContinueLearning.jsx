import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  PlayCircle,
  Clock3,
  ArrowRight,
  BrainCircuit,
  BookOpen,
  Target,
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

  const nextMilestone =
    completion >= 90
      ? "Finish Test"
      : completion >= 60
      ? "Section 4"
      : "Halfway";

  return (
        <motion.section
      className="continue-learning"
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
    >

      <div className="section-header">

        <div>

          <span className="badge">

            <BrainCircuit size={14} />

            AI Resume

          </span>

          <h2>

            Continue Learning

          </h2>

          <p>

            Resume exactly where you stopped and keep your momentum going.

          </p>

        </div>

      </div>

      <motion.div
        whileHover={{
          y: -6,
        }}
        className="continue-card"
      >

        <div className="continue-left">

          <div className="continue-label">

            <BookOpen size={18} />

            {lastLesson}

          </div>

          <h3>

            {currentSection}

          </h3>

          <p>

            You have

            <strong>

              {" "}
              {remainingTime}

            </strong>

            {" "}remaining in this lesson.

          </p>

          <div className="continue-progress">

            <motion.div
              className="continue-progress-fill"
              initial={{
                width: 0,
              }}
              animate={{
                width: `${completion}%`,
              }}
              transition={{
                duration: 1,
              }}
            />

          </div>

          <div className="continue-footer">

            <span>

              {completion}% Complete

            </span>

            <span>

              Next:

              {" "}

              {nextMilestone}

            </span>

          </div>

        </div>

        <div className="continue-right">

          <div className="continue-circle">

            <h1>

              {completion}

              %

            </h1>

            <span>

              Progress

            </span>

          </div>

          <div className="continue-time">

            <Clock3 size={18} />

            {remainingTime}

          </div>
                    <div className="continue-ai-box">

            <Target size={18} />

            <div>

              <span>

                AI Recommendation

              </span>

              <strong>

                Finish this lesson today to maintain your study streak.

              </strong>

            </div>

          </div>

          <Link
            to={continuePath}
            className="continue-link"
          >

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="continue-btn"
            >

              <PlayCircle size={20} />

              Continue Learning

              <ArrowRight size={18} />

            </motion.button>

          </Link>

        </div>

      </motion.div>

    </motion.section>

  );

}