/**
 * Word Chain Game Data
 * Each chain is a sequence of IELTS words where each word is semantically
 * or topically linked to the next. The player must pick the correct next word.
 *
 * Format: { id, startWord, steps: [{clue, options:[str], answer:idx, link}] }
 * "link" explains why nextWord follows the previous (shown after answering).
 */

export const WORD_CHAINS = [
  {
    id: "chain-001",
    startWord: "Analyse",
    theme: "Academic Research",
    steps: [
      {
        clue: "After you analyse data, what do you do with the findings?",
        options: ["Ignore", "Interpret", "Delete", "Copy"],
        answer: 1,
        link: "Analyse → Interpret (you interpret what you find)",
      },
      {
        clue: "Once you interpret findings, you must support them with…?",
        options: ["Evidence", "Opinions", "Guesses", "Rumours"],
        answer: 0,
        link: "Interpret → Evidence (interpretations need evidence)",
      },
      {
        clue: "Evidence that is strong and valid can be described as…?",
        options: ["Weak", "Biased", "Cogent", "Irrelevant"],
        answer: 2,
        link: "Evidence → Cogent (cogent = convincingly logical)",
      },
      {
        clue: "A cogent argument leads to a clear…?",
        options: ["Question", "Conclusion", "Confusion", "Detour"],
        answer: 1,
        link: "Cogent → Conclusion (strong arguments conclude clearly)",
      },
      {
        clue: "What do you do after reaching a conclusion in a study?",
        options: ["Abandon", "Publish", "Hide", "Repeat endlessly"],
        answer: 1,
        link: "Conclusion → Publish (research is shared via publication)",
      },
    ],
  },
  {
    id: "chain-002",
    startWord: "Migrate",
    theme: "Society & Change",
    steps: [
      {
        clue: "People who migrate to cities cause…?",
        options: ["Urbanisation", "Desertification", "Privatisation", "Stagnation"],
        answer: 0,
        link: "Migrate → Urbanisation (mass migration drives city growth)",
      },
      {
        clue: "Rapid urbanisation can cause social…?",
        options: ["Harmony", "Inequality", "Stability", "Prosperity"],
        answer: 1,
        link: "Urbanisation → Inequality (rapid growth often widens gaps)",
      },
      {
        clue: "Inequality that grows over time can become…?",
        options: ["Temporary", "Entrenched", "Invisible", "Beneficial"],
        answer: 1,
        link: "Inequality → Entrenched (deep-rooted and hard to remove)",
      },
      {
        clue: "To fix entrenched problems, governments must…?",
        options: ["Intervene", "Retreat", "Observe", "Celebrate"],
        answer: 0,
        link: "Entrenched → Intervene (state intervention addresses deep issues)",
      },
      {
        clue: "Government intervention is meant to…?",
        options: ["Destabilise", "Mitigate", "Worsen", "Exacerbate"],
        answer: 1,
        link: "Intervene → Mitigate (to make problems less severe)",
      },
    ],
  },
  {
    id: "chain-003",
    startWord: "Hypothesis",
    theme: "Science & Thinking",
    steps: [
      {
        clue: "A hypothesis must be tested using…?",
        options: ["Intuition", "Experiments", "Traditions", "Beliefs"],
        answer: 1,
        link: "Hypothesis → Experiments (testing validates hypotheses)",
      },
      {
        clue: "Experiments produce results that are…?",
        options: ["Hypothetical", "Abstract", "Empirical", "Anecdotal"],
        answer: 2,
        link: "Experiments → Empirical (based on observation/data)",
      },
      {
        clue: "Empirical data must be carefully…?",
        options: ["Ignored", "Destroyed", "Scrutinised", "Fabricated"],
        answer: 2,
        link: "Empirical → Scrutinised (data must be examined critically)",
      },
      {
        clue: "After scrutinising data, researchers draw…?",
        options: ["Assumptions", "Inferences", "Wishes", "Excuses"],
        answer: 1,
        link: "Scrutinise → Inferences (deriving conclusions from evidence)",
      },
      {
        clue: "Strong inferences are said to be…?",
        options: ["Fallacious", "Viable", "Redundant", "Abstract"],
        answer: 1,
        link: "Inferences → Viable (capable of standing as valid conclusions)",
      },
    ],
  },
  {
    id: "chain-004",
    startWord: "Climate",
    theme: "Environment",
    steps: [
      {
        clue: "Climate change causes global temperatures to…?",
        options: ["Plummet rapidly", "Fluctuate", "Stay constant", "Freeze"],
        answer: 1,
        link: "Climate → Fluctuate (temperatures become irregular)",
      },
      {
        clue: "Fluctuating temperatures can lead to…?",
        options: ["Abundance", "Scarcity", "Clarity", "Stability"],
        answer: 1,
        link: "Fluctuate → Scarcity (of water, food, and resources)",
      },
      {
        clue: "Scarcity of resources can…?",
        options: ["Unify nations", "Jeopardise", "Guarantee", "Simplify"],
        answer: 1,
        link: "Scarcity → Jeopardise (puts lives and ecosystems at risk)",
      },
      {
        clue: "When biodiversity is jeopardised, ecosystems become…?",
        options: ["Resilient", "Thriving", "Fragile", "Self-sufficient"],
        answer: 2,
        link: "Jeopardise → Fragile (ecosystems break down easily)",
      },
      {
        clue: "Efforts to reverse fragile ecosystems involve…?",
        options: ["Perpetuating harm", "Sustainability", "Exploitation", "Negligence"],
        answer: 1,
        link: "Fragile → Sustainability (long-term ecological balance)",
      },
    ],
  },
  {
    id: "chain-005",
    startWord: "Education",
    theme: "Learning & Society",
    steps: [
      {
        clue: "The purpose of education is to…?",
        options: ["Indoctrinate", "Empower", "Confuse", "Isolate"],
        answer: 1,
        link: "Education → Empower (gives individuals capability and agency)",
      },
      {
        clue: "Empowered individuals can better…?",
        options: ["Dependent", "Contribute", "Stagnate", "Regress"],
        answer: 1,
        link: "Empower → Contribute (to society and the economy)",
      },
      {
        clue: "Contributing to society raises overall…?",
        options: ["Inequality", "Prosperity", "Conflict", "Decline"],
        answer: 1,
        link: "Contribute → Prosperity (shared contribution builds wealth)",
      },
      {
        clue: "For prosperity to be widespread it must be…?",
        options: ["Exclusive", "Equitable", "Temporary", "Accidental"],
        answer: 1,
        link: "Prosperity → Equitable (fair distribution across society)",
      },
      {
        clue: "An equitable society aims to be…?",
        options: ["Divisive", "Holistic", "Exclusive", "Volatile"],
        answer: 1,
        link: "Equitable → Holistic (considering every part of society)",
      },
    ],
  },
  {
    id: "chain-006",
    startWord: "Technology",
    theme: "Innovation & Progress",
    steps: [
      {
        clue: "Rapid technological development causes disruption that is…?",
        options: ["Predictable", "Unprecedented", "Ordinary", "Reversible"],
        answer: 1,
        link: "Technology → Unprecedented (scale of change never seen before)",
      },
      {
        clue: "Unprecedented change forces us to…?",
        options: ["Stagnate", "Adapt", "Retreat", "Ignore"],
        answer: 1,
        link: "Unprecedented → Adapt (societies must adjust to new realities)",
      },
      {
        clue: "Adapting to change requires a…?",
        options: ["Rigid", "Pragmatic", "Theoretical", "Passive"],
        answer: 1,
        link: "Adapt → Pragmatic (practical, realistic approach needed)",
      },
      {
        clue: "A pragmatic approach should be guided by…?",
        options: ["Rhetoric", "Evidence", "Emotion", "Tradition"],
        answer: 1,
        link: "Pragmatic → Evidence (practical decisions rely on data)",
      },
      {
        clue: "Evidence-based thinking helps us…?",
        options: ["Speculate wildly", "Synthesize", "Contradict", "Dismiss"],
        answer: 1,
        link: "Evidence → Synthesize (combining findings for a whole picture)",
      },
    ],
  },
  {
    id: "chain-007",
    startWord: "Poverty",
    theme: "Development & Welfare",
    steps: [
      {
        clue: "Poverty tends to…?",
        options: ["Diminish", "Perpetuate", "Resolve itself", "Vanish"],
        answer: 1,
        link: "Poverty → Perpetuate (cycles of poverty are self-reinforcing)",
      },
      {
        clue: "A perpetuated cycle is difficult to…?",
        options: ["Observe", "Break", "Continue", "Measure"],
        answer: 1,
        link: "Perpetuate → Break (escaping cycles requires effort)",
      },
      {
        clue: "To break cycles of poverty, resources must be…?",
        options: ["Hoarded", "Allocated", "Wasted", "Ignored"],
        answer: 1,
        link: "Break → Allocated (resources directed to where needed)",
      },
      {
        clue: "Allocated resources must be used…?",
        options: ["Inefficiently", "Strategically", "Randomly", "Carelessly"],
        answer: 1,
        link: "Allocated → Strategically (planned use maximises impact)",
      },
      {
        clue: "Strategic use of resources leads to…?",
        options: ["Waste", "Sustainable", "Regression", "Conflict"],
        answer: 1,
        link: "Strategically → Sustainable (long-lasting positive outcomes)",
      },
    ],
  },
  {
    id: "chain-008",
    startWord: "Language",
    theme: "Communication",
    steps: [
      {
        clue: "Language is the primary means of…?",
        options: ["Isolation", "Communication", "Confusion", "Silence"],
        answer: 1,
        link: "Language → Communication (language enables exchange of ideas)",
      },
      {
        clue: "Effective communication requires ideas to be…?",
        options: ["Verbose", "Lucid", "Vague", "Irrelevant"],
        answer: 1,
        link: "Communication → Lucid (clear and easily understood)",
      },
      {
        clue: "Lucid language avoids…?",
        options: ["Clarity", "Brevity", "Ambiguity", "Precision"],
        answer: 2,
        link: "Lucid → Ambiguity (avoids double meanings)",
      },
      {
        clue: "Avoiding ambiguity makes an argument more…?",
        options: ["Fallacious", "Convincing", "Confusing", "Irrelevant"],
        answer: 1,
        link: "Ambiguity → Convincing (clarity strengthens arguments)",
      },
      {
        clue: "A convincing argument is built on…?",
        options: ["Rhetoric alone", "Logic", "Assumptions", "Repetition"],
        answer: 1,
        link: "Convincing → Logic (sound reasoning underpins persuasion)",
      },
    ],
  },
];

/**
 * Bot simulation for Word Chain — pre-computes answers with delays
 */
export function simulateBotWordChain(steps) {
  return steps.map((step, i) => {
    const correct = Math.random() < 0.60;
    const delay = 5000 + i * 2000 + Math.random() * 5000; // 5–12s
    return {
      stepIndex: i,
      answer: correct ? step.answer : (step.answer + 1) % step.options.length,
      correct,
      delay,
    };
  });
}
