const questions1 = [
  // =====================================================
  // Questions 1–5
  // Matching Headings
  // =====================================================

  {
    id: 1,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "easy",
    instruction: "Choose the correct heading for each paragraph.",
    question: "Paragraph A",
    options: [
      "i. Life in extreme coastal conditions",
      "ii. Wildlife supported by mangrove forests",
      "iii. Carbon storage beneath the soil",
      "iv. The importance of restoration",
      "v. A remarkable root system",
      "vi. Human threats to mangroves",
      "vii. A globally important ecosystem"
    ],
    answer: "i. Life in extreme coastal conditions",
    explanation:
      "Paragraph A introduces where mangroves grow and how they survive in harsh coastal environments."
  },

  {
    id: 2,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "easy",
    question: "Paragraph C",
    options: [
      "i. Life in extreme coastal conditions",
      "ii. Wildlife supported by mangrove forests",
      "iii. Carbon storage beneath the soil",
      "iv. The importance of restoration",
      "v. A remarkable root system",
      "vi. Human threats to mangroves",
      "vii. A globally important ecosystem"
    ],
    answer: "v. A remarkable root system",
    explanation:
      "Paragraph C explains the specialised aerial roots and their functions."
  },

  {
    id: 3,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph E",
    options: [
      "i. Life in extreme coastal conditions",
      "ii. Wildlife supported by mangrove forests",
      "iii. Carbon storage beneath the soil",
      "iv. The importance of restoration",
      "v. A remarkable root system",
      "vi. Human threats to mangroves",
      "vii. A globally important ecosystem"
    ],
    answer: "ii. Wildlife supported by mangrove forests",
    explanation:
      "Paragraph E describes the nursery habitat provided for marine animals."
  },

  {
    id: 4,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph G",
    options: [
      "i. Life in extreme coastal conditions",
      "ii. Wildlife supported by mangrove forests",
      "iii. Carbon storage beneath the soil",
      "iv. The importance of restoration",
      "v. A remarkable root system",
      "vi. Human threats to mangroves",
      "vii. A globally important ecosystem"
    ],
    answer: "iii. Carbon storage beneath the soil",
    explanation:
      "Paragraph G discusses blue carbon and long-term carbon storage."
  },

  {
    id: 5,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph H",
    options: [
      "i. Life in extreme coastal conditions",
      "ii. Wildlife supported by mangrove forests",
      "iii. Carbon storage beneath the soil",
      "iv. The importance of restoration",
      "v. A remarkable root system",
      "vi. Human threats to mangroves",
      "vii. A globally important ecosystem"
    ],
    answer: "iv. The importance of restoration",
    explanation:
      "Paragraph H focuses on restoration programmes and conservation."
  },

  // =====================================================
  // Questions 6–9
  // True / False / Not Given
  // =====================================================

  {
    id: 6,
    type: "true-false-not-given",
    skill: "Scanning",
    difficulty: "easy",
    instruction:
      "Do the following statements agree with the information in the passage?",
    question:
      "Mangrove trees can survive in environments with salty water.",
    answer: "True",
    explanation:
      "The passage explains that mangroves are adapted to saline environments."
  },

  {
    id: 7,
    type: "true-false-not-given",
    skill: "Inference",
    difficulty: "medium",
    question:
      "Mangrove forests completely prevent coastal erosion.",
    answer: "False",
    explanation:
      "The passage states they reduce coastal erosion, not eliminate it."
  },

  {
    id: 8,
    type: "true-false-not-given",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Scientists know every ecological relationship within mangrove ecosystems.",
    answer: "False",
    explanation:
      "The passage says scientists continue discovering new ecological relationships."
  },

  {
    id: 9,
    type: "true-false-not-given",
    skill: "Scanning",
    difficulty: "easy",
    question:
      "Climate change is one of the threats facing mangrove forests.",
    answer: "True",
    explanation:
      "The final paragraph identifies climate change as a major threat."
  },

  // =====================================================
  // Questions 10–13
  // Sentence Completion
  // =====================================================

  {
    id: 10,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "easy",
    instruction:
      "Complete the sentences below using NO MORE THAN TWO WORDS from the passage.",
    question:
      "Mangrove roots trap ______ carried by rivers and coastal waters.",
    answer: "sediment",
    explanation:
      "Paragraph C explains that mangrove roots trap sediment."
  },

  {
    id: 11,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "easy",
    question:
      "Young marine animals shelter among the tangled ______.",
    answer: "roots",
    explanation:
      "Paragraph E states that juvenile marine animals shelter among the tangled roots."
  },

  {
    id: 12,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Mangroves remove carbon dioxide through ______.",
    answer: "photosynthesis",
    explanation:
      "Paragraph G explains that mangroves absorb carbon dioxide through photosynthesis."
  },

  {
    id: 13,
    type: "sentence-completion",
    skill: "Inference",
    difficulty: "medium",
    question:
      "Restoration projects require long-term ______.",
    answer: "monitoring",
    explanation:
      "Paragraph H states that long-term monitoring is essential."
  }
];

export default questions1;