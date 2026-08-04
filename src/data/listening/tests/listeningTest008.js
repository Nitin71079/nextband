const listeningTest008 = {
  id: "listening-test-008",
  title: "IELTS Listening Practice Test 008",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test008.mp3",
  transcript: "/assets/listening/test008/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0, end: 378 },
    section2: { start: 378, end: 676 },
    section3: { start: 676, end: 995 },
    section4: { start: 995, end: 1270 }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 378,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "CITY SPORTS & FITNESS CLUB REGISTRATION",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "David Miller", explanation: "The applicant confirms his name is David Miller." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900342", explanation: "David provides contact number 07700 900342." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "18 Station Road, Cambridge", explanation: "David gives address 18 Station Road, Cambridge." },
        { id: 4, type: "fill-in", number: 4, label: "Corporate Join Fee (£):", answer: "60", explanation: "The corporate discount joining fee is 60 pounds." },
        { id: 5, type: "fill-in", number: 5, label: "Induction Time:", answer: "10:00 AM", explanation: "Induction takes place at 10:00 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Document required:", answer: "membership card", explanation: "Members must bring photo membership card or valid ID." },
        { id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "west car park", explanation: "Parking is located in the west car park." },
        { id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "debit card", explanation: "Payment is processed via debit card at reception." },
        { id: 9, type: "fill-in", number: 9, label: "Reference Code:", answer: "FIT802", explanation: "The reference code given is FIT802." },
        { id: 10, type: "fill-in", number: 10, label: "Senior Fitness Manager:", answer: "Sarah", explanation: "Sarah Roberts is the fitness manager." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: 378,
      audioEnd: 676,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "CITY HISTORY MUSEUM GUIDED TOUR",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How many floors are in the historic museum building?", options: ["A. 2 floors", "B. 3 floors", "C. 5 floors"], answer: "B", explanation: "The museum features 3 floors of exhibits." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time does the museum open daily?", options: ["A. 8:30 AM", "B. 9:30 AM", "C. 10:00 AM"], answer: "B", explanation: "The museum is open daily from 9:30 AM." },
        { id: 13, type: "multiple-choice", number: 13, question: "Where is the famous medieval armor gallery situated?", options: ["A. Ground floor hall", "B. Central wing", "C. Courtyard"], answer: "B", explanation: "The armor gallery is in the central wing." },
        { id: 14, type: "multiple-choice", number: 14, question: "Where is the outdoor courtyard seating terrace located?", options: ["A. Behind the atrium", "B. Entrance lobby", "C. Second floor"], answer: "A", explanation: "Outdoor seating is located behind the atrium." },
        { id: 15, type: "multiple-choice", number: 15, question: "What equipment is required for self-guided visitors?", options: ["A. Map book", "B. Audio guides", "C. VR headset"], answer: "B", explanation: "Personal audio guides are required for self-guided commentary." },
        { id: 16, type: "fill-in", number: 16, label: "Audio guide requirement:", answer: "audio guides", explanation: "Self-guided visitors require audio guides." },
        { id: 17, type: "fill-in", number: 17, label: "Guided tour frequency:", answer: "30 minutes", explanation: "Tours depart at 30 minutes intervals." },
        { id: 18, type: "fill-in", number: 18, label: "Tour guide qualification:", answer: "expert curators", explanation: "Tours are led by expert curators." },
        { id: 19, type: "fill-in", number: 19, label: "School group requirement:", answer: "online reservation", explanation: "School groups must submit an online reservation." },
        { id: 20, type: "fill-in", number: 20, label: "Coat deposit location:", answer: "ground floor cloakroom", explanation: "Bags and coats should be left at the ground floor cloakroom." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: 676,
      audioEnd: 995,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "SOLAR PV EFFICIENCY TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "What main topic did Chloe and Liam research?", options: ["A. Silicon cell degradation", "B. Battery storage", "C. Wind turbines"], answer: "A", explanation: "They investigated silicon cell degradation under heat." },
        { id: 22, type: "multiple-choice", number: 22, question: "What unexpected issue appeared in lab measurements?", options: ["A. Voltage drop", "B. Thermal stress variance", "C. Broken glass"], answer: "B", explanation: "Measurements showed unexpected thermal stress variance." },
        { id: 23, type: "multiple-choice", number: 23, question: "What model does Dr. Henderson suggest building?", options: ["A. Spectral response model", "B. Economic forecast", "C. Chemical kinetic model"], answer: "A", explanation: "Dr. Henderson suggests a spectral response model." },
        { id: 24, type: "multiple-choice", number: 24, question: "Which chapter details laboratory test procedures?", options: ["A. Chapter 2", "B. Chapter 4", "C. Chapter 6"], answer: "B", explanation: "Lab tests will be detailed in Chapter 4." },
        { id: 25, type: "multiple-choice", number: 25, question: "When is the proposal draft due?", options: ["A. Before October", "B. End of November", "C. January"], answer: "A", explanation: "Draft is due before the October deadline." },
        { id: 26, type: "fill-in", number: 26, label: "Simulation software tool:", answer: "MATLAB simulation", explanation: "They ran simulations using MATLAB simulation software." },
        { id: 27, type: "fill-in", number: 27, label: "Outdoor delay cause:", answer: "voltage fluctuations", explanation: "Testing experienced delay due to grid voltage fluctuations." },
        { id: 28, type: "fill-in", number: 28, label: "Number of solar arrays tested:", answer: "four", explanation: "Parameters were measured across four solar arrays." },
        { id: 29, type: "fill-in", number: 29, label: "Temperature reading record:", answer: "thermal camera logs", explanation: "Readings are logged in thermal camera logs." },
        { id: 30, type: "fill-in", number: 30, label: "Required final format:", answer: "research paper", explanation: "The final document must be formatted as a research paper." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: 995,
      audioEnd: 1270,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "PALEOCLIMATOLOGY LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Ice core atmospheric data span:", answer: "eight centuries", explanation: "Data spans eight centuries." },
        { id: 32, type: "fill-in", number: 32, label: "Method to extract air bubbles:", answer: "gas bubble extraction", explanation: "Scientists use gas bubble extraction." },
        { id: 33, type: "fill-in", number: 33, label: "Isotope ratio analytical technique:", answer: "mass spectrometry", explanation: "Isotopic ratio measurement uses mass spectrometry." },
        { id: 34, type: "fill-in", number: 34, label: "Ice cores demonstrate critical:", answer: "feedback mechanisms", explanation: "Cores show critical greenhouse climate feedback mechanisms." },
        { id: 35, type: "fill-in", number: 35, label: "Ocean carbon tracking method:", answer: "isotope ratios", explanation: "Historical carbon ocean absorption is tracked via isotope ratios." },
        { id: 36, type: "fill-in", number: 36, label: "Data model reconstruction target:", answer: "carbon cycle modeling", explanation: "Models assist in carbon cycle modeling." },
        { id: 37, type: "fill-in", number: 37, label: "Climate cycle recurrence interval:", answer: "thousand year", explanation: "Ice cores reveal recurring thousand year cycles." },
        { id: 38, type: "fill-in", number: 38, label: "Air bubbles confirm modern:", answer: "greenhouse gas concentration", explanation: "Bubbles confirm unprecedented greenhouse gas concentration." },
        { id: 39, type: "fill-in", number: 39, label: "Antarctic field compliance:", answer: "polar drilling protocols", explanation: "Fieldwork follows international polar drilling protocols." },
        { id: 40, type: "fill-in", number: 40, label: "Ice core findings created:", answer: "international climate consensus", explanation: "Findings have forged an international climate consensus." }
      ]
    }
  ]
};

export default listeningTest008;