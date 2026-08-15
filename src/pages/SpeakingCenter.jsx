import TestCenter from "../components/TestCenter";
import speakingTests from "../data/speaking/tests";

const tests = speakingTests.map((test, index) => ({

  id: test.id ?? index + 1,

title: test.title ?? `IELTS Speaking Test ${index + 1}`,
  duration: `${test.duration ?? 15} mins`,

  questions: 3,

  difficulty: test.difficulty ?? "Medium",

  completed: false,

  bestBand: "--",

}));

export default function SpeakingCenter() {
  return (
    <TestCenter
    theme="speaking"
      title="Speaking Center"
      description="Practice IELTS Speaking interviews with AI evaluation."
      icon="🎤"
      route="/mock/speaking"
      tests={tests}
      freeLimit={1}
    />
  );
}