const listeningTest009 = {
  id: "listening-test-009",
  title: "IELTS Listening Practice Test 009",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test009.mp3",
  transcript: "/assets/listening/test009/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0, end: 386 },
    section2: { start: 386, end: 689 },
    section3: { start: 689, end: 1010 },
    section4: { start: 1010, end: 1285 }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 386,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "LIBRARY VOLUNTEER APPLICATION",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "Emily Watson", explanation: "The applicant confirms her name is Emily Watson." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900123", explanation: "Emily states her contact number 07700 900123." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "7 Park Lane, Bristol", explanation: "Emily lives at 7 Park Lane, Bristol." },
        { id: 4, type: "fill-in", number: 4, label: "Discounted Badge Fee (£):", answer: "30", explanation: "Local community volunteer fee is 30 pounds." },
        { id: 5, type: "fill-in", number: 5, label: "Orientation Time:", answer: "9:30 AM", explanation: "Orientation starts at 9:30 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "photo ID", explanation: "Applicants must bring photo ID and proof of address." },
        { id: 7, type: "fill-in", number: 7, label: "Parking Location:", answer: "north visitor", explanation: "Free parking is in the north visitor car park." },
        { id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment is processed online via credit card." },
        { id: 9, type: "fill-in", number: 9, label: "Reference Code:", answer: "REG904", explanation: "The payment reference code is REG904." },
        { id: 10, type: "fill-in", number: 10, label: "Volunteer Coordinator:", answer: "Oliver", explanation: "Oliver is the library volunteer coordinator." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: 386,
      audioEnd: 689,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "ROYAL BOTANICAL GARDENS ORIENTATION",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How large are the Royal Botanical Gardens grounds?", options: ["A. 30 hectares", "B. 40 hectares", "C. 60 hectares"], answer: "B", explanation: "The gardens span 40 hectares." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time do the gardens close daily?", options: ["A. 5:00 PM", "B. 5:30 PM", "C. 6:00 PM"], answer: "B", explanation: "The gardens are open daily until 5:30 PM." },
        { id: 13, type: "multiple-choice", number: 13, question: "What is featured in the display room beside the pavilion?", options: ["A. Rare orchids", "B. Tropical birds", "C. Sculptures"], answer: "A", explanation: "The display room features rare orchids." },
        { id: 14, type: "multiple-choice", number: 14, question: "Where is the garden cafe situated?", options: ["A. Main entrance", "B. Along the main garden pathway", "C. North car park"], answer: "B", explanation: "The terrace cafe lies along the main garden pathway." },
        { id: 15, type: "multiple-choice", number: 15, question: "What rule applies to visitors walking in the gardens?", options: ["A. Wear boots", "B. Stay on paved pathways", "C. No cameras"], answer: "B", explanation: "Visitors must remain on paved pathways." },
        { id: 16, type: "fill-in", number: 16, label: "Path rule:", answer: "paved pathways", explanation: "Visitors must remain on paved pathways." },
        { id: 17, type: "fill-in", number: 17, label: "Guided walk frequency:", answer: "every hour", explanation: "Tours depart from the main plaza every hour." },
        { id: 18, type: "fill-in", number: 18, label: "Tour guide qualification:", answer: "botanist guides", explanation: "Tours are led by certified botanist guides." },
        { id: 19, type: "fill-in", number: 19, label: "Special group booking requirement:", answer: "pre-registration", explanation: "Group bookings require pre-registration online." },
        { id: 20, type: "fill-in", number: 20, label: "First-aid station location:", answer: "visitor pavilion", explanation: "First-aid stations are inside the visitor pavilion." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: 689,
      audioEnd: 1010,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "ANCIENT IRRIGATION TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "What specific topic did Sophie and Oliver research?", options: ["A. Roman aqueducts and terrace canal flow", "B. Modern dams", "C. Soil chemical composition"], answer: "A", explanation: "They focused on Roman aqueducts and terrace canal flow." },
        { id: 22, type: "multiple-choice", number: 22, question: "What issue affected secondary survey data?", options: ["A. Missing maps", "B. Measurement errors during drought", "C. Broken equipment"], answer: "B", explanation: "Secondary survey data showed measurement errors during drought." },
        { id: 23, type: "multiple-choice", number: 23, question: "Which chapter presents their archaeological data?", options: ["A. Chapter 1", "B. Chapter 3", "C. Chapter 5"], answer: "B", explanation: "Archaeological data will be presented in Chapter 3." },
        { id: 24, type: "multiple-choice", number: 24, question: "When is the final report submission due?", options: ["A. November", "B. December", "C. January"], answer: "B", explanation: "Final report submission is scheduled for December." },
        { id: 25, type: "multiple-choice", number: 25, question: "What tool was used for canal topography mapping?", options: ["A. GIS mapping", "B. CAD drafting", "C. Hand sketching"], answer: "A", explanation: "They plotted canal topographies using GIS mapping." },
        { id: 26, type: "fill-in", number: 26, label: "Topography mapping tool:", answer: "GIS mapping", explanation: "They mapped topographies using GIS mapping." },
        { id: 27, type: "fill-in", number: 27, label: "Field survey difficulty cause:", answer: "soil erosion", explanation: "Surveys encountered difficulties caused by soil erosion." },
        { id: 28, type: "fill-in", number: 28, label: "Number of excavation sites sampled:", answer: "three", explanation: "Sediment samples were gathered across three excavation sites." },
        { id: 29, type: "fill-in", number: 29, label: "Slope measurement record:", answer: "elevation surveys", explanation: "Slope measurements are attached in elevation surveys." },
        { id: 30, type: "fill-in", number: 30, label: "Target output project document:", answer: "final report", explanation: "Their target output is the final report." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: 1010,
      audioEnd: 1285,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "BIOMIMETIC ARCHITECTURE LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Goal of bio-inspired design:", answer: "material waste", explanation: "Architects aim to minimize material waste." },
        { id: 32, type: "fill-in", number: 32, label: "Bone cross-section study reveals:", answer: "load distribution", explanation: "Bone study reveals optimal structural load distribution." },
        { id: 33, type: "fill-in", number: 33, label: "High-rise ventilation inspiration:", answer: "termite mound", explanation: "Passive ventilation mimics termite mound ventilation." },
        { id: 34, type: "fill-in", number: 34, label: "Solar responsive louvers mirror:", answer: "kinetic facade", explanation: "Louvers mirror kinetic facade shading techniques." },
        { id: 35, type: "fill-in", number: 35, label: "Self-repairing composite material:", answer: "self-healing concrete", explanation: "Micro-cracks are repaired using self-healing concrete." },
        { id: 36, type: "fill-in", number: 36, label: "Cooling cost reduction method:", answer: "airflow dynamics", explanation: "Costs are lowered by optimizing natural airflow dynamics." },
        { id: 37, type: "fill-in", number: 37, label: "Durability evaluation test period:", answer: "decade long", explanation: "Durability is evaluated through decade long field tests." },
        { id: 38, type: "fill-in", number: 38, label: "Energy reduction design feature:", answer: "passive cooling", explanation: "Engineers reduce energy with passive cooling systems." },
        { id: 39, type: "fill-in", number: 39, label: "Required design compliance:", answer: "safety standards", explanation: "Designs must satisfy building safety standards." },
        { id: 40, type: "fill-in", number: 40, label: "Skyscraper sustainability key:", answer: "bio-architectural partnership", explanation: "Requires a strong bio-architectural partnership." }
      ]
    }
  ]
};

export default listeningTest009;