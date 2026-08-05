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
      formTitle: "CAR RENTAL SERVICE BOOKING",
      form: [
        {
                "id": 1,
                "label": "Full Name",
                "answer": "James Wilson"
        },
        {
                "id": 2,
                "label": "Contact Phone",
                "answer": "07700 900888"
        },
        {
                "id": 3,
                "label": "Home Address",
                "answer": "12 Victoria Road, Manchester"
        },
        {
                "id": 4,
                "label": "Discounted Fee (\u00a3)",
                "answer": "50"
        },
        {
                "id": 5,
                "label": "Orientation Time",
                "answer": "9:30 AM"
        },
        {
                "id": 6,
                "label": "Required Document",
                "answer": "photo ID"
        },
        {
                "id": 7,
                "label": "Parking Location",
                "answer": "north visitor"
        },
        {
                "id": 8,
                "label": "Payment Method",
                "answer": "credit card"
        },
        {
                "id": 9,
                "label": "Reference Code",
                "answer": "REG904"
        },
        {
                "id": 10,
                "label": "Contact Person",
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
                        "question": "What is the total size of the facility grounds?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "25 hectares"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "25 hectares"
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
                        "question": "What time does the facility open daily?",
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
                        "question": "Where is the gift shop situated?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Main entrance"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Beside the lake"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Inside the caf\u00e9"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 14,
                        "question": "What is featured in the exhibition hall?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Modern art"
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
                        "question": "Where can visitors find outdoor seating?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Car park"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Beside the caf\u00e9"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Information kiosk"
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
                        "suffix": "(Rule on walking paths)"
            },
            {
                        "type": "blank",
                        "id": 17,
                        "suffix": "(Guided tour departure frequency)"
            },
            {
                        "type": "blank",
                        "id": 18,
                        "suffix": "(Guided tour leader qualification)"
            },
            {
                        "type": "blank",
                        "id": 19,
                        "suffix": "(Special group booking requirement)"
            },
            {
                        "type": "blank",
                        "id": 20,
                        "suffix": "(First-aid station location)"
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
                        "question": "What is the primary topic of the students' research proposal?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Research Project"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Financial budgeting"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Student housing"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 22,
                        "question": "What limitation was noted in secondary sampling?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "High equipment cost"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Margin of error"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Missing documentation"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 23,
                        "question": "What model does the professor recommend?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Linear calculation"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Multi-variable statistical regression"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Qualitative survey"
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
                        "question": "When is the final draft dissertation due?",
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
                        "suffix": "(Data Processing Tool)"
            },
            {
                        "type": "blank",
                        "id": 27,
                        "suffix": "(Field Sampling Issue Cause)"
            },
            {
                        "type": "blank",
                        "id": 28,
                        "suffix": "(Primary Sampling Sites Count)"
            },
            {
                        "type": "blank",
                        "id": 29,
                        "suffix": "(Appendix Inclusion)"
            },
            {
                        "type": "blank",
                        "id": 30,
                        "suffix": "(Final Submission Target)"
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
                        "suffix": "(Research field expansion period)"
            },
            {
                        "type": "blank",
                        "id": 32,
                        "suffix": "(Early research established)"
            },
            {
                        "type": "blank",
                        "id": 33,
                        "suffix": "(Telemetry technology)"
            },
            {
                        "type": "blank",
                        "id": 34,
                        "suffix": "(Environmental pressure outcome)"
            },
            {
                        "type": "blank",
                        "id": 35,
                        "suffix": "(Equilibrium regulation mechanism)"
            },
            {
                        "type": "blank",
                        "id": 36,
                        "suffix": "(Engineering applications adopt)"
            },
            {
                        "type": "blank",
                        "id": 37,
                        "suffix": "(Long-term data collection period)"
            },
            {
                        "type": "blank",
                        "id": 38,
                        "suffix": "(Short-term study limitation)"
            },
            {
                        "type": "blank",
                        "id": 39,
                        "suffix": "(Essential global protocol)"
            },
            {
                        "type": "blank",
                        "id": 40,
                        "suffix": "(Key to global solutions)"
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

export default listeningTest010;
