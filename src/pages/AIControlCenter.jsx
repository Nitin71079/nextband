import AIStatusCard
from "../components/AIStatusCard";

export default function AIControlCenter() {
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
        AI Control
        Center
      </h1>

      <AIStatusCard
        title="Writing AI"
        status="Placeholder"
      />

      <AIStatusCard
        title="Speaking AI"
        status="Placeholder"
      />

      <AIStatusCard
        title="Speech To Text"
        status="Ready For Integration"
      />
    </div>
  );
}