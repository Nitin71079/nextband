export default function ErrorMessage({
  message =
    "Something went wrong."
}) {
  return (
    <div
      style={{
        background:
          "#fee2e2",

        color: "#991b1b",

        padding: "18px",

        borderRadius:
          "16px",

        marginTop:
          "20px",

        fontWeight:
          "600"
      }}
    >
      {message}
    </div>
  );
}