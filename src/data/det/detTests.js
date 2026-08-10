/**
 * Duolingo English Test (DET) Full Mock Tests Dataset
 */

export const detTests = [
  {
    id: 1,
    title: "DET Full Practice Test 1 — Standard Academic & General",
    difficulty: "Medium",
    durationMinutes: 60,
    targetScore: 120,
    description: "Complete adaptive simulation covering all 11 Duolingo English Test task types with instant automated subscoring.",
    questions: [
      // 1. READ AND COMPLETE
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
        id: "det1_rc2",
        type: "read-and-complete",
        timeLimitSeconds: 180,
        title: "Read and Complete — Task 2",
        instructions: "Fill in the missing letters to complete the words in the passage.",
        passage: [
          { text: "Renewable energy technologies have transformed modern ", blank: false },
          { text: "infr", missing: "astructure", hint: "infrastructure", blank: true },
          { text: ". Solar panels and wind turbines now produce a major ", blank: false },
          { text: "por", missing: "tion", hint: "portion", blank: true },
          { text: " of global electricity, reducing reliance on fossil fuels and lower", blank: false },
          { text: "i", missing: "ng", hint: "ing", blank: true },
          { text: " carbon emissions worldwide.", blank: false },
        ]
      },

      // 2. READ AND SELECT (Real vs Fake Words)
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
          { word: "Substantial", isReal: true },
          { word: "Vigorously", isReal: true },
          { word: "Crandal", isReal: false },
          { word: "Meticulous", isReal: true },
          { word: "Brevity", isReal: true },
          { word: "Sproot", isReal: false },
          { word: "Ambiguous", isReal: true },
          { word: "Glimp", isReal: false },
          { word: "Phenomenon", isReal: true },
        ]
      },

      // 3. LISTEN AND SELECT
      {
        id: "det1_ls1",
        type: "listen-and-select",
        timeLimitSeconds: 90,
        title: "Listen and Select — Task 1",
        instructions: "Listen to each word and select the real English words.",
        words: [
          { word: "Accurate", audioText: "Accurate", isReal: true },
          { word: "Bramble", audioText: "Bramble", isReal: true },
          { word: "Drapple", audioText: "Drapple", isReal: false },
          { word: "Formidable", audioText: "Formidable", isReal: true },
          { word: "Prentle", audioText: "Prentle", isReal: false },
          { word: "Hypothesis", audioText: "Hypothesis", isReal: true },
        ]
      },

      // 4. LISTEN AND TYPE (Dictation)
      {
        id: "det1_lt1",
        type: "listen-and-type",
        timeLimitSeconds: 60,
        title: "Listen and Type",
        instructions: "Listen to the sentence and type exactly what you hear. You can replay the audio up to 3 times.",
        audioText: "The professor asked the students to submit their final essays before midnight on Friday.",
        maxReplays: 3,
        correctSentence: "The professor asked the students to submit their final essays before midnight on Friday."
      },

      // 5. READ ALOUD
      {
        id: "det1_ra1",
        type: "read-aloud",
        timeLimitSeconds: 20,
        title: "Read Aloud",
        instructions: "Read the sentence below aloud into your microphone.",
        sentence: "Technological advancements continue to reshape the global economy at an unprecedented pace."
      },

      // 6. WRITE ABOUT THE IMAGE
      {
        id: "det1_wi1",
        type: "write-about-image",
        timeLimitSeconds: 60,
        title: "Write About the Image",
        instructions: "Write 1 or more sentences describing the image below.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Students working together at a library table with laptops and textbooks",
        sampleAnswer: "A group of diverse university students is collaborating around a modern wooden study table filled with open notebooks, laptops, and textbooks in a bright library environment."
      },

      // 7. SPEAK ABOUT THE IMAGE
      {
        id: "det1_si1",
        type: "speak-about-image",
        timeLimitSeconds: 90,
        minSpeakingSeconds: 30,
        title: "Speak About the Image",
        instructions: "Talk about the image below for at least 30 seconds.",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        imageAlt: "A presenter standing in front of a white board explaining data to colleagues in a conference room",
        guidingQuestions: [
          "What is happening in this picture?",
          "Who are the people and what are they doing?",
          "What setting does this appear to be?"
        ]
      },

      // 8. INTERACTIVE READING
      {
        id: "det1_ir1",
        type: "interactive-reading",
        timeLimitSeconds: 420, // 7 mins for passage
        title: "Interactive Reading — Urban Biodiversity",
        passageTitle: "Urban Biodiversity and Green Spaces",
        fullPassage: "Cities around the world are increasingly incorporating green infrastructure to combat climate change and enhance urban living standards. Parks, rooftop gardens, and urban forests provide essential ecological habitats for local wildlife while simultaneously mitigating the urban heat island effect. Furthermore, access to natural spaces within urban centers has been proven to lower stress levels and boost psychological well-being among residents.",
        tasks: [
          {
            type: "complete-the-text",
            question: "Select the best word to fill in the blank:",
            textBefore: "Cities around the world are increasingly incorporating green infrastructure to ",
            options: ["combat", "ignore", "diminish", "postpone"],
            answer: 0,
            explanation: "'Combat' fits best in the context of fighting or mitigating climate change."
          },
          {
            type: "complete-passage",
            question: "Choose the sentence that best fits the blank space at the end of paragraph:",
            options: [
              "Consequently, city planners are prioritizing sustainable urban design in future developments.",
              "However, many people still prefer traditional concrete architecture.",
              "As a result, wildlife in rural regions has completely migrated into cities.",
              "Therefore, car traffic has increased dramatically in downtown areas."
            ],
            answer: 0,
            explanation: "Logical conclusion highlighting city planners prioritizing sustainable design."
          },
          {
            type: "highlight-answer",
            question: "Highlight the text in the passage that explains the psychological benefit of urban nature.",
            correctSentence: "access to natural spaces within urban centers has been proven to lower stress levels and boost psychological well-being among residents."
          },
          {
            type: "identify-main-idea",
            question: "What is the main idea of the passage?",
            options: [
              "Green spaces in cities improve environmental resilience and human well-being.",
              "Concrete buildings are more cost-effective than parks.",
              "Urban heat islands cannot be controlled by city planners.",
              "Rooftop gardens cause building maintenance difficulties."
            ],
            answer: 0
          }
        ]
      },

      // 9. INTERACTIVE WRITING
      {
        id: "det1_iw1",
        type: "interactive-writing",
        title: "Interactive Writing",
        prompt1: {
          timeLimitSeconds: 300, // 5 mins
          instructions: "Write a response to the prompt below (min 50 words).",
          question: "Some people believe that artificial intelligence will replace human teachers in the future, while others argue that teachers will always be essential. Discuss your opinion with specific reasons and examples."
        },
        prompt2: {
          timeLimitSeconds: 180, // 3 mins
          instructions: "Follow-up question based on your response:",
          question: "How can technology be integrated into classrooms today to support human teachers rather than replacing them?"
        }
      },

      // 10. WRITING SAMPLE
      {
        id: "det1_ws1",
        type: "writing-sample",
        timeLimitSeconds: 300,
        title: "Writing Sample",
        instructions: "Write for 5 minutes about the topic below. Your response will be evaluated for vocabulary, grammar, coherence, and task completion.",
        question: "Describe a personal or academic goal you achieved recently. Explain why this goal was important to you, the steps you took to reach it, and what you learned from the experience."
      },

      // 11. SPEAKING SAMPLE
      {
        id: "det1_ss1",
        type: "speaking-sample",
        timeLimitSeconds: 180,
        minSpeakingSeconds: 60,
        title: "Speaking Sample",
        instructions: "Choose 1 topic from the 2 choices below and speak for 1 to 3 minutes.",
        options: [
          "Topic A: Talk about a book or film that influenced your perspective on life.",
          "Topic B: Describe a memorable journey or trip you took with family or friends."
        ]
      }
    ]
  },
  {
    id: 2,
    title: "DET Full Practice Test 2 — Advanced Proficiency (Target 135+)",
    difficulty: "Hard",
    durationMinutes: 60,
    targetScore: 135,
    description: "Advanced Duolingo English Test mock tailored for high-ranking university admissions demanding C1/C2 English fluency.",
    questions: [
      {
        id: "det2_rc1",
        type: "read-and-complete",
        timeLimitSeconds: 180,
        title: "Read and Complete — Advanced Science",
        instructions: "Fill in the missing letters in the words below.",
        passage: [
          { text: "Astrophysicists recently observed gravitational ", blank: false },
          { text: "wa", missing: "ves", hint: "waves", blank: true },
          { text: " emitted during a neutron star collision. This groundbreaking ", blank: false },
          { text: "disc", missing: "overy", hint: "overy", blank: true },
          { text: " provides crucial empirical evidence supporting Einstein's theory of ", blank: false },
          { text: "rel", missing: "ativity", hint: "ativity", blank: true },
          { text: " and offers unprecedented insights into space-time mechanics.", blank: false },
        ]
      },
      {
        id: "det2_rs1",
        type: "read-and-select",
        timeLimitSeconds: 60,
        title: "Read and Select — Advanced Vocabulary",
        instructions: "Select all valid English words.",
        words: [
          { word: "Ubiquitous", isReal: true },
          { word: "Quixotic", isReal: true },
          { word: "Glimmeration", isReal: false },
          { word: "Serendipity", isReal: true },
          { word: "Pragmatic", isReal: true },
          { word: "Stravolate", isReal: false },
          { word: "Juxtaposition", isReal: true },
          { word: "Epistemology", isReal: true },
          { word: "Plunderous", isReal: false },
          { word: "Alacrity", isReal: true },
        ]
      },
      {
        id: "det2_wi1",
        type: "write-about-image",
        timeLimitSeconds: 60,
        title: "Write About the Image",
        instructions: "Write 1 or more sentences describing the image below.",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "A futuristic modern office building with floor-to-ceiling glass windows overlooking a city skyline",
        sampleAnswer: "An architectural view of a sleek, modern commercial skyscraper with expansive glass windows reflecting the urban city skyline under a clear blue sky."
      },
      {
        id: "det2_ws1",
        type: "writing-sample",
        timeLimitSeconds: 300,
        title: "Writing Sample — Academic Opinion",
        instructions: "Write for 5 minutes about the topic below.",
        question: "Should university education be completely free for all citizens funded by government taxes? Support your position with logical arguments and real-world examples."
      }
    ]
  }
];

export default detTests;
