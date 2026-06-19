export function generateRoadmap(
  weakestSkill
) {
  const plans = {
    Reading: [
      "Reading Speed",
      "Skimming",
      "Scanning",
      "Mock Reading Test",
    ],

    Listening: [
      "Section 1 Practice",
      "Section 2 Practice",
      "Section 3 Practice",
      "Full Listening Test",
    ],

    Writing: [
      "Task 1 Practice",
      "Task 2 Practice",
      "Essay Structure",
      "Writing Mock Test",
    ],

    Speaking: [
      "Fluency Training",
      "Cue Cards",
      "Part 3 Discussion",
      "Speaking Mock Test",
    ],
  };

  return (
    plans[
      weakestSkill
    ] || []
  );
}