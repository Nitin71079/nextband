/**
 * KNARROW GATE 2026/2027 — MASTER VERSIONED CONFIGURATION SYSTEM
 * Aligned with Official GATE Specifications (65 Questions / 100 Marks / 180 Minutes)
 * Supports CS (Computer Science), DA (Data Science & AI), EC (Electronics), EE (Electrical), ME (Mechanical), CE (Civil)
 */

export const GATE_CONFIGS = {
  GATE_2026: {
    examYear: "2026",
    formatVersion: "v2.5",
    syllabusVersion: "2026.1",
    title: "Official GATE CBT Examination Specification",
    totalDurationMinutes: 180,
    totalQuestions: 65,
    totalMarks: 100,
    sections: [
      {
        id: "ga",
        title: "General Aptitude (GA)",
        shortName: "GENERAL APTITUDE",
        questionCount: 10,
        marks: 15,
        breakdown: [
          { marks: 1, count: 5, total: 5 },
          { marks: 2, count: 5, total: 10 }
        ],
        topics: [
          "Verbal Aptitude",
          "Quantitative Aptitude",
          "Analytical Aptitude",
          "Spatial Aptitude"
        ]
      },
      {
        id: "core",
        title: "Engineering Mathematics & Core Subject",
        shortName: "CORE SUBJECT",
        questionCount: 55,
        marks: 85,
        breakdown: [
          { marks: 1, count: 25, total: 25 },
          { marks: 2, count: 30, total: 60 }
        ]
      }
    ],
    questionFormats: [
      {
        type: "MCQ",
        label: "Multiple Choice Question",
        negativeMarking: { 1: 0.3333, 2: 0.6667 },
        options: 4
      },
      {
        type: "MSQ",
        label: "Multiple Select Question",
        negativeMarking: 0,
        partialCredit: false
      },
      {
        type: "NAT",
        label: "Numerical Answer Type",
        negativeMarking: 0,
        requiresKeypad: true
      }
    ],
    branches: [
      { code: "CS", title: "Computer Science & Information Technology", color: "#38bdf8" },
      { code: "DA", title: "Data Science & Artificial Intelligence", color: "#a855f7" },
      { code: "EC", title: "Electronics & Communication Engineering", color: "#10b981" },
      { code: "EE", title: "Electrical Engineering", color: "#f59e0b" },
      { code: "ME", title: "Mechanical Engineering", color: "#ef4444" },
      { code: "CE", title: "Civil Engineering", color: "#6366f1" }
    ]
  }
};

export function getGATEConfig(versionKey = "GATE_2026") {
  return GATE_CONFIGS[versionKey] || GATE_CONFIGS.GATE_2026;
}
