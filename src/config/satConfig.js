/**
 * KNARROW DIGITAL SAT 2026 — MASTER VERSIONED CONFIGURATION SYSTEM
 * Aligned with Official College Board Specifications (Multistage Adaptive Testing)
 */

export const SAT_CONFIGS = {
  SAT_2026_DIGITAL: {
    version: "SAT_2026_DIGITAL",
    title: "Digital SAT 2026 Specification",
    totalDurationMinutes: 134,
    totalQuestions: 98,
    totalScoreRange: "400-1600",
    sectionScoreRange: "200-800",
    breakMinutes: 10,
    sections: [
      {
        id: "rw",
        title: "Reading and Writing",
        shortName: "READING & WRITING",
        scoreRange: "200-800",
        totalDurationMinutes: 64,
        totalQuestions: 54,
        order: 1,
        modules: [
          {
            moduleNumber: 1,
            title: "Reading & Writing — Module 1",
            durationMinutes: 32,
            durationSeconds: 1920,
            questionCount: 27,
            scoredCount: 25,
            pretestCount: 2,
            difficultyMix: "BASE_BROAD"
          },
          {
            moduleNumber: 2,
            title: "Reading & Writing — Module 2",
            durationMinutes: 32,
            durationSeconds: 1920,
            questionCount: 27,
            scoredCount: 25,
            pretestCount: 2,
            adaptiveTiers: ["HIGHER", "LOWER"]
          }
        ],
        domains: [
          { id: "info_ideas", title: "Information and Ideas", targetPct: "26%" },
          { id: "craft_structure", title: "Craft and Structure", targetPct: "28%" },
          { id: "expression_ideas", title: "Expression of Ideas", targetPct: "20%" },
          { id: "conventions", title: "Standard English Conventions", targetPct: "26%" }
        ],
        passageLengthRange: "25-150 words"
      },
      {
        id: "math",
        title: "Mathematics",
        shortName: "MATH",
        scoreRange: "200-800",
        totalDurationMinutes: 70,
        totalQuestions: 44,
        order: 2,
        calculatorAllowed: true, // Embedded Desmos calculator enabled throughout Math
        modules: [
          {
            moduleNumber: 1,
            title: "Math — Module 1",
            durationMinutes: 35,
            durationSeconds: 2100,
            questionCount: 22,
            scoredCount: 20,
            pretestCount: 2,
            difficultyMix: "BASE_BROAD"
          },
          {
            moduleNumber: 2,
            title: "Math — Module 2",
            durationMinutes: 35,
            durationSeconds: 2100,
            questionCount: 22,
            scoredCount: 20,
            pretestCount: 2,
            adaptiveTiers: ["HIGHER", "LOWER"]
          }
        ],
        domains: [
          { id: "algebra", title: "Algebra", targetPct: "35%", itemTarget: "13-15 Qs" },
          { id: "advanced_math", title: "Advanced Math", targetPct: "35%", itemTarget: "13-15 Qs" },
          { id: "problem_solving", title: "Problem-Solving and Data Analysis", targetPct: "15%", itemTarget: "5-7 Qs" },
          { id: "geometry_trig", title: "Geometry and Trigonometry", targetPct: "15%", itemTarget: "5-7 Qs" }
        ],
        questionTypes: [
          { type: "MCQ", label: "Multiple Choice", pct: "~75%" },
          { type: "SPR", label: "Student-Produced Response", pct: "~25%" }
        ]
      }
    ],
    benchmarks: {
      rw: 480,
      math: 530
    }
  }
};

export function getSATConfig(versionKey = "SAT_2026_DIGITAL") {
  return SAT_CONFIGS[versionKey] || SAT_CONFIGS.SAT_2026_DIGITAL;
}
