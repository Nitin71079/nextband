export default function ComingSoon({
  title = "Coming Soon",
  description =
    "This feature is currently under development."
}) {
  return (
    <div className="container fade-in">
      <div
        className="card"
        style={{
          textAlign:
            "center",

          padding:
            "80px 30px"
        }}
      >
        <div
          style={{
            fontSize:
              "72px",

            marginBottom:
              "25px"
          }}
        >
          🚀
        </div>

        <h1
          className="section-title"
        >
          {title}
        </h1>

        <p
          className="section-subtitle"
          style={{
            maxWidth:
              "700px",

            margin:
              "0 auto"
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}