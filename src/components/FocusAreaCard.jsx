export default function FocusAreaCard({
  weakestSkill,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "20px",
        marginBottom: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        Focus Area
      </h2>

      <h1>
        {weakestSkill}
      </h1>

      <p>
        Improving this skill
        will likely increase
        your overall IELTS
        score fastest.
      </p>
    </div>
  );
}