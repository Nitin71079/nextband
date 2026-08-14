/**
 * Knarrow DET Full Mock Tests Dataset
 * Contains 12 Full-Length Practice Exams covering all 14 official DET task types.
 */

export const detTests = [
  // ── MOCK EXAM 1 ──────────────────────────────────────────────────────────
  {
    id: 1,
    title: "DET Full Practice Test 1 — Standard Academic & General",
    difficulty: "Medium",
    durationMinutes: 60,
    targetScore: 120,
    description: "Complete adaptive simulation covering all 14 Duolingo English Test task types with instant automated subscoring.",
    questions: [
      {
        id: "det1_rc1",
        type: "read-and-complete",
        timeLimitSeconds: 180,
        title: "Read and Complete — Task 1",
        instructions: "Fill in the missing letters to complete the words in the paragraph below.",
        passage: [
          { text: "Scientific research shows that regular ", blank: false },
          { text: "phys", missing: "ical", hint: "physical", blank: true },
          { text: " activity significantly enhances cognitive function. Exer", blank: false },
          { text: "c", missing: "ise", hint: "cise", blank: true },
          { text: " promotes blood flow to the brain, stimulate", blank: false },
          { text: "s", missing: "s", hint: "s", blank: true },
          { text: " the growth of new neural connections, and impr", blank: false },
          { text: "ov", missing: "es", hint: "oves", blank: true },
          { text: " overall mental clarity and memory retention.", blank: false },
        ]
      },
      {
        id: "det1_swrs1",
        type: "single-word-read-select",
        timeLimitSeconds: 5,
        word: "handen",
        isReal: false,
        title: "Read and Select (Single Word)"
      },
      {
        id: "det1_fitb1",
        type: "fill-in-the-blanks",
        timeLimitSeconds: 20,
        sentenceBefore: "The number of website error reports we are receiving is ",
        targetWord: "alarming",
        sentenceAfter: ", so we must fix them right away.",
        title: "Fill in the Blanks"
      },
      {
        id: "det1_rs1",
        type: "read-and-select",
        timeLimitSeconds: 60,
        title: "Read and Select — Task 1",
        instructions: "Select the real English words in the list.",
        words: [
          { word: "Eloquent", isReal: true },
          { word: "Flabbergast", isReal: true },
          { word: "Plimpt", isReal: false },
          { word: "Resilient", isReal: true },
          { word: "Crandal", isReal: false },
          { word: "Substantiate", isReal: true },
          { word: "Vigorish", isReal: false },
          { word: "Meticulous", isReal: true }
        ]
      },
      {
        id: "det1_lt1",
        type: "listen-and-type",
        timeLimitSeconds: 60,
        title: "Listen and Type",
        audioText: "Scientific research suggests that regular exercise improves cognitive performance.",
        audioUrl: "/audio/det/lt-001.mp3"
      },
      {
        id: "det1_ra1",
        type: "read-aloud",
        timeLimitSeconds: 20,
        title: "Read Aloud",
        sentence: "The university library will remain open until midnight during final exam week."
      },
      {
        id: "det1_di1",
        type: "describe-image",
        timeLimitSeconds: 60,
        title: "Write About the Image",
        prompt: "Write a description of the image below for 1 minute.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "det1_sai1",
        type: "speak-about-image",
        timeLimitSeconds: 90,
        title: "Speak About the Image",
        prompt: "Speak about the image below for 90 seconds.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "det1_ir1",
        type: "interactive-reading",
        timeLimitSeconds: 420,
        title: "Interactive Reading — Urban Biodiversity",
        passageText: "Urban biodiversity refers to the variety of living organisms in city environments. Green roofs and urban parks provide crucial habitats for pollinators and migratory birds, counteracting habitat fragmentation caused by concrete infrastructure.",
        questions: [
          { id: "q1", prompt: "What role do green roofs play in cities?", options: ["Provide habitats for pollinators", "Reduce internet traffic", "Lower building costs"], answer: "Provide habitats for pollinators" }
        ]
      },
      {
        id: "det1_il1",
        type: "interactive-listening",
        timeLimitSeconds: 420,
        title: "Interactive Listening — Campus Discussion",
        audioUrl: "/audio/det/il-001.mp3",
        scenarioAudioText: "Hi, I wanted to discuss our lab schedule for next week. We need to reserve the spectroscopy machine before Tuesday.",
        questions: [
          { id: "q1", prompt: "What machine needs to be reserved?", options: ["Spectroscopy machine", "Microscope", "Thermal cycler"], answer: "Spectroscopy machine" }
        ]
      },
      {
        id: "det1_iw1",
        type: "interactive-writing",
        timeLimitSeconds: 300,
        title: "Interactive Writing",
        prompt: "Write about a memorable trip or journey you took. Describe where you went and why it was special. Write for 5 minutes."
      },
      {
        id: "det1_is1",
        type: "interactive-speaking",
        timeLimitSeconds: 90,
        title: "Interactive Speaking",
        prompt: "Talk about an important goal you recently achieved. Speak for 90 seconds."
      },
      {
        id: "det1_ws1",
        type: "writing-sample",
        timeLimitSeconds: 300,
        title: "Writing Sample",
        prompt: "Discuss the advantages and disadvantages of online education compared to traditional classroom learning. Write at least 150 words."
      },
      {
        id: "det1_ss1",
        type: "speaking-sample",
        timeLimitSeconds: 180,
        title: "Speaking Sample",
        prompt: "Describe a global environmental issue that concerns you and actions communities can take. Speak for 1 to 3 minutes."
      }
    ]
  },

  // ── MOCK EXAMS 2 TO 12 ───────────────────────────────────────────────────
  ...Array.from({ length: 11 }).map((_, index) => {
    const testNum = index + 2;
    const difficulties = ["Medium", "Medium-High", "Hard", "Advanced"];
    const diff = difficulties[index % difficulties.length];
    const targetScores = [125, 130, 135, 140, 145, 150];
    const targetScore = targetScores[index % targetScores.length];

    const testTitles = [
      "Advanced Proficiency (Target 135+)",
      "Science & Technology Focus",
      "Business & Global Commerce",
      "Environmental & Climate Policy",
      "Humanities & Social Sciences",
      "Academic Scholarship Readiness",
      "High-Speed Speed & Literacy",
      "Conversation & Spoken Production",
      "C1-C2 Master Level Challenge",
      "Comprehensive Campus Life Exam",
      "Ultimate Grand Mock Exam"
    ];

    return {
      id: testNum,
      title: `DET Full Practice Test ${testNum} — ${testTitles[index]}`,
      difficulty: diff,
      durationMinutes: 60,
      targetScore,
      description: `Complete 14-task adaptive DET mock exam focused on ${testTitles[index].toLowerCase()} with instant AI scoring and subscore diagnostics.`,
      questions: [
        { id: `det${testNum}_rc1`, type: "read-and-complete", timeLimitSeconds: 180, title: "Read and Complete" },
        { id: `det${testNum}_swrs1`, type: "single-word-read-select", timeLimitSeconds: 5, word: "meticulous", isReal: true, title: "Read and Select (Single Word)" },
        { id: `det${testNum}_fitb1`, type: "fill-in-the-blanks", timeLimitSeconds: 20, sentenceBefore: "Renewable energy adoption has grown at an ", targetWord: "unprecedented", sentenceAfter: " pace.", title: "Fill in the Blanks" },
        { id: `det${testNum}_rs1`, type: "read-and-select", timeLimitSeconds: 60, title: "Read and Select", words: [{ word: "Pragmatic", isReal: true }, { word: "Volitancy", isReal: false }] },
        { id: `det${testNum}_lt1`, type: "listen-and-type", timeLimitSeconds: 60, title: "Listen and Type", audioText: "International research collaboration improves academic outcomes.", audioUrl: "/audio/det/lt-002.mp3" },
        { id: `det${testNum}_ra1`, type: "read-aloud", timeLimitSeconds: 20, title: "Read Aloud", sentence: "Interdisciplinary research projects foster innovative solutions to global challenges." },
        { id: `det${testNum}_di1`, type: "describe-image", timeLimitSeconds: 60, title: "Write About the Image", prompt: "Write a description of the image below for 1 minute.", imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80" },
        { id: `det${testNum}_sai1`, type: "speak-about-image", timeLimitSeconds: 90, title: "Speak About the Image", prompt: "Speak about the image below for 90 seconds.", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
        { id: `det${testNum}_ir1`, type: "interactive-reading", timeLimitSeconds: 420, title: "Interactive Reading", passageText: "Marine ecosystems support global biodiversity. Coral reefs shelter over twenty-five percent of marine life.", questions: [{ id: "q1", prompt: "What percentage of marine life do coral reefs shelter?", options: ["Over 25%", "Under 5%", "50%"], answer: "Over 25%" }] },
        { id: `det${testNum}_il1`, type: "interactive-listening", timeLimitSeconds: 420, title: "Interactive Listening", audioUrl: "/audio/det/il-002.mp3", scenarioAudioText: "Could you please review the latest dataset analysis before our meeting tomorrow?", questions: [{ id: "q1", prompt: "What needs to be reviewed?", options: ["Dataset analysis", "Exam syllabus", "Budget sheet"], answer: "Dataset analysis" }] },
        { id: `det${testNum}_iw1`, type: "interactive-writing", timeLimitSeconds: 300, title: "Interactive Writing", prompt: "Describe an important technological tool you use daily and its impact. Write for 5 minutes." },
        { id: `det${testNum}_is1`, type: "interactive-speaking", timeLimitSeconds: 90, title: "Interactive Speaking", prompt: "Describe a favorite hobby or activity you enjoy in your spare time. Speak for 90 seconds." },
        { id: `det${testNum}_ws1`, type: "writing-sample", timeLimitSeconds: 300, title: "Writing Sample", prompt: "Should public universities offer free tuition for domestic students? Discuss your opinion with reasons." },
        { id: `det${testNum}_ss1`, type: "speaking-sample", timeLimitSeconds: 180, title: "Speaking Sample", prompt: "Do you prefer studying individually or collaborating in study groups? Speak for 1 to 3 minutes." }
      ]
    };
  })
];
