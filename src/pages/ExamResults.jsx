import {
  getExamSession,
} from "../services/examSession";

import BandBreakdown
from "../components/BandBreakdown";

export default function ExamResults() {
  const session =
    getExamSession();

  if (!session) {
    return (
      <div
        style={{
          padding:
            "40px",
        }}
      >
        No exam data
        available.
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        maxWidth:
          "1200px",

        margin:
          "0 auto",

        padding:
          "40px",
      }}
    >
      <h1>
        IELTS Exam Results
      </h1>

      <BandBreakdown
        reading={
          session.reading
        }
        listening={
          session.listening
        }
        writing={
          session.writing
        }
        speaking={
          session.speaking
        }
      />

      <div
        style={{
          marginTop:
            "30px",

          background:
            "#fff",

          padding:
            "25px",

          borderRadius:
            "20px",
        }}
      >
        <h2>
          Feedback
        </h2>

        <ul>
          <li>
            Continue
            Reading
            practice for
            higher
            accuracy.
          </li>

          <li>
            Focus on
            Listening
            concentration
            and note
            taking.
          </li>

          <li>
            Improve
            Writing
            structure and
            cohesion.
          </li>

          <li>
            Practice
            Speaking
            fluency and
            vocabulary.
          </li>
        </ul>
      </div>
    </div>
  );
}