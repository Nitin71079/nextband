/**
 * botEngine — simulates a realistic opponent for Vocab Battle & Reading Race
 *
 * Bot personality:
 *  - Responds in 2–9 seconds (varies per question to feel human)
 *  - ~65% accuracy (answers correctly most of the time)
 *  - Slightly faster on easier questions (shorter words in vocab)
 *  - Never responds instantly — minimum 1.5s
 */

const BOT_NAMES = [
  "AIlex", "BandBot", "IELTSara", "LexBot", "QuizAI",
  "StudyBot", "KnarrowAI", "VocabBot",
];

export function getBotName() {
  return BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)] + " 🤖";
}

/**
 * Schedule a bot answer for a question.
 * @param {object} question - { answer: number, options: string[], word?: string }
 * @param {number} questionIndex - used to vary timing
 * @param {function} onAnswer - called with (answerIndex: number)
 * @returns {function} cancel - call to cancel the scheduled answer
 */
export function scheduleBotAnswer(question, questionIndex, onAnswer) {
  const accuracy = 0.65;
  const isCorrect = Math.random() < accuracy;

  // Pick answer
  let botAnswer;
  if (isCorrect) {
    botAnswer = question.answer;
  } else {
    // Pick a random wrong answer
    const wrong = question.options
      .map((_, i) => i)
      .filter(i => i !== question.answer);
    botAnswer = wrong[Math.floor(Math.random() * wrong.length)];
  }

  // Timing: 2–9s, varies by question index for realism
  const baseMin = 2000;
  const baseMax = 9000;
  const variation = (questionIndex % 3) * 500; // slight pattern
  const delay = baseMin + variation + Math.random() * (baseMax - baseMin);

  const timer = setTimeout(() => {
    onAnswer(botAnswer);
  }, delay);

  return () => clearTimeout(timer);
}

/**
 * Simulate bot score progression for Reading Race.
 * Returns array of {questionIndex, correct, delay} pre-computed.
 */
export function simulateBotReadingRace(questions) {
  return questions.map((q, i) => {
    const correct = Math.random() < 0.65;
    const delay = 8000 + i * 4000 + Math.random() * 6000; // 8-14s per question
    return { questionIndex: i, correct, answer: correct ? q.answer : (q.answer + 1) % q.options.length, delay };
  });
}
