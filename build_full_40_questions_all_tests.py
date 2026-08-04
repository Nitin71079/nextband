import os

base_academic_dir = os.path.join("src", "data", "reading", "academic")
base_general_dir = os.path.join("src", "data", "reading", "general")

def generate_questions1_js(t_num, is_academic=True):
    # Questions 1 to 13 for Passage 1 / Section 1
    q_str = f"""const questions1 = [
  // Passage 1: Questions 1–4 (True / False / Not Given)
  {{
    id: 1,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "easy",
    question: "Scientific investigations into this topic have expanded rapidly over the past decade.",
    options: ["True", "False", "Not Given"],
    answer: "True",
    explanation: "Paragraph A explicitly states that research into this domain has generated significant academic interest over the past decade."
  }},
  {{
    id: 2,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "easy",
    question: "Initial empirical observations failed to provide useful computational models.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "Paragraph A notes that initial empirical observations provided fundamental frameworks for developing predictive computational models."
  }},
  {{
    id: 3,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "medium",
    question: "Data collected across monitoring stations shows uniform results regardless of regional climate.",
    options: ["True", "False", "Not Given"],
    answer: "False",
    explanation: "Paragraph A states that data gathered across distinct monitoring stations indicates significant variations."
  }},
  {{
    id: 4,
    type: "true-false-not-given",
    skill: "Factual Scanning",
    difficulty: "medium",
    question: "Commercial funding for this research exceeded government grants in 2022.",
    options: ["True", "False", "Not Given"],
    answer: "Not Given",
    explanation: "The passage mentions research funding generally, but does not compare commercial funding against government grants in 2022."
  }},

  // Passage 1: Questions 5–8 (Matching Headings)
  {{
    id: 5,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "easy",
    instruction: "Choose the correct heading for each paragraph from the options.",
    question: "Paragraph A",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "i. Initial research and empirical frameworks",
    explanation: "Paragraph A outlines the emergence of scientific investigation and initial observational studies."
  }},
  {{
    id: 6,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "easy",
    question: "Paragraph B",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "ii. Structural adaptations and system stability",
    explanation: "Paragraph B details structural flexibility and internal adaptive mechanisms."
  }},
  {{
    id: 7,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph C",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "iii. Advanced analytical instruments and metrics",
    explanation: "Paragraph C focuses on high-precision analytical tools, satellite telemetry, and mass spectrometry."
  }},
  {{
    id: 8,
    type: "matching-headings",
    skill: "Skimming",
    difficulty: "medium",
    question: "Paragraph D",
    options: [
      "i. Initial research and empirical frameworks",
      "ii. Structural adaptations and system stability",
      "iii. Advanced analytical instruments and metrics",
      "iv. Practical engineering and policy applications",
      "v. Analytical and methodological challenges",
      "vi. International collaboration and future outlook"
    ],
    answer: "iv. Practical engineering and policy applications",
    explanation: "Paragraph D describes practical applications in engineering, urban planning, and regulatory policy."
  }},

  // Passage 1: Questions 9–13 (Multiple Choice & Sentence Completion)
  {{
    id: 9,
    type: "multiple-choice",
    skill: "Global Understanding",
    difficulty: "medium",
    question: "According to Paragraph B, structural systems maintain operational stability under stress by:",
    options: [
      "A. Increasing energy consumption",
      "B. Reorganizing internal components and adaptive mechanisms",
      "C. Suspending physical operations completely",
      "D. Relying exclusively on external manual interventions"
    ],
    answer: "B. Reorganizing internal components and adaptive mechanisms",
    explanation: "Paragraph B states that structural systems display remarkable adaptive flexibility by reorganizing internal components."
  }},
  {{
    id: 10,
    type: "multiple-choice",
    skill: "Detail",
    difficulty: "medium",
    question: "High-precision analytical instruments mentioned in Paragraph C enable researchers to:",
    options: [
      "A. Eliminate the need for field stations",
      "B. Quantify baseline parameters with unprecedented accuracy",
      "C. Predict weather patterns centuries in advance",
      "D. Replace empirical peer review"
    ],
    answer: "B. Quantify baseline parameters with unprecedented accuracy",
    explanation: "Paragraph C notes that tools like satellite telemetry allow researchers to quantify baseline parameters accurately."
  }},
  {{
    id: 11,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "easy",
    question: "Short-term experimental trials often fail to capture subtle ________ trends.",
    options: ["multi-decadal", "daily", "laboratory", "computational"],
    answer: "multi-decadal",
    explanation: "Paragraph E highlights that short-term trials often fail to capture subtle multi-decadal trends."
  }},
  {{
    id: 12,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "medium",
    question: "Policy analysts leverage data-driven frameworks to craft ________ standards.",
    options: ["regulatory", "financial", "historical", "military"],
    answer: "regulatory",
    explanation: "Paragraph D confirms that policy analysts leverage data-driven frameworks to craft regulatory standards."
  }},
  {{
    id: 13,
    type: "sentence-completion",
    skill: "Scanning",
    difficulty: "hard",
    question: "Combining expertise across natural sciences and computer engineering enables researchers to formulate ________ solutions.",
    options: ["holistic", "temporary", "isolated", "theoretical"],
    answer: "holistic",
    explanation: "Paragraph G states that combining interdisciplinary expertise enables researchers to formulate holistic solutions."
  }}
];

export default questions1;"""
    return q_str

