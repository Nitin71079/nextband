import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReadingForm from "../components/admin/ReadingForm";
import {
  addTest,
  getTests,
  deleteTest,
} from "../services/admin/testService";

export default function AdminTests() {
  const { type } = useParams();

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [duration, setDuration] = useState(60);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    loadTests();
  }, [type]);

  async function loadTests() {
    const data = await getTests(type);
    setTests(data);
  }

  async function handleAddTest() {
    if (!title.trim()) {
      alert("Please enter a test title.");
      return;
    }

    try {
      await addTest(type, {
        title,
        difficulty,
        duration: Number(duration),
      });

      setTitle("");
      setDifficulty("Easy");
      setDuration(60);

      loadTests();
    } catch (error) {
      console.error(error);
      alert("Failed to add test.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this test?")) return;

    try {
      await deleteTest(id);
      loadTests();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>
        {type.charAt(0).toUpperCase() + type.slice(1)} Tests
      </h1>

      {/* Add Test Form */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Test Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            padding: "10px",
            minWidth: "220px",
          }}
        />

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          style={{
            padding: "10px",
          }}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          type="number"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          style={{
            width: "120px",
            padding: "10px",
          }}
        />

        <button
          className="primary-btn"
          onClick={handleAddTest}
        >
          + Add Test
        </button>
      </div>

      {/* Existing Tests */}

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h2>
          Existing {type} Tests
        </h2>

        {tests.length === 0 ? (
          <p>No tests found.</p>
        ) : (
          tests.map((test) => (
            <div
              key={test.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderBottom:
                  "1px solid #e2e8f0",
              }}
            >
              <div>
                <h3>{test.title}</h3>

                <p>
                  {test.difficulty} •{" "}
                  {test.duration} mins
                </p>
              </div>

              <button
                onClick={() =>
                  handleDelete(test.id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}