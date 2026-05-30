import {
  useState
} from "react";

export default function Contact() {
  const [submitted,
    setSubmitted] =
    useState(false);

  const [form,
    setForm] =
    useState({
      name: "",
      email: "",
      message: ""
    });

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      message: ""
    });
  };

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
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "60px"
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              marginBottom:
                "20px"
            }}
          >
            Contact NextBand
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "20px",
              lineHeight:
                "1.8",
              maxWidth: "800px",
              margin: "0 auto"
            }}
          >
            Questions, feedback,
            collaborations, or
            support requests —
            we’d love to hear from
            you.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",

            gap: "30px"
          }}
        >
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius:
                "24px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)"
            }}
          >
            <h2
              style={{
                marginBottom:
                  "30px"
              }}
            >
              Send a Message
            </h2>

            {!submitted ? (
              <form
                onSubmit={
                  handleSubmit
                }
              >
                <div
                  style={{
                    marginBottom:
                      "20px"
                  }}
                >
                  <label
                    style={{
                      display:
                        "block",
                      marginBottom:
                        "10px",
                      fontWeight:
                        "bold"
                    }}
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      form.name
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="Enter your name"
                    style={{
                      width:
                        "100%",
                      padding:
                        "16px",
                      borderRadius:
                        "14px",
                      border:
                        "1px solid #cbd5e1",
                      fontSize:
                        "16px"
                    }}
                  />
                </div>

                <div
                  style={{
                    marginBottom:
                      "20px"
                  }}
                >
                  <label
                    style={{
                      display:
                        "block",
                      marginBottom:
                        "10px",
                      fontWeight:
                        "bold"
                    }}
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      form.email
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="Enter your email"
                    style={{
                      width:
                        "100%",
                      padding:
                        "16px",
                      borderRadius:
                        "14px",
                      border:
                        "1px solid #cbd5e1",
                      fontSize:
                        "16px"
                    }}
                  />
                </div>

                <div
                  style={{
                    marginBottom:
                      "24px"
                  }}
                >
                  <label
                    style={{
                      display:
                        "block",
                      marginBottom:
                        "10px",
                      fontWeight:
                        "bold"
                    }}
                  >
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={
                      form.message
                    }
                    onChange={
                      handleChange
                    }
                    required
                    placeholder="Write your message..."
                    style={{
                      width:
                        "100%",
                      minHeight:
                        "180px",
                      padding:
                        "18px",
                      borderRadius:
                        "14px",
                      border:
                        "1px solid #cbd5e1",
                      fontSize:
                        "16px",
                      resize:
                        "vertical"
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width:
                      "100%",
                    background:
                      "#22d3ee",
                    border:
                      "none",
                    padding:
                      "18px",
                    borderRadius:
                      "14px",
                    fontWeight:
                      "bold",
                    fontSize:
                      "18px",
                    cursor:
                      "pointer"
                  }}
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div
                style={{
                  background:
                    "#ecfeff",
                  padding:
                    "30px",
                  borderRadius:
                    "18px"
                }}
              >
                <h2
                  style={{
                    color:
                      "#22c55e",
                    marginBottom:
                      "16px"
                  }}
                >
                  Message Sent
                </h2>

                <p
                  style={{
                    color:
                      "#475569",
                    lineHeight:
                      "1.8"
                  }}
                >
                  Thank you for
                  contacting
                  NextBand. We’ll
                  respond as soon
                  as possible.
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "30px"
            }}
          >
            <div
              style={{
                background:
                  "white",
                padding:
                  "36px",
                borderRadius:
                  "24px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "20px"
                }}
              >
                Platform Support
              </h2>

              <p
                style={{
                  color:
                    "#64748b",
                  lineHeight:
                    "1.8"
                }}
              >
                Need help with
                your account,
                mock tests, or
                dashboard? Our
                support system is
                designed to help
                learners quickly.
              </p>
            </div>

            <div
              style={{
                background:
                  "white",
                padding:
                  "36px",
                borderRadius:
                  "24px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)"
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "20px"
                }}
              >
                Collaboration
              </h2>

              <p
                style={{
                  color:
                    "#64748b",
                  lineHeight:
                    "1.8"
                }}
              >
                Interested in
                partnerships,
                educational
                collaborations, or
                business
                opportunities with
                NextBand? Reach
                out through the
                contact form.
              </p>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(to right, #22d3ee, #0ea5e9)",

                padding:
                  "36px",

                borderRadius:
                  "24px",

                color: "white"
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "20px"
                }}
              >
                NextBand Vision
              </h2>

              <p
                style={{
                  lineHeight:
                    "1.8"
                }}
              >
                Building a modern
                AI-powered exam
                preparation
                ecosystem for
                IELTS, TOEFL, GRE,
                GMAT, and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}