// src/data/schools/knarrowSchoolsData.js
// Knarrow Indian Schools — Complete Multi-Board Curriculum Data Model (Grades 1-12)

export const SCHOOL_BOARDS = [
  {
    id: "CBSE",
    name: "CBSE",
    fullName: "Central Board of Secondary Education",
    curriculumVersion: "CBSE_2026_27",
    status: "CURRENT",
    states: ["All India", "National & Overseas"]
  },
  {
    id: "ICSE_ISC",
    name: "CISCE (ICSE / ISC)",
    fullName: "Council for the Indian School Certificate Examinations",
    curriculumVersion: "ICSE_ISC_2026",
    status: "CURRENT",
    states: ["All India"]
  },
  {
    id: "AP_BOARD",
    name: "Andhra Pradesh State Board",
    fullName: "Board of Secondary Education, AP (BSEAP / BIEAP)",
    curriculumVersion: "AP_2026_27",
    status: "CURRENT",
    states: ["Andhra Pradesh"]
  },
  {
    id: "TS_BOARD",
    name: "Telangana State Board",
    fullName: "Telangana State Board of Intermediate / Secondary Education (TSBIE)",
    curriculumVersion: "TS_2026_27",
    status: "CURRENT",
    states: ["Telangana"]
  },
  {
    id: "KA_BOARD",
    name: "Karnataka State Board",
    fullName: "Karnataka School Examination and Assessment Board (KSEAB)",
    curriculumVersion: "KA_2026_27",
    status: "CURRENT",
    states: ["Karnataka"]
  },
  {
    id: "MH_BOARD",
    name: "Maharashtra State Board",
    fullName: "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
    curriculumVersion: "MH_2026_27",
    status: "CURRENT",
    states: ["Maharashtra"]
  },
  {
    id: "TN_BOARD",
    name: "Tamil Nadu State Board",
    fullName: "Tamil Nadu State Board of School Examination (TNBSE)",
    curriculumVersion: "TN_2026_27",
    status: "CURRENT",
    states: ["Tamil Nadu"]
  }
];

export const GRADES = [
  { grade: 1, category: "Primary", band: "PRIMARY", label: "Grade 1" },
  { grade: 2, category: "Primary", band: "PRIMARY", label: "Grade 2" },
  { grade: 3, category: "Primary", band: "PRIMARY", label: "Grade 3" },
  { grade: 4, category: "Primary", band: "PRIMARY", label: "Grade 4" },
  { grade: 5, category: "Primary", band: "PRIMARY", label: "Grade 5" },
  { grade: 6, category: "Middle School", band: "MIDDLE", label: "Grade 6" },
  { grade: 7, category: "Middle School", band: "MIDDLE", label: "Grade 7" },
  { grade: 8, category: "Middle School", band: "MIDDLE", label: "Grade 8" },
  { grade: 9, category: "Secondary", band: "SECONDARY", label: "Grade 9" },
  { grade: 10, category: "Secondary (Board Exam)", band: "SECONDARY", label: "Grade 10" },
  { grade: 11, category: "Senior Secondary", band: "SENIOR", label: "Grade 11" },
  { grade: 12, category: "Senior Secondary (Board Exam)", band: "SENIOR", label: "Grade 12" }
];

export const SUBJECT_CONFIG = {
  PRIMARY: ["English", "Mathematics", "Science"],
  MIDDLE: ["English", "Mathematics", "Science"],
  SECONDARY: ["English", "Mathematics", "Science"],
  SENIOR: ["English", "Mathematics", "Physics", "Chemistry", "Biology"]
};

// USER PROGRESS & DAILY QUEST DEFAULTS
export const USER_SCHOOL_PROFILE = {
  studentName: "Nitin",
  grade: 10,
  board: "CBSE",
  academicYear: "2026-27",
  level: 17,
  levelTitle: "Knowledge Explorer",
  currentXP: 12450,
  nextLevelXP: 15000,
  streakDays: 7,
  dailyGoalMins: 30,
  dailyQuests: [
    { id: "quest_1", title: "Learn 1 New Concept", xp: 50, completed: true, icon: "BookOpen" },
    { id: "quest_2", title: "Complete 5 Practice Questions", xp: 100, completed: false, icon: "Zap" },
    { id: "quest_3", title: "Play 1 Arcade Game", xp: 50, completed: false, icon: "Gamepad2" },
    { id: "quest_4", title: "Ask AI Tutor 1 Question", xp: 25, completed: true, icon: "Sparkles" }
  ]
};

