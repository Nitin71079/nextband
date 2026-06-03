import {
  getReadingBand,
} from "../utils/readingBand";

export default function ReadingResult({
  result,
}) {
  const band =
    getReadingBand(
      result.correct
    );

  return (
    <div
      style={{
        maxWidth:
          "1000px",

        margin:
          "0 auto",

        padding:
          "40px",
      }}
    >
      <h1>
        IELTS Reading Report
      </h1>

      <div
        style={{
          background:
            "#fff",

          padding:
            "30px",

          borderRadius:
            "16px",

          marginBottom:
            "30px",
        }}
      >
        <h2>
          Score:
          {" "}
          {
            result.correct
          }
          /
          {
            result.total
          }
        </h2>

        <h2>
          Band:
          {" "}
          {band}
        </h2>
      </div>

      {result.details.map(
        (item) => (
          <div
            key={
              item.questionId
            }
            style={{
              background:
                "#fff",

              padding:
                "20px",

              borderRadius:
                "12px",

              marginBottom:
                "15px",
            }}
          >
            <h4>
              Question{" "}
              {
                item.questionId
              }
            </h4>

            <p>
              Your Answer:
              {" "}
              {
                item.userAnswer ||
                "Not Answered"
              }
            </p>

            <p>
              Correct Answer:
              {" "}
              {
                item.correctAnswer
              }
            </p>

            <p>
              Result:
              {" "}
              {item.isCorrect
                ? "✅ Correct"
                : "❌ Incorrect"}
            </p>
          </div>
        )
      )}
    </div>
  );
}