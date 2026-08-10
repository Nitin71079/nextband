/**
 * Knarrow DET Suite — 100% Original Item Bank & Data Models for DET Adaptive Engine
 * Contains 5 distinct items for each of the 14 official DET question types (70 items total).
 * Fully aligned with official DET subscores (Literacy, Comprehension, Conversation, Production)
 * and CEFR proficiency bands (A1 to C2, 10 to 160 score scale).
 */

export const DET_QUESTION_TYPES = {
  SINGLE_WORD_READ_SELECT: "single-word-read-select",
  FILL_IN_THE_BLANKS: "fill-in-the-blanks",
  READ_AND_COMPLETE: "read-and-complete",
  READ_AND_SELECT: "read-and-select",
  LISTEN_AND_TYPE: "listen-and-type",
  READ_ALOUD: "read-aloud",
  DESCRIBE_IMAGE: "describe-image",
  SPEAK_ABOUT_IMAGE: "speak-about-image",
  INTERACTIVE_READING: "interactive-reading",
  INTERACTIVE_LISTENING: "interactive-listening",
  INTERACTIVE_WRITING: "interactive-writing",
  INTERACTIVE_SPEAKING: "interactive-speaking",
  WRITING_SAMPLE: "writing-sample",
  SPEAKING_SAMPLE: "speaking-sample",
};

