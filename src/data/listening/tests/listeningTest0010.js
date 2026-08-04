const listeningTest010 = {
  id: "listening-test-010",
  title: "IELTS Listening Practice Test 010",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test010.mp3",
  transcript: "/assets/listening/test010/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0, end: 348 },
    section2: { start: 348, end: 636 },
    section3: { start: 636, end: 935 },
    section4: { start: 935, end: 1204 }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 348,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "CAR RENTAL SERVICE BOOKING",
      questions: [
        { id: 1, type: "fill-in", number: 1, label: "Full Name:", answer: "James Wilson", explanation: "The customer confirms his name is James Wilson." },
        { id: 2, type: "fill-in", number: 2, label: "Contact Phone:", answer: "07700 900888", explanation: "James provides mobile number 07700 900888." },
        { id: 3, type: "fill-in", number: 3, label: "Home Address:", answer: "12 Victoria Road, Manchester", explanation: "James gives address 12 Victoria Road, Manchester." },
        { id: 4, type: "fill-in", number: 4, label: "Corporate Rental Fee (£):", answer: "50", explanation: "The discounted corporate rate is 50 pounds per day." },
        { id: 5, type: "fill-in", number: 5, label: "Vehicle Pickup Time:", answer: "9:30 AM", explanation: "Pickup is scheduled for 9:30 AM." },
        { id: 6, type: "fill-in", number: 6, label: "Required Document:", answer: "driver license", explanation: "Customer must present valid driver license and photo ID." },
        { id: 7, type: "fill-in", number: 7, label: "Personal Car Parking:", answer: "north garage", explanation: "Free parking is located in the north garage." },
        { id: 8, type: "fill-in", number: 8, label: "Payment Method:", answer: "credit card", explanation: "Payment is processed online using a credit card." },
        { id: 9, type: "fill-in", number: 9, label: "Booking Reference Code:", answer: "CAR505", explanation: "The reference code is CAR505." },
        { id: 10, type: "fill-in", number: 10, label: "Duty Desk Agent:", answer: "Rachel", explanation: "Rachel is the rental desk agent." }
      ]
    },
    {
      id: 2,
      title: "Section 2",
      type: "monologue",
      audioStart: 348,
      audioEnd: 636,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "REGIONAL ART GALLERY TOUR",
      questions: [
        { id: 11, type: "multiple-choice", number: 11, question: "How large is the gallery sculpture park?", options: ["A. 20 hectares", "B. 35 hectares", "C. 50 hectares"], answer: "B", explanation: "The sculpture park spans 35 hectares." },
        { id: 12, type: "multiple-choice", number: 12, question: "What time does the gallery close daily?", options: ["A. 4:30 PM", "B. 5:00 PM", "C. 6:00 PM"], answer: "B", explanation: "The gallery is open daily until 5:00 PM." },
        { id: 13, type: "multiple-choice", number: 13, question: "What is showcased in the east gallery?", options: ["A. Modern photography", "B. Classical oil paintings", "C. Sculptures"], answer: "B", explanation: "The east gallery displays classical oil paintings." },
        { id: 14, type: "multiple-choice", number: 14, question: "Where are refreshments served?", options: ["A. Main foyer", "B. Garden terrace cafe", "C. Entrance hall"], answer: "B", explanation: "Refreshments are served in the garden terrace cafe." },
        { id: 15, type: "multiple-choice", number: 15, question: "What artwork safety rule is enforced?", options: ["A. No photography", "B. Touch prohibition", "C. Silent walking"], answer: "B", explanation: "Touch prohibition rules are strictly enforced." },
        { id: 16, type: "fill-in", number: 16, label: "Artwork safety rule:", answer: "touch prohibition", explanation: "Touch prohibition rules are strictly enforced." },
        { id: 17, type: "fill-in", number: 17, label: "Guided walk duration:", answer: "45 minute", explanation: "Guided gallery walks run for 45 minute duration." },
        { id: 18, type: "fill-in", number: 18, label: "Tour leader qualification:", answer: "art historians", explanation: "Tours are led by resident art historians." },
        { id: 19, type: "fill-in", number: 19, label: "Large group benefit:", answer: "group discount code", explanation: "Groups of 10+ receive a group discount code." },
        { id: 20, type: "fill-in", number: 20, label: "Information desk location:", answer: "main foyer", explanation: "An information desk is situated in the main foyer." }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "discussion",
      audioStart: 636,
      audioEnd: 935,
      instruction: "Choose the correct letter A, B, or C.",
      formTitle: "URBAN HEAT ISLAND TUTORIAL",
      questions: [
        { id: 21, type: "multiple-choice", number: 21, question: "What techniques did Alex and Jessica evaluate?", options: ["A. Green roofs and permeable asphalt cooling", "B. Solar panels", "C. Seawall construction"], answer: "A", explanation: "They evaluated green roofs and permeable asphalt cooling." },
        { id: 22, type: "multiple-choice", number: 22, question: "What did thermal imaging show near urban trees?", options: ["A. Higher humidity", "B. Temperature drops", "C. Wind blockage"], answer: "B", explanation: "Thermal imaging revealed temperature drops near urban trees." },
        { id: 23, type: "multiple-choice", number: 23, question: "Which chapter will include urban wind tunnel modeling?", options: ["A. Chapter 2", "B. Chapter 5", "C. Chapter 7"], answer: "B", explanation: "Wind tunnel modeling will be placed in Chapter 5." },
        { id: 24, type: "multiple-choice", number: 24, question: "When are the urban models due?", options: ["A. December", "B. January", "C. February"], answer: "B", explanation: "Urban models will be completed by the January deadline." },
        { id: 25, type: "multiple-choice", number: 25, question: "Which microclimate simulation software was used?", options: ["A. ENVI-met simulation", "B. AutoCAD", "C. GIS Pro"], answer: "A", explanation: "Microclimates were simulated using ENVI-met simulation software." },
        { id: 26, type: "fill-in", number: 26, label: "Simulation software tool:", answer: "ENVI-met simulation", explanation: "Simulations used ENVI-met simulation software." },
        { id: 27, type: "fill-in", number: 27, label: "Maximum cooling location:", answer: "tree canopy shade", explanation: "Maximum cooling occurred under dense tree canopy shade." },
        { id: 28, type: "fill-in", number: 28, label: "Number of city zones measured:", answer: "five", explanation: "Surface temperatures were measured across five city zones." },
        { id: 29, type: "fill-in", number: 29, label: "Heat map record:", answer: "infrared temperature logs", explanation: "Heat maps are recorded in infrared temperature logs." },
        { id: 30, type: "fill-in", number: 30, label: "Final output document:", answer: "policy proposal", explanation: "Findings will be summarized into a policy proposal." }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "lecture",
      audioStart: 935,
      audioEnd: 1204,
      instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
      formTitle: "HYDROTHERMAL VENTS LECTURE",
      questions: [
        { id: 31, type: "fill-in", number: 31, label: "Trench exploration technology:", answer: "unmanned submersible", explanation: "Exploration relies on unmanned submersible robotics." },
        { id: 32, type: "fill-in", number: 32, label: "Primary vent energy producers:", answer: "extremophile bacteria", explanation: "Primary energy is driven by chemosynthetic extremophile bacteria." },
        { id: 33, type: "fill-in", number: 33, label: "Bacterial chemical energy pathway:", answer: "sulfur oxidation", explanation: "Microbes use bacterial sulfur oxidation pathways." },
        { id: 34, type: "fill-in", number: 34, label: "Giant organism survival relationship:", answer: "tube worm symbiosis", explanation: "Organisms survive through tube worm symbiosis." },
        { id: 35, type: "fill-in", number: 35, label: "Vent tower formation material:", answer: "mineral chimney", explanation: "Precipitated heavy metals build mineral chimney structures." },
        { id: 36, type: "fill-in", number: 36, label: "Real-time telemetry system:", answer: "subsea submersible", explanation: "Data is transmitted using subsea submersible telemetry." },
        { id: 37, type: "fill-in", number: 37, label: "Biological monitoring period:", answer: "multi-year", explanation: "Monitored across multi-year oceanic expeditions." },
        { id: 38, type: "fill-in", number: 38, label: "Superheated discharge content:", answer: "volcanic fluid chemistry", explanation: "Water contains rich volcanic fluid chemistry." },
        { id: 39, type: "fill-in", number: 39, label: "Conservationist advocacy area:", answer: "deep sea mining", explanation: "Advocating for deep sea mining regulations." },
        { id: 40, type: "fill-in", number: 40, label: "Benthic protection organization:", answer: "research consortium", explanation: "Requires a dedicated oceanographic research consortium." }
      ]
    }
  ]
};

export default listeningTest010;