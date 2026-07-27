/**
 * Band Blitz — IELTS Band Estimator Game
 *
 * Players see a student sentence/phrase and must guess whether it reflects
 * Band 5, 6, 7, or 8 writing/vocabulary quality.
 *
 * Each entry includes:
 *  - sentence: the student output
 *  - skill: "vocabulary" | "grammar" | "coherence" | "task_response"
 *  - band: correct band (5 | 6 | 7 | 8)
 *  - explanation: why it's that band
 *  - badSentence: (optional) the Band 5 version to compare with
 */

export const BAND_BLITZ_ROUNDS = [
  // ── VOCABULARY ────────────────────────────────────────────────────────────
  {
    id: 1,
    sentence: "People nowadays use the internet a lot for many things in their daily life.",
    skill: "vocabulary",
    band: 5,
    explanation: "Very basic vocabulary: 'use a lot', 'many things', 'daily life'. No academic register, no specific lexis. Typical of Band 5.",
  },
  {
    id: 2,
    sentence: "The widespread adoption of digital technology has fundamentally transformed how individuals communicate and access information.",
    skill: "vocabulary",
    band: 8,
    explanation: "Sophisticated vocabulary: 'widespread adoption', 'fundamentally transformed'. Precise, academic, and varied. Hallmark of Band 8.",
  },
  {
    id: 3,
    sentence: "The government needs to do something to help poor people who don't have enough money.",
    skill: "vocabulary",
    band: 5,
    explanation: "'Do something', 'poor people', 'don't have enough money' — all extremely informal and imprecise. Band 5 lexical resource.",
  },
  {
    id: 4,
    sentence: "Policymakers should implement targeted financial assistance programmes to alleviate poverty among economically marginalised communities.",
    skill: "vocabulary",
    band: 8,
    explanation: "'Implement', 'targeted', 'alleviate', 'economically marginalised' — all precise academic terms used correctly. Clear Band 8.",
  },
  {
    id: 5,
    sentence: "Many students have problems with studying because they are stressed and have too much work.",
    skill: "vocabulary",
    band: 5,
    explanation: "'Have problems', 'are stressed', 'too much work' — all very basic. Limited range, no academic synonyms attempted. Band 5.",
  },
  {
    id: 6,
    sentence: "Academic performance is increasingly hindered by psychological pressures such as examination anxiety and excessive workloads.",
    skill: "vocabulary",
    band: 7,
    explanation: "'Hindered', 'psychological pressures', 'excessive workloads' are good academic choices. Not quite Band 8 due to minor repetition patterns.",
  },
  {
    id: 7,
    sentence: "Technology is very important in today's society and we cannot live without it in the modern world.",
    skill: "vocabulary",
    band: 5,
    explanation: "Repetitive ('today's society'/'modern world' say the same thing), very basic vocabulary. Classic Band 5 over-generalisation.",
  },
  {
    id: 8,
    sentence: "Urban expansion has contributed to increased carbon emissions, placing considerable strain on existing infrastructure.",
    skill: "vocabulary",
    band: 7,
    explanation: "'Urban expansion', 'carbon emissions', 'considerable strain' are all solid collocations. A confident Band 7 response.",
  },
  {
    id: 9,
    sentence: "Some people think that old age homes are bad for elderly people who should live with family.",
    skill: "vocabulary",
    band: 5,
    explanation: "'Bad for', 'old age homes', 'elderly people who should live with family' — informal register, imprecise language. Band 5.",
  },
  {
    id: 10,
    sentence: "While residential care facilities offer professional support, critics argue they may undermine family cohesion and deprive the elderly of emotional bonds.",
    skill: "vocabulary",
    band: 8,
    explanation: "'Residential care facilities', 'undermine family cohesion', 'deprive…of emotional bonds' — nuanced, precise, sophisticated. Band 8.",
  },

  // ── GRAMMAR ───────────────────────────────────────────────────────────────
  {
    id: 11,
    sentence: "If the government will invest more money in education, the country's economy will improve.",
    skill: "grammar",
    band: 5,
    explanation: "Incorrect conditional: 'if + will' is wrong — should be 'if the government invests'. A typical Band 5 conditional error.",
  },
  {
    id: 12,
    sentence: "Had governments invested more heavily in renewable energy decades ago, the current climate crisis might have been averted.",
    skill: "grammar",
    band: 8,
    explanation: "Inverted third conditional ('Had governments…') used perfectly. This advanced grammar structure is a Band 8 indicator.",
  },
  {
    id: 13,
    sentence: "Despite of the benefits, many people still prefer traditional methods of learning.",
    skill: "grammar",
    band: 5,
    explanation: "'Despite of' is incorrect — it's 'despite' or 'in spite of'. This is a very common Band 5 preposition error.",
  },
  {
    id: 14,
    sentence: "Notwithstanding the considerable advantages of online learning, a significant proportion of learners favour face-to-face instruction.",
    skill: "grammar",
    band: 8,
    explanation: "'Notwithstanding' used correctly as an advanced concession device. Sophisticated structure typical of Band 8.",
  },
  {
    id: 15,
    sentence: "The number of people who uses smartphones have increased dramatically in recent years.",
    skill: "grammar",
    band: 5,
    explanation: "Two agreement errors: 'who uses' (should be 'use') and 'have increased' (should be 'has'). Multiple errors = Band 5.",
  },
  {
    id: 16,
    sentence: "The proportion of individuals relying on smartphones for daily tasks has risen sharply over the past decade.",
    skill: "grammar",
    band: 7,
    explanation: "'The proportion…has risen' shows correct singular agreement and varied sentence structure. Solid Band 7 grammar.",
  },

  // ── COHERENCE & COHESION ──────────────────────────────────────────────────
  {
    id: 17,
    sentence: "Firstly, pollution is bad. Secondly, it causes health problems. Thirdly, governments must act. In conclusion, it is a big issue.",
    skill: "coherence",
    band: 5,
    explanation: "Mechanical use of discourse markers with no development, no supporting detail, and no logical flow between ideas. Band 5.",
  },
  {
    id: 18,
    sentence: "While industrial pollution poses serious public health risks, the economic dependency of many communities on manufacturing makes an immediate ban both impractical and politically contentious.",
    skill: "coherence",
    band: 8,
    explanation: "A single, logically complex sentence that presents two competing ideas in a nuanced, coherent way. Clear Band 8 cohesion.",
  },
  {
    id: 19,
    sentence: "Some people say exercise is good. Also, it helps you feel better. Moreover, it can reduce stress too.",
    skill: "coherence",
    band: 5,
    explanation: "Additive discourse markers ('also', 'moreover') repeat the same idea rather than developing it. No logical progression. Band 5.",
  },
  {
    id: 20,
    sentence: "Regular physical activity not only improves cardiovascular health but also enhances cognitive function — benefits that are particularly significant for an ageing population.",
    skill: "coherence",
    band: 7,
    explanation: "'Not only…but also' structure with a well-placed em dash explanation. Good cohesion and logical development. Band 7.",
  },

  // ── TASK RESPONSE ─────────────────────────────────────────────────────────
  {
    id: 21,
    sentence: "In my opinion, I think that in today's modern society, globalisation is a very important topic that affects everyone in the world.",
    skill: "task_response",
    band: 5,
    explanation: "'In my opinion, I think' is redundant. 'Today's modern society' is a common filler phrase. No actual position stated. Band 5.",
  },
  {
    id: 22,
    sentence: "Globalisation has undeniably accelerated economic development in emerging markets, yet its tendency to erode cultural distinctiveness raises legitimate concerns about homogenisation.",
    skill: "task_response",
    band: 8,
    explanation: "Clear, specific position with a concession. Uses 'undeniably', 'erode cultural distinctiveness', 'homogenisation' — all precise and relevant. Band 8.",
  },
  {
    id: 23,
    sentence: "There are many advantages and disadvantages of this issue and different people have different opinions about it.",
    skill: "task_response",
    band: 5,
    explanation: "This says nothing specific — it is a non-answer. No position, no content, pure filler. Severely limits Task Response score. Band 5.",
  },
  {
    id: 24,
    sentence: "Although space exploration yields valuable scientific insights, the reallocation of such substantial funding toward pressing terrestrial challenges — poverty, disease, and climate change — would yield more immediate societal benefit.",
    skill: "task_response",
    band: 8,
    explanation: "Takes a clear position, presents concession, uses specific supporting points, and argues logically. Exemplary Band 8 Task Response.",
  },
  {
    id: 25,
    sentence: "The topic of animal testing is very controversial and has both positives and negatives which must be considered carefully by scientists.",
    skill: "task_response",
    band: 6,
    explanation: "A vague introduction that acknowledges complexity without taking a position. Slightly better than Band 5 but lacks specific argument. Band 6.",
  },
  {
    id: 26,
    sentence: "Despite its ethical implications, the controlled use of animal testing in pharmaceutical research remains a necessary practice given the absence of sufficiently reliable alternatives.",
    skill: "task_response",
    band: 7,
    explanation: "Takes a clear position, provides a reason, acknowledges the counter-argument. Good Band 7 Task Response engagement.",
  },

  // ── MIXED ─────────────────────────────────────────────────────────────────
  {
    id: 27,
    sentence: "More and more people are going to university these days and this is a good thing for society because education is important.",
    skill: "vocabulary",
    band: 5,
    explanation: "'More and more', 'these days', 'good thing', 'education is important' — clichés and very basic lexis. Band 5 throughout.",
  },
  {
    id: 28,
    sentence: "The progressive expansion of higher education enrolment reflects growing recognition of academic qualifications as a prerequisite for professional advancement.",
    skill: "vocabulary",
    band: 8,
    explanation: "Every phrase is precise and academic: 'progressive expansion', 'enrolment', 'prerequisite', 'professional advancement'. Band 8.",
  },
  {
    id: 29,
    sentence: "Children should be taught about environmental issues at school so that they will know how to protect the environment when they are older.",
    skill: "task_response",
    band: 6,
    explanation: "Makes a reasonable point but is simplistic. 'When they are older' is vague. Some development but limited sophistication. Band 6.",
  },
  {
    id: 30,
    sentence: "Embedding environmental literacy within the school curriculum equips future generations with the critical awareness needed to navigate an increasingly resource-constrained world.",
    skill: "task_response",
    band: 8,
    explanation: "'Embedding', 'environmental literacy', 'critical awareness', 'resource-constrained' — all precise, sophisticated choices. Band 8.",
  },
];

/**
 * Bot simulation — pre-computes bot answers for all rounds
 * Bot is calibrated at ~58% accuracy (harder game to beat)
 */
export function simulateBotBandBlitz(rounds) {
  return rounds.map((round, i) => {
    const correct = Math.random() < 0.58;
    const bands = [5, 6, 7, 8];
    const wrongBands = bands.filter(b => b !== round.band);
    const delay = 4000 + Math.random() * 7000 + i * 200; // 4–11s
    return {
      index: i,
      answer: correct ? round.band : wrongBands[Math.floor(Math.random() * wrongBands.length)],
      correct,
      delay,
    };
  });
}
