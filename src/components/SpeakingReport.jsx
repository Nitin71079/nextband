import AIErrorCard from "./AIErrorCard";

export default function SpeakingReport({
  report,
}) {  
  if (!report) return null;

  if (!report.success) {
    return (
      <AIErrorCard
        error={
          report.error
        }
      />
    );
  }
  if (!report) return null;

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
        marginTop: "20px",
      }}
    >
      <h2>
        AI Speaking Evaluation
      </h2>

      <div
        style={{
          background: "#f8fafc",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h1>
          Band {
            report.overallBand
          }
        </h1>

        <p>
          <strong>
            Confidence:
          </strong>{" "}
          {
            report.confidence
          }
          %
        </p>

        <p>
          <strong>
            Estimated IELTS Range:
          </strong>{" "}
          {
            report.estimatedRange
          }
        </p>
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h3>
          IELTS Benchmark
        </h3>

        <p>
          {
            report.benchmark
          }
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <div>
          <strong>
            Fluency
          </strong>

          <p>
            {
              report.fluency
            }
          </p>
        </div>

        <div>
          <strong>
            Lexical Resource
          </strong>

          <p>
            {
              report.lexicalResource
            }
          </p>
        </div>

        <div>
          <strong>
            Grammar
          </strong>

          <p>
            {
              report.grammar
            }
          </p>
        </div>

        <div>
          <strong>
            Pronunciation
          </strong>

          <p>
            {
              report.pronunciation
            }
          </p>
        </div>

        <div>
          <strong>
            Word Count
          </strong>

          <p>
            {
              report.wordCount
            }
          </p>
        </div>
      </div>

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <h3>
          Strengths
        </h3>

        <ul>
          {report.strengths?.map(
            (
              item,
              index
            ) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <h3>
          Weaknesses
        </h3>

        <ul>
          {report.weaknesses?.map(
            (
              item,
              index
            ) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <h3>
          Improvements
        </h3>

        <ul>
          {report.improvements?.map(
            (
              item,
              index
            ) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      {report.sampleBetterAnswer && (
        <div
          style={{
            background: "#f8fafc",
            padding: "15px",
            borderRadius: "12px",
          }}
        >
          <h3>
            Sample Better Answer
          </h3>

          <p>
            {
              report.sampleBetterAnswer
            }
          </p>
        </div>
      )}
    </div>
  );
}