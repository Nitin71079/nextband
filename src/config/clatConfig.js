/**
 * KNARROW CLAT 2026/2027 — MASTER VERSIONED CONFIGURATION SYSTEM
 * Aligned with Official Consortium of NLUs Specifications (120 Questions / 120 Marks / 120 Minutes)
 */

export const CLAT_CONFIGS = {
  CLAT_2026: {
    examYear: "2026/2027",
    formatVersion: "v3.0",
    syllabusVersion: "2026.1",
    title: "Official Consortium of NLUs CLAT-UG Specification",
    totalDurationMinutes: 120,
    totalQuestions: 120,
    totalMarks: 120,
    marking: {
      correctMarks: 1.0,
      incorrectPenalty: 0.25,
      unansweredMarks: 0
    },
    sections: [
      {
        id: "english",
        title: "English Language",
        shortName: "ENGLISH",
        questionCount: 24,
        marks: 24,
        passagesCount: 5,
        topics: ["Comprehension", "Inference & Implication", "Author Tone & Purpose", "Vocabulary in Context"]
      },
      {
        id: "gk",
        title: "Current Affairs including General Knowledge",
        shortName: "CURRENT AFFAIRS & GK",
        questionCount: 30,
        marks: 30,
        passagesCount: 6,
        topics: ["National & International Affairs", "Legal & Constitutional Events", "Economics & Science", "Organizations & Awards"]
      },
      {
        id: "legal",
        title: "Legal Reasoning",
        shortName: "LEGAL REASONING",
        questionCount: 30,
        marks: 30,
        passagesCount: 6,
        topics: ["Torts & Criminal Law", "Constitutional Law", "Contracts & Property", "Contemporary Legal Issues"]
      },
      {
        id: "logical",
        title: "Logical Reasoning",
        shortName: "LOGICAL REASONING",
        questionCount: 24,
        marks: 24,
        passagesCount: 5,
        topics: ["Arguments & Assumptions", "Strengthen & Weaken", "Conclusions & Inferences", "Logical Fallacies"]
      },
      {
        id: "quant",
        title: "Quantitative Techniques",
        shortName: "QUANTITATIVE TECHNIQUES",
        questionCount: 12,
        marks: 12,
        passagesCount: 3,
        topics: ["Data Interpretation & Tables", "Percentages & Ratios", "Averages & Profit Loss", "Arithmetic Datasets"]
      }
    ]
  }
};

export function getCLATConfig(versionKey = "CLAT_2026") {
  return CLAT_CONFIGS[versionKey] || CLAT_CONFIGS.CLAT_2026;
}
