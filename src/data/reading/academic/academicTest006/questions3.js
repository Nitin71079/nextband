const questions3 = [
  {
    id: 27,
    type: "matching_features",
    question: "Match each application with the correct field.",
    options: [
      "A. Medicine",
      "B. Agriculture",
      "C. Ethics",
      "D. Regulation"
    ],
    statements: [
      "Treating inherited diseases.",
      "Developing drought-resistant crops.",
      "Concerns about editing reproductive cells.",
      "Different national approaches to gene editing."
    ],
    answer: ["A", "B", "C", "D"],
    explanation: "Each statement matches the relevant section of the passage.",
    difficulty: "Medium",
    skill: "Matching Features"
  },

  {
    id: 28,
    type: "matching_features",
    question: "Which field discusses improving crop nutrition?",
    options: [
      "A. Medicine",
      "B. Agriculture",
      "C. Ethics",
      "D. Regulation"
    ],
    answer: "B",
    explanation: "Agricultural applications include improving nutritional value.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 29,
    type: "matching_features",
    question: "Which field is associated with sickle cell disease treatment?",
    options: [
      "A. Medicine",
      "B. Agriculture",
      "C. Ethics",
      "D. Regulation"
    ],
    answer: "A",
    explanation: "Sickle cell disease is discussed in the medical section.",
    difficulty: "Easy",
    skill: "Detail"
  },

  {
    id: 30,
    type: "matching_features",
    question: "Which field focuses on inherited genetic changes?",
    options: [
      "A. Medicine",
      "B. Agriculture",
      "C. Ethics",
      "D. Regulation"
    ],
    answer: "C",
    explanation: "Ethical concerns involve reproductive cell editing.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 31,
    type: "matching_features",
    question: "Which field discusses government policies?",
    options: [
      "A. Medicine",
      "B. Agriculture",
      "C. Ethics",
      "D. Regulation"
    ],
    answer: "D",
    explanation: "Government regulation is covered in Paragraph 7.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 32,
    type: "summary_completion",
    question: "Complete the summary using NO MORE THAN TWO WORDS.\n\nCRISPR was originally discovered as part of a bacterial ________ system.",
    answer: "defence",
    explanation: "The passage describes CRISPR as part of a bacterial defence system.",
    difficulty: "Easy",
    skill: "Summary Completion"
  },

  {
    id: 33,
    type: "summary_completion",
    question: "Gene editing attempts to correct the underlying genetic ________.",
    answer: "mutation",
    explanation: "The medical section explains this.",
    difficulty: "Medium",
    skill: "Vocabulary"
  },

  {
    id: 34,
    type: "summary_completion",
    question: "Unintended genetic changes are known as ________ effects.",
    answer: "off-target",
    explanation: "Off-target effects are a major technical limitation.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 35,
    type: "summary_completion",
    question: "Scientists support responsible ________ alongside technological progress.",
    answer: "regulation",
    explanation: "The conclusion emphasizes responsible regulation.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 36,
    type: "multiple_choice",
    question: "What is the main purpose of the passage?",
    options: [
      "To explain gene editing, its applications, and challenges.",
      "To discourage all genetic research.",
      "To compare different vaccines.",
      "To describe human evolution."
    ],
    answer: "To explain gene editing, its applications, and challenges.",
    explanation: "The passage provides an overview of CRISPR, benefits, risks and future prospects.",
    difficulty: "Medium",
    skill: "Main Idea"
  },

  {
    id: 37,
    type: "multiple_choice",
    question: "Why has CRISPR become widely used?",
    options: [
      "It is faster, cheaper and more accurate than previous methods.",
      "It completely eliminates genetic diseases.",
      "It requires no laboratory equipment.",
      "It can only be used in agriculture."
    ],
    answer: "It is faster, cheaper and more accurate than previous methods.",
    explanation: "The passage directly compares CRISPR with earlier technologies.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 38,
    type: "multiple_choice",
    question: "Why do scientists remain cautious about gene editing?",
    options: [
      "DNA cannot be modified.",
      "CRISPR is illegal worldwide.",
      "Unexpected genetic changes may occur.",
      "The technology is no longer developing."
    ],
    answer: "Unexpected genetic changes may occur.",
    explanation: "Off-target effects remain a technical concern.",
    difficulty: "Hard",
    skill: "Inference"
  },

  {
    id: 39,
    type: "multiple_choice",
    question: "Which application is presented as less ethically controversial?",
    options: [
      "Editing reproductive cells.",
      "Editing body cells to treat disease.",
      "Designing babies.",
      "Changing inherited traits."
    ],
    answer: "Editing body cells to treat disease.",
    explanation: "The passage distinguishes somatic editing from germline editing.",
    difficulty: "Hard",
    skill: "Inference"
  },

  {
    id: 40,
    type: "multiple_choice",
    question: "Which statement best represents the author's conclusion?",
    options: [
      "Gene editing should replace all medical treatments.",
      "Gene editing should be abandoned.",
      "Gene editing offers enormous potential but requires responsible regulation.",
      "Only agriculture will benefit from gene editing."
    ],
    answer: "Gene editing offers enormous potential but requires responsible regulation.",
    explanation: "The conclusion balances scientific progress with ethical responsibility.",
    difficulty: "Hard",
    skill: "Author's Opinion"
  }
];

export default questions3;