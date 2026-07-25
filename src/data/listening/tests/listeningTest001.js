const listeningTest001 = {
  id: "listening-test-001",

  title: "IELTS Listening Practice Test 001",

  difficulty: "Academic",

  duration: 30,

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
                "How often are guided tours available?",
options: [

    {
        letter: "A",
        text: "Weekends only"
    },

    {
        letter: "B",
        text: "Every day"
    },

    {
        letter: "C",
        text: "During school holidays"
    }

],

              answer: "B"

            },

         {
  id: 12,

  question: "How long does the guided tour usually last?",

  options: [
    {
      letter: "A",
      text: "60 minutes"
    },
    {
      letter: "B",
      text: "90 minutes"
    },
    {
      letter: "C",
      text: "2 hours"
    }
  ],

  answer: "B"
},

        {
  id: 13,

  question: "Where does today's tour begin?",

  options: [
    {
      letter: "A",
      text: "Visitor Centre"
    },
    {
      letter: "B",
      text: "Main Entrance"
    },
    {
      letter: "C",
      text: "Rose Garden"
    }
  ],

  answer: "B"
},{
  id: 14,

  question: "What should visitors look at before leaving the entrance?",

  options: [
    {
      letter: "A",
      text: "Information Board"
    },
    {
      letter: "B",
      text: "Gift Shop"
    },
    {
      letter: "C",
      text: "Notice Board at the Café"
    }
  ],

  answer: "A"
},
{
  id: 15,

  question: "What is the main purpose of the Visitor Centre?",

  options: [
    {
      letter: "A",
      text: "Selling Tickets"
    },
    {
      letter: "B",
      text: "Providing Information"
    },
    {
      letter: "C",
      text: "Booking Boat Trips"
    }
  ],

  answer: "B"
}

] // closes questions

}, // closes MCQ group

{
  id: "section2_map",

          type:"map",

          title:"Questions 16–20",

          instruction:
          "Label the map below. Choose FIVE answers from the box.",

          image:"/images/listening/test001-map.svg",

          options:[

            {

              letter:"A",

              text:"Main Entrance"

            },

            {

              letter:"B",

              text:"Visitor Centre"

            },

            {

              letter:"C",

              text:"Adventure Playground"

            },

            {

              letter:"D",

              text:"Rose Garden"

            },

            {

              letter:"E",

              text:"Boat House"

            },

            {

              letter:"F",

              text:"Picnic Area"

            }

          ],

          questions:[

            {

              id:16,

              answer:"B"

            },

            {

              id:17,

              answer:"D"

            },

            {

              id:18,

              answer:"C"

            },

            {

              id:19,

              answer:"E"

            },

            {

              id:20,

              answer:"F"

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
        "Who expresses each of the following opinions?\nChoose the correct letter, A, B or C.",

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
            "Believes the revised project is much more realistic.",

          answer: "C"
        },

        {
          id: 22,

          item:
            "Suggested reducing the number of survey participants.",

          answer: "B"
        },

        {
          id: 23,

          item:
            "Prefers fewer detailed responses to many incomplete ones.",

          answer: "A"
        },

        {
          id: 24,

          item:
            "Recommends combining multiple-choice and open-ended questions.",

          answer: "C"
        },

        {
          id: 25,

          item:
            "Plans to shorten the questionnaire before distributing it.",

          answer: "A"
        }

      ]

    },
        {

      id: "section3_mcq",

      type: "mcq",

      title: "Questions 26–30",

      instruction:
        "Choose the correct letter, A, B or C.",

      questions: [
{
  id: 26,

  question:
    "Why did the students narrow the scope of their research?",

  options: [
    {
      letter: "A",
      text: "The original topic was too difficult to complete."
    },
    {
      letter: "B",
      text: "The university requested a smaller study."
    },
    {
      letter: "C",
      text: "There were not enough participants."
    }
  ],

  answer: "A"
},
{
  id: 27,

  question:
    "According to Dr. Matthews, why are multiple-choice questions useful?",

  options: [
    {
      letter: "A",
      text: "They are easier to analyse statistically."
    },
    {
      letter: "B",
      text: "Students prefer answering them."
    },
    {
      letter: "C",
      text: "They produce more detailed responses."
    }
  ],

  answer: "A"
},
{
  id: 28,

  question:
    "What advice does Dr. Matthews give if time becomes limited?",

  options: [
    {
      letter: "A",
      text: "Cancel the questionnaire."
    },
    {
      letter: "B",
      text: "Focus on the questionnaire before interviews."
    },
    {
      letter: "C",
      text: "Interview more staff members."
    }
  ],

  answer: "B"
},
{
  id: 29,

  question:
    "What can improve the response rate of online questionnaires?",

  options: [
    {
      letter: "A",
      text: "Making them longer."
    },
    {
      letter: "B",
      text: "Sending a reminder email."
    },
    {
      letter: "C",
      text: "Removing the consent statement."
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
      text: "To submit the final research findings."
    },
    {
      letter: "B",
      text: "To check that the project is developing correctly."
    },
    {
      letter: "C",
      text: "To present the statistical analysis."
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
      text: "Renewable Energy"
    },

    {
      type: "text",
      text:
        "Renewable energy includes solar, wind, hydroelectric, geothermal, tidal power and sustainably produced biomass."
    },

    {
      type: "blank",
      id: 31,
      suffix:
        "have reduced the cost of renewable technologies."
    },

    {
      type: "blank",
      id: 32,
      suffix:
        "cannot rely on only one renewable source."
    },

    {
      type: "blank",
      id: 33,
      suffix:
        "combine several renewable energy sources."
    },

    {
      type: "blank",
      id: 34,
      suffix:
        "monitor electricity demand continuously."
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
    "Renewable Energy Strategies in Different Cities",

  headers: [
    "City",
    "Main Strategy"
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
        value: "reduce unnecessary electricity use"
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
        value: "helps reduce carbon emissions"
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
        "Renewable electricity generated by solar panels"
    },

    {
      type: "blank",
      id: 38,
      suffix:
        "allows electricity to flow in multiple directions."
    },

    {
      type: "blank",
      id: 39,
      suffix:
        "stores renewable energy for long periods."
    },

    {
      type: "blank",
      id: 40,
      suffix:
        "helps cities improve urban sustainability."
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