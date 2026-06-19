export default function WeeklyPlanner({
  weakestSkill,
}) {
  const plans = {
    Reading: [
      "Reading Speed Practice",
      "Skimming Exercises",
      "Scanning Exercises",
      "Reading Mock Test",
      "Vocabulary Review",
      "Error Analysis",
      "Rest Day",
    ],

    Listening: [
      "Section 1 Practice",
      "Section 2 Practice",
      "Section 3 Practice",
      "Section 4 Practice",
      "Listening Mock Test",
      "Error Analysis",
      "Rest Day",
    ],

    Writing: [
      "Task 1 Practice",
      "Task 2 Practice",
      "Essay Structure",
      "Grammar Review",
      "Writing Mock Test",
      "Error Analysis",
      "Rest Day",
    ],

    Speaking: [
      "Fluency Practice",
      "Cue Cards",
      "Part 3 Discussion",
      "Pronunciation Practice",
      "Speaking Mock Test",
      "Error Analysis",
      "Rest Day",
    ],
  };

  const week =
    plans[
      weakestSkill
    ] || [];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "30px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        Weekly Study Planner
      </h2>

      {week.map(
        (
          task,
          index
        ) => (
          <div
            key={index}
            style={{
              padding:
                "12px 0",
              borderBottom:
                "1px solid #e2e8f0",
            }}
          >
            <strong>
              {
                days[index]
              }
            </strong>

            <p>
              {task}
            </p>
          </div>
        )
      )}
    </div>
  );
}