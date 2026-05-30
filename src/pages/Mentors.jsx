import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function Mentors() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [message,
    setMessage] =
    useState("");

  const [requests,
    setRequests] =
    useState([]);

  const mentors = [
    {
      name:
        "Sarah Johnson",

      specialty:
        "IELTS Writing",

      experience:
        "8 Years",

      rate:
        "$20/hr"
    },

    {
      name:
        "Michael Lee",

      specialty:
        "IELTS Speaking",

      experience:
        "6 Years",

      rate:
        "$18/hr"
    },

    {
      name:
        "Anita Sharma",

      specialty:
        "IELTS Overall Coaching",

      experience:
        "10 Years",

      rate:
        "$25/hr"
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const db =
        getFirestore(app);

      const snapshot =
        await getDocs(
          collection(
            db,
            "mentorRequests"
          )
        );

      const data =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        );

      setRequests(data);
    } catch (error) {
      console.error(
        error
      );
    }
  }

  async function sendRequest(
    mentorName
  ) {
    try {
      if (!message)
        return;

      const db =
        getFirestore(app);

      await addDoc(
        collection(
          db,
          "mentorRequests"
        ),
        {
          mentor:
            mentorName,

          student:
            user?.email,

          message,

          createdAt:
            new Date()
        }
      );

      setMessage("");

      fetchRequests();

      alert(
        "Mentor request sent!"
      );
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
            "1200px",

          margin:
            "0 auto"
        }}
      >
        <div
          style={{
            marginBottom:
              "50px"
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
            IELTS Mentors
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
            Book sessions and
            connect with IELTS
            experts
          </p>
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(320px,1fr))",

            gap: "30px",

            marginBottom:
              "60px"
          }}
        >
          {mentors.map(
            (
              mentor,
              index
            ) => (
              <div
                key={index}
                style={{
                  background:
                    "white",

                  padding:
                    "35px",

                  borderRadius:
                    "24px",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)"
                }}
              >
                <div
                  style={{
                    width: "90px",

                    height:
                      "90px",

                    borderRadius:
                      "50%",

                    background:
                      "#22d3ee",

                    display:
                      "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    color:
                      "white",

                    fontSize:
                      "34px",

                    fontWeight:
                      "bold",

                    marginBottom:
                      "25px"
                  }}
                >
                  {
                    mentor.name[0]
                  }
                </div>

                <h2
                  style={{
                    marginBottom:
                      "10px"
                  }}
                >
                  {
                    mentor.name
                  }
                </h2>

                <p
                  style={{
                    color:
                      "#64748b",

                    marginBottom:
                      "8px"
                  }}
                >
                  {
                    mentor.specialty
                  }
                </p>

                <p
                  style={{
                    color:
                      "#64748b",

                    marginBottom:
                      "8px"
                  }}
                >
                  Experience:
                  {" "}
                  {
                    mentor.experience
                  }
                </p>

                <p
                  style={{
                    color:
                      "#22c55e",

                    fontWeight:
                      "bold",

                    marginBottom:
                      "20px"
                  }}
                >
                  {
                    mentor.rate
                  }
                </p>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  placeholder="Send a message to mentor..."
                  style={{
                    width:
                      "100%",

                    minHeight:
                      "100px",

                    padding:
                      "14px",

                    borderRadius:
                      "14px",

                    border:
                      "1px solid #cbd5e1",

                    marginBottom:
                      "20px",

                    resize:
                      "vertical"
                  }}
                />

                <button
                  onClick={() =>
                    sendRequest(
                      mentor.name
                    )
                  }
                  style={{
                    background:
                      "#22d3ee",

                    border:
                      "none",

                    padding:
                      "14px 24px",

                    borderRadius:
                      "14px",

                    color:
                      "white",

                    fontWeight:
                      "bold",

                    fontSize:
                      "16px",

                    cursor:
                      "pointer",

                    width:
                      "100%"
                  }}
                >
                  Request Session
                </button>
              </div>
            )
          )}
        </div>

        <div
          style={{
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
          <h1
            style={{
              marginBottom:
                "30px"
            }}
          >
            Recent Mentor
            Requests
          </h1>

          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap: "20px"
            }}
          >
            {requests.map(
              (
                request
              ) => (
                <div
                  key={
                    request.id
                  }
                  style={{
                    background:
                      "#f8fafc",

                    padding:
                      "22px",

                    borderRadius:
                      "18px"
                  }}
                >
                  <h3>
                    {
                      request.student
                    }
                  </h3>

                  <p
                    style={{
                      marginTop:
                        "10px",

                      color:
                        "#475569"
                    }}
                  >
                    Mentor:
                    {" "}
                    {
                      request.mentor
                    }
                  </p>

                  <p
                    style={{
                      marginTop:
                        "10px",

                      lineHeight:
                        "1.8"
                    }}
                  >
                    {
                      request.message
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}