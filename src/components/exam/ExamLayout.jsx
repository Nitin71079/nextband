import ExamTimer from "./ExamTimer";
import QuestionPalette from "./QuestionPalette";
import ExamNavigation from "./ExamNavigation";

import "../../styles/exam/examLayout.css";

export default function ExamLayout({

  title,

  totalQuestions,

  children,

  onSubmit,

}) {

  return (

    <div className="exam-layout">

      <header className="exam-header">

        <div>

          <h1>{title}</h1>

          <p>

            Computer Delivered IELTS Examination

          </p>

        </div>

        <ExamTimer onTimeUp={onSubmit} />

      </header>

      <main className="exam-main">

        <section className="exam-content">

          {children}

        </section>

        <aside className="exam-sidebar">

          <QuestionPalette

            totalQuestions={totalQuestions}

          />

        </aside>

      </main>

      <ExamNavigation

        totalQuestions={totalQuestions}

        onSubmit={onSubmit}

      />

    </div>

  );

}