import TestCenter from "../components/TestCenter";
import academicTests from "../data/reading/academic/academicTests";

const tests = academicTests.map((test) => ({
  id: test.id,
  title: test.title,
  duration: `${test.duration} mins`,
  questions: 40,
  difficulty: test.difficulty,
  completed: false,
  bestBand: "--",
}));

export default function AcademicReadingCenter() {
  return (
    <TestCenter
      title="Academic Reading"
      description="Practice IELTS Academic Reading with authentic university-level passages."
      icon="📘"
      theme="reading"
      route="/mock/reading"
      tests={tests}
      freeLimit={1}
    />
  );
}