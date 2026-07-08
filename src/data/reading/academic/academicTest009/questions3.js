const questions3 = [
  {
    id: 27,
    type: "matching_features",
    question: "Match each application with the correct area of personalised medicine.",
    options: [
      "A. Genetic Sequencing",
      "B. Cancer Treatment",
      "C. Artificial Intelligence",
      "D. Wearable Technology"
    ],
    statements: [
      "Continuously monitors heart rate and sleep.",
      "Analyses large medical datasets to support diagnosis.",
      "Identifies DNA variations affecting treatment response.",
      "Targets specific genetic mutations in tumours."
    ],
    answer: ["D", "C", "A", "B"],
    explanation: "Each statement corresponds to the relevant application described in the passage.",
    difficulty: "Medium",
    skill: "Matching Features"
  },

  {
    id: 28,
    type: "matching_features",
    question: "Which area focuses on identifying DNA variations?",
    options: [
      "A. Genetic Sequencing",
      "B. Cancer Treatment",
      "C. Artificial Intelligence",
      "D. Wearable Technology"
    ],
    answer: "A",
    explanation: "Genetic sequencing identifies DNA variations associated with disease.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 29,
    type: "matching_features",
    question: "Which area involves analysing tumour mutations?",
    options: [
      "A. Genetic Sequencing",
      "B. Cancer Treatment",
      "C. Artificial Intelligence",
      "D. Wearable Technology"
    ],
    answer: "B",
    explanation: "Targeted cancer therapy is based on tumour mutations.",
    difficulty: "Easy",
    skill: "Detail"
  },

  {
    id: 30,
    type: "matching_features",
    question: "Which area analyses millions of previous medical cases?",
    options: [
      "A. Genetic Sequencing",
      "B. Cancer Treatment",
      "C. Artificial Intelligence",
      "D. Wearable Technology"
    ],
    answer: "C",
    explanation: "Machine learning systems analyse enormous healthcare datasets.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 31,
    type: "matching_features",
    question: "Which area continuously records physiological measurements?",
    options: [
      "A. Genetic Sequencing",
      "B. Cancer Treatment",
      "C. Artificial Intelligence",
      "D. Wearable Technology"
    ],
    answer: "D",
    explanation: "Wearable devices continuously monitor health indicators.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 32,
    type: "summary_completion",
    question: "Complete the summary using NO MORE THAN TWO WORDS.\n\nPersonalised medicine considers each patient's unique ________ characteristics.",
    answer: "genetic",
    explanation: "Genetic characteristics are fundamental to personalised medicine.",
    difficulty: "Easy",
    skill: "Summary Completion"
  },

  {
    id: 33,
    type: "summary_completion",
    question: "Doctors increasingly analyse genetic ________ within tumours.",
    answer: "mutations",
    explanation: "Targeted cancer therapy depends on identifying mutations.",
    difficulty: "Medium",
    skill: "Vocabulary"
  },

  {
    id: 34,
    type: "summary_completion",
    question: "Patient privacy is especially important because genetic information is highly ________.",
    answer: "sensitive",
    explanation: "The passage highlights the sensitivity of genetic data.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 35,
    type: "summary_completion",
    question: "Future healthcare will combine genetics, AI and clinical ________.",
    answer: "expertise",
    explanation: "Clinical expertise remains an essential part of personalised medicine.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 36,
    type: "multiple_choice",
    question: "What is the main purpose of the passage?",
    options: [
      "To explain the principles, benefits and challenges of personalised medicine.",
      "To compare hospitals worldwide.",
      "To describe the history of surgery.",
      "To explain infectious diseases."
    ],
    answer: "To explain the principles, benefits and challenges of personalised medicine.",
    explanation: "The passage introduces personalised medicine and discusses its applications and limitations.",
    difficulty: "Medium",
    skill: "Main Idea"
  },

  {
    id: 37,
    type: "multiple_choice",
    question: "Why has personalised medicine become more practical in recent years?",
    options: [
      "Hospitals have become larger.",
      "Genetic sequencing has become faster and less expensive.",
      "Doctors treat fewer diseases.",
      "People visit hospitals less frequently."
    ],
    answer: "Genetic sequencing has become faster and less expensive.",
    explanation: "The falling cost of DNA sequencing has accelerated personalised medicine.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 38,
    type: "multiple_choice",
    question: "How does artificial intelligence support healthcare?",
    options: [
      "By replacing doctors.",
      "By analysing complex medical information.",
      "By manufacturing medicines.",
      "By eliminating disease."
    ],
    answer: "By analysing complex medical information.",
    explanation: "AI recognises patterns within large healthcare datasets.",
    difficulty: "Hard",
    skill: "Inference"
  },

  {
    id: 39,
    type: "multiple_choice",
    question: "Which issue presents a major ethical challenge?",
    options: [
      "Airport security",
      "Patient privacy",
      "Road congestion",
      "Climate change"
    ],
    answer: "Patient privacy",
    explanation: "Protecting sensitive genetic information is a key concern.",
    difficulty: "Hard",
    skill: "Detail"
  },

  {
    id: 40,
    type: "multiple_choice",
    question: "Which statement best reflects the author's conclusion?",
    options: [
      "Traditional medicine will disappear completely.",
      "Personalised medicine will become part of routine healthcare.",
      "Only genetics will determine future treatments.",
      "Artificial intelligence will replace clinicians."
    ],
    answer: "Personalised medicine will become part of routine healthcare.",
    explanation: "The author concludes that personalised medicine will complement existing clinical practice.",
    difficulty: "Hard",
    skill: "Author's Opinion"
  }
];

export default questions3;