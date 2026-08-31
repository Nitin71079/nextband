/**
 * KNARROW ACT 2026 — MASTER VERSIONED CONFIGURATION SYSTEM
 * Aligned with Official ACT Specifications (Core: English, Math, Reading; Optional: Science, Writing)
 */

export const ACT_CONFIGS = {
  ACT_2026_NATIONAL: {
    version: "ACT_2026_NATIONAL",
    title: "ACT National 2026 Specification",
    coreDurationMinutes: 125,
    coreQuestions: 131,
    sections: [
      {
        id: "english",
        title: "English",
        shortName: "ENGLISH",
        durationMinutes: 35,
        durationSeconds: 2100,
        questionCount: 50,
        scoredCount: 40,
        order: 1,
        calculatorAllowed: false,
        isOptional: false,
        categories: [
          { id: "production_of_writing", title: "Production of Writing", targetPct: "38-43%" },
          { id: "knowledge_of_language", title: "Knowledge of Language", targetPct: "18-23%" },
          { id: "conventions", title: "Conventions of Standard English", targetPct: "38-43%" }
        ]
      },
      {
        id: "math",
        title: "Mathematics",
        shortName: "MATH",
        durationMinutes: 50,
        durationSeconds: 3000,
        questionCount: 45,
        scoredCount: 41,
        order: 2,
        calculatorAllowed: true,
        isOptional: false,
        categories: [
          { id: "number_quantity", title: "Number & Quantity", targetPct: "10-12%" },
          { id: "algebra", title: "Algebra", targetPct: "17-20%" },
          { id: "functions", title: "Functions", targetPct: "17-20%" },
          { id: "geometry", title: "Geometry", targetPct: "17-20%" },
          { id: "statistics", title: "Statistics & Probability", targetPct: "12-15%" },
          { id: "essential_skills", title: "Integrating Essential Skills", targetPct: "20%" },
          { id: "modeling", title: "Modeling", targetPct: "20%" }
        ]
      },
      {
        id: "reading",
        title: "Reading",
        shortName: "READING",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 36,
        scoredCount: 27,
        order: 3,
        calculatorAllowed: false,
        isOptional: false,
        categories: [
          { id: "key_ideas", title: "Key Ideas & Details", targetPct: "44-52%" },
          { id: "craft_structure", title: "Craft & Structure", targetPct: "26-33%" },
          { id: "integration", title: "Integration of Knowledge & Ideas", targetPct: "19-26%" }
        ]
      },
      {
        id: "science",
        title: "Science (Optional)",
        shortName: "SCIENCE",
        durationMinutes: 40,
        durationSeconds: 2400,
        questionCount: 40,
        scoredCount: 34,
        order: 4,
        calculatorAllowed: false, // CALCULATOR STRICTLY PROHIBITED IN SCIENCE
        isOptional: true,
        categories: [
          { id: "data_interpretation", title: "Interpretation of Data", targetPct: "38-50%" },
          { id: "investigation", title: "Scientific Investigation", targetPct: "18-32%" },
          { id: "arguments", title: "Evaluating Scientific Arguments", targetPct: "24-38%" }
        ]
      },
      {
        id: "writing",
        title: "Writing (Optional)",
        shortName: "WRITING",
        durationMinutes: 40,
        durationSeconds: 2400,
        promptCount: 1,
        order: 5,
        calculatorAllowed: false,
        isOptional: true,
        domains: [
          "Ideas & Analysis",
          "Development & Support",
          "Organization",
          "Language Use & Conventions"
        ]
      }
    ],
    compositeSections: ["english", "math", "reading"], // Science and Writing EXCLUDED from Composite
    stemSections: ["math", "science"],
    elaSections: ["english", "reading", "writing"]
  }
};

export function getACTConfig(versionKey = "ACT_2026_NATIONAL") {
  return ACT_CONFIGS[versionKey] || ACT_CONFIGS.ACT_2026_NATIONAL;
}