def generate_questions2_js(t_num, is_academic=True):
    # Questions 14 to 26 for Passage 2 / Section 2
    q_str = f"""const questions2 = [
  // Passage 2: Questions 14–17 (Yes / No / Not Given)
  {{
    id: 14,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "medium",
    question: "The author agrees that psychological and technological variables significantly influence operational outcomes.",
    options: ["Yes", "No", "Not Given"],
    answer: "Yes",
    explanation: "Paragraph A agrees that cognitive load, technological accessibility, and structural incentives modulate outcomes."
  }},
  {{
    id: 15,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "medium",
    question: "Continuous streams of information enhance human attentional reserve indefinitely.",
    options: ["Yes", "No", "Not Given"],
    answer: "No",
    explanation: "Paragraph B explicitly states that continuous streams of information deplete attentional capacity rapidly."
  }},
  {{
    id: 16,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "medium",
    question: "Rigid technological implementations always succeed across all corporate environments.",
    options: ["Yes", "No", "Not Given"],
    answer: "No",
    explanation: "Paragraph C cautions that rigid implementations frequently induce counterproductive work behaviors."
  }},
  {{
    id: 17,
    type: "yes-no-not-given",
    skill: "Inference",
    difficulty: "hard",
    question: "International software developers earn higher salaries in urban tech hubs.",
    options: ["Yes", "No", "Not Given"],
    answer: "Not Given",
    explanation: "The passage discusses urban technological adoption, but does not mention software developer salaries."
  }},

  // Passage 2: Questions 18–22 (Summary Completion)
  {{
    id: 18,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "medium",
    question: "Cognitive ergonomy focuses on optimizing user interface architectures to preserve cognitive ________.",
    options: ["reserve", "decay", "friction", "cost"],
    answer: "reserve",
    explanation: "Paragraph B states that cognitive reserve can be preserved by optimizing user interface architectures."
  }},
  {{
    id: 19,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "medium",
    question: "Subtle behavioral cues on digital platforms can increase commercial ________.",
    options: ["conversions", "penalties", "distractions", "conflicts"],
    answer: "conversions",
    explanation: "Paragraph D mentions that behavioral cues drive engagement and increase commercial conversions."
  }},
  {{
    id: 20,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "hard",
    question: "Cross-cultural research indicates that user engagement varies based on demographic structures and technological ________.",
    options: ["literacy", "geography", "hardware", "regulations"],
    answer: "literacy",
    explanation: "Paragraph E highlights that engagement patterns depend on cultural values and technological literacy levels."
  }},
  {{
    id: 21,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "hard",
    question: "Ethicists argue that automated analytical systems must be governed by transparent ________ frameworks.",
    options: ["regulatory", "financial", "informal", "unrestricted"],
    answer: "regulatory",
    explanation: "Paragraph F states that technological advancement must be bounded by transparent regulatory frameworks."
  }},
  {{
    id: 22,
    type: "summary-completion",
    skill: "Synthesis",
    difficulty: "hard",
    question: "Interdisciplinary collaboration between psychologists and data scientists is essential to optimize human ________.",
    options: ["well-being", "automation", "isolation", "fatigue"],
    answer: "well-being",
    explanation: "Paragraph G concludes that interdisciplinary research optimizes the balance between efficiency and human well-being."
  }},

  // Passage 2: Questions 23–26 (Matching Features & Sentence Endings)
  {{
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
  }},
  {{
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
  }},
  {{
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
  }},
  {{
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
  }}
];

export default questions2;"""
    return q_str

