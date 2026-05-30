export default function Terms() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#f8fafc",
        padding: "60px 30px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "white",
          padding: "50px",
          borderRadius: "24px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "30px"
          }}
        >
          Terms & Conditions
        </h1>

        <p
          style={{
            color: "#64748b",
            lineHeight:
              "1.9",
            marginBottom:
              "30px"
          }}
        >
          Welcome to NextBand.
          By accessing or using
          our IELTS preparation
          platform, you agree to
          comply with the
          following Terms &
          Conditions. Please read
          them carefully before
          using our services.
        </p>

        {[
          {
            title:
              "Platform Usage",
            content:
              "Users agree to use NextBand responsibly and only for lawful educational purposes. Misuse of the platform may result in restricted access."
          },

          {
            title:
              "Account Responsibility",
            content:
              "Users are responsible for maintaining the confidentiality of their login credentials and account activities."
          },

          {
            title:
              "Educational Content",
            content:
              "NextBand provides practice materials, mock tests, estimated evaluations, and educational analytics intended for learning purposes only."
          },

          {
            title:
              "Estimated Scores",
            content:
              "Band estimates and feedback generated on the platform are simulated educational indicators and should not be considered official IELTS scores."
          },

          {
            title:
              "Intellectual Property",
            content:
              "All platform branding, interface elements, designs, and educational materials belong to NextBand unless otherwise stated."
          },

          {
            title:
              "Service Availability",
            content:
              "We aim to maintain uninterrupted access to the platform but do not guarantee continuous availability due to maintenance or technical issues."
          },

          {
            title:
              "Limitation of Liability",
            content:
              "NextBand shall not be held liable for educational outcomes, exam performance, technical interruptions, or indirect damages resulting from platform usage."
          },

          {
            title:
              "Third-Party Services",
            content:
              "The platform may integrate with third-party services such as Firebase, Vercel, analytics tools, and future advertising systems."
          },

          {
            title:
              "Updates to Terms",
            content:
              "These Terms & Conditions may be updated periodically as the platform evolves and expands."
          }
        ].map(
          (
            section,
            index
          ) => (
            <div
              key={index}
              style={{
                marginBottom:
                  "40px"
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "16px"
                }}
              >
                {
                  section.title
                }
              </h2>

              <p
                style={{
                  color:
                    "#475569",
                  lineHeight:
                    "1.9",
                  fontSize:
                    "17px"
                }}
              >
                {
                  section.content
                }
              </p>
            </div>
          )
        )}

        <div
          style={{
            background:
              "#f1f5f9",
            padding: "30px",
            borderRadius:
              "20px",
            marginTop: "50px"
          }}
        >
          <h2
            style={{
              marginBottom:
                "16px"
            }}
          >
            Agreement
          </h2>

          <p
            style={{
              color: "#475569",
              lineHeight:
                "1.8"
            }}
          >
            By continuing to use
            NextBand, you confirm
            that you understand
            and agree to these
            Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}