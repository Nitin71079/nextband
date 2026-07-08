const questions2 = [
  // =====================================================
  // Questions 14–18
  // Matching Information
  // =====================================================

  {
    id: 14,
    type: "matching-information",
    skill: "Scanning",
    difficulty: "medium",
    instruction:
      "Which paragraph contains the following information?",
    question:
      "A description of the earliest bridge materials.",
    options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    answer: "B",
    explanation:
      "Paragraph B describes the earliest bridges being made from fallen tree trunks, stones and earth."
  },

  {
    id: 15,
    type: "matching-information",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Evidence that some ancient bridges still exist today.",
    options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    answer: "C",
    explanation:
      "Paragraph C states that several Roman bridges are still functioning today."
  },

  {
    id: 16,
    type: "matching-information",
    skill: "Inference",
    difficulty: "medium",
    question:
      "The use of computers before construction begins.",
    options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    answer: "H",
    explanation:
      "Paragraph H explains that engineers create Building Information Models before construction starts."
  },

  {
    id: 17,
    type: "matching-information",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Environmental considerations in modern bridge engineering.",
    options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    answer: "H",
    explanation:
      "Paragraph H discusses sustainability, recyclable materials and reducing carbon emissions."
  },

  {
    id: 18,
    type: "matching-information",
    skill: "Inference",
    difficulty: "medium",
    question:
      "Engineering requires balancing innovation with safety.",
    options: ["A", "B", "C", "D", "E", "F", "G", "H"],
    answer: "H",
    explanation:
      "The concluding paragraph emphasises combining technological innovation with sound engineering principles and safety."
  },

  // =====================================================
  // Questions 19–23
  // Multiple Choice
  // =====================================================

  {
    id: 19,
    type: "multiple-choice",
    skill: "Detail",
    difficulty: "medium",
    instruction:
      "Choose the correct answer.",
    question:
      "Why were early bridges unreliable?",
    options: [
      "They required expensive maintenance.",
      "They were easily damaged by nature.",
      "They were too difficult to construct.",
      "They used imported materials."
    ],
    answer:
      "They were easily damaged by nature.",
    explanation:
      "The passage explains they were vulnerable to flooding, decay and changing river channels."
  },

  {
    id: 20,
    type: "multiple-choice",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Roman engineers mainly improved bridge construction through:",
    options: [
      "Steel production",
      "Stone arch design",
      "Computer simulations",
      "Concrete reinforcement"
    ],
    answer:
      "Stone arch design",
    explanation:
      "Paragraph C explains how Roman engineers perfected the stone arch."
  },

  {
    id: 21,
    type: "multiple-choice",
    skill: "Inference",
    difficulty: "hard",
    question:
      "The Industrial Revolution changed bridge engineering because:",
    options: [
      "Wood became stronger.",
      "Mathematics became unnecessary.",
      "New materials allowed longer spans.",
      "Rivers became easier to cross."
    ],
    answer:
      "New materials allowed longer spans.",
    explanation:
      "The introduction of iron and steel enabled much longer bridge spans."
  },

  {
    id: 22,
    type: "multiple-choice",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Modern sensors are mainly used to:",
    options: [
      "Replace engineers.",
      "Monitor bridge performance.",
      "Measure river depth.",
      "Reduce construction costs."
    ],
    answer:
      "Monitor bridge performance.",
    explanation:
      "Paragraph H explains that embedded sensors monitor strain, vibration and movement."
  },

  {
    id: 23,
    type: "multiple-choice",
    skill: "Inference",
    difficulty: "hard",
    question:
      "The writer suggests that future bridge engineering will:",
    options: [
      "Ignore environmental issues.",
      "Depend entirely on computers.",
      "Continue balancing innovation and safety.",
      "Replace steel with wood."
    ],
    answer:
      "Continue balancing innovation and safety.",
    explanation:
      "The final paragraph concludes that future bridges will continue to combine technological innovation with fundamental engineering principles."
  },

  // =====================================================
  // Questions 24–26
  // Summary Completion
  // =====================================================

  {
    id: 24,
    type: "summary-completion",
    skill: "Scanning",
    difficulty: "medium",
    instruction:
      "Complete the summary using NO MORE THAN TWO WORDS from the passage.",
    question:
      "Roman bridges relied on the strength of the __________.",
    answer:
      "stone arch",
    explanation:
      "Paragraph C explains that Roman engineers perfected the stone arch."
  },

  {
    id: 25,
    type: "summary-completion",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Modern engineers create Building Information __________ before construction.",
    answer:
      "Models",
    explanation:
      "Paragraph H states that engineers develop Building Information Models before construction."
  },

  {
    id: 26,
    type: "summary-completion",
    skill: "Inference",
    difficulty: "medium",
    question:
      "Bridge projects now consider long-term __________ impact.",
    answer:
      "environmental",
    explanation:
      "Paragraph H discusses reducing environmental impact through sustainable design."
  }
];

export default questions2;