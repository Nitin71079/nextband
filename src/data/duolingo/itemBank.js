/**
 * Knarrow DET Suite — 100% Original Item Bank & Data Models for DET Adaptive Engine
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
  // ── 1. SINGLE WORD READ AND SELECT ──────────────────────────────────────
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

  // ── 2. FILL IN THE BLANKS ────────────────────────────────────────────────
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

  // ── 3. DESCRIBE IMAGE (WRITE & SPEAK) ────────────────────────────────────
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

  // ── 4. INTERACTIVE LISTENING (5-STAGE SCENARIO) ──────────────────────────
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
      {
        id: "il-001-q1",
        prompt: "What machine do you need to reserve before Tuesday?",
        options: ["Spectroscopy machine", "Centrifuge unit", "Electron microscope", "Thermal cycler"],
        answer: "Spectroscopy machine"
      },
      {
        id: "il-001-q2",
        prompt: "What is the primary topic of your discussion?",
        options: ["Coordinating lab schedules for chemistry project", "Submitting final grades", "Booking lecture halls", "Ordering glassware"],
        answer: "Coordinating lab schedules for chemistry project"
      }
    ],
    passageSummary: "Over the past term, collaborative research projects have given students hands-on technical skills in modern laboratory environments."
  },

  // ── 5. READ AND COMPLETE (C-Test) ────────────────────────────────────────
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
    answers: {
      "blank_1": "ning",
      "blank_3": "cal",
      "blank_5": "cal",
      "blank_7": "rned",
      "blank_9": "nment"
    }
  },

  // ── 6. READ AND SELECT (Word Bank) ───────────────────────────────────────
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

  // ── 7. LISTEN AND TYPE (Dictation) ──────────────────────────────────────
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

  // ── 8. READ ALOUD ────────────────────────────────────────────────────────
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

  // ── 9. INTERACTIVE READING ───────────────────────────────────────────────
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
      {
        id: "ir-001-q1",
        type: "mcq",
        prompt: "Which structural innovation allowed Gothic cathedrals to achieve greater height?",
        options: ["Flying buttress and pointed arch", "Wooden timber scaffolds", "Thick solid brick walls", "Iron reinforced columns"],
        answer: "Flying buttress and pointed arch"
      },
      {
        id: "ir-001-q2",
        type: "select-sentence",
        prompt: "Select the sentence that explains how natural light entered cathedral interiors.",
        targetSentence: "Large stained glass windows illuminated interiors with colored natural light."
      }
    ]
  },

  // ── 10. INTERACTIVE WRITING ──────────────────────────────────────────────
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

  // ── 11. INTERACTIVE SPEAKING ─────────────────────────────────────────────
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

  // ── 12. WRITING SAMPLE ───────────────────────────────────────────────────
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

  // ── 13. SPEAKING SAMPLE ──────────────────────────────────────────────────
  {
    id: "ss-001",
    type: "speaking-sample",
    skill: "production",
    subscores: ["Production", "Conversation"],
    difficulty: "high",
    difficultyValue: 125,
    timeLimit: 180,
    prompt: "Describe a global environmental issue that concerns you. Explain why it is important and what actions communities can take to address it. Speak for 1 to 3 minutes."
  }
];
