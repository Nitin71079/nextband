export const EXAM_AI_CONFIGS = {
  DET: {
    name: "DET",
    title: "DET AI Coach",
    systemPrompt: "You are an official Duolingo English Test (DET) expert coach. The student is preparing for the DET exam (scored 10-160 across Literacy, Comprehension, Conversation, and Production). Provide precise, actionable advice for DET question types (Read & Complete, Read & Select, Listen & Type, Read Aloud, Write About Photo, Interactive Reading/Writing, Speaking) and 10-160 scoring rubrics.",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **DET AI Coach**.\n\nAsk me any question about:\n- Read & Select, Read & Complete, Listen & Type\n- Read Aloud & Interactive Reading\n- Write About the Photo & Interactive Writing\n- Speak About the Photo & DET 10-160 Scoring`,
    placeholder: "Ask anything about DET...",
    quickPrompts: [
      { label: "Reach 120+ DET", text: "How do I score 120+ on the Duolingo English Test?" },
      { label: "Production Subscore", text: "How to improve DET Production subscore for Writing & Speaking?" },
      { label: "Write About Photo", text: "Best templates and rules for DET Write About the Photo" },
      { label: "Read & Complete", text: "Tips for DET Read & Complete C-Test fill in blanks" },
      { label: "Interactive Reading", text: "Best strategy for DET Interactive Reading passage questions" },
      { label: "30-Day DET Plan", text: "Create a 30-day study plan for the Duolingo English Test" }
    ],
    chips: ["Reach 120+ DET", "Write About Photo", "Read & Complete", "Production Tips"],
    targetScore: "Target: 160 Subscores",
    mission: ["Write About Photo Drill", "Listen & Type Practice", "Read Aloud Fluency", "Interactive Writing"]
  },
  TOEFL: {
    name: "TOEFL",
    title: "TOEFL AI Coach",
    systemPrompt: "You are an official TOEFL iBT expert coach. The candidate is preparing for TOEFL iBT (scored 0-120). Focus advice on ETS rubrics, Reading, Listening, Speaking (Independent & Integrated), and Writing (Integrated & Academic Discussion).",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **TOEFL iBT AI Coach**.\n\nAsk me any question about:\n- Reading Academic Passages & Question Types\n- Listening Lectures & Note-taking\n- Speaking Independent & Integrated Tasks\n- Writing Academic Discussion & Integrated Essay`,
    placeholder: "Ask anything about TOEFL...",
    quickPrompts: [
      { label: "Reach 100+ TOEFL", text: "How do I reach 100+ on TOEFL iBT?" },
      { label: "Academic Discussion", text: "How to write a high scoring Academic Discussion essay in TOEFL?" },
      { label: "Integrated Speaking", text: "Template and structure for TOEFL Integrated Speaking" },
      { label: "Listening Notes", text: "Note-taking strategies for TOEFL Listening lectures" },
      { label: "30-Day TOEFL Plan", text: "Create a 30-day TOEFL iBT study schedule" }
    ],
    chips: ["Reach 100+ TOEFL", "Academic Discussion", "Speaking Templates", "Listening Notes"],
    targetScore: "Target: 100+ Score",
    mission: ["Academic Discussion Essay", "Integrated Speaking Task", "Lecture Note-taking", "Vocabulary Review"]
  },
  GRE: {
    name: "GRE",
    title: "GRE AI Coach",
    systemPrompt: "You are an official GRE General Test expert coach. Candidate is preparing for GRE (Verbal 130-170, Quant 130-170, AWA 0-6). Provide expert advice on Verbal (Text Completion, Sentence Equivalence, RC), Quant (Algebra, Geometry, Data Analysis, Quantitative Comparison), and AWA Issue Essay.",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **GRE AI Coach**.\n\nAsk me any question about:\n- Verbal Reasoning (Text Completion, Sentence Equivalence, Reading Comprehension)\n- Quantitative Reasoning (Algebra, Geometry, Data Analysis, Quant Comparison)\n- Analytical Writing (Issue Essay Analysis)`,
    placeholder: "Ask anything about GRE...",
    quickPrompts: [
      { label: "Target 330+ GRE", text: "How to score 330+ on GRE General Test?" },
      { label: "Text Completion", text: "Best strategies for GRE Text Completion vocabulary & logic" },
      { label: "Quant Tricks", text: "Shortcuts and problem-solving tricks for GRE Math" },
      { label: "AWA Issue Essay", text: "Structure and template for GRE Analytical Writing Issue Essay" },
      { label: "Sentence Equivalence", text: "How to tackle GRE Sentence Equivalence pairs" }
    ],
    chips: ["Target 330+ GRE", "Text Completion", "Quant Shortcuts", "AWA Essay Template"],
    targetScore: "Target: 330+ Score",
    mission: ["GRE Text Completion", "Quant Comparison Drills", "AWA Issue Essay", "Vocabulary Flashcards"]
  },
  CAT: {
    name: "CAT",
    title: "CAT AI Coach",
    systemPrompt: "You are a top CAT (IIM Entrance) lead mentor. Candidate is aiming for 99+ percentile in VARC (Verbal Ability & Reading Comprehension), DILR (Data Interpretation & Logical Reasoning), and QA (Quantitative Ability). Focus on set selection, speed-accuracy trade-offs, and concept mastery.",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **CAT AI Coach**.\n\nAsk me any question about:\n- Verbal Ability & Reading Comprehension (VARC)\n- Data Interpretation & Logical Reasoning (DILR Sets)\n- Quantitative Ability (QA - Arithmetic, Algebra, Geometry)`,
    placeholder: "Ask anything about CAT...",
    quickPrompts: [
      { label: "Target 99+ %ile", text: "How to score 99+ percentile in CAT for IIM admissions?" },
      { label: "DILR Set Selection", text: "How to select the right DILR sets in CAT exam?" },
      { label: "VARC Accuracy", text: "How to improve accuracy and speed in CAT RC passages?" },
      { label: "QA Shortcuts", text: "Best arithmetic & algebra shortcuts for CAT QA" },
      { label: "30-Day CAT Plan", text: "Create a 30-day intensive CAT prep strategy" }
    ],
    chips: ["Target 99+ CAT", "DILR Set Selection", "VARC Speed & RC", "QA Arithmetic"],
    targetScore: "Target: 99+ Percentile",
    mission: ["DILR Matrix Sets", "VARC RC Passages", "QA Algebra Drills", "Mock Test Strategy"]
  },
  PTE: {
    name: "PTE",
    title: "PTE Academic AI Coach",
    systemPrompt: "You are a PTE Academic expert coach. Candidate is aiming for 79+ overall score. Focus on PTE automated AI scoring mechanics (fluency, pronunciation, content keys, dictation) for Speaking, Writing, Reading, and Listening.",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **PTE Academic AI Coach**.\n\nAsk me any question about:\n- Read Aloud, Repeat Sentence, Describe Image\n- Summarize Written Text & Write Essay\n- Fill in the Blanks & Re-order Paragraphs\n- Summarize Spoken Text & Write from Dictation`,
    placeholder: "Ask anything about PTE...",
    quickPrompts: [
      { label: "Reach 79+ PTE", text: "How to get 79+ in PTE Academic all modules?" },
      { label: "Describe Image", text: "Best templates for PTE Describe Image & Retell Lecture" },
      { label: "Repeat Sentence", text: "How to improve PTE Repeat Sentence memory and oral fluency" },
      { label: "Write from Dictation", text: "Tips and guidelines for PTE Write from Dictation" },
      { label: "PTE AI Scoring", text: "Explain PTE AI scoring criteria for oral fluency and content" }
    ],
    chips: ["Reach 79+ PTE", "Describe Image", "Write from Dictation", "Repeat Sentence"],
    targetScore: "Target: 79+ Score",
    mission: ["Describe Image Drills", "Write from Dictation", "Repeat Sentence Practice", "Essay Template"]
  },
  SAT: {
    name: "SAT",
    title: "Digital SAT AI Coach",
    systemPrompt: "You are a Digital SAT expert coach. Candidate aims for 1500+ score. Focus advice on Digital SAT adaptive modules, Reading & Writing (Craft & Structure, Expression of Ideas, Grammar), Math (Algebra, Advanced Math, Geometry & Trig), and Desmos calculator shortcuts.",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **Digital SAT AI Coach**.\n\nAsk me any question about:\n- Reading & Writing (Craft & Structure, Expression of Ideas, Conventions)\n- Math (Algebra, Advanced Math, Problem-Solving, Geometry & Trig)\n- Desmos Calculator Hacks & Adaptive Module Pacing`,
    placeholder: "Ask anything about SAT...",
    quickPrompts: [
      { label: "Target 1500+ SAT", text: "How to score 1500+ on Digital SAT?" },
      { label: "Desmos Calculator Hacks", text: "Best Desmos calculator tricks for Digital SAT Math" },
      { label: "SAT Grammar Rules", text: "Essential Standard English Conventions for Digital SAT Writing" },
      { label: "Reading Inferences", text: "How to solve hard SAT Reading inference & evidence questions" }
    ],
    chips: ["Target 1500+ SAT", "Desmos Hacks", "SAT Grammar Rules", "Reading Inferences"],
    targetScore: "Target: 1500+ Score",
    mission: ["Desmos Calculator Hacks", "SAT Grammar Conventions", "Reading Inferences", "Algebra Drills"]
  },
  ACT: {
    name: "ACT",
    title: "ACT AI Coach",
    systemPrompt: "You are an ACT expert coach. Candidate aims for 34+ composite score. Focus on extreme time pacing, English rhetorical skills, Math formulas, Reading speed, and Science data representation.",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **ACT AI Coach**.\n\nAsk me any question about:\n- English (Punctuation, Grammar, Rhetorical Skills)\n- Math (Algebra, Geometry, Trigonometry)\n- Reading (Speed Pacing & Detail Questions)\n- Science (Data Representation, Research Summaries, Conflicting Viewpoints)`,
    placeholder: "Ask anything about ACT...",
    quickPrompts: [
      { label: "Target 34+ ACT", text: "How to score 34+ composite on the ACT exam?" },
      { label: "ACT Science Pacing", text: "How to tackle ACT Science passages without running out of time" },
      { label: "ACT English Grammar", text: "Key punctuation and grammar rules tested on ACT English" },
      { label: "ACT Math Formulas", text: "Must-know math formulas for ACT Math section" }
    ],
    chips: ["Target 34+ ACT", "Science Pacing", "English Grammar", "Math Formulas"],
    targetScore: "Target: 34+ Composite",
    mission: ["ACT Science Passages", "English Punctuation Drills", "Math Formula Review", "Reading Speed Drills"]
  },
  GMAT: {
    name: "GMAT",
    title: "GMAT Focus AI Coach",
    systemPrompt: "You are a GMAT Focus Edition expert mentor. Candidate aims for 705+ score. Focus on Critical Reasoning logic structures, Quantitative Problem Solving, Data Insights (Data Sufficiency, Multi-Source Reasoning, Graph Analysis).",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **GMAT Focus AI Coach**.\n\nAsk me any question about:\n- Quantitative Reasoning (Problem Solving)\n- Verbal Reasoning (Reading Comprehension & Critical Reasoning)\n- Data Insights (Data Sufficiency, Multi-Source Reasoning, Graph Analysis)`,
    placeholder: "Ask anything about GMAT...",
    quickPrompts: [
      { label: "Target 705+ GMAT", text: "How to score 705+ on GMAT Focus Edition?" },
      { label: "Data Sufficiency", text: "Strategies for GMAT Data Sufficiency elimination and shortcuts" },
      { label: "Critical Reasoning", text: "How to analyze GMAT Critical Reasoning arguments & assumption traps" },
      { label: "GMAT Pacing", text: "Time management strategy for GMAT Focus 45-minute sections" }
    ],
    chips: ["Target 705+ GMAT", "Data Sufficiency", "Critical Reasoning", "GMAT Pacing"],
    targetScore: "Target: 705+ Score",
    mission: ["Data Sufficiency Drills", "Critical Reasoning Logic", "Quant Problem Solving", "Data Insights Sets"]
  },
  IELTS: {
    name: "IELTS",
    title: "IELTS AI Coach",
    systemPrompt: "You are an official IELTS Master Examiner and coach. Candidate aims for Band 8+. Focus advice on IELTS band descriptors (Task Response, Coherence, Lexical Resource, Grammatical Accuracy) across Reading, Listening, Writing, and Speaking.",
    welcomeMessage: (name) => `👋 Hello ${name}! I'm your **IELTS AI Coach**.\n\nAsk me any question about:\n- Reading Academic & General Passages\n- Listening Section 1-4 Strategies\n- Writing Task 1 & Task 2 Essay Structure\n- Speaking Part 1, 2 & 3 Fluency`,
    placeholder: "Ask anything about IELTS...",
    quickPrompts: [
      { label: "Reach Band 8+", text: "How do I reach Band 8+ in IELTS?" },
      { label: "Writing Task 2", text: "Structure and band 8+ tips for IELTS Writing Task 2" },
      { label: "Speaking Fluency", text: "How can I improve my Speaking fluency and cue card structure?" },
      { label: "Reading Strategies", text: "Best strategies for IELTS Reading True/False/Not Given" },
      { label: "30-Day IELTS Plan", text: "Create a 30-day IELTS study plan for me" }
    ],
    chips: ["Reach Band 8+", "Writing Task 2", "Speaking Fluency", "30-Day Plan"],
    targetScore: "Target: Band 8+",
    mission: ["Writing Task 2 Drill", "20 min Speaking", "Vocabulary Review", "Grammar Practice"]
  }
};

export function getExamAiConfig(trackKey) {
  const key = (trackKey || "").toUpperCase();
  return EXAM_AI_CONFIGS[key] || EXAM_AI_CONFIGS.IELTS;
}
