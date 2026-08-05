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
      formTitle: "CITY SPORTS & FITNESS CLUB REGISTRATION",
      form: [
        {
                "id": 1,
                "label": "Full Name",
                "answer": "David Miller"
        },
        {
                "id": 2,
                "label": "Contact Phone",
                "answer": "07700 900342"
        },
        {
                "id": 3,
                "label": "Home Address",
                "answer": "18 Station Road, Cambridge"
        },
        {
                "id": 4,
                "label": "Corporate Join Fee (\u00a3)",
                "answer": "60"
        },
        {
                "id": 5,
                "label": "Induction Time",
                "answer": "10:00 AM"
        },
        {
                "id": 6,
                "label": "Document required",
                "answer": "membership card"
        },
        {
                "id": 7,
                "label": "Parking Location",
                "answer": "west car park"
        },
        {
                "id": 8,
                "label": "Payment Method",
                "answer": "debit card"
        },
        {
                "id": 9,
                "label": "Reference Code",
                "answer": "FIT802"
        },
        {
                "id": 10,
                "label": "Senior Fitness Manager",
                "answer": "Sarah"
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
                        "question": "How many floors are in the historic museum building?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "2 floors"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "3 floors"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "5 floors"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 12,
                        "question": "What time does the museum open daily?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "8:30 AM"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "9:30 AM"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "10:00 AM"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 13,
                        "question": "Where is the famous medieval armor gallery situated?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Ground floor hall"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Central wing"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Courtyard"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 14,
                        "question": "Where is the outdoor courtyard seating terrace located?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Behind the atrium"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Entrance lobby"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Second floor"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 15,
                        "question": "What equipment is required for self-guided visitors?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Map book"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Audio guides"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "VR headset"
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
                        "suffix": "(Audio guide requirement)"
            },
            {
                        "type": "blank",
                        "id": 17,
                        "suffix": "(Guided tour frequency)"
            },
            {
                        "type": "blank",
                        "id": 18,
                        "suffix": "(Tour guide qualification)"
            },
            {
                        "type": "blank",
                        "id": 19,
                        "suffix": "(School group requirement)"
            },
            {
                        "type": "blank",
                        "id": 20,
                        "suffix": "(Coat deposit location)"
            }
],
          answers: {
            "16": "audio guides",
            "17": "30 minutes",
            "18": "expert curators",
            "19": "online reservation",
            "20": "ground floor cloakroom"
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
                        "question": "What main topic did Chloe and Liam research?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Silicon cell degradation"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Battery storage"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Wind turbines"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 22,
                        "question": "What unexpected issue appeared in lab measurements?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Voltage drop"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Thermal stress variance"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Broken glass"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 23,
                        "question": "What model does Dr. Henderson suggest building?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Spectral response model"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Economic forecast"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Chemical kinetic model"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 24,
                        "question": "Which chapter details laboratory test procedures?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Chapter 2"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Chapter 4"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Chapter 6"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 25,
                        "question": "When is the proposal draft due?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Before October"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "End of November"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "January"
                                    }
                        ],
                        "answer": "A"
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
                        "suffix": "(Simulation software tool)"
            },
            {
                        "type": "blank",
                        "id": 27,
                        "suffix": "(Outdoor delay cause)"
            },
            {
                        "type": "blank",
                        "id": 28,
                        "suffix": "(Number of solar arrays tested)"
            },
            {
                        "type": "blank",
                        "id": 29,
                        "suffix": "(Temperature reading record)"
            },
            {
                        "type": "blank",
                        "id": 30,
                        "suffix": "(Required final format)"
            }
],
          answers: {
            "26": "MATLAB simulation",
            "27": "voltage fluctuations",
            "28": "four",
            "29": "thermal camera logs",
            "30": "research paper"
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
                        "suffix": "(Ice core atmospheric data span)"
            },
            {
                        "type": "blank",
                        "id": 32,
                        "suffix": "(Method to extract air bubbles)"
            },
            {
                        "type": "blank",
                        "id": 33,
                        "suffix": "(Isotope ratio analytical technique)"
            },
            {
                        "type": "blank",
                        "id": 34,
                        "suffix": "(Ice cores demonstrate critical)"
            },
            {
                        "type": "blank",
                        "id": 35,
                        "suffix": "(Ocean carbon tracking method)"
            },
            {
                        "type": "blank",
                        "id": 36,
                        "suffix": "(Data model reconstruction target)"
            },
            {
                        "type": "blank",
                        "id": 37,
                        "suffix": "(Climate cycle recurrence interval)"
            },
            {
                        "type": "blank",
                        "id": 38,
                        "suffix": "(Air bubbles confirm modern)"
            },
            {
                        "type": "blank",
                        "id": 39,
                        "suffix": "(Antarctic field compliance)"
            },
            {
                        "type": "blank",
                        "id": 40,
                        "suffix": "(Ice core findings created)"
            }
],
          answers: {
            "31": "eight centuries",
            "32": "gas bubble extraction",
            "33": "mass spectrometry",
            "34": "feedback mechanisms",
            "35": "isotope ratios",
            "36": "carbon cycle modeling",
            "37": "thousand year",
            "38": "greenhouse gas concentration",
            "39": "polar drilling protocols",
            "40": "international climate consensus"
}
        }
      ]
    }
  ]
};

export default listeningTest008;
