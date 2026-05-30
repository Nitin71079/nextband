import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function StudyPlanner() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [task,
    setTask] =
    useState("");

  const [date,
    setDate] =
    useState("");

  const [tasks,
    setTasks] =
    useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      if (!user) return;

      const db =
        getFirestore(app);

      const q = query(
        collection(
          db,
          "studyPlans"
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

      setTasks(data);
    } catch (error) {
      console.error(
        error
      );
    }
  }

  async function addTask() {
    try {
      if (
        !task ||
        !date
      )
        return;

      const db =
        getFirestore(app);

      await addDoc(
        collection(
          db,
          "studyPlans"
        ),
        {
          userId:
            user.uid,

          task,
          date,
          completed:
            false,

          createdAt:
            new Date()
        }
      );

      setTask("");
      setDate("");

      fetchTasks();
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
            "1000px",

          margin:
            "0 auto"
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
            Study Planner
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
            Organize your
            IELTS preparation
            journey
          </p>
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
              "0 10px 30px rgba(0,0,0,0.08)",

            marginBottom:
              "40px"
          }}
        >
          <h2
            style={{
              marginBottom:
                "25px"
            }}
          >
            Add Study Task
          </h2>

          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap: "20px"
            }}
          >
            <input
              value={task}
              onChange={(e) =>
                setTask(
                  e.target.value
                )
              }
              placeholder="Example: Complete Reading Test 4"
              style={{
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

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
              style={{
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

            <button
              onClick={
                addTask
              }
              style={{
                background:
                  "#22d3ee",

                border:
                  "none",

                padding:
                  "16px",

                borderRadius:
                  "14px",

                color:
                  "white",

                fontWeight:
                  "bold",

                fontSize:
                  "17px",

                cursor:
                  "pointer"
              }}
            >
              Add Study Task
            </button>
          </div>
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
          <h2
            style={{
              marginBottom:
                "30px"
            }}
          >
            Upcoming Tasks
          </h2>

          <div
            style={{
              display:
                "flex",

              flexDirection:
                "column",

              gap: "20px"
            }}
          >
            {tasks.map(
              (
                task
              ) => (
                <div
                  key={
                    task.id
                  }
                  style={{
                    background:
                      "#f8fafc",

                    padding:
                      "20px",

                    borderRadius:
                      "18px",

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

                    gap: "15px"
                  }}
                >
                  <div>
                    <h2>
                      {
                        task.task
                      }
                    </h2>

                    <p
                      style={{
                        color:
                          "#64748b",

                        marginTop:
                          "6px"
                      }}
                    >
                      {
                        task.date
                      }
                    </p>
                  </div>

                  <div
                    style={{
                      background:
                        "#dbeafe",

                      color:
                        "#1d4ed8",

                      padding:
                        "10px 18px",

                      borderRadius:
                        "999px",

                      fontWeight:
                        "bold"
                    }}
                  >
                    Planned
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}