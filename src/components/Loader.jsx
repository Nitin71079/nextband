export default function Loader() {
  return (
    <div
      style={{
        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        minHeight:
          "60vh"
      }}
    >
      <div
        style={{
          width: "70px",

          height: "70px",

          border:
            "8px solid #e2e8f0",

          borderTop:
            "8px solid #22d3ee",

          borderRadius:
            "50%",

          animation:
            "spin 1s linear infinite"
        }}
      />
    </div>
  );
}