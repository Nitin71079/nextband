import { useExam } from "../../context/ExamContext";

import "../../styles/exam/questionPalette.css";

export default function QuestionPalette({

  totalQuestions,

}) {

  const {

    currentQuestion,

    setCurrentQuestion,

    answers,

    flaggedQuestions,

  } = useExam();

  return (

    <aside className="question-palette">

      <h3>

        Questions

      </h3>

      <div className="palette-grid">

        {Array.from(

          { length: totalQuestions },

          (_, i) => {

            const number = i + 1;

            const answered =
              answers[number];

            const flagged =
              flaggedQuestions.includes(
                number
              );

            let className = "palette-btn";

            if (
              answered
            )
              className +=
                " answered";

            if (
              flagged
            )
              className +=
                " flagged";

            if (
              currentQuestion ===
              number
            )
              className +=
                " current";

            return (

              <button

                key={number}

                className={className}

                onClick={() =>
                  setCurrentQuestion(
                    number
                  )
                }

              >

                {number}

              </button>

            );

          }

        )}

      </div>

      <div className="palette-legend">

        <div>

          <span className="legend answered"/>

          Answered

        </div>

        <div>

          <span className="legend current"/>

          Current

        </div>

        <div>

          <span className="legend flagged"/>

          Flagged

        </div>

        <div>

          <span className="legend"/>

          Unanswered

        </div>

      </div>

    </aside>

  );

}