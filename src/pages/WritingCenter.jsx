import TestCenter from "../components/TestCenter";
import writingTests from "../data/writing/tests";

const tests = writingTests.map((test) => ({

  id: test.id,

  title: test.title,

  duration: `${test.duration} mins`,

  questions: 2,

  difficulty: test.difficulty,

  completed: false,

  bestBand: "--",

}));

export default function WritingCenter() {

  return (

    <TestCenter
    theme="writing"
      title="Writing Center"
      description="Practice IELTS Writing Task 1 & Task 2 with AI evaluation."
      icon="✍️"
      route="/mock/writing"
      tests={tests}
    />

  );

}