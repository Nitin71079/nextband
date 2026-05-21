export default function Loader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        background:
          "#0f172a",
        color: "white",
        fontFamily: "Arial",
        flexDirection:
          "column"
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          border:
            "8px solid rgba(255,255,255,0.1)",

          borderTop:
            "8px solid #22d3ee",

          borderRadius:
            "50%",

          animation:
            "spin 1s linear infinite"
        }}
      />

      <h2
        style={{
          marginTop: "30px",
          fontSize: "28px"
        }}
      >
        Loading NextBand...
      </h2>

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}