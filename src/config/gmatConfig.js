/**
 * KNARROW GMAT 2026 — MASTER VERSIONED CONFIGURATION SYSTEM
 * Aligned with Official GMAC GMAT Specifications (Section Scores 60–90, Total Score 205–805)
 */

export const GMAT_CONFIGS = {
  GMAT_2026: {
    version: "GMAT_2026",
    title: "GMAT Exam 2026 Specification",
    totalDurationMinutes: 135,
    totalQuestions: 64,
    totalScoreRange: "205-805",
    totalScoreIncrement: 10,
    sectionScoreRange: "60-90",
    sectionScoreIncrement: 1,
    maxAnswerChangesPerSection: 3,
    sections: [
      {
        id: "quant",
        title: "Quantitative Reasoning",
        shortName: "QUANT",
        durationMinutes: 45,
        durationSeconds: 2700,
        questionCount: 21,
        scoreRange: "60-90",
        calculatorAllowed: false, // NO CALCULATOR IN QUANT
        questionTypes: ["PROBLEM_SOLVING"],
        domains: [
          "Arithmetic & Number Properties",
          "Algebra & Linear/Non-linear Equations",
          "Word Problems, Ratios & Rates",
          "Powers, Roots & Functions"
        ]
      },
      {
        id: "verbal",
        title: "Verbal Reasoning",
        shortName: "VERBAL",
        durationMinutes: 45,
        durationSeconds: 2700,
        questionCount: 23,
        scoreRange: "60-90",
        calculatorAllowed: false,
        questionTypes: ["READING_COMPREHENSION", "CRITICAL_REASONING"],
        domains: [
          "Reading Comprehension (Main Idea, Inference, Purpose)",
          "Critical Reasoning (Strengthen, Weaken, Assumption, Inference, Paradox)"
        ]
      },
      {
        id: "di",
        title: "Data Insights",
        shortName: "DATA INSIGHTS",
        durationMinutes: 45,
        durationSeconds: 2700,
        questionCount: 20,
        scoreRange: "60-90",
        calculatorAllowed: true, // CALCULATOR ENABLED IN DATA INSIGHTS
        questionTypes: [
          "DATA_SUFFICIENCY",
          "MULTI_SOURCE_REASONING",
          "TABLE_ANALYSIS",
          "GRAPHICS_INTERPRETATION",
          "TWO_PART_ANALYSIS"
        ],
        domains: [
          "Data Sufficiency",
          "Multi-Source Reasoning (Tabbed Data Integration)",
          "Table Analysis (Interactive Sortable Columns)",
          "Graphics Interpretation (Charts & Trend Analysis)",
          "Two-Part Analysis (Dual Dependent Questions)"
        ]
      }
    ],
    permittedSectionOrders: [
      ["quant", "verbal", "di"],
      ["verbal", "quant", "di"],
      ["di", "quant", "verbal"],
      ["quant", "di", "verbal"],
      ["verbal", "di", "quant"],
      ["di", "verbal", "quant"]
    ]
  }
};

export function getGMATConfig(versionKey = "GMAT_2026") {
  return GMAT_CONFIGS[versionKey] || GMAT_CONFIGS.GMAT_2026;
}
