const questions3 = [
  // Passage 3: Questions 27–30 (Matching Information - Paragraph Location)
  {
    id: 27,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text is the historical debate between empiricist and rationalist paradigms discussed?",
    options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
    answer: "Paragraph B",
    explanation: "Paragraph B explicitly outlines the historical debate between empiricist measurement and rationalist logic."
  },
  {
    id: 28,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text are non-linear feedback loops and emergent properties explained?",
    options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
    answer: "Paragraph C",
    explanation: "Paragraph C discusses complex system theory, non-linear dynamics, and emergent properties."
  },
  {
    id: 29,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text is the role of supercomputer multi-agent simulations described?",
    options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
    answer: "Paragraph D",
    explanation: "Paragraph D details how supercomputers simulate multi-agent interactions across thousands of iterations."
  },
  {
    id: 30,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text are epistemological hedging language and observer constraints highlighted?",
    options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
    answer: "Paragraph E",
    explanation: "Paragraph E addresses observer bias, contextual constraints, and the necessity of hedging language."
  },

  // Passage 3: Questions 31–34 (Multiple Choice - Deep Inference)
  {
    id: 31,
    type: "multiple-choice",
    skill: "Deep Inference",
    difficulty: "hard",
    question: "Emergent properties in complex systems are defined as phenomena that:",
    options: [
      "A. Can be completely predicted by studying single isolated components",
      "B. Arise from complex interactions and cannot be predicted from individual parts",
      "C. Decay rapidly when exposed to environmental stress",
      "D. Are exclusively observed in artificial computer hardware"
    ],
    answer: "B. Arise from complex interactions and cannot be predicted from individual parts",
    explanation: "Paragraph C defines emergent properties as phenomena arising from interactions that defy reductionist prediction."
  },
  {
    id: 32,
    type: "multiple-choice",
    skill: "Author Stance",
    difficulty: "hard",
    question: "The author suggests that scientific claims should be framed as:",
    options: [
      "A. Immutable universal laws",
      "B. Probabilistic approximations rather than absolute truths",
      "C. Subjective personal opinions",
      "D. Unverifiable theoretical speculation"
    ],
    answer: "B. Probabilistic approximations rather than absolute truths",
    explanation: "Paragraph E states that contemporary scholars frame empirical claims as probabilistic approximations."
  },
  {
    id: 33,
    type: "multiple-choice",
    skill: "Application",
    difficulty: "hard",
    question: "Failure to account for underlying systemic assumptions in policy models can lead to:",
    options: [
      "A. Immediate economic stability",
      "B. Unintended economic or social disruptions",
      "C. Automated resolution of all policy disputes",
      "D. Increased commercial profitability"
    ],
    answer: "B. Unintended economic or social disruptions",
    explanation: "Paragraph F cautions that ignoring underlying assumptions can result in unintended disruptions."
  },
  {
    id: 34,
    type: "multiple-choice",
    skill: "Synthesis",
    difficulty: "hard",
    question: "What serves as the fundamental bedrock of informed global environmental stewardship?",
    options: [
      "A. Informal opinion polls",
      "B. Rigorous peer-reviewed empirical research",
      "C. Unilateral commercial regulations",
      "D. Short-term speculative investments"
    ],
    answer: "B. Rigorous peer-reviewed empirical research",
    explanation: "Paragraph H concludes that rigorous peer-reviewed empirical research serves as the foundation for stewardship."
  },

  // Passage 3: Questions 35–37 (Short Answer Questions)
  {
    id: 35,
    type: "short-answer",
    skill: "Detailed Extraction",
    difficulty: "hard",
    question: "What nineteenth-century philosophical approach relied exclusively on direct sensory observation?",
    options: ["empiricist", "rationalist", "quantum", "holistic"],
    answer: "empiricist",
    explanation: "Paragraph B confirms that empiricist frameworks maintained valid knowledge derives from sensory observation."
  },
  {
    id: 36,
    type: "short-answer",
    skill: "Detailed Extraction",
    difficulty: "hard",
    question: "Which computational tool enables scientists to observe emergent multi-agent patterns?",
    options: ["supercomputers", "microscopes", "barometers", "spectrometers"],
    answer: "supercomputers",
    explanation: "Paragraph D states that supercomputers enable researchers to observe emergent patterns."
  },
  {
    id: 37,
    type: "short-answer",
    skill: "Detailed Extraction",
    difficulty: "hard",
    question: "What linguistic device do scholars use to express epistemological modesty?",
    options: ["hedging language", "nominalisation", "passive voice", "metaphor"],
    answer: "hedging language",
    explanation: "Paragraph E highlights that scholars routinely employ hedging language to express epistemological modesty."
  },

  // Passage 3: Questions 38–40 (Table & Diagram Completion)
  {
    id: 38,
    type: "table-completion",
    skill: "Structural Analysis",
    difficulty: "hard",
    question: "Complete the table: Methodology synthesis combines computational models with ________ analysis.",
    options: ["qualitative contextual", "manual mathematical", "unverified financial", "commercial marketing"],
    answer: "qualitative contextual",
    explanation: "Paragraph D notes the combination of computational simulations alongside qualitative contextual analysis."
  },
  {
    id: 39,
    type: "table-completion",
    skill: "Structural Analysis",
    difficulty: "hard",
    question: "Complete the table: Policy formulation requires continuous guidance from ________ panels.",
    options: ["specialized advisory", "unregulated commercial", "local media", "political campaign"],
    answer: "specialized advisory",
    explanation: "Paragraph F highlights that policy formulation must be informed by specialized advisory panels."
  },
  {
    id: 40,
    type: "diagram-label-completion",
    skill: "System Synthesis",
    difficulty: "hard",
    question: "Complete the diagram label: Comprehensive scientific discovery relies on empirical rigor and ________ dialogue.",
    options: ["interdisciplinary", "isolated", "secretive", "competitive"],
    answer: "interdisciplinary",
    explanation: "Paragraph H stresses that progress depends on interdisciplinary discourse and open dialogue."
  }
];

export default questions3;