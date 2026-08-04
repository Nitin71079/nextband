const listeningTest007 = {
  id: "listening-test-007",
  title: "IELTS Listening Practice Test 007",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test007.mp3",
  transcript: "/assets/listening/test007/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0, end: 384 },
    section2: { start: 384, end: 696 },
    section3: { start: 696, end: 1020 },
    section4: { start: 1020, end: 1306 }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 384,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "RIVERSIDE ACCOMMODATION BOOKING",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "Sarah Jenkins", explanation: "The student confirms her name is Sarah Jenkins." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900452", explanation: "Sarah gives her contact number 07700 900452." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "42 High Street, Oxford", explanation: "Sarah states her address is 42 High Street, Oxford." },
        { id: 4, type: "fill-in", number: 4, label: "Discounted Deposit (£):", answer: "45", explanation: "The discounted deposit fee is 45 pounds." },
        { id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation begins at 9:30 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Required ID Document:", answer: "photo ID", explanation: "Students must present valid photo ID at check-in." },
        { id: 7, type: "fill-in", number: 7, label: "Parent Parking Area:", answer: "north visitor", explanation: "Free parking is located in the north visitor car park." },
        { id: 8, type: "fill-in", number: 8, label: "Deposit Payment Method:", answer: "credit card", explanation: "Deposit is paid online via credit card." },
        { id: 9, type: "fill-in", number: 9, label: "Payment Reference Code:", answer: "REG904", explanation: "The payment reference code is REG904." },
        { id: 10, type: "fill-in", number: 10, label: "Head Hall Warden:", answer: "Mark", explanation: "Mark is the accommodation manager/warden." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: 384,
      audioEnd: 696,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "RIVERSIDE NATURE RESERVE ORIENTATION",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How large is the protected wetland reserve?", options: ["A. 25 hectares", "B. 50 hectares", "C. 100 hectares"], answer: "B", explanation: "The guide states the reserve spans 50 hectares." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time do the main reserve gates open daily?", options: ["A. 7:00 AM", "B. 8:00 AM", "C. 9:00 AM"], answer: "B", explanation: "Gates open daily at 8:00 AM." },
        { id: 13, type: "multiple-choice", number: 13, question: "What is located immediately inside the main entrance?", options: ["A. Information kiosk", "B. Exhibition hall", "C. Outdoor café"], answer: "A", explanation: "The entrance leads directly to the information kiosk." },
        { id: 14, type: "multiple-choice", number: 14, question: "What does the exhibition hall showcase?", options: ["A. Live animals", "B. Historic artifacts and digital displays", "C. Sculpture"], answer: "B", explanation: "The exhibition hall hosts historic artifacts and digital displays." },
        { id: 15, type: "multiple-choice", number: 15, question: "Where is the outdoor seating area positioned?", options: ["A. Main plaza", "B. Beside the café", "C. Gift shop"], answer: "B", explanation: "Outdoor seating is located beside the café." },
        { id: 16, type: "fill-in", number: 16, label: "Visitor path rule:", answer: "designated", explanation: "Visitors must stay on designated walking paths." },
        { id: 17, type: "fill-in", number: 17, label: "Guided nature walk frequency:", answer: "every hour", explanation: "Tours depart from the plaza every hour." },
        { id: 18, type: "fill-in", number: 18, label: "Tour leader qualification:", answer: "certified staff", explanation: "Tours are led by certified staff members." },
        { id: 19, type: "fill-in", number: 19, label: "Large group booking requirement:", answer: "advance online", explanation: "Groups over 10 must book in advance online." },
        { id: 20, type: "fill-in", number: 20, label: "First-aid location:", answer: "main visitor", explanation: "First-aid supplies are inside the main visitor building." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: 696,
      audioEnd: 1020,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "MICROPLASTICS RESEARCH TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "Why did Emma and Mark choose freshwater microplastics?", options: ["A. River pollution is escalating", "B. Low equipment cost", "C. Required by university"], answer: "A", explanation: "They selected the topic because river pollution is escalating." },
        { id: 22, type: "multiple-choice", number: 22, question: "What issue occurred during secondary sediment sampling?", options: ["A. Lost samples", "B. Margin of error", "C. Contaminated water"], answer: "B", explanation: "Sampling revealed a margin of error during storm events." },
        { id: 23, type: "multiple-choice", number: 23, question: "Which statistical model does Professor Davies suggest?", options: ["A. Simple average", "B. Multi-variable statistical regression", "C. Qualitative matrix"], answer: "B", explanation: "The professor recommends multi-variable statistical regression." },
        { id: 24, type: "multiple-choice", number: 24, question: "In which chapter will qualitative case studies be presented?", options: ["A. Chapter 1", "B. Chapter 3", "C. Chapter 5"], answer: "B", explanation: "Case studies will appear in Chapter 3." },
        { id: 25, type: "multiple-choice", number: 25, question: "When is the complete draft dissertation due?", options: ["A. End of October", "B. End of November", "C. Mid-December"], answer: "B", explanation: "The draft dissertation is due by the end of November." },
        { id: 26, type: "fill-in", number: 26, label: "Toxicity Data Software:", answer: "SPSS statistical", explanation: "They processed toxicity levels using SPSS statistical software." },
        { id: 27, type: "fill-in", number: 27, label: "Sampling delay cause:", answer: "heavy rainfall", explanation: "Sampling was delayed due to heavy rainfall." },
        { id: 28, type: "fill-in", number: 28, label: "Number of primary sampling sites:", answer: "three", explanation: "Core samples were taken across three primary sites." },
        { id: 29, type: "fill-in", number: 29, label: "Technical appendix content:", answer: "calibration logs", explanation: "Sensor calibration logs are attached in the appendix." },
        { id: 30, type: "fill-in", number: 30, label: "Primary submission goal:", answer: "draft dissertation", explanation: "The primary submission goal is the completed draft dissertation." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: 1020,
      audioEnd: 1306,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "AVIAN NAVIGATION LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Research expansion timeline:", answer: "three decades", explanation: "Research has expanded over the past three decades." },
        { id: 32, type: "fill-in", number: 32, label: "Early lab studies established:", answer: "baseline parameters", explanation: "Studies established biological baseline parameters." },
        { id: 33, type: "fill-in", number: 33, label: "Songbird tracking technology:", answer: "satellite telemetry", explanation: "Miniature satellite telemetry enables songbird tracking." },
        { id: 34, type: "fill-in", number: 34, label: "Severe weather flock adaptation:", answer: "structural reorganization", explanation: "Flocks undergo behavioral structural reorganization." },
        { id: 35, type: "fill-in", number: 35, label: "Navigation accuracy regulator:", answer: "physiological feedback", explanation: "Regulated through physiological feedback mechanisms." },
        { id: 36, type: "fill-in", number: 36, label: "Drone sensor bio-adaptation:", answer: "biological principles", explanation: "Engineers adapt biological principles for drone sensors." },
        { id: 37, type: "fill-in", number: 37, label: "Magnetic compass validation timeframe:", answer: "multi-decadal", explanation: "Requires continuous multi-decadal observation." },
        { id: 38, type: "fill-in", number: 38, label: "Standard lab test limitation:", answer: "non-linear dynamics", explanation: "Lab tests miss non-linear dynamics during migration." },
        { id: 39, type: "fill-in", number: 39, label: "Essential global action:", answer: "standardized monitoring", explanation: "Establishing standardized monitoring is crucial." },
        { id: 40, type: "fill-in", number: 40, label: "Key to solving navigation mysteries:", answer: "interdisciplinary collaboration", explanation: "Requires interdisciplinary collaboration." }
      ]
    }
  ]
};

export default listeningTest007;