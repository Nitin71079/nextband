import { useEffect, useState } from "react";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { app } from "../firebase";

import { useAuth } from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function StudyPlanner() {
  const { user } = useAuth();

  const isMobile =
    useMobile();

  const [task, setTask] =
    useState("");

  const [date, setDate] =
    useState("");

  const [tasks, setTasks] =
    useState([]);

  const [
    currentBand,
    setCurrentBand,
  ] = useState("");

  const [
    targetBand,
    setTargetBand,
  ] = useState("");

  const [
    generatedPlan,
    setGeneratedPlan,
  ] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [user]);

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
            ...doc.data(),
          })
        );

      setTasks(data);
    } catch (error) {
      console.error(error);
      alert(
        error.message
      );
    }
  }

  async function addTask() {
    try {
      if (!task || !date) {
        alert(
          "Please enter a task and date."
        );
        return;
      }

      if (!user) {
        alert(
          "Please login first."
        );
        return;
      }

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
            new Date(),
        }
      );

      alert(
        "Task Added Successfully"
      );

      setTask("");
      setDate("");

      fetchTasks();
    } catch (error) {
      console.error(error);
      alert(
        error.message
      );
    }
  }

  function generatePlan() {
    if (
      !currentBand ||
      !targetBand
    ) {
      alert(
        "Enter current and target band."
      );
      return;
    }

    const gap =
      Number(targetBand) -
      Number(currentBand);

    if (gap <= 0) {
      setGeneratedPlan(
        "You have already reached your target band."
      );
      return;
    }

    if (gap <= 1) {
      setGeneratedPlan(`
Week 1
• Reading Practice Daily
• Listening Practice Daily

Week 2
• Writing Task 2 Practice
• Speaking Mock Interviews

Week 3
• Full Mock Tests

Week 4
• Review Weak Areas
`);
    } else {
      setGeneratedPlan(`
Week 1-2
• Reading Foundations
• Listening Foundations

Week 3-4
• Writing Task 1 & Task 2

Week 5-6
• Speaking Fluency Practice

Week 7-8
• Full IELTS Mock Tests

Focus on consistency and weekly review.
`);
    }
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",
        background:
          "#f8fafc",
        padding:
          isMobile
            ? "20px"
            : "40px",
      }}
    >
      <div
        style={{
          maxWidth:
            "1000px",
          margin:
            "0 auto",
        }}
      >
        <h1>
          Study Planner
        </h1>

        <p>
          Organize your IELTS
          preparation journey
        </p>

        {/* Add Task */}

        <div
          style={{
            background:
              "#fff",
            padding:
              "30px",
            borderRadius:
              "20px",
            marginTop:
              "30px",
          }}
        >
          <h2>
            Add Study Task
          </h2>

          <input
            value={task}
            onChange={(e) =>
              setTask(
                e.target.value
              )
            }
            placeholder="Example: Complete Reading Test 4"
            style={{
              width: "100%",
              padding:
                "12px",
              marginTop:
                "15px",
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
              width: "100%",
              padding:
                "12px",
              marginTop:
                "15px",
            }}
          />

          <button
            className="primary-btn"
            onClick={
              addTask
            }
            style={{
              marginTop:
                "15px",
            }}
          >
            Add Study Task
          </button>
        </div>

        {/* AI Planner */}

        <div
          style={{
            background:
              "#fff",
            padding:
              "30px",
            borderRadius:
              "20px",
            marginTop:
              "30px",
          }}
        >
          <h2>
            AI Study Plan
            Generator
          </h2>

          <input
            placeholder="Current Band"
            value={
              currentBand
            }
            onChange={(e) =>
              setCurrentBand(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding:
                "12px",
              marginTop:
                "15px",
            }}
          />

          <input
            placeholder="Target Band"
            value={
              targetBand
            }
            onChange={(e) =>
              setTargetBand(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding:
                "12px",
              marginTop:
                "15px",
            }}
          />

          <button
            className="primary-btn"
            onClick={
              generatePlan
            }
            style={{
              marginTop:
                "15px",
            }}
          >
            Generate Plan
          </button>

          {generatedPlan && (
            <div
              style={{
                marginTop:
                  "20px",
                background:
                  "#f8fafc",
                padding:
                  "20px",
                borderRadius:
                  "16px",
                whiteSpace:
                  "pre-wrap",
              }}
            >
              {
                generatedPlan
              }
            </div>
          )}
        </div>

        {/* Tasks */}

        <div
          style={{
            background:
              "#fff",
            padding:
              "30px",
            borderRadius:
              "20px",
            marginTop:
              "30px",
          }}
        >
          <h2>
            Upcoming Tasks
          </h2>

          {tasks.length ===
          0 ? (
            <p>
              No tasks found.
            </p>
          ) : (
            tasks.map(
              (task) => (
                <div
                  key={
                    task.id
                  }
                  style={{
                    background:
                      "#f8fafc",
                    padding:
                      "15px",
                    marginTop:
                      "15px",
                    borderRadius:
                      "12px",
                  }}
                >
                  <h3>
                    {
                      task.task
                    }
                  </h3>

                  <p>
                    {
                      task.date
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}