// VISUAL LEARNING UNIVERSE NODE PATH (DUOLINGO / SKILL TREE)
export const LEARNING_PATH_NODES = [
  {
    id: "node_1",
    chapterId: "g10_phy_ch1",
    title: "Electricity & Ohm's Law",
    domain: "Physics",
    subject: "Science",
    conceptId: "ELECTRICITY_OHMS_LAW",
    status: "IN_PROGRESS", // MASTERED | IN_PROGRESS | AVAILABLE | LOCKED
    progressPct: 78,
    estimatedMins: 18,
    position: { x: 20, y: 10 },
    icon: "Zap",
    accentColor: "from-amber-500 to-orange-600"
  },
  {
    id: "node_2",
    chapterId: "g10_math_ch1",
    title: "Introduction to Trigonometry",
    domain: "Mathematics",
    subject: "Mathematics",
    conceptId: "TRIGONOMETRY_RATIOS",
    status: "AVAILABLE",
    progressPct: 40,
    estimatedMins: 20,
    position: { x: 50, y: 35 },
    icon: "Binary",
    accentColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "node_3",
    chapterId: "g10_chem_ch1",
    title: "Metals & Non-Metals",
    domain: "Chemistry",
    subject: "Science",
    conceptId: "PERIODIC_TABLE_TRENDS",
    status: "MASTERED",
    progressPct: 100,
    estimatedMins: 15,
    position: { x: 80, y: 60 },
    icon: "Atom",
    accentColor: "from-emerald-500 to-teal-600"
  },
  {
    id: "node_4",
    chapterId: "g10_bio_ch1",
    title: "Life Processes — Circulation",
    domain: "Biology",
    subject: "Science",
    conceptId: "HUMAN_CIRCULATORY_SYSTEM",
    status: "AVAILABLE",
    progressPct: 65,
    estimatedMins: 22,
    position: { x: 45, y: 85 },
    icon: "Dna",
    accentColor: "from-rose-500 to-pink-600"
  },
  {
    id: "node_5",
    chapterId: "g12_phy_ch1",
    title: "Electric Charges & Gauss Law",
    domain: "Physics",
    subject: "Physics",
    conceptId: "ELECTRICITY_OHMS_LAW",
    status: "LOCKED",
    progressPct: 0,
    estimatedMins: 25,
    position: { x: 75, y: 110 },
    icon: "Lock",
    accentColor: "from-purple-500 to-indigo-600"
  }
];

// Universal Concept Knowledge Graph
export const KNOWLEDGE_GRAPH = [
  {
    conceptId: "NUMBERS_PLACE_VALUE",
    name: "Place Value & Numbers",
    domain: "Mathematics",
    grades: [1, 2, 3, 4, 5],
    prerequisites: [],
    description: "Understanding units, tens, hundreds, thousands, and standard notation."
  },
  {
    conceptId: "FRACTIONS_BASICS",
    name: "Fractions & Decimals",
    domain: "Mathematics",
    grades: [4, 5, 6, 7],
    prerequisites: ["NUMBERS_PLACE_VALUE"],
    description: "Representing parts of a whole, proper/improper fractions, and decimal conversions."
  },
  {
    conceptId: "ALGEBRA_LINEAR_EQ",
    name: "Linear Equations",
    domain: "Mathematics",
    grades: [7, 8, 9, 10],
    prerequisites: ["FRACTIONS_BASICS"],
    description: "Solving equations in one and two variables with algebraic transformations."
  },
  {
    conceptId: "TRIGONOMETRY_RATIOS",
    name: "Trigonometric Ratios & Identities",
    domain: "Mathematics",
    grades: [10, 11, 12],
    prerequisites: ["ALGEBRA_LINEAR_EQ"],
    description: "Sine, cosine, tangent, Pythagorean identities, and real-world application problems."
  },
  {
    conceptId: "NEWTON_LAWS_MOTION",
    name: "Newton's Laws of Motion",
    domain: "Physics",
    grades: [8, 9, 11],
    prerequisites: [],
    description: "Inertia, F = ma, action-reaction pairs, and momentum conservation."
  },
  {
    conceptId: "ELECTRICITY_OHMS_LAW",
    name: "Electricity & Ohm's Law",
    domain: "Physics",
    grades: [8, 10, 12],
    prerequisites: [],
    description: "Current, potential difference, resistance, V = IR, and series/parallel circuits."
  },
  {
    conceptId: "PERIODIC_TABLE_TRENDS",
    name: "Periodic Table & Chemical Bonding",
    domain: "Chemistry",
    grades: [8, 9, 10, 11],
    prerequisites: [],
    description: "Atomic structure, electronic configuration, valency, ionic and covalent bonding."
  },
  {
    conceptId: "ACIDS_BASES_SALTS",
    name: "Acids, Bases & Salts",
    domain: "Chemistry",
    grades: [7, 10, 11],
    prerequisites: ["PERIODIC_TABLE_TRENDS"],
    description: "pH scale, indicators, neutralization reactions, and daily applications."
  },
  {
    conceptId: "CELL_STRUCTURE_FUNCTION",
    name: "Cell Structure & Function",
    domain: "Biology",
    grades: [6, 8, 9, 11],
    prerequisites: [],
    description: "Plant vs animal cells, organelles, cell membrane, nucleus, and mitosis."
  },
  {
    conceptId: "HUMAN_CIRCULATORY_SYSTEM",
    name: "Human Circulatory System & Heart",
    domain: "Biology",
    grades: [5, 7, 10, 11],
    prerequisites: ["CELL_STRUCTURE_FUNCTION"],
    description: "Structure of human heart, double circulation, blood vessels, and blood components."
  },
  {
    conceptId: "ENGLISH_GRAMMAR_TENSES",
    name: "Tenses & Subject-Verb Agreement",
    domain: "English",
    grades: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    prerequisites: [],
    description: "Present, past, future tenses, rules of agreement, and active/passive voice."
  },
  {
    conceptId: "ENGLISH_READING_COMPREHENSION",
    name: "Reading Comprehension & Analysis",
    domain: "English",
    grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    prerequisites: [],
    description: "Identifying main ideas, inferring vocabulary in context, and answering textual questions."
  }
];

