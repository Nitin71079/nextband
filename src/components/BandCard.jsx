
export default function BandCard({
  title,
  band,
}) {
  return (
    <div
      style={{
        background:
          "#fff",

        padding:
          "25px",

        borderRadius:
          "18px",

        textAlign:
          "center",
      }}
    >
      <h3>
        {title}
      </h3>

      <div
        style={{
          fontSize:
            "48px",

          fontWeight:
            "bold",

          marginTop:
            "10px",
        }}
      >
        {band}
      </div>
    </div>
  );
}
