import TestCenter from "../components/TestCenter";
import generalTests from "../data/reading/general/generalTests";

const tests = generalTests.map((test) => ({
  id: test.id,
  title: test.title,
  duration: `${test.duration} mins`,
  questions: 40,
  difficulty: test.difficulty,
  completed: false,
  bestBand: "--",
}));

export default function GeneralReadingCenter() {
  return (
    <TestCenter
      title="General Reading"
      description="Practice IELTS General Training Reading with everyday and workplace passages."
      icon="📗"
      route="/mock/general-reading"
      tests={tests}
      freeLimit={1}
    />
  );
}