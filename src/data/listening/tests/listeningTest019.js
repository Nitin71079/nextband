const listeningTest019 = {
  id: "listening-test-019",
  title: "IELTS Listening Practice Test 019",
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
      formTitle: "LIBRARY VOLUNTEER APPLICATION",
      form: [
        {
                "id": 1,
                "label": "Full Name",
                "answer": "Emily Watson"
        },
        {
                "id": 2,
                "label": "Contact Phone",
                "answer": "07700 900123"
        },
        {
                "id": 3,
                "label": "Home Address",
                "answer": "7 Park Lane, Bristol"
        },
        {
                "id": 4,
                "label": "Discounted Badge Fee (\u00a3)",
                "answer": "30"
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
                "label": "Volunteer Coordinator",
                "answer": "Oliver"
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
                        "question": "How large are the Royal Botanical Gardens grounds?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "30 hectares"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "40 hectares"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "60 hectares"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 12,
                        "question": "What time do the gardens close daily?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "5:00 PM"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "5:30 PM"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "6:00 PM"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 13,
                        "question": "What is featured in the display room beside the pavilion?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Rare orchids"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Tropical birds"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Sculptures"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 14,
                        "question": "Where is the garden cafe situated?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Main entrance"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Along the main garden pathway"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "North car park"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 15,
                        "question": "What rule applies to visitors walking in the gardens?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Wear boots"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Stay on paved pathways"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "No cameras"
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
                        "suffix": "(Path rule)"
            },
            {
                        "type": "blank",
                        "id": 17,
                        "suffix": "(Guided walk frequency)"
            },
            {
                        "type": "blank",
                        "id": 18,
                        "suffix": "(Tour guide qualification)"
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
            "16": "paved pathways",
            "17": "every hour",
            "18": "botanist guides",
            "19": "pre-registration",
            "20": "visitor pavilion"
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
                        "question": "What specific topic did Sophie and Oliver research?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Roman aqueducts and terrace canal flow"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Modern dams"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Soil chemical composition"
                                    }
                        ],
                        "answer": "A"
            },
            {
                        "id": 22,
                        "question": "What issue affected secondary survey data?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "Missing maps"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "Measurement errors during drought"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Broken equipment"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 23,
                        "question": "Which chapter presents their archaeological data?",
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
                        "id": 24,
                        "question": "When is the final report submission due?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "November"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "December"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "January"
                                    }
                        ],
                        "answer": "B"
            },
            {
                        "id": 25,
                        "question": "What tool was used for canal topography mapping?",
                        "options": [
                                    {
                                                "letter": "A",
                                                "text": "GIS mapping"
                                    },
                                    {
                                                "letter": "B",
                                                "text": "CAD drafting"
                                    },
                                    {
                                                "letter": "C",
                                                "text": "Hand sketching"
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
                        "suffix": "(Topography mapping tool)"
            },
            {
                        "type": "blank",
                        "id": 27,
                        "suffix": "(Field survey difficulty cause)"
            },
            {
                        "type": "blank",
                        "id": 28,
                        "suffix": "(Number of excavation sites sampled)"
            },
            {
                        "type": "blank",
                        "id": 29,
                        "suffix": "(Slope measurement record)"
            },
            {
                        "type": "blank",
                        "id": 30,
                        "suffix": "(Target output project document)"
            }
],
          answers: {
            "26": "GIS mapping",
            "27": "soil erosion",
            "28": "three",
            "29": "elevation surveys",
            "30": "final report"
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
                        "suffix": "(Goal of bio-inspired design)"
            },
            {
                        "type": "blank",
                        "id": 32,
                        "suffix": "(Bone cross-section study reveals)"
            },
            {
                        "type": "blank",
                        "id": 33,
                        "suffix": "(High-rise ventilation inspiration)"
            },
            {
                        "type": "blank",
                        "id": 34,
                        "suffix": "(Solar responsive louvers mirror)"
            },
            {
                        "type": "blank",
                        "id": 35,
                        "suffix": "(Self-repairing composite material)"
            },
            {
                        "type": "blank",
                        "id": 36,
                        "suffix": "(Cooling cost reduction method)"
            },
            {
                        "type": "blank",
                        "id": 37,
                        "suffix": "(Durability evaluation test period)"
            },
            {
                        "type": "blank",
                        "id": 38,
                        "suffix": "(Energy reduction design feature)"
            },
            {
                        "type": "blank",
                        "id": 39,
                        "suffix": "(Required design compliance)"
            },
            {
                        "type": "blank",
                        "id": 40,
                        "suffix": "(Skyscraper sustainability key)"
            }
],
          answers: {
            "31": "material waste",
            "32": "load distribution",
            "33": "termite mound",
            "34": "kinetic facade",
            "35": "self-healing concrete",
            "36": "airflow dynamics",
            "37": "decade long",
            "38": "passive cooling",
            "39": "safety standards",
            "40": "bio-architectural partnership"
}
        }
      ]
    }
  ]
};

export default listeningTest019;
