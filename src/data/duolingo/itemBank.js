/**
 * DET Item Bank — Item Data Model for Duolingo English Test Adaptive Engine
 * Tagged by skill, question type, difficulty tier (low: 10-60, medium: 65-100, high: 105-160), and subscores.
 */

export const DET_QUESTION_TYPES = {
  READ_AND_COMPLETE: "read-and-complete",
  READ_AND_SELECT: "read-and-select",
  LISTEN_AND_TYPE: "listen-and-type",
  READ_ALOUD: "read-aloud",
  INTERACTIVE_READING: "interactive-reading",
  INTERACTIVE_WRITING: "interactive-writing",
  INTERACTIVE_SPEAKING: "interactive-speaking",
  WRITING_SAMPLE: "writing-sample",
  SPEAKING_SAMPLE: "speaking-sample",
};

export const detItemBank = [
  // ── 1. READ AND COMPLETE (C-Test fill in missing letters) ──────────────
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
      { type: "text", value: "rned with the development and design of land use and the built " },
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
    answers: {
      "blank_1": "thesis",
      "blank_3": "ich",
      "blank_5": "isms",
      "blank_7": "to",
      "blank_9": "cules"
    }
  },

  // ── 2. READ AND SELECT (Vocabulary recognition) ─────────────────────────
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

  // ── 3. LISTEN AND TYPE (Dictation) ──────────────────────────────────────
  {
    id: "lt-001",
    type: "listen-and-type",
    skill: "comprehension",
    subscores: ["Comprehension", "Conversation"],
    difficulty: "medium",
    difficultyValue: 80,
    timeLimit: 60,
    maxReplays: 2,
    audioText: "Scientific research suggests that regular exercise improves cognitive performance.",
    prompt: "Type the statement that you hear."
  },

  // ── 4. READ ALOUD (Pronunciation & Fluency) ─────────────────────────────
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

  // ── 5. INTERACTIVE READING (Passage + Multiple questions) ───────────────
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

  // ── 6. INTERACTIVE WRITING (Prompt + Follow-up) ──────────────────────────
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

  // ── 7. INTERACTIVE SPEAKING (Prompt + Follow-up) ─────────────────────────
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

  // ── 8. WRITING SAMPLE (Extended Writing) ───────────────────────────────
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

  // ── 9. SPEAKING SAMPLE (Extended Speaking) ──────────────────────────────
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
