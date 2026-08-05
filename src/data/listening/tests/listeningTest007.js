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
    section1: { start: 0, end: 380 },
    section2: { start: 380, end: 690 },
    section3: { start: 690, end: 1010 },
    section4: { start: 1010, end: 1300 }
  },

  sections: [
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 380,
      instruction: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      formTitle: "RIVERSIDE ACCOMMODATION BOOKING",
      form: [
        {
                "id": 1,
                "label": "Full Name",
                "answer": "Sarah Jenkins"
        },
        {
                "id": 2,
                "label": "Contact Phone",
                "answer": "07700 900452"
        },
        {
                "id": 3,
                "label": "Home Address",
                "answer": "42 High Street, Oxford"
        },
        {
                "id": 4,
                "label": "Discounted Deposit (\u00a3)",
                "answer": "45"
        },
        {
                "id": 5,
                "label": "Orientation Time",
                "answer": "9:30 AM"
        },
        {
                "id": 6,
                "label": "Required ID Document",
                "answer": "photo ID"
        },
        {
                "id": 7,
                "label": "Parent Parking Area",
                "answer": "north visitor"
        },
        {
                "id": 8,
                "label": "Deposit Payment Method",
                "answer": "credit card"
        },
        {
                "id": 9,
                "label": "Payment Reference Code",
                "answer": "REG904"
        },
        {
                "id": 10,
                "label": "Head Hall Warden",
                "answer": "Mark"
        }
]
    },
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 380,
      audioEnd: 690,
      groups: [
        {
          id: "section2_mcq",
          type: "mcq",
          title: "Questions 11–15",
          instruction: "Choose the correct letter, A, B or C.",
          questions: [
            {
                        "id": 11,
                        "question": "How large is the protected wetland reserve?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "25 hectares"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "50 hectares"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "100 hectares"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 12,
                        "question": "What time do the main reserve gates open daily?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "7:00 AM"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "8:00 AM"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "9:00 AM"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 13,
                        "question": "What is located immediately inside the main entrance?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Information kiosk"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Exhibition hall"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Outdoor caf\u00e9"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 14,
                        "question": "What does the exhibition hall showcase?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Live animals"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Historic artifacts and digital displays"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Sculpture"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 15,
                        "question": "Where is the outdoor seating area positioned?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Main plaza"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Beside the caf\u00e9"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Gift shop"
                                    }
                        ],
                        "answer": "B"
            }
]
        },
        {
          id: "section2_notes",
          type: "notes",
          title: "Questions 16–20",
          instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          notesTitle: "Section 2 Notes & Information",
          notes: [
            {
                        "type": "heading",
                        "text": "Visitor Guidelines & Rules"
            },
            {
                        "type": "blank",
                        "id": 16,
                        "suffix": "(Visitor path rule)"
            },
            {
                        "type": "blank",
                        "id": 17,
                        "suffix": "(Guided nature walk frequency)"
            },
            {
                        "type": "blank",
                        "id": 18,
                        "suffix": "(Tour leader qualification)"
            },
            {
                        "type": "blank",
                        "id": 19,
                        "suffix": "(Large group booking requirement)"
            },
            {
                        "type": "blank",
                        "id": 20,
                        "suffix": "(First-aid location)"
            }
],
          answers: {
            "16": "designated",
            "17": "every hour",
            "18": "certified staff",
            "19": "advance online",
            "20": "main visitor"
}
        }
      ]
    },
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 690,
      audioEnd: 1010,
      groups: [
        {
          id: "section3_mcq",
          type: "mcq",
          title: "Questions 21–25",
          instruction: "Choose the correct letter, A, B or C.",
          questions: [
            {
                        "id": 21,
                        "question": "Why did Emma and Mark choose freshwater microplastics?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "River pollution is escalating"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Low equipment cost"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Required by university"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 22,
                        "question": "What issue occurred during secondary sediment sampling?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Lost samples"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Margin of error"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Contaminated water"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 23,
                        "question": "Which statistical model does Professor Davies suggest?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Simple average"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Multi-variable statistical regression"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Qualitative matrix"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 24,
                        "question": "In which chapter will qualitative case studies be presented?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Chapter 1"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Chapter 3"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Chapter 5"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 25,
                        "question": "When is the complete draft dissertation due?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "End of October"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "End of November"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Mid-December"
                                    }
                        ],
                        "answer": "B"
            }
]
        },
        {
          id: "section3_notes",
          type: "notes",
          title: "Questions 26–30",
          instruction: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          notesTitle: "Section 3 Project Discussion Notes",
          notes: [
            {
                        "type": "heading",
                        "text": "Research Project & Methodology"
            },
            {
                        "type": "blank",
                        "id": 26,
                        "suffix": "(Toxicity Data Software)"
            },
            {
                        "type": "blank",
                        "id": 27,
                        "suffix": "(Sampling delay cause)"
            },
            {
                        "type": "blank",
                        "id": 28,
                        "suffix": "(Number of primary sampling sites)"
            },
            {
                        "type": "blank",
                        "id": 29,
                        "suffix": "(Technical appendix content)"
            },
            {
                        "type": "blank",
                        "id": 30,
                        "suffix": "(Primary submission goal)"
            }
],
          answers: {
            "26": "SPSS statistical",
            "27": "heavy rainfall",
            "28": "three",
            "29": "calibration logs",
            "30": "draft dissertation"
}
        }
      ]
    },
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1010,
      audioEnd: 1300,
      groups: [
        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–40",
          instruction: "Complete the lecture notes below. Write NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "Section 4 Lecture Notes",
          notes: [
            {
                        "type": "heading",
                        "text": "Academic Lecture Overview"
            },
            {
                        "type": "blank",
                        "id": 31,
                        "suffix": "(Research expansion timeline)"
            },
            {
                        "type": "blank",
                        "id": 32,
                        "suffix": "(Early lab studies established)"
            },
            {
                        "type": "blank",
                        "id": 33,
                        "suffix": "(Songbird tracking technology)"
            },
            {
                        "type": "blank",
                        "id": 34,
                        "suffix": "(Severe weather flock adaptation)"
            },
            {
                        "type": "blank",
                        "id": 35,
                        "suffix": "(Navigation accuracy regulator)"
            },
            {
                        "type": "blank",
                        "id": 36,
                        "suffix": "(Drone sensor bio-adaptation)"
            },
            {
                        "type": "blank",
                        "id": 37,
                        "suffix": "(Magnetic compass validation timeframe)"
            },
            {
                        "type": "blank",
                        "id": 38,
                        "suffix": "(Standard lab test limitation)"
            },
            {
                        "type": "blank",
                        "id": 39,
                        "suffix": "(Essential global action)"
            },
            {
                        "type": "blank",
                        "id": 40,
                        "suffix": "(Key to solving navigation mysteries)"
            }
],
          answers: {
            "31": "three decades",
            "32": "baseline parameters",
            "33": "satellite telemetry",
            "34": "structural reorganization",
            "35": "physiological feedback",
            "36": "biological principles",
            "37": "multi-decadal",
            "38": "non-linear dynamics",
            "39": "standardized monitoring",
            "40": "interdisciplinary collaboration"
}
        }
      ]
    }
  ]
};

export default listeningTest007;
