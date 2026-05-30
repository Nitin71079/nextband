import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function Notifications() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [notifications,
    setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      if (!user) return;

      const db =
        getFirestore(app);

      const q = query(
        collection(
          db,
          "notifications"
        ),

        where(
          "userId",
          "==",
          user.uid
        )
      );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        );

      if (data.length === 0) {
        await seedNotifications();
        return;
      }

      setNotifications(
        data
      );
    } catch (error) {
      console.error(
        error
      );
    }
  }

  async function seedNotifications() {
    try {
      const db =
        getFirestore(app);

      const demoNotifications =
        [
          {
            title:
              "Study Reminder",

            message:
              "Complete your IELTS Reading practice today.",

            type:
              "Reminder"
          },

          {
            title:
              "Achievement Unlocked",

            message:
              "You completed your first IELTS mock test.",

            type:
              "Achievement"
          },

          {
            title:
              "Premium Upgrade",

            message:
              "Unlock AI scoring and full mock tests with Premium.",

            type:
              "Premium"
          }
        ];

      for (const item of demoNotifications) {
        await addDoc(
          collection(
            db,
            "notifications"
          ),
          {
            userId:
              user.uid,

            ...item,

            createdAt:
              new Date()
          }
        );
      }

      fetchNotifications();
    } catch (error) {
      console.error(
        error
      );
    }
  }

  function getColor(type) {
    switch (type) {
      case "Reminder":
        return "#3b82f6";

      case "Achievement":
        return "#22c55e";

      case "Premium":
        return "#a855f7";

      default:
        return "#64748b";
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
            "1000px",

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
            Notifications
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
            Stay updated with
            your IELTS
            progress
          </p>
        </div>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "25px"
          }}
        >
          {notifications.map(
            (
              notification
            ) => (
              <div
                key={
                  notification.id
                }
                style={{
                  background:
                    "white",

                  padding:
                    "28px",

                  borderRadius:
                    "24px",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",

                  borderLeft:
                    `8px solid ${getColor(
                      notification.type
                    )}`
                }}
              >
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      isMobile
                        ? "flex-start"
                        : "center",

                    flexDirection:
                      isMobile
                        ? "column"
                        : "row",

                    gap: "15px",

                    marginBottom:
                      "15px"
                  }}
                >
                  <h2>
                    {
                      notification.title
                    }
                  </h2>

                  <div
                    style={{
                      background:
                        "#f1f5f9",

                      padding:
                        "8px 16px",

                      borderRadius:
                        "999px",

                      fontWeight:
                        "bold",

                      color:
                        getColor(
                          notification.type
                        )
                    }}
                  >
                    {
                      notification.type
                    }
                  </div>
                </div>

                <p
                  style={{
                    lineHeight:
                      "1.8",

                    color:
                      "#475569"
                  }}
                >
                  {
                    notification.message
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}