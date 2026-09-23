/**
 * KNARROW JEE MAIN 2026/2027 — MASTER VERSIONED CONFIGURATION SYSTEM
 * Aligned with Official NTA JEE Main Paper 1 Specifications (75 Questions / 300 Marks / 180 Minutes)
 */

export const JEE_CONFIGS = {
  JEE_2026: {
    examYear: "2026/2027",
    paper: "PAPER_1",
    formatVersion: "v3.0",
    syllabusVersion: "2026.1",
    title: "Official NTA JEE Main Paper 1 (B.E. / B.Tech.) Specification",
    totalDurationMinutes: 180,
    totalQuestions: 75,
    totalMarks: 300,
    marking: {
      correctMarks: 4.0,
      incorrectPenalty: 1.0,
      unansweredMarks: 0
    },
    subjects: [
      {
        id: "physics",
        title: "Physics",
        shortName: "PHYSICS",
        questionCount: 25,
        marks: 100,
        mcqCount: 20,
        nvqCount: 5,
        topics: [
          "Kinematics & Laws of Motion",
          "Work, Energy & Power",
          "Rotational Motion & Gravitation",
          "Thermodynamics & Oscillations",
          "Electrostatics & Current Electricity",
          "Magnetism & Optics",
          "Modern Physics & Semiconductors"
        ]
      },
      {
        id: "chemistry",
        title: "Chemistry",
        shortName: "CHEMISTRY",
        questionCount: 25,
        marks: 100,
        mcqCount: 20,
        nvqCount: 5,
        topics: [
          "Physical Chemistry (Equilibrium, Kinetics, Electrochemistry)",
          "Inorganic Chemistry (Periodic Table, Bonding, Coordination)",
          "Organic Chemistry (Hydrocarbons, Functional Groups, Mechanisms)"
        ]
      },
      {
        id: "math",
        title: "Mathematics",
        shortName: "MATHEMATICS",
        questionCount: 25,
        marks: 100,
        mcqCount: 20,
        nvqCount: 5,
        topics: [
          "Algebra (Matrices, Complex Numbers, Quadratics)",
          "Calculus (Limits, Derivatives, Integrals, Differential Equations)",
          "Coordinate Geometry & Vectors/3D",
          "Trigonometry & Probability"
        ]
      }
    ]
  }
};

export function getJEEConfig(versionKey = "JEE_2026") {
  return JEE_CONFIGS[versionKey] || JEE_CONFIGS.JEE_2026;
}
