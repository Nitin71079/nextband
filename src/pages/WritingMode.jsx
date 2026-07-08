import { useNavigate } from "react-router-dom";

export default function WritingMode() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "30px",
        textAlign: "center",
      }}
    >

      <h1>
        Writing Practice
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "40px",
        }}
      >
        Choose your IELTS exam type.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px",
        }}
      >

        <div
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <h2>
            Academic
          </h2>

          <p>
            Graphs, charts, maps and process diagrams.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/writing/academic")
            }
          >
            Continue
          </button>

        </div>

        <div
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <h2>
            General Training
          </h2>

          <p>
            Formal, semi-formal and informal letter writing.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/writing/general")
            }
          >
            Continue
          </button>

        </div>

      </div>

    </div>

  );

}