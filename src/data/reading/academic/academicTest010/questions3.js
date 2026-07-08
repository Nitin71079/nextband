const questions3 = [
  {
    id: 27,
    type: "matching_features",
    question: "Match each research objective with the correct technology.",
    options: [
      "A. ROVs and AUVs",
      "B. Sonar Systems",
      "C. Artificial Intelligence",
      "D. Climate Monitoring"
    ],
    statements: [
      "Creates detailed maps of the seafloor.",
      "Collects samples from inaccessible ocean depths.",
      "Analyses large marine datasets.",
      "Measures ocean temperature and currents."
    ],
    answer: ["B", "A", "C", "D"],
    explanation:
      "Each technology corresponds to a specific application described in the passage.",
    difficulty: "Medium",
    skill: "Matching Features",
  },

  {
    id: 28,
    type: "matching_features",
    question: "Which technology collects biological specimens from deep oceans?",
    options: [
      "A. ROVs and AUVs",
      "B. Sonar Systems",
      "C. Artificial Intelligence",
      "D. Climate Monitoring"
    ],
    answer: "A",
    explanation:
      "ROVs and AUVs are used for deep-sea exploration and sample collection.",
    difficulty: "Easy",
    skill: "Scanning",
  },

  {
    id: 29,
    type: "matching_features",
    question: "Which technology produces detailed underwater maps?",
    options: [
      "A. ROVs and AUVs",
      "B. Sonar Systems",
      "C. Artificial Intelligence",
      "D. Climate Monitoring"
    ],
    answer: "B",
    explanation:
      "Sonar systems generate three-dimensional maps using sound waves.",
    difficulty: "Easy",
    skill: "Detail",
  },

  {
    id: 30,
    type: "matching_features",
    question: "Which technology helps identify marine species automatically?",
    options: [
      "A. ROVs and AUVs",
      "B. Sonar Systems",
      "C. Artificial Intelligence",
      "D. Climate Monitoring"
    ],
    answer: "C",
    explanation:
      "Artificial intelligence is used for species identification and data analysis.",
    difficulty: "Medium",
    skill: "Scanning",
  },

  {
    id: 31,
    type: "matching_features",
    question: "Which activity improves long-term climate models?",
    options: [
      "A. ROVs and AUVs",
      "B. Sonar Systems",
      "C. Artificial Intelligence",
      "D. Climate Monitoring"
    ],
    answer: "D",
    explanation:
      "Monitoring ocean temperature, salinity and currents improves climate models.",
    difficulty: "Medium",
    skill: "Inference",
  },

  {
    id: 32,
    type: "summary_completion",
    question:
      "Complete the summary using NO MORE THAN TWO WORDS.\n\nMuch of the deep ________ remains unexplored.",
    answer: "sea",
    explanation:
      "The opening paragraph states that much of the deep sea is unexplored.",
    difficulty: "Easy",
    skill: "Summary Completion",
  },

  {
    id: 33,
    type: "summary_completion",
    question:
      "Research vessels use ________ to map underwater landscapes.",
    answer: "sonar",
    explanation:
      "Sonar systems create detailed maps of the seafloor.",
    difficulty: "Medium",
    skill: "Vocabulary",
  },

  {
    id: 34,
    type: "summary_completion",
    question:
      "Hydrothermal vents obtain energy from chemical ________.",
    answer: "reactions",
    explanation:
      "The passage explains that hydrothermal vent ecosystems rely on chemical reactions.",
    difficulty: "Medium",
    skill: "Scanning",
  },

  {
    id: 35,
    type: "summary_completion",
    question:
      "International ________ helps countries share expertise and equipment.",
    answer: "collaboration",
    explanation:
      "International collaboration reduces costs and shares resources.",
    difficulty: "Medium",
    skill: "Vocabulary",
  },

  {
    id: 36,
    type: "multiple_choice",
    question: "What is the main purpose of the passage?",
    options: [
      "To explain modern ocean exploration and its importance.",
      "To compare different fishing industries.",
      "To discuss beach tourism.",
      "To describe underwater sports."
    ],
    answer: "To explain modern ocean exploration and its importance.",
    explanation:
      "The passage describes technologies, discoveries and future developments in ocean exploration.",
    difficulty: "Medium",
    skill: "Main Idea",
  },

  {
    id: 37,
    type: "multiple_choice",
    question: "Why are hydrothermal vents scientifically important?",
    options: [
      "They contain freshwater.",
      "They support life without sunlight.",
      "They are easy to explore.",
      "They prevent earthquakes."
    ],
    answer: "They support life without sunlight.",
    explanation:
      "These ecosystems obtain energy from chemical reactions rather than sunlight.",
    difficulty: "Medium",
    skill: "Detail",
  },

  {
    id: 38,
    type: "multiple_choice",
    question: "How does artificial intelligence assist marine research?",
    options: [
      "By replacing research vessels.",
      "By analysing large datasets and identifying patterns.",
      "By creating new oceans.",
      "By controlling weather systems."
    ],
    answer: "By analysing large datasets and identifying patterns.",
    explanation:
      "AI analyses marine data, identifies species and monitors pollution.",
    difficulty: "Hard",
    skill: "Inference",
  },

  {
    id: 39,
    type: "multiple_choice",
    question: "Why is international cooperation important?",
    options: [
      "Ocean exploration is inexpensive.",
      "Countries need to share expertise and resources.",
      "Only one country has research vessels.",
      "Marine species only exist in international waters."
    ],
    answer: "Countries need to share expertise and resources.",
    explanation:
      "Ocean exploration is costly, making collaboration essential.",
    difficulty: "Hard",
    skill: "Inference",
  },

  {
    id: 40,
    type: "multiple_choice",
    question: "Which statement best reflects the author's conclusion?",
    options: [
      "Most oceans have already been fully explored.",
      "Future discoveries will depend on continued technological progress.",
      "Ocean exploration should be discontinued.",
      "Artificial intelligence alone will solve every marine challenge."
    ],
    answer: "Future discoveries will depend on continued technological progress.",
    explanation:
      "The conclusion emphasizes advances in robotics, AI and sensors driving future exploration.",
    difficulty: "Hard",
    skill: "Author's Opinion",
  },
];

export default questions3;