const questions3 = [
  // =====================================================
  // Questions 27–31
  // Matching Features
  // =====================================================

  {
    id: 27,
    type: "matching-features",
    skill: "Scanning",
    difficulty: "hard",
    instruction:
      "Match each statement with the correct group.",
    question:
      "Introduced the idea of learning from large datasets.",
    options: [
      "A. Early Programming",
      "B. Machine Learning",
      "C. Deep Learning",
      "D. Generative AI"
    ],
    answer:
      "B. Machine Learning",
    explanation:
      "Machine learning enabled computers to learn patterns instead of fixed rules."
  },

  {
    id: 28,
    type: "matching-features",
    skill: "Scanning",
    difficulty: "hard",
    question:
      "Produces entirely new text or images.",
    options: [
      "A. Early Programming",
      "B. Machine Learning",
      "C. Deep Learning",
      "D. Generative AI"
    ],
    answer:
      "D. Generative AI",
    explanation:
      "Generative AI creates new content."
  },

  {
    id: 29,
    type: "matching-features",
    skill: "Scanning",
    difficulty: "hard",
    question:
      "Uses billions of adjustable parameters.",
    options: [
      "A. Early Programming",
      "B. Machine Learning",
      "C. Deep Learning",
      "D. Generative AI"
    ],
    answer:
      "C. Deep Learning",
    explanation:
      "Deep neural networks contain millions or billions of parameters."
  },

  {
    id: 30,
    type: "matching-features",
    skill: "Inference",
    difficulty: "hard",
    question:
      "Relied completely on human-written instructions.",
    options: [
      "A. Early Programming",
      "B. Machine Learning",
      "C. Deep Learning",
      "D. Generative AI"
    ],
    answer:
      "A. Early Programming",
    explanation:
      "Early programs followed explicit instructions."
  },

  {
    id: 31,
    type: "matching-features",
    skill: "Inference",
    difficulty: "hard",
    question:
      "Predicts sequences based on statistical probability.",
    options: [
      "A. Early Programming",
      "B. Machine Learning",
      "C. Deep Learning",
      "D. Generative AI"
    ],
    answer:
      "D. Generative AI",
    explanation:
      "Generative models predict probable outputs."
  },

  // =====================================================
  // Questions 32–35
  // Classification
  // =====================================================

  {
    id: 32,
    type: "classification",
    skill: "Inference",
    difficulty: "hard",
    instruction:
      "Classify each statement.",
    question:
      "Requires ethical judgement.",
    options: [
      "Human",
      "Artificial Intelligence",
      "Both"
    ],
    answer:
      "Human",
    explanation:
      "The passage states ethical judgement remains a human strength."
  },

  {
    id: 33,
    type: "classification",
    skill: "Inference",
    difficulty: "hard",
    question:
      "Processes huge amounts of information rapidly.",
    options: [
      "Human",
      "Artificial Intelligence",
      "Both"
    ],
    answer:
      "Artificial Intelligence",
    explanation:
      "AI excels at large-scale processing."
  },

  {
    id: 34,
    type: "classification",
    skill: "Inference",
    difficulty: "hard",
    question:
      "Can contribute to future innovation.",
    options: [
      "Human",
      "Artificial Intelligence",
      "Both"
    ],
    answer:
      "Both",
    explanation:
      "The passage concludes collaboration is most effective."
  },

  {
    id: 35,
    type: "classification",
    skill: "Scanning",
    difficulty: "hard",
    question:
      "Can unintentionally reproduce historical bias.",
    options: [
      "Human",
      "Artificial Intelligence",
      "Both"
    ],
    answer:
      "Artificial Intelligence",
    explanation:
      "Bias results from training data."
  },

  // =====================================================
  // Questions 36–38
  // Short Answer
  // =====================================================

  {
    id: 36,
    type: "short-answer",
    skill: "Scanning",
    difficulty: "medium",
    instruction:
      "Answer using NO MORE THAN TWO WORDS.",
    question:
      "What type of networks accelerated AI progress?",
    answer:
      "deep neural",
    explanation:
      "The passage refers to deep neural networks."
  },

  {
    id: 37,
    type: "short-answer",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "What do governments develop for emerging technologies?",
    answer:
      "legal frameworks",
    explanation:
      "Mentioned in the final paragraph."
  },

  {
    id: 38,
    type: "short-answer",
    skill: "Scanning",
    difficulty: "medium",
    question:
      "Which profession uses AI to analyse scripts?",
    answer:
      "film producers",
    explanation:
      "The passage explicitly mentions film producers."
  },

  // =====================================================
  // Questions 39–40
  // Diagram Label
  // =====================================================

  {
    id: 39,
    type: "diagram-label",
    skill: "Scanning",
    difficulty: "hard",
    instruction:
      "Label the AI learning process.",
    question:
      "Models improve by reducing ____.",
    answer:
      "errors",
    explanation:
      "Training reduces prediction errors."
  },

  {
    id: 40,
    type: "diagram-label",
    skill: "Inference",
    difficulty: "hard",
    question:
      "Training begins with large amounts of ____.",
    answer:
      "data",
    explanation:
      "Machine learning requires large datasets."
  }
];

export default questions3;