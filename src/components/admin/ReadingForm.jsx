import { useState } from "react";

export default function ReadingForm({ onSave }) {
  const [title, setTitle] = useState("");

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [duration, setDuration] =
    useState(60);

  const [passage1, setPassage1] =
    useState("");

  const [passage2, setPassage2] =
    useState("");

  const [passage3, setPassage3] =
    useState("");

  function handleSubmit() {
    onSave({
      title,
      difficulty,
      duration,
      passages: [
        passage1,
        passage2,
        passage3,
      ],
    });

    setTitle("");
    setPassage1("");
    setPassage2("");
    setPassage3("");
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "30px",
      }}
    >
      <h2>Add Reading Test</h2>

      <input
        placeholder="Test Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <br />
      <br />

      <input
        type="number"
        value={duration}
        onChange={(e) =>
          setDuration(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        rows={8}
        placeholder="Passage 1"
        value={passage1}
        onChange={(e) =>
          setPassage1(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        rows={8}
        placeholder="Passage 2"
        value={passage2}
        onChange={(e) =>
          setPassage2(e.target.value)
        }
      />

      <br />
      <br />

      <textarea
        rows={8}
        placeholder="Passage 3"
        value={passage3}
        onChange={(e) =>
          setPassage3(e.target.value)
        }
      />

      <br />
      <br />

      <button
        className="primary-btn"
        onClick={handleSubmit}
      >
        Save Reading Test
      </button>
    </div>
  );
}