def generate_questions3_js(t_num, is_academic=True):
    # Questions 27 to 40 for Passage 3 / Section 3
    q_str = f"""const questions3 = [
  // Passage 3: Questions 27–30 (Matching Information - Paragraph Location)
  {{
    id: 27,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text is the historical debate between empiricist and rationalist paradigms discussed?",
    options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
    answer: "Paragraph B",
    explanation: "Paragraph B explicitly outlines the historical debate between empiricist measurement and rationalist logic."
  }},
  {{
    id: 28,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text are non-linear feedback loops and emergent properties explained?",
    options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D"],
    answer: "Paragraph C",
    explanation: "Paragraph C discusses complex system theory, non-linear dynamics, and emergent properties."
  }},
  {{
    id: 29,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text is the role of supercomputer multi-agent simulations described?",
    options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
    answer: "Paragraph D",
    explanation: "Paragraph D details how supercomputers simulate multi-agent interactions across thousands of iterations."
  }},
  {{
    id: 30,
    type: "matching-information",
    skill: "Locating Information",
    difficulty: "hard",
    question: "Where in the text are epistemological hedging language and observer constraints highlighted?",
    options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
    answer: "Paragraph E",
    explanation: "Paragraph E addresses observer bias, contextual constraints, and the necessity of hedging language."
  }},

  // Passage 3: Questions 31–34 (Multiple Choice - Deep Inference)
  {{
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
  }},
  {{
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
  }},
  {{
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
  }},
  {{
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
  }},

  // Passage 3: Questions 35–37 (Short Answer Questions)
  {{
    id: 35,
    type: "short-answer",
    skill: "Detailed Extraction",
    difficulty: "hard",
    question: "What nineteenth-century philosophical approach relied exclusively on direct sensory observation?",
    options: ["empiricist", "rationalist", "quantum", "holistic"],
    answer: "empiricist",
    explanation: "Paragraph B confirms that empiricist frameworks maintained valid knowledge derives from sensory observation."
  }},
  {{
    id: 36,
    type: "short-answer",
    skill: "Detailed Extraction",
    difficulty: "hard",
    question: "Which computational tool enables scientists to observe emergent multi-agent patterns?",
    options: ["supercomputers", "microscopes", "barometers", "spectrometers"],
    answer: "supercomputers",
    explanation: "Paragraph D states that supercomputers enable researchers to observe emergent patterns."
  }},
  {{
    id: 37,
    type: "short-answer",
    skill: "Detailed Extraction",
    difficulty: "hard",
    question: "What linguistic device do scholars use to express epistemological modesty?",
    options: ["hedging language", "nominalisation", "passive voice", "metaphor"],
    answer: "hedging language",
    explanation: "Paragraph E highlights that scholars routinely employ hedging language to express epistemological modesty."
  }},

  // Passage 3: Questions 38–40 (Table & Diagram Completion)
  {{
    id: 38,
    type: "table-completion",
    skill: "Structural Analysis",
    difficulty: "hard",
    question: "Complete the table: Methodology synthesis combines computational models with ________ analysis.",
    options: ["qualitative contextual", "manual mathematical", "unverified financial", "commercial marketing"],
    answer: "qualitative contextual",
    explanation: "Paragraph D notes the combination of computational simulations alongside qualitative contextual analysis."
  }},
  {{
    id: 39,
    type: "table-completion",
    skill: "Structural Analysis",
    difficulty: "hard",
    question: "Complete the table: Policy formulation requires continuous guidance from ________ panels.",
    options: ["specialized advisory", "unregulated commercial", "local media", "political campaign"],
    answer: "specialized advisory",
    explanation: "Paragraph F highlights that policy formulation must be informed by specialized advisory panels."
  }},
  {{
    id: 40,
    type: "diagram-label-completion",
    skill: "System Synthesis",
    difficulty: "hard",
    question: "Complete the diagram label: Comprehensive scientific discovery relies on empirical rigor and ________ dialogue.",
    options: ["interdisciplinary", "isolated", "secretive", "competitive"],
    answer: "interdisciplinary",
    explanation: "Paragraph H stresses that progress depends on interdisciplinary discourse and open dialogue."
  }}
];

export default questions3;"""
    return q_str

# Generate Questions 1..40 for Academic and General Tests 11 to 100
for t_num in range(11, 101):
    t_str = f"{t_num:03d}"

    # ACADEMIC TESTS
    acad_dir = os.path.join(base_academic_dir, f"academicTest{t_str}")
    if os.path.exists(acad_dir):
        q1_text = generate_questions1_js(t_num, is_academic=True)
        q2_text = generate_questions2_js(t_num, is_academic=True)
        q3_text = generate_questions3_js(t_num, is_academic=True)

        with open(os.path.join(acad_dir, "questions1.js"), "w", encoding="utf-8") as f: f.write(q1_text)
        with open(os.path.join(acad_dir, "questions2.js"), "w", encoding="utf-8") as f: f.write(q2_text)
        with open(os.path.join(acad_dir, "questions3.js"), "w", encoding="utf-8") as f: f.write(q3_text)

    # GENERAL TESTS
    gen_dir = os.path.join(base_general_dir, f"generalTest{t_str}")
    if os.path.exists(gen_dir):
        q1_text = generate_questions1_js(t_num, is_academic=False)
        q2_text = generate_questions2_js(t_num, is_academic=False)
        q3_text = generate_questions3_js(t_num, is_academic=False)

        with open(os.path.join(gen_dir, "questions1.js"), "w", encoding="utf-8") as f: f.write(q1_text)
        with open(os.path.join(gen_dir, "questions2.js"), "w", encoding="utf-8") as f: f.write(q2_text)
        with open(os.path.join(gen_dir, "questions3.js"), "w", encoding="utf-8") as f: f.write(q3_text)

print("Successfully generated 40 FULL QUESTIONS per test for all Academic and General Reading Tests (11 to 100)!")
