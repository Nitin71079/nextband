import AIErrorCard from "./AIErrorCard";
export default function WritingReport({
report,
}) {  if (!report) return null;

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
> <h2>
AI Writing Evaluation </h2>

  <div
    style={{
      background: "#f8fafc",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "20px",
    }}
  >
    <h1>
      Band {report.overallBand}
    </h1>

    <p>
      <strong>
        Confidence:
      </strong>{" "}
      {report.confidence}%
    </p>

    <p>
      <strong>
        Estimated IELTS Range:
      </strong>{" "}
      {report.estimatedRange}
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
      {report.benchmark}
    </p>

    <p>
      Closest Match:
      {" "}
      Band {report.matchedBand}
    </p>

    <p>
      Similarity:
      {" "}
      {report.similarity}%
    </p>
  </div>

  {report.explanation && (
    <div
      style={{
        background: "#f8fafc",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <h3>
        Why This Band?
      </h3>

      <p>
        <strong>
          Task Response:
        </strong>{" "}
        {
          report.explanation
            .taskResponse
        }
      </p>

      <p>
        <strong>
          Coherence:
        </strong>{" "}
        {
          report.explanation
            .coherence
        }
      </p>

      <p>
        <strong>
          Lexical:
        </strong>{" "}
        {
          report.explanation
            .lexical
        }
      </p>

      <p>
        <strong>
          Grammar:
        </strong>{" "}
        {
          report.explanation
            .grammar
        }
      </p>
    </div>
  )}

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
        Task Response
      </strong>

      <p>
        {report.taskResponse}
      </p>
    </div>

    <div>
      <strong>
        Coherence &
        Cohesion
      </strong>

      <p>
        {
          report.coherenceCohesion
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
          report.grammarRangeAccuracy
        }
      </p>
    </div>

    <div>
      <strong>
        Word Count
      </strong>

      <p>
        {report.wordCount}
      </p>
    </div>
  </div>

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

  <h3>
    Recommendations
  </h3>

  <ul>
    {report.recommendations?.map(
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

);
}
