const questions3 = [
  {
    id: 27,
    type: "matching_features",
    question: "Match each application with the correct field.",
    options: [
      "A. Cryptography",
      "B. Pharmaceutical Research",
      "C. Hardware Engineering",
      "D. Scientific Computing"
    ],
    statements: [
      "Developing new medicines more efficiently.",
      "Creating stable qubit systems.",
      "Breaking existing encryption methods.",
      "Solving specialised computational problems."
    ],
    answer: ["B", "C", "A", "D"],
    explanation: "Each statement corresponds directly to the field discussed in the passage.",
    difficulty: "Medium",
    skill: "Matching Features"
  },

  {
    id: 28,
    type: "matching_features",
    question: "Which field is associated with quantum-resistant encryption?",
    options: [
      "A. Cryptography",
      "B. Pharmaceutical Research",
      "C. Hardware Engineering",
      "D. Scientific Computing"
    ],
    answer: "A",
    explanation: "Quantum-resistant encryption belongs to cryptography.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 29,
    type: "matching_features",
    question: "Which field benefits from molecular simulation?",
    options: [
      "A. Cryptography",
      "B. Pharmaceutical Research",
      "C. Hardware Engineering",
      "D. Scientific Computing"
    ],
    answer: "B",
    explanation: "Quantum computers can simulate molecules for drug discovery.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 30,
    type: "matching_features",
    question: "Which field focuses on improving qubit stability?",
    options: [
      "A. Cryptography",
      "B. Pharmaceutical Research",
      "C. Hardware Engineering",
      "D. Scientific Computing"
    ],
    answer: "C",
    explanation: "Engineers are developing more stable hardware designs.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 31,
    type: "matching_features",
    question: "Which field involves solving highly specialised computational problems?",
    options: [
      "A. Cryptography",
      "B. Pharmaceutical Research",
      "C. Hardware Engineering",
      "D. Scientific Computing"
    ],
    answer: "D",
    explanation: "Quantum computers are expected to complement classical computers in scientific computing.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 32,
    type: "summary_completion",
    question: "Complete the summary using NO MORE THAN TWO WORDS.\n\nQuantum computers use ________ instead of classical bits.",
    answer: "qubits",
    explanation: "Qubits are the basic units of quantum computing.",
    difficulty: "Easy",
    skill: "Summary Completion"
  },

  {
    id: 33,
    type: "summary_completion",
    question: "Qubits can exist in multiple states through ________.",
    answer: "superposition",
    explanation: "Superposition allows simultaneous states.",
    difficulty: "Medium",
    skill: "Vocabulary"
  },

  {
    id: 34,
    type: "summary_completion",
    question: "Researchers are improving ________ techniques to reduce computational errors.",
    answer: "error-correction",
    explanation: "The passage discusses sophisticated error-correction methods.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 35,
    type: "summary_completion",
    question: "Experts believe quantum computers will ________ classical computers.",
    answer: "complement",
    explanation: "The final paragraph says they will complement rather than replace them.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 36,
    type: "multiple_choice",
    question: "What is the main purpose of the passage?",
    options: [
      "To explain quantum computing and its potential applications.",
      "To prove classical computers are obsolete.",
      "To compare smartphones with supercomputers.",
      "To describe internet security."
    ],
    answer: "To explain quantum computing and its potential applications.",
    explanation: "The passage introduces quantum computing, its uses, challenges, and future.",
    difficulty: "Medium",
    skill: "Main Idea"
  },

  {
    id: 37,
    type: "multiple_choice",
    question: "Why are qubits more powerful than classical bits?",
    options: [
      "They are physically larger.",
      "They can exist in multiple states simultaneously.",
      "They consume no electricity.",
      "They never produce errors."
    ],
    answer: "They can exist in multiple states simultaneously.",
    explanation: "Superposition enables parallel computation.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 38,
    type: "multiple_choice",
    question: "What is currently one of the biggest challenges facing quantum computing?",
    options: [
      "Lack of electricity.",
      "Expensive keyboards.",
      "Qubits are highly sensitive to environmental disturbances.",
      "Slow internet connections."
    ],
    answer: "Qubits are highly sensitive to environmental disturbances.",
    explanation: "Heat, vibration and radiation introduce errors.",
    difficulty: "Hard",
    skill: "Scanning"
  },

  {
    id: 39,
    type: "multiple_choice",
    question: "Why are governments investing heavily in quantum research?",
    options: [
      "To replace every personal computer.",
      "Because the technology may transform computing.",
      "To eliminate the internet.",
      "To reduce smartphone prices."
    ],
    answer: "Because the technology may transform computing.",
    explanation: "The passage states governments believe quantum computing could reshape computing.",
    difficulty: "Hard",
    skill: "Inference"
  },

  {
    id: 40,
    type: "multiple_choice",
    question: "According to the author, what is the future role of quantum computers?",
    options: [
      "Replace all classical computers.",
      "Only be used by governments.",
      "Complement classical computers for specialised tasks.",
      "Replace artificial intelligence."
    ],
    answer: "Complement classical computers for specialised tasks.",
    explanation: "The conclusion states quantum computers will complement existing systems.",
    difficulty: "Hard",
    skill: "Author's Opinion"
  }
];

export default questions3;