export const detItemBank = [
  // ── 1. SINGLE WORD READ AND SELECT (5 Items) ────────────────────────────
  {
    id: "swrs-001",
    type: "single-word-read-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 85,
    timeLimit: 5,
    word: "handen",
    isReal: false,
    prompt: "Is this a real English word?"
  },
  {
    id: "swrs-002",
    type: "single-word-read-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 95,
    timeLimit: 5,
    word: "meticulous",
    isReal: true,
    prompt: "Is this a real English word?"
  },
  {
    id: "swrs-003",
    type: "single-word-read-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 5,
    word: "ubiquitous",
    isReal: true,
    prompt: "Is this a real English word?"
  },
  {
    id: "swrs-004",
    type: "single-word-read-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 90,
    timeLimit: 5,
    word: "flambling",
    isReal: false,
    prompt: "Is this a real English word?"
  },
  {
    id: "swrs-005",
    type: "single-word-read-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 5,
    word: "fastidious",
    isReal: true,
    prompt: "Is this a real English word?"
  },

  // ── 2. FILL IN THE BLANKS (5 Items) ──────────────────────────────────────
  {
    id: "fitb-001",
    type: "fill-in-the-blanks",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 90,
    timeLimit: 20,
    sentenceBefore: "The number of website error reports we are receiving is ",
    targetWord: "alarming",
    sentenceAfter: ", so we must fix them right away.",
    prompt: "Complete the sentence with the correct word."
  },
  {
    id: "fitb-002",
    type: "fill-in-the-blanks",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 20,
    sentenceBefore: "Renewable energy adoption has grown at an ",
    targetWord: "unprecedented",
    sentenceAfter: " pace over the past decade.",
    prompt: "Complete the sentence with the correct word."
  },
  {
    id: "fitb-003",
    type: "fill-in-the-blanks",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 85,
    timeLimit: 20,
    sentenceBefore: "The committee reached a unanimous ",
    targetWord: "decision",
    sentenceAfter: " after hours of intense deliberation.",
    prompt: "Complete the sentence with the correct word."
  },
  {
    id: "fitb-004",
    type: "fill-in-the-blanks",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 20,
    sentenceBefore: "His explanation was remarkably ",
    targetWord: "coherent",
    sentenceAfter: " despite the complexity of the subject matter.",
    prompt: "Complete the sentence with the correct word."
  },
  {
    id: "fitb-005",
    type: "fill-in-the-blanks",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 135,
    timeLimit: 20,
    sentenceBefore: "She handled the delicate negotiation with admirable ",
    targetWord: "diplomacy",
    sentenceAfter: " and poise.",
    prompt: "Complete the sentence with the correct word."
  },

  // ── 3. READ AND COMPLETE (5 Items) ───────────────────────────────────────
  {
    id: "rc-001",
    type: "read-and-complete",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 85,
    timeLimit: 180,
    prompt: "Type the missing letters to complete the text below.",
    tokens: [
      { type: "text", value: "Urban " },
      { type: "blank", prefix: "plan", missingLength: 4, answer: "ning" },
      { type: "text", value: " is a " },
      { type: "blank", prefix: "techni", missingLength: 3, answer: "cal" },
      { type: "text", value: " and " },
      { type: "blank", prefix: "politi", missingLength: 3, answer: "cal" },
      { type: "text", value: " process " },
      { type: "blank", prefix: "conce", missingLength: 4, answer: "rned" },
      { type: "text", value: " with the development and design of land use and the built " },
      { type: "blank", prefix: "enviro", missingLength: 4, answer: "nment" },
      { type: "text", value: "." }
    ],
    answers: { "blank_1": "ning", "blank_3": "cal", "blank_5": "cal", "blank_7": "rned", "blank_9": "nment" }
  },
  {
    id: "rc-002",
    type: "read-and-complete",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 180,
    prompt: "Type the missing letters to complete the text below.",
    tokens: [
      { type: "text", value: "Photosyn" },
      { type: "blank", prefix: "thesis", missingLength: 6, answer: "thesis" },
      { type: "text", value: " is the biochemical pathway by " },
      { type: "blank", prefix: "wh", missingLength: 3, answer: "ich" },
      { type: "text", value: " autotrophic " },
      { type: "blank", prefix: "organ", missingLength: 4, answer: "isms" },
      { type: "text", value: " convert solar energy " },
      { type: "blank", prefix: "in", missingLength: 2, answer: "to" },
      { type: "text", value: " chemical energy stored in glucose " },
      { type: "blank", prefix: "mole", missingLength: 5, answer: "cules" },
      { type: "text", value: "." }
    ],
    answers: { "blank_1": "thesis", "blank_3": "ich", "blank_5": "isms", "blank_7": "to", "blank_9": "cules" }
  },
  {
    id: "rc-003",
    type: "read-and-complete",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 90,
    timeLimit: 180,
    prompt: "Type the missing letters to complete the text below.",
    tokens: [
      { type: "text", value: "Digital " },
      { type: "blank", prefix: "commu", missingLength: 6, answer: "nication" },
      { type: "text", value: " has drastically reduced the cost of sending " },
      { type: "blank", prefix: "infor", missingLength: 4, answer: "mation" },
      { type: "text", value: " across global distances in real " },
      { type: "blank", prefix: "ti", missingLength: 2, answer: "me" },
      { type: "text", value: "." }
    ],
    answers: { "blank_1": "nication", "blank_3": "mation", "blank_5": "me" }
  },
  {
    id: "rc-004",
    type: "read-and-complete",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 115,
    timeLimit: 180,
    prompt: "Type the missing letters to complete the text below.",
    tokens: [
      { type: "text", value: "Economists " },
      { type: "blank", prefix: "ana", missingLength: 4, answer: "lyze" },
      { type: "text", value: " market trends to forecast future " },
      { type: "blank", prefix: "growth", missingLength: 4, answer: "rates" },
      { type: "text", value: " and inflation expectations." }
    ],
    answers: { "blank_1": "lyze", "blank_3": "rates" }
  },
  {
    id: "rc-005",
    type: "read-and-complete",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 180,
    prompt: "Type the missing letters to complete the text below.",
    tokens: [
      { type: "text", value: "Neuroplasticity " },
      { type: "blank", prefix: "ref", missingLength: 3, answer: "ers" },
      { type: "text", value: " to the brain's ability to reorganize itself by forming new " },
      { type: "blank", prefix: "synap", missingLength: 3, answer: "tic" },
      { type: "text", value: " connections throughout life." }
    ],
    answers: { "blank_1": "ers", "blank_3": "tic" }
  },

  // ── 4. READ AND SELECT (5 Items) ─────────────────────────────────────────
  {
    id: "rs-001",
    type: "read-and-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 75,
    timeLimit: 60,
    prompt: "Select the real English words in the list below.",
    words: [
      { text: "Hypothesis", isReal: true },
      { text: "Bravitude", isReal: false },
      { text: "Ineffable", isReal: true },
      { text: "Scribblish", isReal: false },
      { text: "Perseverance", isReal: true },
      { text: "Flamboyant", isReal: true },
      { text: "Glorificated", isReal: false },
      { text: "Sustainable", isReal: true }
    ]
  },
  {
    id: "rs-002",
    type: "read-and-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 110,
    timeLimit: 60,
    prompt: "Select the real English words in the list below.",
    words: [
      { text: "Pragmatic", isReal: true },
      { text: "Volitancy", isReal: false },
      { text: "Substantiate", isReal: true },
      { text: "Ephemerous", isReal: false },
      { text: "Cognitive", isReal: true },
      { text: "Resilience", isReal: true }
    ]
  },
  {
    id: "rs-003",
    type: "read-and-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 60,
    prompt: "Select the real English words in the list below.",
    words: [
      { text: "Altruistic", isReal: true },
      { text: "Magnanimous", isReal: true },
      { text: "Brevitative", isReal: false },
      { text: "Comprehensive", isReal: true },
      { text: "Grandiosity", isReal: true }
    ]
  },
  {
    id: "rs-004",
    type: "read-and-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 80,
    timeLimit: 60,
    prompt: "Select the real English words in the list below.",
    words: [
      { text: "Collaboration", isReal: true },
      { text: "Innovational", isReal: false },
      { text: "Trajectory", isReal: true },
      { text: "Systemic", isReal: true }
    ]
  },
  {
    id: "rs-005",
    type: "read-and-select",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 135,
    timeLimit: 60,
    prompt: "Select the real English words in the list below.",
    words: [
      { text: "Serendipity", isReal: true },
      { text: "Equanimity", isReal: true },
      { text: "Pugnacious", isReal: true },
      { text: "Falsification", isReal: true },
      { text: "Luminant", isReal: false }
    ]
  },

  // ── 5. LISTEN AND TYPE (5 Items) ─────────────────────────────────────────
  {
    id: "lt-001",
    type: "listen-and-type",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "medium",
    difficultyValue: 80,
    timeLimit: 60,
    maxReplays: 2,
    audioUrl: "/audio/det/lt-001.mp3",
    audioText: "Scientific research suggests that regular exercise improves cognitive performance.",
    prompt: "Type the statement that you hear."
  },
  {
    id: "lt-002",
    type: "listen-and-type",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 110,
    timeLimit: 60,
    maxReplays: 2,
    audioUrl: "/audio/det/lt-002.mp3",
    audioText: "The international conference on climate change will take place next month.",
    prompt: "Type the statement that you hear."
  },
  {
    id: "lt-003",
    type: "listen-and-type",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "medium",
    difficultyValue: 85,
    timeLimit: 60,
    maxReplays: 2,
    audioText: "Students are encouraged to submit their research proposals before the deadline.",
    prompt: "Type the statement that you hear."
  },
  {
    id: "lt-004",
    type: "listen-and-type",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 60,
    maxReplays: 2,
    audioText: "Technological innovation has substantially transformed traditional educational methodologies.",
    prompt: "Type the statement that you hear."
  },
  {
    id: "lt-005",
    type: "listen-and-type",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 60,
    maxReplays: 2,
    audioText: "Environmental sustainability requires comprehensive international policy collaboration.",
    prompt: "Type the statement that you hear."
  },

  // ── 6. READ ALOUD (5 Items) ──────────────────────────────────────────────
  {
    id: "ra-001",
    type: "read-aloud",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "medium",
    difficultyValue: 80,
    timeLimit: 20,
    sentence: "The university library will remain open until midnight during final exam week.",
    prompt: "Record yourself reading the sentence below out loud."
  },
  {
    id: "ra-002",
    type: "read-aloud",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 110,
    timeLimit: 20,
    sentence: "Interdisciplinary research projects foster innovative solutions to global challenges.",
    prompt: "Record yourself reading the sentence below out loud."
  },
  {
    id: "ra-003",
    type: "read-aloud",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "medium",
    difficultyValue: 85,
    timeLimit: 20,
    sentence: "Effective communication skills are essential for career success in any field.",
    prompt: "Record yourself reading the sentence below out loud."
  },
  {
    id: "ra-004",
    type: "read-aloud",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 20,
    sentence: "Quantum computing represents a fundamental paradigm shift in computational speed.",
    prompt: "Record yourself reading the sentence below out loud."
  },
  {
    id: "ra-005",
    type: "read-aloud",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 135,
    timeLimit: 20,
    sentence: "Preserving biodiversity is crucial for maintaining ecological balance and planetary health.",
    prompt: "Record yourself reading the sentence below out loud."
  },

  // ── 7. DESCRIBE IMAGE (5 Items) ──────────────────────────────────────────
  {
    id: "di-001",
    type: "describe-image",
    mode: "writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "medium",
    difficultyValue: 90,
    timeLimit: 60,
    prompt: "Write a description of the image below for 1 minute.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Students collaborating on laptops in a university library"
  },
  {
    id: "di-002",
    type: "describe-image",
    mode: "writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "medium",
    difficultyValue: 95,
    timeLimit: 60,
    prompt: "Write a description of the image below for 1 minute.",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Busy city intersection during sunset with high-rise buildings"
  },
  {
    id: "di-003",
    type: "describe-image",
    mode: "writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 110,
    timeLimit: 60,
    prompt: "Write a description of the image below for 1 minute.",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Software engineers looking at code on dual monitors"
  },
  {
    id: "di-004",
    type: "describe-image",
    mode: "writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 60,
    prompt: "Write a description of the image below for 1 minute.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern open office space with employees working at desks"
  },
  {
    id: "di-005",
    type: "describe-image",
    mode: "writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 60,
    prompt: "Write a description of the image below for 1 minute.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Serene mountain landscape with a clear blue alpine lake"
  },

  // ── 8. SPEAK ABOUT IMAGE (5 Items) ───────────────────────────────────────
  {
    id: "sai-001",
    type: "speak-about-image",
    mode: "speaking",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 110,
    timeLimit: 90,
    prompt: "Speak about the image below for 90 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Team presentation in a modern conference room"
  },
  {
    id: "sai-002",
    type: "speak-about-image",
    mode: "speaking",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "medium",
    difficultyValue: 95,
    timeLimit: 90,
    prompt: "Speak about the image below for 90 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Teacher giving a lecture to students in a modern classroom"
  },
  {
    id: "sai-003",
    type: "speak-about-image",
    mode: "speaking",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 90,
    prompt: "Speak about the image below for 90 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Scientist examining biological samples in a laboratory"
  },
  {
    id: "sai-004",
    type: "speak-about-image",
    mode: "speaking",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 90,
    prompt: "Speak about the image below for 90 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Community garden with people harvesting organic vegetables"
  },
  {
    id: "sai-005",
    type: "speak-about-image",
    mode: "speaking",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 135,
    timeLimit: 90,
    prompt: "Speak about the image below for 90 seconds.",
    imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Historical museum exhibit displaying ancient artifacts"
  },

  // ── 9. INTERACTIVE READING (5 Items) ────────────────────────────────────
  {
    id: "ir-001",
    type: "interactive-reading",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "medium",
    difficultyValue: 90,
    timeLimit: 420,
    title: "The Architecture of Gothic Cathedrals",
    passage: "Gothic architecture emerged in northern France in the twelfth century, revolutionizing European monumental construction. Key structural innovations such as the pointed arch, flying buttress, and ribbed vault allowed master builders to construct soaring stone towers with unprecedented height and spaciousness. Large stained glass windows illuminated interiors with colored natural light.",
    questions: [
      { id: "ir-001-q1", type: "mcq", prompt: "Which structural innovation allowed Gothic cathedrals to achieve greater height?", options: ["Flying buttress and pointed arch", "Wooden timber scaffolds", "Thick solid brick walls", "Iron reinforced columns"], answer: "Flying buttress and pointed arch" },
      { id: "ir-001-q2", type: "select-sentence", prompt: "Select the sentence that explains how natural light entered cathedral interiors.", targetSentence: "Large stained glass windows illuminated interiors with colored natural light." }
    ]
  },
  {
    id: "ir-002",
    type: "interactive-reading",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 115,
    timeLimit: 420,
    title: "Marine Coral Reef Ecosystems",
    passage: "Coral reefs support more biodiversity per unit area than almost any other ecosystem on Earth. Microscopic algae living symbiotically within coral tissues provide energy through photosynthesis, forming the foundational food source for reef marine life.",
    questions: [
      { id: "ir-002-q1", type: "mcq", prompt: "How do microscopic algae support coral ecosystems?", options: ["By providing energy through photosynthesis", "By purifying ocean water", "By constructing calcium carbonate skeletons", "By regulating sea temperatures"], answer: "By providing energy through photosynthesis" }
    ]
  },
  {
    id: "ir-003",
    type: "interactive-reading",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 420,
    title: "The Development of Artificial Intelligence",
    passage: "Early artificial intelligence research focused on symbolic logic and rule-based expert systems. In recent decades, deep machine learning models trained on vast datasets have revolutionized speech recognition and natural language translation.",
    questions: [
      { id: "ir-003-q1", type: "mcq", prompt: "What shifted modern AI away from early rule-based systems?", options: ["Deep machine learning models trained on vast datasets", "Manual input rules", "Vacuum tube computing", "Analog signal processing"], answer: "Deep machine learning models trained on vast datasets" }
    ]
  },
  {
    id: "ir-004",
    type: "interactive-reading",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 420,
    title: "Urban Microclimate and Heat Islands",
    passage: "Densely built urban areas often experience significantly higher ambient temperatures than surrounding rural landscapes, a phenomenon known as the urban heat island effect. Concrete surfaces absorb solar radiation throughout the day and re-emit heat at night.",
    questions: [
      { id: "ir-004-q1", type: "mcq", prompt: "What primary mechanism causes urban heat islands?", options: ["Concrete surfaces absorbing and re-emitting solar heat", "Geothermal energy release", "Industrial chemical reactions", "Increased cloud cover"], answer: "Concrete surfaces absorbing and re-emitting solar heat" }
    ]
  },
  {
    id: "ir-005",
    type: "interactive-reading",
    skill: "literacy",
    subscores: ["Literacy", "Comprehension"],
    difficulty: "high",
    difficultyValue: 140,
    timeLimit: 420,
    title: "Quantum Entanglement and Information Processing",
    passage: "Quantum entanglement describes a physical phenomenon where pairs of subatomic particles interact in ways such that the quantum state of each particle cannot be described independently. This property enables quantum cryptography and ultra-secure data transmissions.",
    questions: [
      { id: "ir-005-q1", type: "mcq", prompt: "What technology is made possible by quantum entanglement?", options: ["Ultra-secure quantum cryptography", "Silicon transistor production", "Magnetic tape storage", "Fiber optic routing"], answer: "Ultra-secure quantum cryptography" }
    ]
  },

  // ── 10. INTERACTIVE LISTENING (5 Items) ──────────────────────────────────
  {
    id: "il-001",
    type: "interactive-listening",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "medium",
    difficultyValue: 95,
    timeLimit: 420,
    title: "University Laboratory Collaboration",
    audioUrl: "/audio/det/il-001.mp3",
    scenarioText: "You are speaking with a fellow research student about coordinating your lab schedules for an upcoming chemistry project.",
    scenarioAudioText: "Hi, I wanted to discuss our lab schedule for next week. We need to reserve the spectroscopy machine before Tuesday.",
    questions: [
      { id: "il-001-q1", prompt: "What machine do you need to reserve before Tuesday?", options: ["Spectroscopy machine", "Centrifuge unit", "Electron microscope", "Thermal cycler"], answer: "Spectroscopy machine" },
      { id: "il-001-q2", prompt: "What is the primary topic of your discussion?", options: ["Coordinating lab schedules for chemistry project", "Submitting final grades", "Booking lecture halls", "Ordering glassware"], answer: "Coordinating lab schedules for chemistry project" }
    ],
    passageSummary: "Over the past term, collaborative research projects have given students hands-on technical skills in modern laboratory environments."
  },
  {
    id: "il-002",
    type: "interactive-listening",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 115,
    timeLimit: 420,
    title: "Academic Advisor Course Registration",
    audioUrl: "/audio/det/il-002.mp3",
    scenarioText: "You are speaking with your academic advisor about selecting elective courses for the upcoming semester.",
    scenarioAudioText: "Could you please review the latest dataset analysis before our meeting with Professor Davis tomorrow afternoon?",
    questions: [
      { id: "il-002-q1", prompt: "Who is the meeting scheduled with tomorrow afternoon?", options: ["Professor Davis", "Dean Roberts", "Student Services", "Department Chair"], answer: "Professor Davis" }
    ],
    passageSummary: "Academic guidance sessions help undergraduate students align elective coursework with career milestones."
  },
  {
    id: "il-003",
    type: "interactive-listening",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 420,
    title: "Campus Library Research Seminar",
    scenarioText: "You are speaking with a research librarian about accessing digitized academic journals for your senior thesis.",
    scenarioAudioText: "Our interlibrary loan system provides digital copies within twenty-four hours upon request.",
    questions: [
      { id: "il-003-q1", prompt: "How quickly are digital copies provided upon request?", options: ["Within 24 hours", "Within 3 days", "Immediately", "Within one week"], answer: "Within 24 hours" }
    ],
    passageSummary: "Digital archive subscriptions facilitate rapid literature synthesis for university researchers."
  },
  {
    id: "il-004",
    type: "interactive-listening",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 420,
    title: "Student Internship Presentation",
    scenarioText: "You are discussing your summer internship presentation requirements with your faculty coordinator.",
    scenarioAudioText: "Each presentation should highlight key project deliverables, technical challenges, and personal growth outcomes.",
    questions: [
      { id: "il-004-q1", prompt: "What three elements should be highlighted in the presentation?", options: ["Project deliverables, technical challenges, personal growth", "Company revenue, office location, dress code", "Class attendance, exam grades, homework", "Group size, budget, equipment cost"], answer: "Project deliverables, technical challenges, personal growth" }
    ],
    passageSummary: "Internship debriefs provide students an opportunity to articulate professional competencies."
  },
  {
    id: "il-005",
    type: "interactive-listening",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "high",
    difficultyValue: 140,
    timeLimit: 420,
    title: "Graduate Thesis Defense Preparation",
    scenarioText: "You are talking with your thesis committee chair regarding the structure of your oral presentation defense.",
    scenarioAudioText: "Plan for a twenty-minute overview followed by open questioning from committee members.",
    questions: [
      { id: "il-005-q1", prompt: "How long should the overview presentation last?", options: ["20 minutes", "10 minutes", "45 minutes", "One hour"], answer: "20 minutes" }
    ],
    passageSummary: "Oral thesis defenses rigorize candidate scholarship through peer critique."
  },

  // ── 11. INTERACTIVE WRITING (5 Items) ────────────────────────────────────
  {
    id: "iw-001",
    type: "interactive-writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "medium",
    difficultyValue: 95,
    timeLimit: 300,
    prompt: "Write about a memorable trip or journey you took. Describe where you went, who you were with, and why it was special. Write for 5 minutes.",
    followUpPrompt: "In your previous response, you discussed your journey. How has that experience influenced your perspective on traveling today? Write for 3 minutes."
  },
  {
    id: "iw-002",
    type: "interactive-writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 115,
    timeLimit: 300,
    prompt: "Describe an important technological tool you use daily. Explain its functions and why it is indispensable. Write for 5 minutes.",
    followUpPrompt: "Consider potential drawbacks of relying heavily on this tool. How can individuals balance technology use effectively? Write for 3 minutes."
  },
  {
    id: "iw-003",
    type: "interactive-writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 300,
    prompt: "Discuss a book or movie that significantly impacted your thinking. Summarize its main message and why it resonated with you. Write for 5 minutes.",
    followUpPrompt: "Would you recommend this work to peers studying your field? Explain why or why not. Write for 3 minutes."
  },
  {
    id: "iw-004",
    type: "interactive-writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 300,
    prompt: "Describe a challenging problem you encountered and how you solved it. Detail the obstacles faced and lessons learned. Write for 5 minutes.",
    followUpPrompt: "How will the lessons from that problem help you tackle future academic or professional challenges? Write for 3 minutes."
  },
  {
    id: "iw-005",
    type: "interactive-writing",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 140,
    timeLimit: 300,
    prompt: "Evaluate the role of remote work and distance learning in modern society. Discuss advantages and potential disadvantages. Write for 5 minutes.",
    followUpPrompt: "How do you foresee remote education evolving over the next decade? Write for 3 minutes."
  },

  // ── 12. INTERACTIVE SPEAKING (5 Items) ───────────────────────────────────
  {
    id: "is-001",
    type: "interactive-speaking",
    skill: "conversation",
    subscores: ["Conversation", "Production"],
    difficulty: "medium",
    difficultyValue: 90,
    timeLimit: 90,
    prompt: "Talk about an important goal you recently achieved. Describe what the goal was, the steps you took to accomplish it, and how you felt afterward. Speak for 90 seconds.",
    followUpPrompt: "Based on what you just shared, what advice would you give to someone setting a similar personal goal today? Speak for 45 seconds."
  },
  {
    id: "is-002",
    type: "interactive-speaking",
    skill: "conversation",
    subscores: ["Conversation", "Production"],
    difficulty: "high",
    difficultyValue: 110,
    timeLimit: 90,
    prompt: "Describe a favorite hobby or activity you enjoy in your spare time. Explain why you enjoy it and how often you practice it. Speak for 90 seconds.",
    followUpPrompt: "How has practicing this hobby helped you develop transferable skills useful in your academic studies? Speak for 45 seconds."
  },
  {
    id: "is-003",
    type: "interactive-speaking",
    skill: "conversation",
    subscores: ["Conversation", "Production"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 90,
    prompt: "Talk about a mentor or teacher who inspired you. Explain who they were and how they impacted your educational choices. Speak for 90 seconds.",
    followUpPrompt: "What qualities do you think make an effective mentor or educator? Speak for 45 seconds."
  },
  {
    id: "is-004",
    type: "interactive-speaking",
    skill: "conversation",
    subscores: ["Conversation", "Production"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 90,
    prompt: "Discuss an interesting place in your hometown or country that tourists should visit. Describe what makes it unique. Speak for 90 seconds.",
    followUpPrompt: "How does tourism impact local communities and cultural preservation? Speak for 45 seconds."
  },
  {
    id: "is-005",
    type: "interactive-speaking",
    skill: "conversation",
    subscores: ["Conversation", "Production"],
    difficulty: "high",
    difficultyValue: 140,
    timeLimit: 90,
    prompt: "Share your perspective on the importance of learning second languages in globalized careers. Speak for 90 seconds.",
    followUpPrompt: "What methods have proven most effective for you when mastering new language skills? Speak for 45 seconds."
  },

  // ── 13. WRITING SAMPLE (5 Items) ─────────────────────────────────────────
  {
    id: "ws-001",
    type: "writing-sample",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 120,
    timeLimit: 300,
    prompt: "Some people believe that artificial intelligence will transform higher education for the better, while others worry it will diminish critical thinking. Discuss your view with examples. Write at least 150 words."
  },
  {
    id: "ws-002",
    type: "writing-sample",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 300,
    prompt: "Should public universities offer free tuition for all domestic students? Support your opinion with arguments regarding economic and social impacts. Write at least 150 words."
  },
  {
    id: "ws-003",
    type: "writing-sample",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 300,
    prompt: "Discuss whether space exploration funding is justified given pressing environmental and economic challenges on Earth. Write at least 150 words."
  },
  {
    id: "ws-004",
    type: "writing-sample",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 135,
    timeLimit: 300,
    prompt: "Analyze how social media platforms influence public political discourse and media literacy among youth. Write at least 150 words."
  },
  {
    id: "ws-005",
    type: "writing-sample",
    skill: "production",
    subscores: ["Production", "Literacy"],
    difficulty: "high",
    difficultyValue: 145,
    timeLimit: 300,
    prompt: "Evaluate the ethical implications of genetic engineering technology in modern agriculture and medical science. Write at least 150 words."
  },

  // ── 14. SPEAKING SAMPLE (5 Items) ────────────────────────────────────────
  {
    id: "ss-001",
    type: "speaking-sample",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 180,
    prompt: "Describe a global environmental issue that concerns you. Explain why it is important and what actions communities can take to address it. Speak for 1 to 3 minutes."
  },
  {
    id: "ss-002",
    type: "speaking-sample",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 130,
    timeLimit: 180,
    prompt: "Do you prefer studying individually or collaborating in study groups? Explain your reasoning with personal academic experiences. Speak for 1 to 3 minutes."
  },
  {
    id: "ss-003",
    type: "speaking-sample",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 135,
    timeLimit: 180,
    prompt: "Talk about an invention or innovation that transformed human life over the last century. Explain its significance. Speak for 1 to 3 minutes."
  },
  {
    id: "ss-004",
    type: "speaking-sample",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 140,
    timeLimit: 180,
    prompt: "Discuss how cultural exchange programs foster cross-cultural understanding and international cooperation. Speak for 1 to 3 minutes."
  },
  {
    id: "ss-005",
    type: "speaking-sample",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 150,
    timeLimit: 180,
    prompt: "Share your vision for your future career after university graduation. Describe your professional aspirations and impact goals. Speak for 1 to 3 minutes."
  }
];
