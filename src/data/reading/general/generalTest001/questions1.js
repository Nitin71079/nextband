// 📁 src/data/reading/general/generalTest001/questions1.js

const questions1 = [
  // ==========================
  // Questions 1–5 (TEXT 1)
  // ==========================

  {
    id: 1,
    instruction:
      "Questions 1–5\nRead TEXT 1 (Hillside Leisure Centre).\nChoose the correct letter, A, B, C or D.",
    type: "multiple_choice",
    question: "What must participants do to confirm a course booking?",
    options: [
      "Attend the first lesson",
      "Pay the full course fee within three days",
      "Visit the Reception Desk on the first day",
      "Telephone the Leisure Centre"
    ],
    answer: "Pay the full course fee within three days",
    explanation:
      "Bookings are confirmed only after full payment is made within three days.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 2,
    type: "true_false_not_given",
    question:
      "All language courses offered by the Leisure Centre are suitable for beginners.",
    answer: "False",
    explanation:
      "Only the evening classes are for beginners; daytime classes require previous knowledge.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 3,
    type: "short_answer",
    question:
      "Which fitness class requires children under 12 to attend with an adult?",
    answer: "Family Fitness",
    explanation:
      "Children under 12 must be accompanied during Family Fitness sessions.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 4,
    type: "sentence_completion",
    question:
      "Participants cancelling at least seven days before a course begins will receive a full ________.",
    answer: "refund",
    explanation: "A full refund is available when cancelling at least seven days in advance.",
    difficulty: "Easy",
    skill: "Vocabulary"
  },

  {
    id: 5,
    type: "short_answer",
    question:
      "After what time is parking free on weekdays?",
    answer: "5:00 pm",
    explanation: "Parking becomes free after 5:00 pm on weekdays.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  // ==========================
  // Questions 6–9 (TEXT 2)
  // ==========================

  {
    id: 6,
    instruction:
      "Questions 6–9\nRead TEXT 2 (Riverbank Weekend Market).",
    type: "multiple_choice",
    question:
      "Which activity takes place only once each month?",
    options: [
      "Live music",
      "Children's craft activities",
      "Cooking demonstrations",
      "Outdoor markets"
    ],
    answer: "Cooking demonstrations",
    explanation:
      "Cooking demonstrations are held on the first Saturday of every month.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 7,
    type: "true_false_not_given",
    question:
      "Every trader at the market accepts card payments.",
    answer: "False",
    explanation:
      "Several smaller traders accept cash only.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 8,
    type: "short_answer",
    question:
      "What type of dogs may enter the market?",
    answer: "assistance dogs",
    explanation:
      "Only assistance dogs are allowed inside the market.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 9,
    type: "sentence_completion",
    question:
      "The Information Desk can also help visitors with lost ________.",
    answer: "property",
    explanation:
      "The Information Desk provides lost-property assistance.",
    difficulty: "Medium",
    skill: "Vocabulary"
  },

  // ==========================
  // Questions 10–14 (TEXT 3)
  // ==========================

  {
    id: 10,
    instruction:
      "Questions 10–14\nRead TEXT 3 (Eastwood Public Library).",
    type: "multiple_choice",
    question:
      "Who is entitled to free library membership?",
    options: [
      "Anyone visiting Eastwood",
      "Only full-time students",
      "People living or studying within the Eastwood Council area",
      "Only residents over the age of 18"
    ],
    answer:
      "People living or studying within the Eastwood Council area",
    explanation:
      "Membership is free for people living or studying within the council area.",
    difficulty: "Easy",
    skill: "Main Idea"
  },

  {
    id: 11,
    type: "short_answer",
    question:
      "How many times can most borrowed items normally be renewed?",
    answer: "twice",
    explanation:
      "Most items may be renewed twice unless reserved by another member.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 12,
    type: "true_false_not_given",
    question:
      "Library study rooms can be booked for as long as members wish each day.",
    answer: "False",
    explanation:
      "Study rooms may only be booked for a maximum of two hours per day.",
    difficulty: "Easy",
    skill: "Detail"
  },

  {
    id: 13,
    type: "sentence_completion",
    question:
      "Members receive an ________ when a reserved item is ready for collection.",
    answer: "email",
    explanation:
      "The library notifies members by email.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 14,
    type: "multiple_choice",
    question:
      "What happens if an item is due back on a public holiday?",
    options: [
      "A late fee is charged immediately",
      "It must be returned before the holiday",
      "Its return date is automatically extended",
      "Members must contact Customer Services"
    ],
    answer: "Its return date is automatically extended",
    explanation:
      "Return dates are automatically extended when they fall on public holidays.",
    difficulty: "Medium",
    skill: "Inference"
  }
];

export default questions1;