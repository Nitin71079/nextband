import TestCenter from "../components/TestCenter";
import listeningTests from "../data/listening/tests";

const tests = listeningTests.map((test) => ({

  id: test.id,

  title: test.title,

  duration: `${test.duration} mins`,

  questions: test.sections.reduce(

    (total, section) =>

      total + section.questions.length,

    0

  ),

  difficulty: test.difficulty,

  completed: false,

  bestBand: "--",

}));

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