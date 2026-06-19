import { useState } from "react";

export default function GoalSettings({
  onSave,
}) {
  const [goalBand, setGoalBand] =
    useState("8.0");

  const [examDate, setExamDate] =
    useState("");

  const [dailyHours, setDailyHours] =
    useState("2");

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
      }}
    >
      <h2>
        Goal Settings
      </h2>

      <label>
        Goal Band
      </label>

      <select
        value={goalBand}
        onChange={(e) =>
          setGoalBand(
            e.target.value
          )
        }
      >
        <option>
          6.0
        </option>
        <option>
          6.5
        </option>
        <option>
          7.0
        </option>
        <option>
          7.5
        </option>
        <option>
          8.0
        </option>
        <option>
          8.5
        </option>
        <option>
          9.0
        </option>
      </select>

      <br />
      <br />

      <label>
        Exam Date
      </label>

      <input
        type="date"
        value={examDate}
        onChange={(e) =>
          setExamDate(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <label>
        Daily Study Hours
      </label>

      <input
        type="number"
        value={dailyHours}
        onChange={(e) =>
          setDailyHours(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        className="primary-btn"
        onClick={() =>
          onSave({
            goalBand,
            examDate,
            dailyHours,
          })
        }
      >
        Save Goals
      </button>
    </div>
  );
}