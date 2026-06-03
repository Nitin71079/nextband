export default function WritingReport({
  report,
}) {
  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "25px",
        borderRadius:
          "16px",
        marginTop:
          "20px",
      }}
    >
      <h2>
        AI Writing Report
      </h2>

      <h1>
        Band {
          report.overall
        }
      </h1>

      <p>
        Task Achievement:
        {" "}
        {
          report.taskAchievement
        }
      </p>

      <p>
        Coherence &
        Cohesion:
        {" "}
        {
          report.coherence
        }
      </p>

      <p>
        Lexical Resource:
        {" "}
        {
          report.lexical
        }
      </p>

      <p>
        Grammar:
        {" "}
        {
          report.grammar
        }
      </p>

      <p>
        Word Count:
        {" "}
        {
          report.words
        }
      </p>
    </div>
  );
}