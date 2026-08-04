const questions1 = [
  // Passage 1: Questions 1–4 (True / False / Not Given)
  {
    id: 1,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "easy",
    question: "Scientific investigations into this topic have expanded rapidly over the past decade.",
    options: ["True", "False", "Not Given"],
    answer: "True",
    explanation: "Paragraph A explicitly states that research into this domain has generated significant academic interest over the past decade."
  },
  {
    id: 2,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "easy",
    question: "Initial empirical observations failed to provide useful computational models.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "Paragraph A notes that initial empirical observations provided fundamental frameworks for developing predictive computational models."
  },
  {
    id: 3,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "medium",
    question: "Data collected across monitoring stations shows uniform results regardless of regional climate.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "Paragraph A states that data gathered across distinct monitoring stations indicates significant variations."
  },
  {
    id: 4,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "medium",
    question: "Commercial funding for this research exceeded government grants in 2022.",
    options: ["True", "False", "Not Given"],
    answer: "Not Given",
    explanation: "The passage mentions research funding generally, but does not compare commercial funding against government grants in 2022."
  },

  // Passage 1: Questions 5–8 (Matching Headings)
  {
    id: 5,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "easy",
    instruction: "Choose the correct heading for each paragraph from the options.",
    question: "Paragraph A",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "i. Initial research and empirical frameworks",
    explanation: "Paragraph A outlines the emergence of scientific investigation and initial observational studies."
  },
  {
    id: 6,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "easy",
    question: "Paragraph B",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "ii. Structural adaptations and system stability",
    explanation: "Paragraph B details structural flexibility and internal adaptive mechanisms."
  },
  {
    id: 7,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph C",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "iii. Advanced analytical instruments and metrics",
    explanation: "Paragraph C focuses on high-precision analytical tools, satellite telemetry, and mass spectrometry."
  },
  {
    id: 8,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph D",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "iv. Practical engineering and policy applications",
    explanation: "Paragraph D describes practical applications in engineering, urban planning, and regulatory policy."
  },

  // Passage 1: Questions 9–13 (Multiple Choice & Sentence Completion)
  {
    id: 9,
    type: "multiple-choice",
    skill: "Global Understanding",
    difficulty: "medium",
    question: "According to Paragraph B, structural systems maintain operational stability under stress by:",
    options: [
      "A. Increasing energy consumption",
      "B. Reorganizing internal components and adaptive mechanisms",
      "C. Suspending physical operations completely",
      "D. Relying exclusively on external manual interventions"
    ],
    answer: "B. Reorganizing internal components and adaptive mechanisms",
    explanation: "Paragraph B states that structural systems display remarkable adaptive flexibility by reorganizing internal components."
  },
  {
    id: 10,
    type: "multiple-choice",
    skill: "Detail",
    difficulty: "medium",
    question: "High-precision analytical instruments mentioned in Paragraph C enable researchers to:",
    options: [
      "A. Eliminate the need for field stations",
      "B. Quantify baseline parameters with unprecedented accuracy",
      "C. Predict weather patterns centuries in advance",
      "D. Replace empirical peer review"
    ],
    answer: "B. Quantify baseline parameters with unprecedented accuracy",
    explanation: "Paragraph C notes that tools like satellite telemetry allow researchers to quantify baseline parameters accurately."
  },
  {
    id: 11,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "easy",
    question: "Short-term experimental trials often fail to capture subtle ________ trends.",
    options: ["multi-decadal", "daily", "laboratory", "computational"],
    answer: "multi-decadal",
    explanation: "Paragraph E highlights that short-term trials often fail to capture subtle multi-decadal trends."
  },
  {
    id: 12,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "medium",
    question: "Policy analysts leverage data-driven frameworks to craft ________ standards.",
    options: ["regulatory", "financial", "historical", "military"],
    answer: "regulatory",
    explanation: "Paragraph D confirms that policy analysts leverage data-driven frameworks to craft regulatory standards."
  },
  {
    id: 13,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "hard",
    question: "Combining expertise across natural sciences and computer engineering enables researchers to formulate ________ solutions.",
    options: ["holistic", "temporary", "isolated", "theoretical"],
    answer: "holistic",
    explanation: "Paragraph G states that combining interdisciplinary expertise enables researchers to formulate holistic solutions."
  }
];

export default questions1;