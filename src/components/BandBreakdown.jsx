export default function BandBreakdown({
  reading,
  listening,
  writing,
  speaking,
}) {
  const overall =
    (
      (reading +
        listening +
        writing +
        speaking) /
      4
    ).toFixed(1);

  return (
    <div
      style={{
        background:
          "#fff",

        padding:
          "30px",

        borderRadius:
          "20px",
      }}
    >
      <h2>
        IELTS Band Report
      </h2>

      <p>
        Reading:
        {" "}
        {reading}
      </p>

      <p>
        Listening:
        {" "}
        {listening}
      </p>

      <p>
        Writing:
        {" "}
        {writing}
      </p>

      <p>
        Speaking:
        {" "}
        {speaking}
      </p>

      <hr />

      <h1>
        Overall:
        {" "}
        {overall}
      </h1>
    </div>
  );
}