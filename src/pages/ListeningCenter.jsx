import TestCenter from "../components/TestCenter";
import listeningTests from "../data/listening/tests";

const tests = listeningTests.map((test) => {
  const totalQuestions = test.sections.reduce((total, section) => {
    // Section 1 (Form Completion)
    if (section.form) {
      total += section.form.length;
    }

    // Sections 2–4
    if (section.groups) {
      section.groups.forEach((group) => {
        // MCQ, Matching, Map, Table, FlowChart, Diagram
        if (group.questions) {
          total += group.questions.length;
        }

        // Notes Completion
        if (group.notes) {
          total += group.notes.filter(
            (note) => note.type === "blank"
          ).length;
        }
      });
    }

    return total;
  }, 0);

  return {
    id: test.id,
    title: test.title,
    duration: `${test.duration} mins`,
    questions: totalQuestions,
    difficulty: test.difficulty || "Mixed",
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
    />
  );
}