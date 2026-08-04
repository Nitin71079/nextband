const listeningTest010 = {
  id: "listening-test-010",
  title: "IELTS Listening Practice Test 010",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test0010.mp3",
  transcript: "/assets/listening/test010/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0, end: 409 },
    section2: { start: 409, end: 754 },
    section3: { start: 754, end: 1125 },
    section4: { start: 1125, end: 1541 }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 409,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "CAR RENTAL SERVICE BOOKING",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "James Wilson", explanation: "The speaker confirms her full name is James Wilson." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900888", explanation: "The speaker corrects her phone number to 07700 900888." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "12 Victoria Road, Manchester", explanation: "The residential address given is 12 Victoria Road, Manchester." },
        { id: 4, type: "fill-in", number: 4, label: "Discounted Fee (£):", answer: "50", explanation: "The local resident fee is 50 pounds." },
        { id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation starts at 9:30 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "photo ID", explanation: "Participants must bring valid photo ID." },
        { id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "north visitor", explanation: "Free parking is located in the north visitor car park." },
        { id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment is processed online via credit card." },
        { id: 9, type: "fill-in", number: 9, label: "Reference Code:", answer: "REG904", explanation: "The reference code provided is REG904." },
        { id: 10, type: "fill-in", number: 10, label: "Contact Person:", answer: "Mark", explanation: "Mark is the administration officer." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: 409,
      audioEnd: 754,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "REGIONAL ART GALLERY EXHIBITION",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "What is the total size of the facility grounds?", options: ["A. 25 hectares", "B. 25 hectares", "C. 100 hectares"], answer: "B", explanation: "The presenter confirms the site spans 25 hectares." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time does the facility open daily?", options: ["A. 7:00 AM", "B. 8:00 AM", "C. 9:00 AM"], answer: "B", explanation: "The presenter states grounds open from 8:00 AM." },
        { id: 13, type: "multiple-choice", number: 13, question: "Where is the gift shop situated?", options: ["A. Main entrance", "B. Beside the lake", "C. Inside the café"], answer: "A", explanation: "The entrance leads directly to the information kiosk and gift shop." },
        { id: 14, type: "multiple-choice", number: 14, question: "What is featured in the exhibition hall?", options: ["A. Modern art", "B. Historic artifacts and digital displays", "C. Sculpture"], answer: "B", explanation: "The hall features historic artifacts and digital displays." },
        { id: 15, type: "multiple-choice", number: 15, question: "Where can visitors find outdoor seating?", options: ["A. Car park", "B. Beside the café", "C. Information kiosk"], answer: "B", explanation: "Outdoor seating is located beside the café." },
        { id: 16, type: "fill-in", number: 16, label: "Rule on walking paths:", answer: "designated", explanation: "Visitors must remain on designated walking paths." },
        { id: 17, type: "fill-in", number: 17, label: "Guided tour departure frequency:", answer: "every hour", explanation: "Tours depart every hour on the hour." },
        { id: 18, type: "fill-in", number: 18, label: "Guided tour leader qualification:", answer: "certified staff", explanation: "Tours are led by certified staff members." },
        { id: 19, type: "fill-in", number: 19, label: "Special group booking requirement:", answer: "advance online", explanation: "Group bookings must be made in advance online." },
        { id: 20, type: "fill-in", number: 20, label: "First-aid station location:", answer: "main visitor", explanation: "First-aid stations are located inside the main visitor center." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: 754,
      audioEnd: 1125,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "PROJECT DISCUSSION",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "What is the primary topic of the students' research proposal?", options: ["A. Research Project", "B. Financial budgeting", "C. Student housing"], answer: "A", explanation: "The discussion focuses on the research proposal." },
        { id: 22, type: "multiple-choice", number: 22, question: "What limitation was noted in secondary sampling?", options: ["A. High equipment cost", "B. Margin of error", "C. Missing documentation"], answer: "B", explanation: "Sampling showed a margin of error during weather events." },
        { id: 23, type: "multiple-choice", number: 23, question: "What model does the professor recommend?", options: ["A. Linear calculation", "B. Multi-variable statistical regression", "C. Qualitative survey"], answer: "B", explanation: "The professor advises multi-variable statistical regression." },
        { id: 24, type: "multiple-choice", number: 24, question: "In which chapter will qualitative case studies be presented?", options: ["A. Chapter 1", "B. Chapter 3", "C. Chapter 5"], answer: "B", explanation: "Case studies will appear in Chapter 3." },
        { id: 25, type: "multiple-choice", number: 25, question: "When is the final draft dissertation due?", options: ["A. End of October", "B. End of November", "C. Mid-December"], answer: "B", explanation: "Draft is due by the end of November." },
        { id: 26, type: "fill-in", number: 26, label: "Data Processing Tool:", answer: "SPSS statistical", explanation: "Data was processed using SPSS statistical software." },
        { id: 27, type: "fill-in", number: 27, label: "Field Sampling Issue Cause:", answer: "heavy rainfall", explanation: "Challenges arose due to heavy rainfall." },
        { id: 28, type: "fill-in", number: 28, label: "Primary Sampling Sites Count:", answer: "three", explanation: "Data was collected across three primary sites." },
        { id: 29, type: "fill-in", number: 29, label: "Appendix Inclusion:", answer: "calibration logs", explanation: "Appendix includes instrument calibration logs." },
        { id: 30, type: "fill-in", number: 30, label: "Final Submission Target:", answer: "draft dissertation", explanation: "The team will submit their completed draft dissertation." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: 1125,
      audioEnd: 1541,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "UNIVERSITY LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Research field expansion period:", answer: "three decades", explanation: "Research has expanded over three decades." },
        { id: 32, type: "fill-in", number: 32, label: "Early research established:", answer: "baseline parameters", explanation: "Initial research established baseline physical parameters." },
        { id: 33, type: "fill-in", number: 33, label: "Telemetry technology:", answer: "satellite telemetry", explanation: "Satellite telemetry enabled detailed insights." },
        { id: 34, type: "fill-in", number: 34, label: "Environmental pressure outcome:", answer: "structural reorganization", explanation: "Pressures induce structural reorganization." },
        { id: 35, type: "fill-in", number: 35, label: "Equilibrium regulation mechanism:", answer: "physiological feedback", explanation: "Physiological feedback loops regulate equilibrium." },
        { id: 36, type: "fill-in", number: 36, label: "Engineering applications adopt:", answer: "biological principles", explanation: "Engineers adopt biological principles." },
        { id: 37, type: "fill-in", number: 37, label: "Long-term data collection period:", answer: "multi-decadal", explanation: "Data was collected over multi-decadal cycles." },
        { id: 38, type: "fill-in", number: 38, label: "Short-term study limitation:", answer: "non-linear dynamics", explanation: "Short-term studies fail to capture non-linear dynamics." },
        { id: 39, type: "fill-in", number: 39, label: "Essential global protocol:", answer: "standardized monitoring", explanation: "Standardized monitoring remains indispensable." },
        { id: 40, type: "fill-in", number: 40, label: "Key to global solutions:", answer: "interdisciplinary collaboration", explanation: "Interdisciplinary collaboration is crucial." }
      ]
    }
  ]
};

export default listeningTest010;