const listeningTest001 = {
  id: "listening-test-001",

  title: "IELTS Listening Practice Test 001",

  difficulty: "Academic",

  duration: 40,

  audio: "/audio/listening/test001.mp3",

  transcript: "/assets/listening/test001/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: {
      start: 0,
      end: 338
    },

    section2: {
      start: 339,
      end: 694
    },

    section3: {
      start: 695,
      end: 1182
    },

    section4: {
      start: 1183,
      end: 1715
    }
  },

  sections: [

    {
      id: 1,

      title: "Section 1",

      type: "form",

      audioStart: 0,

      audioEnd: 338,

      instruction:
        "Complete the accommodation application form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle:
        "RIVERSIDE UNIVERSITY ACCOMMODATION APPLICATION",

      form: [
                {
          id: 1,

          label: "Student Name",

          answer: "Emma Brown"
        },

        {
          id: 2,

          label: "Course",

          answer: "Environmental Science"
        },

        {
          id: 3,

          label: "Maximum Weekly Budget",

          prefix: "£",

          answer: "220"
        },

        {
          id: 4,

          label: "Preferred Move-in Month",

          answer: "September"
        },

        {
          id: 5,

          label: "Accommodation Type",

          answer: "single room"
        },
                {
          id: 6,

          label: "Essential Facility",

          answer: "internet"
        },

        {
          id: 7,

          label: "Maximum Distance",

          suffix: "km",

          answer: "2"
        },

        {
          id: 8,

          label: "Weekly Rent",

          prefix: "£",

          answer: "215"
        },

        {
          id: 9,

          label: "Security Deposit",

          prefix: "£",

          answer: "500"
        },

        {
          id: 10,

          label: "Viewing Appointment",

          answer: "Friday"
        }

      ]

    },
        {
      id: 2,

      title: "Section 2",

      type: "mixed",

      audioStart: 339,

      audioEnd: 694,

      groups: [

        {
          id: "section2_mcq",

          type: "mcq",

          title: "Questions 11–15",

          instruction:
            "Choose the correct letter, A, B or C.",

          questions: [
  {
    id: 11,
    question:
      "When are visitors able to join a guided tour of the gardens?",
    options: [
      {
        letter: "A",
        text: "Only at weekends"
      },
      {
        letter: "B",
        text: "Throughout the week"
      },
      {
        letter: "C",
        text: "Only during school holiday periods"
      }
    ],
    answer: "B"
  },

  {
    id: 12,
    question:
      "What is the usual duration of the guided tour?",
    options: [
      {
        letter: "A",
        text: "One hour"
      },
      {
        letter: "B",
        text: "Ninety minutes"
      },
      {
        letter: "C",
        text: "Two hours"
      }
    ],
    answer: "B"
  },

  {
    id: 13,
    question:
      "Where are visitors asked to assemble before the tour begins?",
    options: [
      {
        letter: "A",
        text: "The Visitor Centre"
      },
      {
        letter: "B",
        text: "The main entrance"
      },
      {
        letter: "C",
        text: "The Rose Garden"
      }
    ],
    answer: "B"
  },

  {
    id: 14,
    question:
      "Before leaving the entrance area, what are visitors advised to check?",
    options: [
      {
        letter: "A",
        text: "The information board"
      },
      {
        letter: "B",
        text: "The gift shop"
      },
      {
        letter: "C",
        text: "The café notice board"
      }
    ],
    answer: "A"
  },

  {
    id: 15,
    question:
      "According to the guide, what is the Visitor Centre mainly used for?",
    options: [
      {
        letter: "A",
        text: "Buying admission tickets"
      },
      {
        letter: "B",
        text: "Obtaining visitor information"
      },
      {
        letter: "C",
        text: "Booking lake activities"
      }
    ],
    answer: "B"
  }
] // closes questions

}, // closes MCQ group

{
  id: "section2_map",

  type: "map",

  title: "Questions 16–20",

  instruction:
    "Label the map below.\nChoose FIVE answers from the box and write the correct letter, A–F, next to Questions 16–20.",

  image: "/images/listening/test001-map.svg",

  options: [
    {
      letter: "A",
      text: "Main Entrance"
    },
    {
      letter: "B",
      text: "Visitor Centre"
    },
    {
      letter: "C",
      text: "Adventure Playground"
    },
    {
      letter: "D",
      text: "Rose Garden"
    },
    {
      letter: "E",
      text: "Boat House"
    },
    {
      letter: "F",
      text: "Picnic Area"
    }
  ],

  questions: [
    {
      id: 16,
      label: "Information Point",
      answer: "B"
    },
    {
      id: 17,
      label: "Formal Garden",
      answer: "D"
    },
    {
      id: 18,
      label: "Children's Activity Area",
      answer: "C"
    },
    {
      id: 19,
      label: "Lakeside Building",
      answer: "E"
    },
    {
      id: 20,
      label: "Outdoor Eating Area",
      answer: "F"
    }
  ]
}

      ]

    },
    {
  id: 3,

  title: "Section 3",

  type: "mixed",

  audioStart: 695,

  audioEnd: 1182,

  groups: [

    {
  id: "section3_matching",

  type: "matching",

  title: "Questions 21–25",

  instruction:
    "What does each speaker say about the questionnaire?\nChoose FIVE answers from the box and write the correct letter, A, B or C next to Questions 21–25.",

  options: [
    {
      letter: "A",
      text: "Emma"
    },
    {
      letter: "B",
      text: "Daniel"
    },
    {
      letter: "C",
      text: "Dr. Matthews"
    }
  ],

  questions: [
    {
      id: 21,
      item:
        "Believes the revised project has become more achievable.",
      answer: "C"
    },

    {
      id: 22,
      item:
        "Suggested reducing the overall number of participants.",
      answer: "B"
    },

    {
      id: 23,
      item:
        "Values complete responses over a larger quantity of incomplete ones.",
      answer: "A"
    },

    {
      id: 24,
      item:
        "Recommends using different question formats together.",
      answer: "C"
    },

    {
      id: 25,
      item:
        "Intends to shorten the questionnaire before distributing it.",
      answer: "A"
    }
  ]
},{
  id: "section3_mcq",

  type: "mcq",

  title: "Questions 26–30",

  instruction:
    "Choose the correct letter, A, B or C.",

  questions: [

    {
      id: 26,

      question:
        "Why did the students decide to modify the original research topic?",

      options: [
        {
          letter: "A",
          text: "It was too broad to investigate effectively."
        },
        {
          letter: "B",
          text: "The university required a different subject."
        },
        {
          letter: "C",
          text: "There were too few people available to take part."
        }
      ],

      answer: "A"
    },

    {
      id: 27,

      question:
        "According to Dr. Matthews, what is an advantage of multiple-choice questions?",

      options: [
        {
          letter: "A",
          text: "They simplify statistical analysis."
        },
        {
          letter: "B",
          text: "Participants generally enjoy answering them."
        },
        {
          letter: "C",
          text: "They encourage more detailed responses."
        }
      ],

      answer: "A"
    },

    {
      id: 28,

      question:
        "What does Dr. Matthews recommend if the students have limited time?",

      options: [
        {
          letter: "A",
          text: "Cancel the questionnaire completely."
        },
        {
          letter: "B",
          text: "Complete the questionnaire before conducting interviews."
        },
        {
          letter: "C",
          text: "Increase the number of interview participants."
        }
      ],

      answer: "B"
    },

    {
      id: 29,

      question:
        "What does Dr. Matthews suggest could increase the questionnaire response rate?",

      options: [
        {
          letter: "A",
          text: "Making it more detailed."
        },
        {
          letter: "B",
          text: "Sending participants a reminder."
        },
        {
          letter: "C",
          text: "Removing the consent section."
        }
      ],

      answer: "B"
    },

    {
      id: 30,

      question:
        "What is the main purpose of the progress report?",

      options: [
        {
          letter: "A",
          text: "To present the completed research findings."
        },
        {
          letter: "B",
          text: "To review whether the project is progressing appropriately."
        },
        {
          letter: "C",
          text: "To explain the statistical results."
        }
      ],

      answer: "B"
    }

  ]
}

  ]

},
{
  id: 4,

  title: "Section 4",

  type: "mixed",

  audioStart: 1183,

  audioEnd: 1715,

  groups: [

 {
  id: "section4_notes",

  type: "notes",

  title: "Questions 31–34",

  instruction:
    "Complete the notes below.\nWrite NO MORE THAN TWO WORDS for each answer.",

  notesTitle:
    "Renewable Energy in Modern Cities",

  notes: [

    {
      type: "heading",
      text: "Background"
    },

    {
      type: "text",
      text:
        "Renewable energy sources include solar, wind, hydroelectric, geothermal, tidal power and sustainably produced biomass."
    },

    {
      type: "blank",
      id: 31,
      suffix:
        "have made renewable technologies considerably more affordable."
    },

    {
      type: "blank",
      id: 32,
      suffix:
        "cannot depend on a single renewable energy source."
    },

    {
      type: "blank",
      id: 33,
      suffix:
        "bring together several renewable technologies."
    },

    {
      type: "blank",
      id: 34,
      suffix:
        "are used to monitor electricity demand continuously."
    }

  ],

  answers: {
    31: "Advances in manufacturing",
    32: "Cities",
    33: "Integrated energy systems",
    34: "Thousands of sensors"
  }
},
{
  id: "section4_table",

  type: "table",

  title: "Questions 35–37",

  instruction:
    "Complete the table below.\nWrite NO MORE THAN TWO WORDS for each answer.",

  tableTitle:
    "Examples of Renewable Energy Strategies",

      headers: [
    "Location",
    "Main approach",
    "Focus"
  ],

  rows: [

    [
      {
        type: "text",
        value: "Germany"
      },

      {
        id: 35
      },

      {
        type: "text",
        value: "of renewable energy sources"
      }
    ],

    [
      {
        type: "text",
        value: "Singapore"
      },

      {
        id: 36
      },

      {
        type: "text",
        value: "to reduce unnecessary electricity use"
      }
    ],

    [
      {
        type: "text",
        value: "Copenhagen"
      },

      {
        id: 37
      },

      {
        type: "text",
        value: "to reduce carbon emissions"
      }
    ]

  ],

  answers: {
    35: "combination",
    36: "intelligent building management systems",
    37: "cycling infrastructure"
  }
},
{
  id: "section4_flowchart",

  type: "flowchart",

  title: "Questions 38–40",

  instruction:
    "Complete the flow chart below.\nWrite NO MORE THAN TWO WORDS for each answer.",

  flowchartTitle:
    "Future Development of Renewable Energy",

  steps: [

    {
      type: "text",
      text:
        "Electricity is generated from renewable sources."
    },

    {
      type: "blank",
      id: 38,
      suffix:
        "allows electricity to move efficiently throughout the network."
    },

    {
      type: "blank",
      id: 39,
      suffix:
        "provides long-term energy storage."
    },

    {
      type: "blank",
      id: 40,
      suffix:
        "supports sustainable urban development."
    }

  ],

  answers: {
    38: "Smart grid",
    39: "Green hydrogen",
    40: "International cooperation"
  }
}
  ]
}
  ]
};

export default listeningTest001;