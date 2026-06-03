export default function PassageViewer({
  title,
  content,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
        height:
          "calc(100vh - 220px)",
        overflowY: "auto",
        lineHeight: "1.9",
      }}
    >
      <h2>{title}</h2>

      <p>{content}</p>
    </div>
  );
}