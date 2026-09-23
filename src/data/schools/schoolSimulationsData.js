// src/data/schools/schoolSimulationsData.js
// Interactive Educational Simulations for Knarrow Schools (Math, Physics, Chemistry, Biology)

export const SCHOOL_SIMULATIONS = {
  // --- MATHEMATICS SIMULATIONS ---
  NUMBER_LINE: {
    id: "number_line",
    title: "Interactive Number Line & Fraction Visualizer",
    subject: "Mathematics",
    gradeRange: "Grades 1–7",
    description: "Drag the slider to see addition, subtraction, fractions, and negative integers on an interactive number line.",
    defaultConfig: { min: -10, max: 10, value: 3, step: 1 }
  },
  TRIGONOMETRY_GRAPH: {
    id: "trigonometry_graph",
    title: "Interactive Unit Circle & Trigonometric Wave",
    subject: "Mathematics",
    gradeRange: "Grades 9–12",
    description: "Rotate the angle vector to observe sin(θ), cos(θ), and tan(θ) wave generation in real time.",
    defaultConfig: { angleDeg: 45, radius: 100 }
  },

  // --- PHYSICS SIMULATIONS ---
  ELECTRIC_CIRCUIT: {
    id: "electric_circuit",
    title: "Virtual Circuit Builder & Ohm's Law Simulator",
    subject: "Physics",
    gradeRange: "Grades 8–12",
    description: "Adjust voltage (V) and resistance (R) to watch electron flow speed and bulb brightness change according to V = IR.",
    defaultConfig: { voltage: 12, resistance: 4 } // Current = 3A
  },
  PROJECTILE_MOTION: {
    id: "projectile_motion",
    title: "Projectile Trajectory & Motion Simulator",
    subject: "Physics",
    gradeRange: "Grades 9–12",
    description: "Launch a cannonball! Change initial velocity, angle, and gravity to view trajectory path, max height, and range.",
    defaultConfig: { velocity: 25, angle: 45, gravity: 9.8 }
  },

  // --- CHEMISTRY SIMULATIONS ---
  PERIODIC_TABLE_EXPLORER: {
    id: "periodic_table_explorer",
    title: "3D Interactive Periodic Table & Atom Builder",
    subject: "Chemistry",
    gradeRange: "Grades 7–12",
    description: "Click any element to see electron shell configuration, oxidation states, atomic radius, and bonding properties.",
    defaultElements: [
      { symbol: "H", name: "Hydrogen", atomicNum: 1, mass: 1.008, group: "Non-metal", config: "1s¹" },
      { symbol: "He", name: "Helium", atomicNum: 2, mass: 4.002, group: "Noble Gas", config: "1s²" },
      { symbol: "Na", name: "Sodium", atomicNum: 11, mass: 22.99, group: "Alkali Metal", config: "[Ne] 3s¹" },
      { symbol: "Cl", name: "Chlorine", atomicNum: 17, mass: 35.45, group: "Halogen", config: "[Ne] 3s² 3p⁵" },
      { symbol: "Fe", name: "Iron", atomicNum: 26, mass: 55.84, group: "Transition Metal", config: "[Ar] 3d⁶ 4s²" }
    ]
  },
  TITRATION_LAB: {
    id: "titration_lab",
    title: "Acid-Base Titration & pH Curve Simulator",
    subject: "Chemistry",
    gradeRange: "Grades 10–12",
    description: "Add titrant drop-by-drop to observe phenolphthalein color change and plot the neutralization pH curve.",
    defaultConfig: { acidConc: 0.1, baseConc: 0.1, volumeAcid: 25 }
  },

  // --- BIOLOGY SIMULATIONS ---
  HUMAN_HEART_EXPLORER: {
    id: "human_heart_explorer",
    title: "3D Interactive Human Heart & Double Circulation",
    subject: "Biology",
    gradeRange: "Grades 5–12",
    description: "Click heart chambers (Atria & Ventricles) to trace oxygenated (red) and deoxygenated (blue) blood flow through valves.",
    chambers: [
      { name: "Right Atrium", bloodType: "Deoxygenated", description: "Receives vena cava blood from body." },
      { name: "Right Ventricle", bloodType: "Deoxygenated", description: "Pumps blood through pulmonary artery to lungs." },
      { name: "Left Atrium", bloodType: "Oxygenated", description: "Receives oxygenated blood from pulmonary veins." },
      { name: "Left Ventricle", bloodType: "Oxygenated", description: "Pumps blood through aorta to the entire body." }
    ]
  },
  PUNNETT_SQUARE_GENETICS: {
    id: "punnett_square_genetics",
    title: "Punnett Square & Genetic Cross Simulator",
    subject: "Biology",
    gradeRange: "Grades 9–12",
    description: "Select parent genotypes (e.g. Tt × Tt) to simulate Mendel's monohybrid ratio (3:1 tall to short plants).",
    defaultConfig: { parent1: "Tt", parent2: "Tt" }
  }
};
