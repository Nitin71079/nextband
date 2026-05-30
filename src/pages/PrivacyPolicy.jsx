export default function PrivacyPolicy() {
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
          Privacy Policy
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
          At NextBand, we value
          your privacy and are
          committed to protecting
          your personal
          information. This
          Privacy Policy explains
          how we collect, use,
          and safeguard your
          data while using our
          IELTS preparation
          platform.
        </p>

        {[
          {
            title:
              "Information We Collect",
            content:
              "We may collect your email address, authentication details, mock test history, estimated scores, and platform usage data to improve your learning experience."
          },

          {
            title:
              "How We Use Your Information",
            content:
              "Your information is used to provide personalized dashboards, mock test analytics, recommendations, and platform improvements."
          },

          {
            title:
              "Data Security",
            content:
              "We implement modern security measures and Firebase authentication systems to help protect your information from unauthorized access."
          },

          {
            title:
              "Third-Party Services",
            content:
              "NextBand may use trusted third-party services such as Firebase, Vercel, analytics providers, and future advertising systems to enhance platform functionality."
          },

          {
            title:
              "Cookies & Analytics",
            content:
              "We may use cookies and analytics technologies to understand user engagement and improve the platform experience."
          },

          {
            title:
              "User Rights",
            content:
              "Users may request updates or deletion of their account-related information subject to applicable laws and service limitations."
          },

          {
            title:
              "Policy Updates",
            content:
              "This Privacy Policy may be updated periodically to reflect platform improvements, legal updates, or service modifications."
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
            Contact Us
          </h2>

          <p
            style={{
              color: "#475569",
              lineHeight:
                "1.8"
            }}
          >
            If you have questions
            regarding this Privacy
            Policy, please contact
            the NextBand support
            team through the
            platform contact page.
          </p>
        </div>
      </div>
    </div>
  );
}