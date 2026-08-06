import TestCenter from "../components/TestCenter";
import listeningTests from "../data/listening/tests";

const TOTAL_TESTS = 50;

const tests = Array.from({ length: TOTAL_TESTS }, (_, index) => {
  const existingTest = listeningTests[index];
  const testNum = String(index + 1).padStart(3, "0");

  if (existingTest) {
    let count = 0;
    if (existingTest.sections && Array.isArray(existingTest.sections)) {
      existingTest.sections.forEach((section) => {
        if (section.form) count += section.form.length;
        if (section.questions) count += section.questions.length;
        if (section.groups) {
          section.groups.forEach((group) => {
            if (group.questions) count += group.questions.length;
            if (group.notes) count += group.notes.filter((n) => n.type === "blank").length;
            if (group.rows) {
              group.rows.forEach((r) => {
                if (Array.isArray(r)) count += r.filter((cell) => cell.id !== undefined && cell.type === undefined).length;
              });
            }
            if (group.steps) count += group.steps.filter((s) => s.type === "blank").length;
          });
        }
      });
    }
    return {
      id: existingTest.id || `listening-test-${testNum}`,
      title: existingTest.title || `IELTS Listening Practice Test ${testNum}`,
      duration: `${existingTest.duration || 40} mins`,
      questions: count > 0 ? count : 40,
      difficulty: existingTest.difficulty || "Academic",
      completed: false,
      bestBand: "--",
    };
  }

  return {
    id: `listening-test-${testNum}`,
    title: `IELTS Listening Practice Test ${testNum}`,
    duration: "40 mins",
    questions: 40,
    difficulty: index % 3 === 0 ? "Hard" : index % 2 === 0 ? "Medium" : "Academic",
    completed: false,
    bestBand: "--",
  };
});

export default function ListeningCenter() {
  return (
    <TestCenter
      theme="listening"
      title="Listening Center"
      description="Practice realistic IELTS Listening tests."
      icon="🎧"
      route="/mock/listening"
      tests={tests}
      freeLimit={3}
    />
  );
}