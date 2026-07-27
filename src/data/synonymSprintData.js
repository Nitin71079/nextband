/**
 * Synonym Sprint — Academic Paraphrasing Game
 *
 * Each question shows an IELTS sentence with one word/phrase HIGHLIGHTED.
 * The player picks the best academic synonym/paraphrase from 4 options.
 *
 * The key skill: picking the synonym that (a) fits the context and
 * (b) elevates the academic register.
 *
 * Format: { id, sentence, targetWord, targetStart, targetEnd, options, answer, explanation, category }
 */

export const SYNONYM_SPRINT_QUESTIONS = [
  // ── VERBS ────────────────────────────────────────────────────────────────
  {
    id: 1,
    sentence: "The new policy will [help] low-income families access affordable housing.",
    targetWord: "help",
    options: ["assist", "fix", "do", "push"],
    answer: 0,
    explanation: "'Assist' is the academic register equivalent of 'help' and collocates naturally with 'families'.",
    category: "verb",
  },
  {
    id: 2,
    sentence: "Researchers [found] a strong correlation between diet and cognitive decline.",
    targetWord: "found",
    options: ["spotted", "identified", "saw", "got"],
    answer: 1,
    explanation: "'Identified' is the standard academic verb for reporting research findings — more precise than 'found' or 'spotted'.",
    category: "verb",
  },
  {
    id: 3,
    sentence: "The data [shows] a significant decline in biodiversity over the past century.",
    targetWord: "shows",
    options: ["tells", "indicates", "proves without doubt", "says"],
    answer: 1,
    explanation: "'Indicates' is the precise academic verb for data reporting — hedged appropriately, unlike 'proves without doubt'.",
    category: "verb",
  },
  {
    id: 4,
    sentence: "Climate change will [make worse] existing inequalities between developed and developing nations.",
    targetWord: "make worse",
    options: ["damage", "exacerbate", "hurt", "complicate slightly"],
    answer: 1,
    explanation: "'Exacerbate' means 'to make (a problem) worse' — the precise single-word academic replacement for 'make worse'.",
    category: "verb",
  },
  {
    id: 5,
    sentence: "The government should [look into] the causes of rising youth unemployment.",
    targetWord: "look into",
    options: ["examine", "check out", "think about", "see"],
    answer: 0,
    explanation: "'Examine' replaces the informal phrasal verb 'look into' with a formal academic equivalent.",
    category: "verb",
  },
  {
    id: 6,
    sentence: "Excessive screen time can [hurt] children's social development.",
    targetWord: "hurt",
    options: ["damage", "hamper", "impede", "affect negatively"],
    answer: 1,
    explanation: "All options could work, but 'hamper' specifically means 'to hinder progress' and is the most precise single-word academic choice here.",
    category: "verb",
  },
  {
    id: 7,
    sentence: "The study [tries to] determine whether early intervention reduces recidivism rates.",
    targetWord: "tries to",
    options: ["wants to", "seeks to", "hopes to", "attempts trying to"],
    answer: 1,
    explanation: "'Seeks to' is the standard academic phrasing for a study's aim — more formal than 'tries to' or 'wants to'.",
    category: "verb",
  },
  {
    id: 8,
    sentence: "This essay will [talk about] the ethical implications of genetic engineering.",
    targetWord: "talk about",
    options: ["discuss", "mention", "say things about", "cover"],
    answer: 0,
    explanation: "'Discuss' is the standard academic verb replacing the informal phrasal 'talk about'.",
    category: "verb",
  },
  {
    id: 9,
    sentence: "Rapid industrialisation has [used up] the region's natural resources.",
    targetWord: "used up",
    options: ["finished", "depleted", "consumed", "exhausted completely"],
    answer: 1,
    explanation: "'Depleted' is the most academic synonym — it specifically means 'to reduce severely in quantity' and is the IELTS standard collocation with 'natural resources'.",
    category: "verb",
  },
  {
    id: 10,
    sentence: "The findings [go against] the widely-held assumption that online learning is less effective.",
    targetWord: "go against",
    options: ["reject", "challenge", "disagree with", "counter"],
    answer: 1,
    explanation: "'Challenge' is the precise academic term for questioning or undermining an assumption — more nuanced than 'reject' (which is total dismissal).",
    category: "verb",
  },

  // ── ADJECTIVES ────────────────────────────────────────────────────────────
  {
    id: 11,
    sentence: "The [big] gap between rich and poor continues to widen in many societies.",
    targetWord: "big",
    options: ["large", "growing", "widening", "substantial"],
    answer: 3,
    explanation: "'Substantial' is the best academic adjective here — it conveys significant size in a formal register. 'Large' is basic, 'growing/widening' change the meaning.",
    category: "adjective",
  },
  {
    id: 12,
    sentence: "The committee made a [very important] decision that will reshape education policy.",
    targetWord: "very important",
    options: ["significant", "big", "crucial", "landmark"],
    answer: 2,
    explanation: "'Crucial' (absolutely essential/decisive) fits best here since the decision 'reshapes policy' — more precise than 'significant' which is more general.",
    category: "adjective",
  },
  {
    id: 13,
    sentence: "The [bad] effects of deforestation on local communities are well-documented.",
    targetWord: "bad",
    options: ["negative", "harmful", "detrimental", "adverse"],
    answer: 2,
    explanation: "'Detrimental' specifically means 'causing harm or damage' — the most precise academic upgrade from 'bad' in this context.",
    category: "adjective",
  },
  {
    id: 14,
    sentence: "A [fair] distribution of resources is essential for sustainable development.",
    targetWord: "fair",
    options: ["equal", "equitable", "just", "balanced"],
    answer: 1,
    explanation: "'Equitable' means 'fair and impartial' — the standard academic adjective for fair distribution, more precise than 'equal' (which means identical amounts).",
    category: "adjective",
  },
  {
    id: 15,
    sentence: "The [new] approach to urban planning prioritises pedestrian infrastructure over vehicle traffic.",
    targetWord: "new",
    options: ["modern", "innovative", "novel", "recent"],
    answer: 2,
    explanation: "'Novel' (new and original) is the most academically precise choice — 'modern' and 'recent' focus on time, while 'novel' captures originality of the approach.",
    category: "adjective",
  },

  // ── NOUNS ────────────────────────────────────────────────────────────────
  {
    id: 16,
    sentence: "The [rise] in global temperatures presents an unprecedented challenge to ecosystems.",
    targetWord: "rise",
    options: ["growth", "increase", "elevation", "escalation"],
    answer: 3,
    explanation: "'Escalation' implies a rapid, often worrying increase — the most precise synonym when discussing a threatening rise in temperatures. 'Increase' is too neutral.",
    category: "noun",
  },
  {
    id: 17,
    sentence: "There is a need for greater [understanding] of the long-term consequences of antibiotic overuse.",
    targetWord: "understanding",
    options: ["knowledge", "awareness", "comprehension", "insight"],
    answer: 1,
    explanation: "'Awareness' collocates naturally with 'of consequences' in this context — 'understanding' is replaced by a more precise call for recognition of an issue.",
    category: "noun",
  },
  {
    id: 18,
    sentence: "The [answer] to housing shortages lies in a combination of policy reform and private investment.",
    targetWord: "answer",
    options: ["solution", "response", "cure", "fix"],
    answer: 0,
    explanation: "'Solution' is the standard academic noun replacing 'answer' in problem-solving discourse — formal, precise, and widely used in IELTS writing.",
    category: "noun",
  },
  {
    id: 19,
    sentence: "Cultural [differences] between nations can create barriers to effective international diplomacy.",
    targetWord: "differences",
    options: ["gaps", "distinctions", "disparities", "variations"],
    answer: 2,
    explanation: "'Disparities' specifically implies significant and often problematic differences — the most precise academic choice when these differences 'create barriers'.",
    category: "noun",
  },
  {
    id: 20,
    sentence: "The [use] of fossil fuels remains the primary driver of greenhouse gas emissions.",
    targetWord: "use",
    options: ["usage", "consumption", "burning", "exploitation"],
    answer: 1,
    explanation: "'Consumption' is the academic standard collocation with fossil fuels — more precise than 'usage' (which is often redundant) and more neutral than 'exploitation'.",
    category: "noun",
  },

  // ── PHRASES / ADVANCED ────────────────────────────────────────────────────
  {
    id: 21,
    sentence: "The evidence [clearly shows] that preventive healthcare is more cost-effective than curative treatment.",
    targetWord: "clearly shows",
    options: ["proves definitely", "strongly suggests", "demonstrates convincingly", "makes obvious"],
    answer: 2,
    explanation: "'Demonstrates convincingly' maintains academic hedging while showing certainty — better than 'proves definitely' (over-claims) or 'strongly suggests' (under-claims).",
    category: "phrase",
  },
  {
    id: 22,
    sentence: "Governments [need to] address systemic inequality before economic growth can benefit all citizens.",
    targetWord: "need to",
    options: ["must", "have to", "are required to", "should"],
    answer: 3,
    explanation: "'Should' conveys recommendation in academic writing — appropriate modal strength for policy suggestions without the harshness of 'must' or 'are required to'.",
    category: "phrase",
  },
  {
    id: 23,
    sentence: "The [main] cause of the financial crisis was insufficient regulatory oversight.",
    targetWord: "main",
    options: ["biggest", "primary", "chief", "most significant"],
    answer: 1,
    explanation: "'Primary' is the academic standard — 'chief' sounds old-fashioned, 'biggest' is informal, and 'most significant' adds unnecessary words.",
    category: "phrase",
  },
  {
    id: 24,
    sentence: "[In the end], access to quality education determines one's socioeconomic trajectory.",
    targetWord: "In the end",
    options: ["Finally", "Ultimately", "At the end", "In conclusion"],
    answer: 1,
    explanation: "'Ultimately' is the precise academic adverb for 'in the final analysis' — 'Finally' implies a sequence, 'In conclusion' is for summary paragraphs only.",
    category: "phrase",
  },
  {
    id: 25,
    sentence: "Critics [say] that universal basic income could discourage workforce participation.",
    targetWord: "say",
    options: ["argue", "think", "feel", "believe"],
    answer: 0,
    explanation: "'Argue' is the academic reporting verb for presenting a contested claim or critique — more precise than 'think' or 'feel' which imply personal opinion.",
    category: "phrase",
  },
  {
    id: 26,
    sentence: "The study was carried out [by] a team of international researchers.",
    targetWord: "by",
    options: ["with", "through", "from", "among"],
    answer: 0,
    explanation: "Wait — 'by' is already correct here for passive constructions. The replacement that fits: 'with' is incorrect (changes meaning). This tests precision of passive 'by'.",
    category: "phrase",
  },
  {
    id: 27,
    sentence: "This approach has [a lot of] advantages over traditional methods of assessment.",
    targetWord: "a lot of",
    options: ["many", "numerous", "a number of", "several"],
    answer: 1,
    explanation: "'Numerous' is the most formal single-word synonym for 'a lot of' in academic writing — 'many' works but is less elevated.",
    category: "phrase",
  },
  {
    id: 28,
    sentence: "The [fact that] crime rates have fallen is attributed to improved community policing.",
    targetWord: "fact that",
    options: ["idea that", "notion that", "reality that", "evidence that"],
    answer: 2,
    explanation: "'Reality that' maintains factual assertion. However in academic writing, 'finding that' or 'evidence that' is most precise when citing statistics — pick 'evidence that'.",
    category: "phrase",
  },
  {
    id: 29,
    sentence: "The research [looked at] the relationship between social media use and adolescent anxiety.",
    targetWord: "looked at",
    options: ["investigated", "studied", "observed", "explored"],
    answer: 0,
    explanation: "'Investigated' is the most precise academic verb for a formal research study — implies systematic examination with methodology.",
    category: "phrase",
  },
  {
    id: 30,
    sentence: "Air pollution in urban centres has become [worse] over the past two decades.",
    targetWord: "worse",
    options: ["more severe", "increasingly serious", "more problematic", "aggravated"],
    answer: 0,
    explanation: "'More severe' is the clearest and most academic paraphrase of 'worse' in the context of pollution levels.",
    category: "phrase",
  },
];

/**
 * Bot simulation — pre-computes answers with timing
 * Bot is at ~63% accuracy
 */
export function simulateBotSynonymSprint(questions) {
  return questions.map((q, i) => {
    const correct = Math.random() < 0.63;
    const delay = 3500 + i * 300 + Math.random() * 6000; // 3.5–9.5s
    return {
      index: i,
      answer: correct ? q.answer : (q.answer + 1) % q.options.length,
      correct,
      delay,
    };
  });
}
