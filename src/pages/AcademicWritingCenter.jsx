import TestCenter from "../components/TestCenter";
import academicTests from "../data/writing/academic/tests";

const tests = academicTests.map((test) => ({
  id: test.id,
  title: test.title,
  duration: `${test.duration} mins`,
  questions: 2,
  difficulty: test.difficulty,
  completed: false,
  bestBand: "--",
}));

export default function AcademicWritingCenter() {
  return (
    <TestCenter
      title="Academic Writing"
      description="Task 1 graphs, charts, maps, process diagrams and Task 2 essays."
      icon="✍️"
      route="/mock/writing"
      tests={tests}
      freeLimit={1}
    />
  );
}