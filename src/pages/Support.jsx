import {
  useState
} from "react";

import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function Support() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [subject,
    setSubject] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const [submitted,
    setSubmitted] =
    useState(false);

  async function sendMessage() {
    try {
      if (
        !subject ||
        !message
      )
        return;

      const db =
        getFirestore(app);

      await addDoc(
        collection(
          db,
          "supportTickets"
        ),
        {
          email:
            user?.email ||
            "Guest",

          subject,

          message,

          status:
            "Pending",

          createdAt:
            new Date()
        }
      );

      setSubmitted(true);

      setSubject("");

      setMessage("");
    } catch (error) {
      console.error(
        error
      );
    }
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f8fafc",

        padding: isMobile
          ? "30px 15px"
          : "60px 30px",

        fontFamily:
          "Arial"
      }}
    >
      <div
        style={{
          maxWidth:
            "900px",

          margin:
            "0 auto",

          background:
            "white",

          padding:
            isMobile
              ? "25px"
              : "40px",

          borderRadius:
            "24px",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <div
          style={{
            marginBottom:
              "40px"
          }}
        >
          <h1
            style={{
              fontSize:
                isMobile
                  ? "36px"
                  : "52px"
            }}
          >
            Support Center
          </h1>

          <p
            style={{
              color:
                "#64748b",

              marginTop:
                "10px",

              fontSize:
                "18px"
            }}
          >
            Contact support or
            ask for help
          </p>
        </div>

        {submitted && (
          <div
            style={{
              background:
                "#dcfce7",

              color:
                "#166534",

              padding:
                "18px",

              borderRadius:
                "16px",

              marginBottom:
                "25px",

              fontWeight:
                "bold"
            }}
          >
            Support ticket
            submitted
            successfully!
          </div>
        )}

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "25px"
          }}
        >
          <div>
            <label>
              Subject
            </label>

            <input
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              placeholder="Enter subject"
              style={{
                width:
                  "100%",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #cbd5e1",

                marginTop:
                  "10px",

                fontSize:
                  "16px"
              }}
            />
          </div>

          <div>
            <label>
              Message
            </label>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Describe your issue or question..."
              style={{
                width:
                  "100%",

                minHeight:
                  "220px",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #cbd5e1",

                marginTop:
                  "10px",

                fontSize:
                  "16px",

                resize:
                  "vertical"
              }}
            />
          </div>

          <button
            onClick={
              sendMessage
            }
            style={{
              background:
                "#22d3ee",

              border:
                "none",

              padding:
                "18px",

              borderRadius:
                "14px",

              color:
                "white",

              fontWeight:
                "bold",

              fontSize:
                "18px",

              cursor:
                "pointer"
            }}
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}