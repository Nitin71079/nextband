// 📁 src/data/reading/general/generalTest001/questions2.js

const questions2 = [
  // ==========================
  // Questions 15–19
  // Read TEXT 1
  // Choose the correct heading.
  // ==========================

  {
    id: 15,
    instruction:
      "Questions 15–19\nRead TEXT 1 (Welcome to BrightWave Logistics).\nChoose the correct heading for each section.",
    type: "matching_headings",
    question: "Choose the correct heading for the section 'YOUR FIRST DAY'.",
    options: [
      "i. Employee facilities",
      "ii. Preparing for your first day",
      "iii. Emergency procedures",
      "iv. Clothing requirements"
    ],
    answer: "ii. Preparing for your first day",
    explanation:
      "This section explains what new employees should do and bring before starting work.",
    difficulty: "Medium",
    skill: "Matching Headings"
  },

  {
    id: 16,
    type: "matching_headings",
    question: "Choose the correct heading for the section 'WORKING HOURS'.",
    options: [
      "i. Shift schedules",
      "ii. Staff benefits",
      "iii. Company facilities",
      "iv. Leave arrangements"
    ],
    answer: "i. Shift schedules",
    explanation:
      "The section explains the company's different working shifts.",
    difficulty: "Easy",
    skill: "Matching Headings"
  },

  {
    id: 17,
    type: "matching_headings",
    question: "Choose the correct heading for the section 'TRAINING'.",
    options: [
      "i. Environmental policy",
      "ii. Optional courses",
      "iii. Compulsory induction",
      "iv. Career development"
    ],
    answer: "iii. Compulsory induction",
    explanation:
      "All new employees must complete the induction programme.",
    difficulty: "Medium",
    skill: "Matching Headings"
  },

  {
    id: 18,
    type: "matching_headings",
    question: "Choose the correct heading for the section 'UNIFORMS'.",
    options: [
      "i. Staff parking",
      "ii. Clothing requirements",
      "iii. Company rules",
      "iv. Workplace equipment"
    ],
    answer: "ii. Clothing requirements",
    explanation:
      "The section explains what clothing employees receive and what they must provide.",
    difficulty: "Medium",
    skill: "Matching Headings"
  },

  {
    id: 19,
    type: "matching_headings",
    question: "Choose the correct heading for the section 'EMPLOYEE FACILITIES'.",
    options: [
      "i. Workplace amenities",
      "ii. Health insurance",
      "iii. Company transport",
      "iv. Safety inspections"
    ],
    answer: "i. Workplace amenities",
    explanation:
      "This section lists the facilities available to employees.",
    difficulty: "Easy",
    skill: "Matching Headings"
  },

  // ==========================
  // Questions 20–23
  // Read TEXT 1
  // Do the following statements agree with the information?
  //
  // TRUE
  // FALSE
  // NOT GIVEN
  // ==========================

  {
    id: 20,
    instruction:
      "Questions 20–23\nDo the following statements agree with the information in TEXT 1?\n\nWrite:\nTRUE\nFALSE\nNOT GIVEN",
    type: "true_false_not_given",
    question:
      "Employees may normally report illness by sending a text message to their supervisor.",
    answer: "False",
    explanation:
      "Employees must telephone their supervisor unless instructed otherwise.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 21,
    type: "true_false_not_given",
    question:
      "The company supplies all required safety footwear to new employees.",
    answer: "False",
    explanation:
      "Employees must purchase approved safety footwear themselves.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 22,
    type: "true_false_not_given",
    question:
      "Visitors are permitted to park in the staff car park if spaces are available.",
    answer: "False",
    explanation:
      "Visitors must always use the designated visitor parking area.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 23,
    type: "true_false_not_given",
    question:
      "Customer service is included as part of the induction programme.",
    answer: "Not Given",
    explanation:
      "The induction topics are listed, but customer service is not mentioned.",
    difficulty: "Hard",
    skill: "Inference"
  },

  // ==========================
  // Questions 24–27
  // Complete the sentences.
  // NO MORE THAN ONE WORD.
  // ==========================

  {
    id: 24,
    instruction:
      "Questions 24–27\nComplete the sentences below.\nChoose NO MORE THAN ONE WORD from the passage.",
    type: "sentence_completion",
    question:
      "Employees working more than six hours receive one unpaid meal break and two paid ________ breaks.",
    answer: "rest",
    explanation:
      "Employees receive two paid rest breaks.",
    difficulty: "Easy",
    skill: "Vocabulary"
  },

  {
    id: 25,
    type: "sentence_completion",
    question:
      "Before lifting an object, employees should first check its ________.",
    answer: "weight",
    explanation:
      "The manual handling guidance instructs employees to check the object's weight.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 26,
    type: "sentence_completion",
    question:
      "If the fire alarm sounds, employees should report to the designated ________ area.",
    answer: "assembly",
    explanation:
      "Employees must report to the designated assembly area.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 27,
    type: "sentence_completion",
    question:
      "All workplace injuries must be reported before the end of the employee's ________.",
    answer: "shift",
    explanation:
      "All injuries must be reported before the end of the shift.",
    difficulty: "Easy",
    skill: "Detail"
  }
];

export default questions2;