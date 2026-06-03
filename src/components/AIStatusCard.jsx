export default function AIStatusCard({
  title,
  status,
}) {
  return (
    <div
      style={{
        background:
          "#fff",

        padding:
          "20px",

        borderRadius:
          "16px",

        marginBottom:
          "15px",
      }}
    >
      <h3>
        {title}
      </h3>

      <p>
        Status:
        {" "}
        {status}
      </p>
    </div>
  );
}