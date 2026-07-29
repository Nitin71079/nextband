/* ============================================================
   GAME BOTS — Client-side bot simulation utility
   Bots are seeded into rooms by the host and their behavior
   is simulated locally via timers. All results written to
   Firestore so all players see consistent state.
============================================================ */

const BOT_NAMES = [
  "Aria", "Leo", "Mia", "Kai", "Zoe", "Finn", "Nova", "Eli",
  "Luna", "Rex", "Ivy", "Sam", "Jade", "Ash", "Sky", "Blake",
];

const BOT_AVATARS = ["🤖", "🎯", "⚡", "🧠", "🔥", "💡", "🎓", "🌟"];

/** Generate N bots, each with a unique uid prefixed "bot_" */
export function createBots(count, existingNames = []) {
  const used = new Set(existingNames);
  const bots = [];
  const shuffled = [...BOT_NAMES].sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    const botName = shuffled.find(n => !used.has(n)) || `Bot${i + 1}`;
    used.add(botName);
    bots.push({
      uid: `bot_${Math.random().toString(36).slice(2, 10)}`,
      name: botName,
      isBot: true,
      avatar: BOT_AVATARS[i % BOT_AVATARS.length],
    });
  }
  return bots;
}

/** Generate a realistic bot speaking score for one round
 *  difficulty: 'easy' | 'medium' | 'hard'
 *  Returns { fluency, pronunciation, vocabulary, grammar, overall }
 */
export function botSpeakingScore(difficulty = "medium") {
  const ranges = {
    easy:   { min: 5.0, max: 6.5 },
    medium: { min: 6.0, max: 7.5 },
    hard:   { min: 7.0, max: 8.5 },
  };
  const r = ranges[difficulty] || ranges.medium;
  const rand = (lo, hi) => parseFloat((lo + Math.random() * (hi - lo)).toFixed(1));
  const base = rand(r.min, r.max);
  return {
    fluency:       parseFloat((base + rand(-0.5, 0.5)).toFixed(1)),
    pronunciation: parseFloat((base + rand(-0.5, 0.5)).toFixed(1)),
    vocabulary:    parseFloat((base + rand(-0.5, 0.5)).toFixed(1)),
    grammar:       parseFloat((base + rand(-0.5, 0.5)).toFixed(1)),
    overall:       base,
    transcript:    "(AI bot response)",
  };
}

/** Bot difficulty based on their name hash — gives consistent personality */
export function botDifficulty(botUid) {
  const hash = botUid.charCodeAt(4) || 0;
  if (hash % 3 === 0) return "easy";
  if (hash % 3 === 1) return "medium";
  return "hard";
}

/** For Audio Sniper: simulate bot answer delay (ms) and whether correct
 *  faster bots answer in 2-6s, slower in 6-14s
 *  accuracy: easy=55%, medium=70%, hard=85%
 */
export function botSniperAnswer(difficulty = "medium") {
  const acc = { easy: 0.55, medium: 0.70, hard: 0.85 };
  const delayRange = { easy: [4000, 14000], medium: [2500, 9000], hard: [1500, 5000] };
  const [lo, hi] = delayRange[difficulty];
  return {
    delay: Math.floor(lo + Math.random() * (hi - lo)),
    correct: Math.random() < (acc[difficulty] || 0.70),
  };
}

/** For Essay Duel: generate a realistic bot essay result */
export function botEssayResult(difficulty = "medium") {
  const ranges = {
    easy:   { min: 5.5, max: 6.5 },
    medium: { min: 6.0, max: 7.5 },
    hard:   { min: 7.0, max: 8.5 },
  };
  const r = ranges[difficulty] || ranges.medium;
  const rand = (lo, hi) => parseFloat((lo + Math.random() * (hi - lo)).toFixed(1));
  const band = rand(r.min, r.max);
  return {
    band,
    taskAchievement: parseFloat((band + rand(-0.5, 0.5)).toFixed(1)),
    coherence:       parseFloat((band + rand(-0.5, 0.5)).toFixed(1)),
    lexical:         parseFloat((band + rand(-0.5, 0.5)).toFixed(1)),
    grammar:         parseFloat((band + rand(-0.5, 0.5)).toFixed(1)),
    feedback:        "Bot player — AI-simulated score.",
    wordCount:       Math.floor(250 + Math.random() * 150),
  };
}

/** Delay helper */
export const wait = (ms) => new Promise(res => setTimeout(res, ms));