// Sample Chapter Database with Multi-Tier Explanations (Simple, Standard, Deep)
export const SCHOOL_CHAPTERS = [
  // --- GRADE 1 ---
  {
    chapterId: "g1_math_ch1",
    grade: 1,
    board: "CBSE",
    subject: "Mathematics",
    domain: "Mathematics",
    chapterNumber: 1,
    title: "Shapes & Space",
    overview: "Learn to identify basic 2D and 3D shapes like circles, squares, triangles, and spheres in everyday objects.",
    learningObjectives: [
      "Identify circles, squares, triangles, and rectangles.",
      "Understand spatial position: inside, outside, top, bottom, above, below.",
      "Sort objects based on shape and size."
    ],
    explanationTiers: {
      simple: "A circle is round like a ball! A square has 4 straight sides like a sandwich bread.",
      standard: "Geometric 2D shapes are defined by their boundaries. Circles have no corners; triangles have 3 corners; squares have 4 equal sides.",
      deep: "Planar geometry classifies polygons by vertex count. Regular polygons maintain equal edge lengths and interior angle measures."
    },
    notes: [
      {
        heading: "Basic Shapes Around Us",
        content: "A Circle is round like a ball or coin. A Square has 4 equal straight sides like a bread slice. A Triangle has 3 sides like a pizza slice!"
      },
      {
        heading: "Position Words",
        content: "The bird is ABOVE the tree. The ball is UNDER the table. The kitten is INSIDE the basket."
      }
    ],
    visuals: [
      {
        type: "shape_interactive",
        caption: "Tap on shapes to see their properties!",
        data: ["Circle", "Square", "Triangle", "Rectangle"]
      }
    ],
    workedExamples: [
      {
        question: "Which object is round like a circle?",
        given: "A box, a wheel, a sandwich",
        steps: ["A wheel has no sharp corners and rolls smoothly.", "Therefore, a wheel is a circle shape."],
        answer: "Wheel"
      }
    ],
    practiceQuestions: [
      {
        id: "g1_m_q1",
        type: "MCQ",
        question: "How many sides does a triangle have?",
        options: ["2", "3", "4", "0"],
        answer: "3",
        explanation: "A triangle is a shape bounded by 3 straight line segments."
      },
      {
        id: "g1_m_q2",
        type: "MCQ",
        question: "Which of these shapes has no corners?",
        options: ["Square", "Rectangle", "Circle", "Triangle"],
        answer: "Circle",
        explanation: "A circle is perfectly round with zero corners."
      }
    ]
  },
  {
    chapterId: "g1_sci_ch1",
    grade: 1,
    board: "CBSE",
    subject: "Science",
    domain: "Biology",
    chapterNumber: 1,
    title: "Living & Non-Living Things",
    overview: "Discover what makes living things special—plants, animals, and humans grow, eat food, and breathe!",
    learningObjectives: [
      "Differentiate living things from non-living things.",
      "Name 3 things living organisms need to stay alive.",
      "Give examples of living plants and non-living toys."
    ],
    explanationTiers: {
      simple: "Living things eat food, drink water, grow bigger, and play! Non-living toys stay the same.",
      standard: "Living organisms undergo biological processes: cellular respiration, nutrient ingestion, excretion, growth, and reproduction.",
      deep: "Living matter is distinguished from non-living matter by metabolic self-maintenance, homeostasis, genetic inheritance via nucleic acids, and continuous cellular repair."
    },
    notes: [
      {
        heading: "What are Living Things?",
        content: "Plants, animals, and humans are LIVING. They can grow big, move, eat food, and breathe air."
      },
      {
        heading: "What are Non-Living Things?",
        content: "Toys, rocks, tables, and cars are NON-LIVING. They do not eat food, grow, or breathe on their own."
      }
    ],
    visuals: [
      {
        type: "living_classifier",
        caption: "Drag items into Living or Non-Living boxes!",
        data: ["Puppy", "Teddy Bear", "Rose Plant", "Bicycle"]
      }
    ],
    workedExamples: [
      {
        question: "Is a growing tree living or non-living?",
        given: "A tree starts as a small seed and grows into a tall tree.",
        steps: ["Living things grow over time.", "Trees need water, sunlight, and air to live."],
        answer: "Living Thing"
      }
    ],
    practiceQuestions: [
      {
        id: "g1_s_q1",
        type: "MCQ",
        question: "Which of the following is a living thing?",
        options: ["Stone", "Puppy", "Toy Car", "Pencil"],
        answer: "Puppy",
        explanation: "Puppies grow, drink milk, breathe, and play because they are living animals."
      }
    ]
  },

  // --- GRADE 5 ---
  {
    chapterId: "g5_math_ch1",
    grade: 5,
    board: "CBSE",
    subject: "Mathematics",
    domain: "Mathematics",
    chapterNumber: 1,
    title: "The Fish Tale — Large Numbers & Operations",
    overview: "Explore Indian and International place value systems, large numbers up to crores, speed, distance, and word problems.",
    learningObjectives: [
      "Read and write 6, 7, and 8-digit numbers in Indian place value system.",
      "Calculate Speed = Distance ÷ Time in real-world scenarios.",
      "Solve multi-step word problems involving money and weight."
    ],
    explanationTiers: {
      simple: "1 Lakh has 5 zeros (1,00,000). Speed tells you how far a boat goes in one hour!",
      standard: "Place value determines digit weight by powers of 10. Distance equals rate multiplied by time elapsed (D = S × T).",
      deep: "Positional notation base-10 expresses values as Σ (d_i × 10^i). Kinematic velocity v = dx/dt integrates to total displacement s = v × t under constant speed."
    },
    notes: [
      {
        heading: "Indian Place Value Chart",
        content: "Lakhs and Crores: 1 Lakh = 1,00,000 (5 zeros). 1 Crore = 1,00,00,000 (7 zeros)."
      },
      {
        heading: "Speed, Distance, Time Formula",
        content: "Distance = Speed × Time. Speed = Distance / Time. Time = Distance / Speed."
      }
    ],
    visuals: [
      {
        type: "place_value_abacus",
        caption: "Interactive Place Value Abacus up to 1 Crore",
        data: ["Crores", "Ten Lakhs", "Lakhs", "Ten Thousands", "Thousands", "Hundreds", "Tens", "Ones"]
      }
    ],
    workedExamples: [
      {
        question: "A motor boat travels at a speed of 20 km in one hour. How far will it go in 3 and a half hours?",
        given: "Speed = 20 km/h, Time = 3.5 hours",
        steps: [
          "Distance in 3 hours = 20 × 3 = 60 km",
          "Distance in half hour = 20 ÷ 2 = 10 km",
          "Total Distance = 60 + 10 = 70 km"
        ],
        answer: "70 km"
      }
    ],
    practiceQuestions: [
      {
        id: "g5_m_q1",
        type: "MCQ",
        question: "How many zeros are there in 10 Lakhs?",
        options: ["5", "6", "7", "8"],
        answer: "6",
        explanation: "10 Lakhs = 10,00,000 which has 6 zeros."
      },
      {
        id: "g5_m_q2",
        type: "NUMERIC",
        question: "If a log boat travels 4 km in 1 hour, how many hours will it take to cover 20 km?",
        answer: "5",
        explanation: "Time = Distance / Speed = 20 / 4 = 5 hours."
      }
    ]
  },

  // --- GRADE 8 ---
  {
    chapterId: "g8_sci_ch1",
    grade: 8,
    board: "CBSE",
    subject: "Science",
    domain: "Physics",
    conceptId: "NEWTON_LAWS_MOTION",
    chapterNumber: 1,
    title: "Force & Pressure",
    overview: "Understand contact and non-contact forces, atmospheric pressure, liquid pressure, and the relation Pressure = Force / Area.",
    learningObjectives: [
      "Define force as a push or pull.",
      "Distinguish contact forces (friction, muscular) from non-contact forces (magnetic, gravitational, electrostatic).",
      "Calculate pressure using P = F / A."
    ],
    explanationTiers: {
      simple: "A force is a push or pull. Pushing hard on a small pin creates huge pressure!",
      standard: "Force F = mass × acceleration (Newton). Pressure P = F/A measured in Pascals (N/m²).",
      deep: "Pressure is isotropic normal force per unit surface area vector (P = dF_perp / dA). Fluid hydrostatic pressure follows P = P_0 + ρgh."
    },
    notes: [
      {
        heading: "What is Force?",
        content: "A force is a push or pull acting upon an object resulting from its interaction with another object. Unit: Newton (N)."
      },
      {
        heading: "Pressure & Area Relationship",
        content: "Pressure is force acting per unit area. P = F / A. Smaller surface area produces GREATER pressure (e.g., sharp knife cutting)."
      }
    ],
    visuals: [
      {
        type: "pressure_simulator",
        caption: "Simulate force applied on different surface areas!",
        data: ["Sharp Pin", "Flat Block", "Heavy Weight"]
      }
    ],
    workedExamples: [
      {
        question: "A force of 100 N acts perpendicularly on an area of 2 m². Calculate the pressure exerted.",
        given: "Force (F) = 100 N, Area (A) = 2 m²",
        steps: ["Formula: Pressure = Force / Area", "P = 100 N / 2 m² = 50 N/m² (Pascal)"],
        answer: "50 N/m² (or 50 Pa)"
      }
    ],
    practiceQuestions: [
      {
        id: "g8_s_q1",
        type: "MCQ",
        question: "What is the SI unit of pressure?",
        options: ["Joule", "Pascal", "Newton", "Watt"],
        answer: "Pascal",
        explanation: "1 Pascal (Pa) is defined as 1 Newton per square meter (1 N/m²)."
      }
    ]
  },

  // --- GRADE 10 (BOARD EXAM) ---
  {
    chapterId: "g10_math_ch1",
    grade: 10,
    board: "CBSE",
    subject: "Mathematics",
    domain: "Mathematics",
    conceptId: "TRIGONOMETRY_RATIOS",
    chapterNumber: 8,
    title: "Introduction to Trigonometry",
    overview: "Master trigonometric ratios sin, cos, tan, cosec, sec, cot, specific angle values (0°, 30°, 45°, 60°, 90°), and trigonometric identities.",
    learningObjectives: [
      "Define trigonometric ratios in a right-angled triangle.",
      "Evaluate expressions using standard angles (0° to 90°).",
      "Prove trigonometric identities using sin²θ + cos²θ = 1."
    ],
    explanationTiers: {
      simple: "Trigonometry connects triangle side lengths with angles. sin θ is opposite side divided by hypotenuse!",
      standard: "In a right triangle with acute angle θ, sin θ = Opp/Hyp, cos θ = Adj/Hyp, and tan θ = Opp/Adj. The core identity is sin²θ + cos²θ = 1.",
      deep: "Trigonometric functions are defined on the unit circle x² + y² = 1 where (x, y) = (cos θ, sin θ). Euler's identity e^(iθ) = cos θ + i sin θ links trigonometry to complex analysis."
    },
    notes: [
      {
        heading: "Trigonometric Ratios",
        content: "sin θ = Opposite / Hypotenuse | cos θ = Adjacent / Hypotenuse | tan θ = Opposite / Adjacent = sin θ / cos θ."
      },
      {
        heading: "Fundamental Pythagorean Identity",
        content: "sin²θ + cos²θ = 1 | 1 + tan²θ = sec²θ | 1 + cot²θ = cosec²θ."
      }
    ],
    visuals: [
      {
        type: "unit_circle_interactive",
        caption: "Interactive Unit Circle & Right Triangle Visualizer",
        data: ["sin(30°)=0.5", "cos(60°)=0.5", "tan(45°)=1"]
      }
    ],
    workedExamples: [
      {
        question: "Evaluate: 2 tan² 45° + cos² 30° - sin² 60°",
        given: "tan 45° = 1, cos 30° = √3/2, sin 60° = √3/2",
        steps: [
          "Substitute values: 2(1)² + (√3/2)² - (√3/2)²",
          "2(1) + 3/4 - 3/4",
          "2 + 0 = 2"
        ],
        answer: "2"
      }
    ],
    practiceQuestions: [
      {
        id: "g10_m_q1",
        type: "MCQ",
        question: "If sin A = 3/5, what is the value of cos A for an acute angle A?",
        options: ["4/5", "5/4", "3/4", "4/3"],
        answer: "4/5",
        explanation: "By Pythagoras theorem: Adjacent = √(5² - 3²) = √16 = 4. Hence cos A = 4/5."
      },
      {
        id: "g10_m_q2",
        type: "SHORT_ANSWER",
        question: "Prove that (1 - sin²θ) sec²θ = 1.",
        answer: "1 - sin²θ = cos²θ. Therefore cos²θ × sec²θ = cos²θ × (1/cos²θ) = 1.",
        explanation: "Uses Pythagorean identity 1 - sin²θ = cos²θ and reciprocal relation secθ = 1/cosθ."
      }
    ]
  },
  {
    chapterId: "g10_phy_ch1",
    grade: 10,
    board: "CBSE",
    subject: "Science",
    domain: "Physics",
    conceptId: "ELECTRICITY_OHMS_LAW",
    chapterNumber: 12,
    title: "Electricity — Ohm's Law & Circuits",
    overview: "Deep dive into electric current, potential difference, Ohm's law, resistance factors, series and parallel resistor combinations, and Joule heating effect.",
    learningObjectives: [
      "State Ohm's Law and plot V vs I linear relationship.",
      "Calculate equivalent resistance for series (Rs = R1+R2) and parallel (1/Rp = 1/R1 + 1/R2) circuits.",
      "Apply Joule's Law of heating H = I²Rt to electrical appliances."
    ],
    explanationTiers: {
      simple: "Voltage is like water pressure pushing electricity through a wire. Resistance slows down electron flow!",
      standard: "Ohm's Law states V = IR at constant temperature. Resistors in series add directly (R_s = R1 + R2), while parallel reciprocal values sum (1/R_p = 1/R1 + 1/R2).",
      deep: "Microscopic Ohm's Law J = σE relates current density J to conductivity σ and electric field E. Thermal dissipation power P = I²R arises from inelastic electron-lattice scattering."
    },
    notes: [
      {
        heading: "Ohm's Law Statement",
        content: "At constant temperature, the current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends: V = IR."
      },
      {
        heading: "Resistors in Series vs Parallel",
        content: "Series: Same current I, voltage divides V = V1 + V2. Parallel: Same voltage V, current divides I = I1 + I2."
      }
    ],
    visuals: [
      {
        type: "circuit_simulator",
        caption: "Interactive Drag & Drop Circuit Builder with Ammeter & Voltmeter",
        data: ["Battery", "Resistor", "Switch", "Bulb", "Ammeter"]
      }
    ],
    workedExamples: [
      {
        question: "Two resistors of 6 Ω and 12 Ω are connected in parallel across a 12 V battery. Calculate equivalent resistance and total current.",
        given: "R1 = 6 Ω, R2 = 12 Ω, V = 12 V",
        steps: [
          "1/Rp = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4",
          "Equivalent resistance Rp = 4 Ω",
          "Total current I = V / Rp = 12 V / 4 Ω = 3 A"
        ],
        answer: "Rp = 4 Ω, I = 3 A"
      }
    ],
    practiceQuestions: [
      {
        id: "g10_p_q1",
        type: "MCQ",
        question: "How does resistance of a wire change if its length is doubled while keeping area constant?",
        options: ["Halved", "Doubled", "Quadrupled", "Remains same"],
        answer: "Doubled",
        explanation: "Resistance R is directly proportional to length (R ∝ L). Doubling L doubles R."
      }
    ]
  },
  {
    chapterId: "g10_chem_ch1",
    grade: 10,
    board: "CBSE",
    subject: "Science",
    domain: "Chemistry",
    conceptId: "PERIODIC_TABLE_TRENDS",
    chapterNumber: 3,
    title: "Metals & Non-Metals",
    overview: "Physical and chemical properties of metals/non-metals, reactivity series, ionic bonding, occurrence and extraction of metals.",
    learningObjectives: [
      "Explain metal reactions with water, acids, and oxygen.",
      "Understand formation of ionic compounds (e.g. NaCl, MgCl2) via electron transfer.",
      "Interpret the Reactivity Series of metals."
    ],
    explanationTiers: {
      simple: "Metals give away electrons to become positive ions! Non-metals grab electrons to form strong ionic bonds.",
      standard: "Metals form cations by electropositive valence electron loss. Ionic bonds arise from electrostatic attraction between cations and anions.",
      deep: "Lattice energy U = -k(q1 q2 / r_0) governs ionic crystal stability. Electronegativity differences Δχ > 1.7 indicate predominant ionic bond character."
    },
    notes: [
      {
        heading: "Ionic Bonding",
        content: "Ionic bonds are formed by complete transfer of valence electrons from a metal (cation) to a non-metal (anion)."
      }
    ],
    visuals: [
      {
        type: "periodic_table_interactive",
        caption: "Interactive Periodic Table with Valence & Metalloid Highlight",
        data: ["Sodium", "Chlorine", "Magnesium", "Oxygen"]
      }
    ],
    workedExamples: [
      {
        question: "Show the formation of Na₂O by electron transfer.",
        given: "Na (atomic number 11, config 2,8,1), O (atomic number 8, config 2,6)",
        steps: [
          "Each Na atom donates 1 electron to achieve octet (Na+).",
          "Oxygen needs 2 electrons to complete octet (O2-).",
          "Two Na atoms donate 1 electron each to one Oxygen atom: 2 Na+ + O2- → Na₂O."
        ],
        answer: "Na₂O (Ionic Compound)"
      }
    ],
    practiceQuestions: [
      {
        id: "g10_c_q1",
        type: "MCQ",
        question: "Which of the following metals is liquid at room temperature?",
        options: ["Sodium", "Mercury", "Gallium", "Aluminium"],
        answer: "Mercury",
        explanation: "Mercury (Hg) is the only metal that remains liquid at room temperature (25°C)."
      }
    ]
  },
  {
    chapterId: "g10_bio_ch1",
    grade: 10,
    board: "CBSE",
    subject: "Science",
    domain: "Biology",
    conceptId: "HUMAN_CIRCULATORY_SYSTEM",
    chapterNumber: 6,
    title: "Life Processes — Circulation & Respiration",
    overview: "Study human heart anatomy, double circulation, oxygenated vs deoxygenated blood flow, xylem/phloem transport in plants, and cellular respiration.",
    learningObjectives: [
      "Trace the path of blood through the 4 chambers of human heart.",
      "Define double circulation (pulmonary & systemic).",
      "Distinguish arteries, veins, and capillaries."
    ],
    explanationTiers: {
      simple: "Your heart is a double pump! The right side sends blood to lungs for oxygen, and the left side pumps fresh blood to your body.",
      standard: "Human circulation is double: Pulmonary (Heart → Lungs → Heart) and Systemic (Heart → Body → Heart), preventing oxygenated and deoxygenated blood mixing.",
      deep: "Four-chambered cardiac muscular architecture generates 120/80 mmHg pressure differentials. Cardiac output Q = Stroke Volume × Heart Rate maintains metabolic O2 demands."
    },
    notes: [
      {
        heading: "Double Circulation in Humans",
        content: "Blood goes through the heart TWICE during one complete cycle: 1) Pulmonary Circulation (Heart → Lungs → Heart) and 2) Systemic Circulation (Heart → Body → Heart)."
      }
    ],
    visuals: [
      {
        type: "heart_3d_explorer",
        caption: "Interactive 3D Animated Human Heart & Blood Circulation Pathway",
        data: ["Right Atrium", "Right Ventricle", "Left Atrium", "Left Ventricle", "Aorta", "Pulmonary Artery"]
      }
    ],
    workedExamples: [
      {
        question: "Why is double circulation necessary in humans and birds?",
        given: "Warm-blooded animals need high energy to maintain constant body temperature.",
        steps: [
          "Double circulation completely separates oxygenated and deoxygenated blood.",
          "This ensures highly efficient oxygen supply to cells for rapid cellular respiration."
        ],
        answer: "To maintain high metabolic rate and constant body temperature."
      }
    ],
    practiceQuestions: [
      {
        id: "g10_b_q1",
        type: "MCQ",
        question: "Which blood vessel carries oxygenated blood from lungs to the left atrium?",
        options: ["Vena Cava", "Pulmonary Artery", "Pulmonary Vein", "Aorta"],
        answer: "Pulmonary Vein",
        explanation: "Pulmonary veins are the only veins in the human body that carry oxygen-rich blood."
      }
    ]
  },

  // --- GRADE 12 (SENIOR BOARD EXAM) ---
  {
    chapterId: "g12_phy_ch1",
    grade: 12,
    board: "CBSE",
    subject: "Physics",
    domain: "Physics",
    conceptId: "ELECTRICITY_OHMS_LAW",
    chapterNumber: 1,
    title: "Electric Charges & Fields",
    overview: "Coulomb's Law, electric field lines, electric dipole, Gauss's Law applications, flux, and electrostatic potential.",
    learningObjectives: [
      "State Coulomb's Law in vector form.",
      "Calculate electric field E due to dipole on axial and equatorial points.",
      "Apply Gauss's Theorem ∮E·dA = Q_enclosed / ε₀."
    ],
    explanationTiers: {
      simple: "Like charges push each other away; opposite charges pull together!",
      standard: "Coulomb's Law gives force F = (1/4πε₀)(q1 q2 / r²). Electric field E is force per unit charge (N/C).",
      deep: "Electrostatic field is conservative: ∇ × E = 0. Gauss's differential form ∇ · E = ρ / ε₀ yields Maxwell's first equation."
    },
    notes: [
      {
        heading: "Coulomb's Law",
        content: "Electrostatic force F = (1 / 4πε₀) * (|q1 q2| / r²), where 1 / 4πε₀ ≈ 9 × 10⁹ N m²/C²."
      }
    ],
    visuals: [
      {
        type: "gauss_law_simulator",
        caption: "Simulate Electric Field Lines & Gaussian Surfaces",
        data: ["Spherical Shell", "Infinite Line Charge", "Dipole"]
      }
    ],
    workedExamples: [
      {
        question: "Two point charges +2 μC and +6 μC repel each other with a force of 12 N. If a charge of -4 μC is added to each, what will be the new force?",
        given: "Initial charges q1 = +2 μC, q2 = +6 μC. Added charge = -4 μC.",
        steps: [
          "New charge q1' = 2 - 4 = -2 μC",
          "New charge q2' = 6 - 4 = +2 μC",
          "Product of initial charges = 2 × 6 = 12",
          "Product of new charges = |-2 × 2| = 4",
          "Since F ∝ |q1 q2|, F' = F × (4 / 12) = 12 N × (1 / 3) = 4 N (Attractive)"
        ],
        answer: "4 N (Attractive)"
      }
    ],
    practiceQuestions: [
      {
        id: "g12_p_q1",
        type: "MCQ",
        question: "What is the electric flux through a closed Gaussian surface enclosing a dipole?",
        options: ["q / ε₀", "2q / ε₀", "Zero", "Infinite"],
        answer: "Zero",
        explanation: "A dipole consists of equal and opposite charges (+q and -q). Total enclosed charge Q = 0, so flux Φ = Q/ε₀ = 0."
      }
    ]
  },
  {
    chapterId: "g12_chem_ch1",
    grade: 12,
    board: "CBSE",
    subject: "Chemistry",
    domain: "Chemistry",
    conceptId: "PERIODIC_TABLE_TRENDS",
    chapterNumber: 2,
    title: "Electrochemistry",
    overview: "Galvanic cells, Nernst equation, conductance in electrolytic solutions, Kohlrausch's Law, electrolysis, and fuel cells.",
    learningObjectives: [
      "Calculate EMF of galvanic cell using Nernst Equation.",
      "Apply Kohlrausch's law of independent migration of ions.",
      "Relate Gibbs free energy ΔG° with E°cell via ΔG° = -nFE°cell."
    ],
    explanationTiers: {
      simple: "Chemical reactions in batteries produce electricity to power phones and cars!",
      standard: "Galvanic cells convert spontaneous chemical energy into electrical work. E_cell = E°_cell - (0.0591/n) log(Q).",
      deep: "Electrochemical potential μ_i = μ_i° + RT ln a_i + z_i F Φ determines ion transport across double layers under Nernst-Planck dynamics."
    },
    notes: [
      {
        heading: "Nernst Equation",
        content: "E_cell = E°_cell - (0.0591 / n) log ([Anode Ion] / [Cathode Ion]) at 298 K."
      }
    ],
    visuals: [
      {
        type: "galvanic_cell_interactive",
        caption: "Interactive Daniell Cell (Zn-Cu) Simulation with Salt Bridge",
        data: ["Zn Anode", "Cu Cathode", "Salt Bridge", "Voltmeter"]
      }
    ],
    workedExamples: [
      {
        question: "Calculate the standard Gibbs energy change for the reaction: Zn(s) + Cu²+(aq) → Zn²+(aq) + Cu(s) given E°cell = 1.10 V.",
        given: "n = 2, F = 96500 C/mol, E°cell = 1.10 V",
        steps: [
          "Formula: ΔG° = -n F E°cell",
          "ΔG° = -2 × 96500 C/mol × 1.10 V",
          "ΔG° = -212,300 J/mol = -212.3 kJ/mol"
        ],
        answer: "-212.3 kJ/mol"
      }
    ],
    practiceQuestions: [
      {
        id: "g12_c_q1",
        type: "MCQ",
        question: "Which equation represents Kohlrausch's Law for weak electrolyte CH3COOH?",
        options: [
          "Λ°m = λ°(H+) + λ°(CH3COO-)",
          "Λ°m = λ°(H+) - λ°(CH3COO-)",
          "Λ°m = λ°(H+) × λ°(CH3COO-)",
          "None of the above"
        ],
        answer: "Λ°m = λ°(H+) + λ°(CH3COO-)",
        explanation: "Kohlrausch's law states that limiting molar conductivity of an electrolyte is equal to the sum of individual ionic molar conductivities."
      }
    ]
  }
];

