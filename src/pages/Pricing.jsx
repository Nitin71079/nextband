import toast
from "react-hot-toast";

export default function Pricing() {
  async function handleUpgrade() {
    try {
      const response =
        await fetch(
          "/api/checkout",
          {
            method: "POST"
          }
        );

      const data =
        await response.json();

      if (
        data.url
      ) {
        window.location.href =
          data.url;
      }
    } catch (error) {
      console.error(
        error
      );

      toast.error(
        "Payment initialization failed."
      );
    }
  }

  return (
    <div className="container fade-in">
      <div
        style={{
          textAlign:
            "center",

          marginBottom:
            "60px"
        }}
      >
        <span className="badge">
          Premium Upgrade
        </span>

        <h1
          className="section-title"
          style={{
            marginTop:
              "20px"
          }}
        >
          Unlock Premium 🚀
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
          Access full IELTS mock
          tests, advanced AI
          analytics, premium
          study systems, and
          exclusive learning
          tools.
        </p>
      </div>

      <div
        className="card"
        style={{
          maxWidth:
            "550px",

          margin:
            "0 auto",

          textAlign:
            "center"
        }}
      >
        <h2
          style={{
            fontSize:
              "42px",

            marginBottom:
              "20px"
          }}
        >
          Premium Plan
        </h2>

        <div
          style={{
            fontSize:
              "72px",

            fontWeight:
              "900",

            color:
              "#22d3ee",

            marginBottom:
              "10px"
          }}
        >
          $9
        </div>

        <p
          style={{
            color:
              "#64748b",

            marginBottom:
              "30px"
          }}
        >
          per month
        </p>

        <div
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "18px",

            marginBottom:
              "40px",

            textAlign:
              "left"
          }}
        >
          <div>
            ✅ Full IELTS Mock
            Tests
          </div>

          <div>
            ✅ AI Speaking
            Analysis
          </div>

          <div>
            ✅ AI Essay
            Evaluation
          </div>

          <div>
            ✅ Advanced Analytics
          </div>

          <div>
            ✅ Unlimited AI
            Assistant Access
          </div>

          <div>
            ✅ Premium Study
            Planner
          </div>
        </div>

        <button
          onClick={
            handleUpgrade
          }
          className="primary-btn"
          style={{
            width: "100%"
          }}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}   