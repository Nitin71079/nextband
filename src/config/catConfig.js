/**
 * KNARROW CAT 2026 — MASTER VERSIONED CONFIGURATION SYSTEM
 * Aligned with Official Indian Institutes of Management (IIM) Common Admission Test Specifications
 */

export const CAT_CONFIGS = {
  CAT_2026: {
    version: "CAT_2026",
    title: "Official IIM CAT 2026 Specification",
    totalDurationMinutes: 120,
    totalQuestions: 68,
    calculatorAllowed: true,
    sectionLocking: true,
    sections: [
      {
        id: "VARC",
        title: "Verbal Ability & Reading Comprehension",
        shortName: "VARC",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 24,
        order: 1,
        categories: [
          { id: "RC", title: "Reading Comprehension", targetItems: 16, type: "passage_set" },
          { id: "VA", title: "Verbal Ability", targetItems: 8, type: "standalone" }
        ]
      },
      {
        id: "DILR",
        title: "Data Interpretation & Logical Reasoning",
        shortName: "DILR",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 22,
        order: 2,
        categories: [
          { id: "DI", title: "Data Interpretation", targetItems: 10, type: "data_set" },
          { id: "LR", title: "Logical Reasoning", targetItems: 12, type: "logic_set" }
        ]
      },
      {
        id: "QA",
        title: "Quantitative Ability",
        shortName: "QA",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 22,
        order: 3,
        categories: [
          { id: "arithmetic", title: "Arithmetic", targetItems: 8 },
          { id: "algebra", title: "Algebra", targetItems: 6 },
          { id: "geometry", title: "Geometry & Mensuration", targetItems: 4 },
          { id: "number_system", title: "Number System", targetItems: 2 },
          { id: "modern_math", title: "Modern Mathematics", targetItems: 2 }
        ]
      }
    ],
    marking: {
      MCQ: { correct: 3, incorrect: -1, unattempted: 0 },
      TITA: { correct: 3, incorrect: 0, unattempted: 0 }
    }
  },

  CAT_CURRENT: {
    version: "CAT_CURRENT",
    title: "CAT Established Pattern (Baseline)",
    totalDurationMinutes: 120,
    totalQuestions: 68,
    calculatorAllowed: true,
    sectionLocking: true,
    sections: [
      {
        id: "VARC",
        title: "Verbal Ability & Reading Comprehension",
        shortName: "VARC",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 24,
        order: 1
      },
      {
        id: "DILR",
        title: "Data Interpretation & Logical Reasoning",
        shortName: "DILR",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 22,
        order: 2
      },
      {
        id: "QA",
        title: "Quantitative Ability",
        shortName: "QA",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 22,
        order: 3
      }
    ],
    marking: {
      MCQ: { correct: 3, incorrect: -1, unattempted: 0 },
      TITA: { correct: 3, incorrect: 0, unattempted: 0 }
    }
  }
};

/**
 * Retrieves configuration for a target version string
 */
export function getCATConfig(versionKey = "CAT_2026") {
  return CAT_CONFIGS[versionKey] || CAT_CONFIGS.CAT_2026;
}