// Board Exam Question Patterns for Grade 10 & 12
export const BOARD_EXAM_PATTERNS = {
  CBSE_GRADE_10: {
    title: "CBSE Class 10 Board Exam Mock",
    durationMinutes: 180,
    totalMarks: 80,
    sections: [
      { name: "Section A", type: "MCQ", count: 20, marksPerQ: 1, description: "Multiple Choice & Assertion-Reasoning Questions" },
      { name: "Section B", type: "VERY_SHORT", count: 5, marksPerQ: 2, description: "Very Short Answer Questions (30-50 words)" },
      { name: "Section C", type: "SHORT", count: 6, marksPerQ: 3, description: "Short Answer Questions (50-80 words)" },
      { name: "Section D", type: "LONG", count: 4, marksPerQ: 5, description: "Long Answer Questions (80-120 words with step working)" },
      { name: "Section E", type: "CASE_STUDY", count: 3, marksPerQ: 4, description: "Case-based / Integrated Assessment Questions" }
    ]
  },
  ICSE_GRADE_10: {
    title: "ICSE Class 10 Board Exam Mock",
    durationMinutes: 120,
    totalMarks: 80,
    sections: [
      { name: "Section I (Compulsory)", type: "MIXED_OBJECTIVE", count: 15, marksPerQ: 2, description: "Compulsory Short & Objective Questions" },
      { name: "Section II (Attempt 4 of 6)", type: "STRUCTURED_SUBJECTIVE", count: 4, marksPerQ: 10, description: "Long Structured Questions with sub-parts" }
    ]
  },
  CBSE_GRADE_12: {
    title: "CBSE Class 12 Senior Board Exam Mock",
    durationMinutes: 180,
    totalMarks: 70,
    sections: [
      { name: "Section A", type: "MCQ", count: 16, marksPerQ: 1, description: "MCQs & Assertion Reason" },
      { name: "Section B", type: "SHORT_2M", count: 5, marksPerQ: 2, description: "Short Concept & Numerical Problems" },
      { name: "Section C", type: "SHORT_3M", count: 7, marksPerQ: 3, description: "Derivations & Problem Solving" },
      { name: "Section D", type: "CASE_STUDY_4M", count: 2, marksPerQ: 4, description: "Case Study & Passage-based Questions" },
      { name: "Section E", type: "LONG_5M", count: 3, marksPerQ: 5, description: "Detailed Derivation & Numerical Step Questions" }
    ]
  }
};
