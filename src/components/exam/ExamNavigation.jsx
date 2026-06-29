import { Flag, ChevronLeft, ChevronRight } from "lucide-react";

import { useExam } from "../../context/ExamContext";

import "../../styles/exam/examNavigation.css";

export default function ExamNavigation({

  totalQuestions,

  onSubmit,

}) {

  const {

    currentQuestion,

    setCurrentQuestion,

    flaggedQuestions,

    setFlaggedQuestions,

  } = useExam();

  function previousQuestion() {

    if (currentQuestion > 1) {

      setCurrentQuestion(

        currentQuestion - 1

      );

    }

  }

  function nextQuestion() {

    if (currentQuestion < totalQuestions) {

      setCurrentQuestion(

        currentQuestion + 1

      );

    }

  }

  function toggleFlag() {

    if (

      flaggedQuestions.includes(

        currentQuestion

      )

    ) {

      setFlaggedQuestions(

        flaggedQuestions.filter(

          q => q !== currentQuestion

        )

      );

    } else {

      setFlaggedQuestions([

        ...flaggedQuestions,

        currentQuestion,

      ]);

    }

  }

  return (

    <div className="exam-navigation">

      <button

        onClick={previousQuestion}

      >

        <ChevronLeft size={18}/>

        Previous

      </button>

      <button

        className="flag-btn"

        onClick={toggleFlag}

      >

        <Flag size={18}/>

        {flaggedQuestions.includes(

          currentQuestion

        )

          ? "Flagged"

          : "Flag"}

      </button>

      {

        currentQuestion ===

        totalQuestions

          ? (

            <button

              className="submit-btn"

              onClick={onSubmit}

            >

              Submit Test

            </button>

          )

          : (

            <button

              onClick={nextQuestion}

            >

              Next

              <ChevronRight size={18}/>

            </button>

          )

      }

    </div>

  );

}