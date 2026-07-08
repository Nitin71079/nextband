const questions3 = [
  {
    id: 27,
    type: "matching_features",
    question: "Which field of science is associated with each statement below?",
    options: [
      "A. Medicine",
      "B. Astronomy",
      "C. Climate Science",
      "D. Laboratory Research"
    ],
    statements: [
      "AI helps identify unusual celestial objects.",
      "AI accelerates the discovery of new medicines.",
      "AI assists governments in preparing for extreme weather.",
      "AI-controlled robots automatically perform experiments."
    ],
    answer: ["B", "A", "C", "D"],
    explanation: "Each statement directly matches the relevant scientific field described in the passage.",
    difficulty: "Medium",
    skill: "Matching Features"
  },

  {
    id: 28,
    type: "matching_features",
    question: "Which scientific field generates enormous amounts of observational data?",
    options: [
      "A. Medicine",
      "B. Astronomy",
      "C. Climate Science",
      "D. Laboratory Research"
    ],
    answer: "B",
    explanation: "Modern telescopes produce massive datasets.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 29,
    type: "matching_features",
    question: "Which field benefits from analysing biological datasets?",
    options: [
      "A. Medicine",
      "B. Astronomy",
      "C. Climate Science",
      "D. Laboratory Research"
    ],
    answer: "A",
    explanation: "Drug discovery relies on biological data.",
    difficulty: "Easy",
    skill: "Detail"
  },

  {
    id: 30,
    type: "matching_features",
    question: "Which field depends on satellite and ocean sensor data?",
    options: [
      "A. Medicine",
      "B. Astronomy",
      "C. Climate Science",
      "D. Laboratory Research"
    ],
    answer: "C",
    explanation: "Climate models use satellite and ocean observations.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 31,
    type: "matching_features",
    question: "Which field uses intelligent robots to perform repeated experiments?",
    options: [
      "A. Medicine",
      "B. Astronomy",
      "C. Climate Science",
      "D. Laboratory Research"
    ],
    answer: "D",
    explanation: "Laboratory automation is discussed in Paragraph 5.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 32,
    type: "summary_completion",
    question: "Complete the summary below using NO MORE THAN TWO WORDS.\n\nAI systems depend heavily on the quality of ________ used during training.",
    answer: "training data",
    explanation: "The passage explains AI is only as reliable as its training data.",
    difficulty: "Medium",
    skill: "Summary Completion"
  },

  {
    id: 33,
    type: "summary_completion",
    question: "Scientists stress the importance of independent ________ of AI-generated results.",
    answer: "verification",
    explanation: "Verification is necessary to ensure reliability.",
    difficulty: "Medium",
    skill: "Vocabulary"
  },

  {
    id: 34,
    type: "summary_completion",
    question: "Some experts believe AI should support rather than replace human ________.",
    answer: "judgement",
    explanation: "Human judgement remains essential.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 35,
    type: "summary_completion",
    question: "Researchers hope AI and humans will work through future ________.",
    answer: "collaboration",
    explanation: "The final paragraph emphasizes collaboration.",
    difficulty: "Easy",
    skill: "Vocabulary"
  },

  {
    id: 36,
    type: "multiple_choice",
    question: "What is the main purpose of the passage?",
    options: [
      "To argue that AI should replace scientists.",
      "To explain how AI is transforming scientific research.",
      "To compare AI with traditional computers.",
      "To criticize technological development."
    ],
    answer: "To explain how AI is transforming scientific research.",
    explanation: "The passage discusses AI applications, benefits, and limitations.",
    difficulty: "Medium",
    skill: "Main Idea"
  },

  {
    id: 37,
    type: "multiple_choice",
    question: "According to the passage, AI shortens drug development mainly by:",
    options: [
      "Manufacturing medicines automatically.",
      "Predicting promising chemical compounds.",
      "Replacing clinical trials.",
      "Reducing hospital costs."
    ],
    answer: "Predicting promising chemical compounds.",
    explanation: "Machine learning identifies promising molecules early.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 38,
    type: "multiple_choice",
    question: "Why are biased datasets considered dangerous?",
    options: [
      "They slow computers.",
      "They increase electricity use.",
      "They may produce unreliable conclusions.",
      "They reduce internet speed."
    ],
    answer: "They may produce unreliable conclusions.",
    explanation: "Poor-quality data leads to inaccurate AI outputs.",
    difficulty: "Hard",
    skill: "Inference"
  },

  {
    id: 39,
    type: "multiple_choice",
    question: "Which quality is described as remaining uniquely human?",
    options: [
      "Fast calculation",
      "Pattern recognition",
      "Ethical decision-making",
      "Data storage"
    ],
    answer: "Ethical decision-making",
    explanation: "The passage highlights ethics, creativity, and critical thinking as human strengths.",
    difficulty: "Hard",
    skill: "Inference"
  },

  {
    id: 40,
    type: "multiple_choice",
    question: "Which statement best reflects the author's conclusion?",
    options: [
      "AI will completely replace scientists.",
      "Scientific progress should stop until AI improves.",
      "Humans and AI will achieve the best results by working together.",
      "Only AI can solve future scientific problems."
    ],
    answer: "Humans and AI will achieve the best results by working together.",
    explanation: "The final paragraph concludes that collaboration between humans and AI is the ideal approach.",
    difficulty: "Hard",
    skill: "Author's Opinion"
  }
];

export default questions3;