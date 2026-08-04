const questions2 = [
  // Passage 2: Questions 14–17 (Yes / No / Not Given)
  {
    id: 14,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "medium",
    question: "The author agrees that psychological and technological variables significantly influence operational outcomes.",
    options: ["Yes", "No", "Not Given"],
    answer: "Yes",
    explanation: "Paragraph A agrees that cognitive load, technological accessibility, and structural incentives modulate outcomes."
  },
  {
    id: 15,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "medium",
    question: "Continuous streams of information enhance human attentional reserve indefinitely.",
    options: ["Yes", "No", "Not Given"],
    answer: "No",
    explanation: "Paragraph B explicitly states that continuous streams of information deplete attentional capacity rapidly."
  },
  {
    id: 16,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "medium",
    question: "Rigid technological implementations always succeed across all corporate environments.",
    options: ["Yes", "No", "Not Given"],
    answer: "No",
    explanation: "Paragraph C cautions that rigid implementations frequently induce counterproductive work behaviors."
  },
  {
    id: 17,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "hard",
    question: "International software developers earn higher salaries in urban tech hubs.",
    options: ["Yes", "No", "Not Given"],
    answer: "Not Given",
    explanation: "The passage discusses urban technological adoption, but does not mention software developer salaries."
  },

  // Passage 2: Questions 18–22 (Summary Completion)
  {
    id: 18,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "medium",
    question: "Cognitive ergonomy focuses on optimizing user interface architectures to preserve cognitive ________.",
    options: ["reserve", "decay", "friction", "cost"],
    answer: "reserve",
    explanation: "Paragraph B states that cognitive reserve can be preserved by optimizing user interface architectures."
  },
  {
    id: 19,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "medium",
    question: "Subtle behavioral cues on digital platforms can increase commercial ________.",
    options: ["conversions", "penalties", "distractions", "conflicts"],
    answer: "conversions",
    explanation: "Paragraph D mentions that behavioral cues drive engagement and increase commercial conversions."
  },
  {
    id: 20,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "hard",
    question: "Cross-cultural research indicates that user engagement varies based on demographic structures and technological ________.",
    options: ["literacy", "geography", "hardware", "regulations"],
    answer: "literacy",
    explanation: "Paragraph E highlights that engagement patterns depend on cultural values and technological literacy levels."
  },
  {
    id: 21,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "hard",
    question: "Ethicists argue that automated analytical systems must be governed by transparent ________ frameworks.",
    options: ["regulatory", "financial", "informal", "unrestricted"],
    answer: "regulatory",
    explanation: "Paragraph F states that technological advancement must be bounded by transparent regulatory frameworks."
  },
  {
    id: 22,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "hard",
    question: "Interdisciplinary collaboration between psychologists and data scientists is essential to optimize human ________.",
    options: ["well-being", "automation", "isolation", "fatigue"],
    answer: "well-being",
    explanation: "Paragraph G concludes that interdisciplinary research optimizes the balance between efficiency and human well-being."
  },

  // Passage 2: Questions 23–26 (Matching Features & Sentence Endings)
  {
    id: 23,
    type: "matching-features",
    skill: "Categorization",
    difficulty: "medium",
    question: "Matches the research focus of laboratory trials:",
    options: [
      "A. Eye movements and neurological activation",
      "B. Centralized corporate tax audits",
      "C. Manual paper archiving methods",
      "D. Unregulated advertising practices"
    ],
    answer: "A. Eye movements and neurological activation",
    explanation: "Paragraph C outlines how laboratory trials track eye movements and neurological activation patterns."
  },
  {
    id: 24,
    type: "matching-features",
    skill: "Categorization",
    difficulty: "medium",
    question: "Matches the outcome of evidence-based organizational workflows:",
    options: [
      "A. Elevated employee error rates",
      "B. Improved employee retention and consumer satisfaction",
      "C. Complete elimination of digital systems",
      "D. Decreased operational transparency"
    ],
    answer: "B. Improved employee retention and consumer satisfaction",
    explanation: "Paragraph C confirms improvements in employee retention and consumer satisfaction metrics."
  },
  {
    id: 25,
    type: "matching-sentence-endings",
    skill: "Syntactical Alignment",
    difficulty: "hard",
    question: "Simplifying visual hierarchies in digital platforms tends to:",
    options: [
      "A. reduce user error and choice paralysis",
      "B. increase administrative overhead",
      "C. violate international copyright law",
      "D. restrict consumer access permanently"
    ],
    answer: "A. reduce user error and choice paralysis",
    explanation: "Paragraph B explains that simplifying visual hierarchies reduces user error and enhances choice satisfaction."
  },
  {
    id: 26,
    type: "matching-sentence-endings",
    skill: "Syntactical Alignment",
    difficulty: "hard",
    question: "Interventions successful in industrialized urban centers:",
    options: [
      "A. require adaptation before achieving efficacy in emerging markets",
      "B. apply identically without any modification",
      "C. are banned by international regulatory bodies",
      "D. cause immediate bankruptcy in commercial firms"
    ],
    answer: "A. require adaptation before achieving efficacy in emerging markets",
    explanation: "Paragraph E confirms that urban interventions require extensive adaptation in emerging market environments."
  }
];

export default questions2;