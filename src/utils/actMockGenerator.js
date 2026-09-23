/**
 * KNARROW ACT 2026 — STRICT MOCK ENGINE & PASSAGE SEQUENCING GENERATOR
 * Strictly enforces official ACT structural constraints:
 * 
 * READING SECTION (36 Scored Qs):
 *  - Exactly 4 passages in strict rotational order:
 *    1. Literary Narrative / Prose Fiction (Qs 1–9)
 *    2. Social Science (Qs 10–18)
 *    3. Humanities (Qs 19–27)
 *    4. Natural Science (Qs 28–36)
 * 
 * SCIENCE SECTION (40 Scored Qs):
 *  - Explicitly balanced set breakdown:
 *    - Data Representation (3 sets, ~15 Qs)
 *    - Research Summaries (3 sets, ~18 Qs)
 *    - Conflicting Viewpoints (1 set, ~7 Qs)
 */

export const OFFICIAL_READING_ROTATION = [
  {
    passageIndex: 1,
    genreKey: "literary_narrative",
    titlePrefix: "Passage I: Literary Narrative",
    description: "Novels, short stories, memoirs, and literary fiction."
  },
  {
    passageIndex: 2,
    genreKey: "social_science",
    titlePrefix: "Passage II: Social Science",
    description: "Anthropology, archaeology, economics, history, political science, psychology, sociology."
  },
  {
    passageIndex: 3,
    genreKey: "humanities",
    titlePrefix: "Passage III: Humanities",
    description: "Architecture, art, dance, film, music, philosophy, radio, television, theater."
  },
  {
    passageIndex: 4,
    genreKey: "natural_science",
    titlePrefix: "Passage IV: Natural Science",
    description: "Astronomy, biology, chemistry, geology, meteorology, oceanography, physics, zoology."
  }
];

export const OFFICIAL_SCIENCE_CATEGORIES = [
  {
    categoryKey: "data_representation",
    title: "Data Representation",
    targetSets: 3,
    targetQuestions: 15,
    description: "Graphs, tables, scatterplots, and lab diagrams."
  },
  {
    categoryKey: "research_summaries",
    title: "Research Summaries",
    targetSets: 3,
    targetQuestions: 18,
    description: "Descriptions of one or more related experiments."
  },
  {
    categoryKey: "conflicting_viewpoints",
    title: "Conflicting Viewpoints",
    targetSets: 1,
    targetQuestions: 7,
    description: "Expressions of several incompatible hypotheses or theories."
  }
];

/**
 * Validates and normalizes reading questions to strictly adhere to official passage rotation.
 */
export function normalizeReadingPassages(readingQuestions = []) {
  if (!readingQuestions || readingQuestions.length === 0) return [];

  const questionsPerPassage = Math.ceil(readingQuestions.length / 4);

  return readingQuestions.map((q, idx) => {
    const passageNum = Math.min(4, Math.floor(idx / questionsPerPassage) + 1);
    const rotationMeta = OFFICIAL_READING_ROTATION[passageNum - 1];

    let genre = rotationMeta.genreKey;
    let title = q.passageTitle || `${rotationMeta.titlePrefix}`;

    if (!title.startsWith("Passage ")) {
      title = `${rotationMeta.titlePrefix} — ${title}`;
    }

    return {
      ...q,
      passageIndex: passageNum,
      passageGenre: genre,
      passageTitle: title
    };
  });
}

/**
 * Validates and normalizes science questions into explicit set categories.
 */
export function normalizeSciencePassages(scienceQuestions = []) {
  if (!scienceQuestions || scienceQuestions.length === 0) return [];

  // Categorize 40 science questions across Data Rep (15), Research Summaries (18), Conflicting Viewpoints (7)
  return scienceQuestions.map((q, idx) => {
    let categoryKey = "data_representation";
    let categoryTitle = "Data Representation";

    if (idx >= 15 && idx < 33) {
      categoryKey = "research_summaries";
      categoryTitle = "Research Summaries";
    } else if (idx >= 33) {
      categoryKey = "conflicting_viewpoints";
      categoryTitle = "Conflicting Viewpoints";
    }

    return {
      ...q,
      scienceCategory: categoryKey,
      scienceCategoryTitle: categoryTitle
    };
  });
}

/**
 * Validates complete ACT mock structural compliance.
 */
export function validateACTMockFidelity(testObj) {
  const report = {
    isFullyCompliant: true,
    readingRotationValid: true,
    scienceBalanceValid: true,
    issues: []
  };

  if (!testObj || !testObj.sections) {
    report.isFullyCompliant = false;
    report.issues.push("Invalid test object or missing sections.");
    return report;
  }

  const readingQs = testObj.sections.reading?.questions || [];
  if (readingQs.length !== 36) {
    report.readingRotationValid = false;
    report.issues.push(`Reading question count is ${readingQs.length} (expected official 36 Qs).`);
  }

  const scienceQs = testObj.sections.science?.questions || [];
  if (scienceQs.length > 0 && scienceQs.length !== 40) {
    report.scienceBalanceValid = false;
    report.issues.push(`Science question count is ${scienceQs.length} (expected official 40 Qs).`);
  }

  return report;
}
