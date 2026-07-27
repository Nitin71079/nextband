/**
 * Sentence Fixer Game Data
 * IELTS-style sentences with grammar errors. Players spot and fix the error
 * by choosing the corrected version.
 *
 * errorType: "tense" | "agreement" | "article" | "preposition" | "word_form" | "syntax"
 */

export const SENTENCE_FIXER_QUESTIONS = [
  // ── TENSE ERRORS ──────────────────────────────────────────────────────────
  {
    id: 1,
    sentence: "The number of students who has enrolled in online courses have increased dramatically over the past decade.",
    errorType: "agreement",
    errorHint: "Subject-verb agreement",
    options: [
      "The number of students who has enrolled in online courses have increased dramatically over the past decade.",
      "The number of students who have enrolled in online courses has increased dramatically over the past decade.",
      "The numbers of students who have enrolled in online courses has increased dramatically over the past decade.",
      "The number of student who have enrolled in online courses have increased dramatically over the past decade.",
    ],
    answer: 1,
    explanation: "'The number' is singular → 'has increased'. The relative clause 'who have enrolled' is correct (referring to plural students).",
  },
  {
    id: 2,
    sentence: "Despite of the challenges, the team managed to complete the project on time.",
    errorType: "preposition",
    errorHint: "Incorrect preposition usage",
    options: [
      "Despite of the challenges, the team managed to complete the project on time.",
      "Despite the challenges, the team managed to complete the project on time.",
      "In spite the challenges, the team managed to complete the project on time.",
      "Despite for the challenges, the team managed to complete the project on time.",
    ],
    answer: 1,
    explanation: "'Despite' is never followed by 'of'. Correct: 'Despite the challenges' or 'In spite of the challenges'.",
  },
  {
    id: 3,
    sentence: "The government must to take immediate action to address the rising unemployment rate.",
    errorType: "syntax",
    errorHint: "Modal verb + infinitive",
    options: [
      "The government must to take immediate action to address the rising unemployment rate.",
      "The government must taking immediate action to address the rising unemployment rate.",
      "The government must take immediate action to address the rising unemployment rate.",
      "The government must taken immediate action to address the rising unemployment rate.",
    ],
    answer: 2,
    explanation: "Modal verbs (must, should, can, will) are followed by the bare infinitive — not 'to + verb'.",
  },
  {
    id: 4,
    sentence: "A large amount of young people are turning to social media as their primary news source.",
    errorType: "word_form",
    errorHint: "Quantifier for countable nouns",
    options: [
      "A large amount of young people are turning to social media as their primary news source.",
      "A large number of young peoples are turning to social media as their primary news source.",
      "A large number of young people are turning to social media as their primary news source.",
      "A large amount of young peoples are turning to social media as their primary news source.",
    ],
    answer: 2,
    explanation: "'Amount' is for uncountable nouns. 'People' is countable → 'a large number of young people'.",
  },
  {
    id: 5,
    sentence: "The research suggests that regular exercise have significant benefits for mental health.",
    errorType: "agreement",
    errorHint: "Subject-verb agreement",
    options: [
      "The research suggests that regular exercise have significant benefits for mental health.",
      "The research suggest that regular exercise has significant benefits for mental health.",
      "The research suggests that regular exercise has significant benefits for mental health.",
      "The researches suggest that regular exercise have significant benefits for mental health.",
    ],
    answer: 2,
    explanation: "'Exercise' (uncountable, singular) → 'has'. 'Research suggests' (not 'suggest').",
  },
  {
    id: 6,
    sentence: "By the time the new policy is implemented, the situation will have already worsened.",
    errorType: "tense",
    errorHint: "This sentence is actually correct — choose the one with an error.",
    options: [
      "By the time the new policy is implemented, the situation will have already worsened.",
      "By the time the new policy will be implemented, the situation will already worsen.",
      "By the time the new policy is implemented, the situation would have already worsened.",
      "By the time the new policy was implemented, the situation will have already worsened.",
    ],
    answer: 0,
    explanation: "The original sentence is grammatically correct. Future perfect 'will have worsened' with present simple in the time clause is standard.",
  },
  {
    id: 7,
    sentence: "Many developing countries are faced with a lack of resources, that makes sustainable growth difficult.",
    errorType: "syntax",
    errorHint: "Relative clause construction",
    options: [
      "Many developing countries are faced with a lack of resources, that makes sustainable growth difficult.",
      "Many developing countries are faced with a lack of resources, which makes sustainable growth difficult.",
      "Many developing countries are faced with a lack of resources, who makes sustainable growth difficult.",
      "Many developing countries are faced with a lack of resources, what makes sustainable growth difficult.",
    ],
    answer: 1,
    explanation: "Use 'which' (not 'that') in non-defining relative clauses set off by a comma.",
  },
  {
    id: 8,
    sentence: "The report emphasises on the need for urgent reform in the healthcare system.",
    errorType: "preposition",
    errorHint: "Verb + preposition collocation",
    options: [
      "The report emphasises on the need for urgent reform in the healthcare system.",
      "The report emphasises in the need for urgent reform in the healthcare system.",
      "The report emphasises the need for urgent reform in the healthcare system.",
      "The report emphasises about the need for urgent reform in the healthcare system.",
    ],
    answer: 2,
    explanation: "'Emphasise' does not take a preposition. Correct: 'emphasises the need', not 'emphasises on/in/about the need'.",
  },
  {
    id: 9,
    sentence: "Both the quality and the quantity of affordable housing has declined in recent years.",
    errorType: "agreement",
    errorHint: "Compound subject agreement",
    options: [
      "Both the quality and the quantity of affordable housing has declined in recent years.",
      "Both the quality and the quantity of affordable housing have declined in recent years.",
      "Both the quality or the quantity of affordable housing have declined in recent years.",
      "Both the quality and the quantity of affordable housing is declining in recent years.",
    ],
    answer: 1,
    explanation: "'Both A and B' is a plural compound subject → requires a plural verb 'have declined'.",
  },
  {
    id: 10,
    sentence: "The scientist who's theory revolutionised physics was awarded the Nobel Prize.",
    errorType: "word_form",
    errorHint: "Possessive vs contraction",
    options: [
      "The scientist who's theory revolutionised physics was awarded the Nobel Prize.",
      "The scientist whose theory revolutionised physics was awarded the Nobel Prize.",
      "The scientist who theory revolutionised physics was awarded the Nobel Prize.",
      "The scientist whom theory revolutionised physics was awarded the Nobel Prize.",
    ],
    answer: 1,
    explanation: "'Who's' = 'who is'. For possession, use 'whose': 'the scientist whose theory'.",
  },
  {
    id: 11,
    sentence: "It is essential that every student submits their assignment before the deadline.",
    errorType: "tense",
    errorHint: "Subjunctive mood after 'essential that'",
    options: [
      "It is essential that every student submits their assignment before the deadline.",
      "It is essential that every student submit their assignment before the deadline.",
      "It is essential that every student submitted their assignment before the deadline.",
      "It is essential that every student will submit their assignment before the deadline.",
    ],
    answer: 1,
    explanation: "After 'it is essential/important/vital that', use the base form (subjunctive): 'submit', not 'submits'.",
  },
  {
    id: 12,
    sentence: "The data collected by the researchers was analysed using sophisticated statistical methods.",
    errorType: "agreement",
    errorHint: "Singular vs plural — this one is correct!",
    options: [
      "The data collected by the researchers was analysed using sophisticated statistical methods.",
      "The data collected by the researchers were analysed using sophisticated statistical methods.",
      "The datas collected by the researchers were analysed using sophisticated statistical methods.",
      "The data collected by the researcher were analysed using sophistical statistical methods.",
    ],
    answer: 1,
    explanation: "'Data' is technically plural (datum/data), so academic writing typically uses 'were'. Both 'was' and 'were' are accepted in modern usage, but 'were' is preferred in formal academic writing.",
  },
  {
    id: 13,
    sentence: "Despite working hard, the project did not met the expected standards.",
    errorType: "tense",
    errorHint: "Past simple after auxiliary 'did'",
    options: [
      "Despite working hard, the project did not met the expected standards.",
      "Despite working hard, the project did not meets the expected standards.",
      "Despite working hard, the project did not meet the expected standards.",
      "Despite working hard, the project does not met the expected standards.",
    ],
    answer: 2,
    explanation: "After 'did not', use the base form of the verb: 'meet', not 'met' or 'meets'.",
  },
  {
    id: 14,
    sentence: "One of the most important factors that influence economic growth are education.",
    errorType: "agreement",
    errorHint: "Subject identification in complex sentences",
    options: [
      "One of the most important factors that influence economic growth are education.",
      "One of the most important factors that influences economic growth is education.",
      "One of the most important factors that influence economic growth is education.",
      "One of the most important factor that influence economic growth is education.",
    ],
    answer: 2,
    explanation: "The main subject is 'one' (singular) → 'is education'. The relative clause 'that influence' correctly refers to plural 'factors'.",
  },
  {
    id: 15,
    sentence: "The committee have reached a unanimous decision after several hours of deliberation.",
    errorType: "agreement",
    errorHint: "Collective noun agreement",
    options: [
      "The committee have reached a unanimous decision after several hours of deliberation.",
      "The committee has reached an unanimous decision after several hours of deliberation.",
      "The committee has reached a unanimous decision after several hours of deliberation.",
      "The committees has reached a unanimous decision after several hours of deliberation.",
    ],
    answer: 2,
    explanation: "In formal/academic writing, collective nouns like 'committee' take singular verbs: 'has reached'. Also 'a' (not 'an') before 'unanimous' because /j/ is a consonant sound.",
  },
  {
    id: 16,
    sentence: "The new regulations will effect the way businesses operate in the digital economy.",
    errorType: "word_form",
    errorHint: "Commonly confused words",
    options: [
      "The new regulations will effect the way businesses operate in the digital economy.",
      "The new regulations will affect the way businesses operate in the digital economy.",
      "The new regulations will effects the way businesses operate in the digital economy.",
      "The new regulations will be effecting the way businesses operate in the digital economy.",
    ],
    answer: 1,
    explanation: "'Effect' is a noun; 'affect' is the verb meaning 'to have an impact on'. Use 'affect' here.",
  },
  {
    id: 17,
    sentence: "There are a growing number of evidence suggesting that screen time affects children's development.",
    errorType: "agreement",
    errorHint: "Uncountable noun agreement",
    options: [
      "There are a growing number of evidence suggesting that screen time affects children's development.",
      "There is a growing amount of evidences suggesting that screen time affects children's development.",
      "There is a growing body of evidence suggesting that screen time affects children's development.",
      "There are growing bodies of evidences suggesting that screen time affects children's development.",
    ],
    answer: 2,
    explanation: "'Evidence' is uncountable → singular 'is'. Collocate with 'a growing body of evidence', not 'number of evidence'.",
  },
  {
    id: 18,
    sentence: "Had the government intervened earlier, the crisis could be avoided.",
    errorType: "tense",
    errorHint: "Third conditional construction",
    options: [
      "Had the government intervened earlier, the crisis could be avoided.",
      "Had the government intervened earlier, the crisis could have been avoided.",
      "If the government had intervened earlier, the crisis could be avoided.",
      "Had the government intervene earlier, the crisis could have been avoided.",
    ],
    answer: 1,
    explanation: "Third conditional: 'Had + past perfect' → 'could/would have + past participle'. 'could have been avoided' is correct.",
  },
  {
    id: 19,
    sentence: "The findings of the study is consistent with previous research in this field.",
    errorType: "agreement",
    errorHint: "Head noun agreement",
    options: [
      "The findings of the study is consistent with previous research in this field.",
      "The finding of the study are consistent with previous research in this field.",
      "The findings of the study are consistent with previous research in this field.",
      "The findings of the study was consistent with previous research in this field.",
    ],
    answer: 2,
    explanation: "The subject is 'the findings' (plural) → 'are consistent'. Don't be misled by 'of the study'.",
  },
  {
    id: 20,
    sentence: "Neither the manager nor the employees was informed about the restructuring plan.",
    errorType: "agreement",
    errorHint: "Neither/nor agreement rule",
    options: [
      "Neither the manager nor the employees was informed about the restructuring plan.",
      "Neither the manager nor the employees were informed about the restructuring plan.",
      "Neither the manager nor the employees has been informed about the restructuring plan.",
      "Neither the manager or the employees were informed about the restructuring plan.",
    ],
    answer: 1,
    explanation: "With 'neither…nor', the verb agrees with the nearest subject. 'The employees' is plural → 'were informed'.",
  },
];

/**
 * Bot simulation for Sentence Fixer — pre-computes answers with delays
 */
export function simulateBotSentenceFixer(questions) {
  return questions.map((q, i) => {
    const correct = Math.random() < 0.62;
    const delay = 6000 + i * 1500 + Math.random() * 6000; // 6–12s
    return {
      index: i,
      answer: correct ? q.answer : (q.answer + 1) % q.options.length,
      correct,
      delay,
    };
  });
}
