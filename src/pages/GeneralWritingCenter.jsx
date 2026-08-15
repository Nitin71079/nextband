import TestCenter from "../components/TestCenter";
import generalTests from "../data/writing/general/tests";

const tests = generalTests.map((test) => ({
  id: test.id,
  title: test.title,
  duration: `${test.duration} mins`,
  questions: 2,
  difficulty: test.difficulty,
  completed: false,
  bestBand: "--",
}));

export default function GeneralWritingCenter() {
  return (
    <TestCenter
      title="General Training Writing"
      description="Task 1 letter writing and Task 2 essay practice."
      icon="✉️"
      route="/mock/writing"
      tests={tests}
      freeLimit={1}
    />
  );
}