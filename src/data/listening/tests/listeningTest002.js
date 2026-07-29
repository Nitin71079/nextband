const listeningTest002 = {
  id: "listening-test-002",
  title: "IELTS Listening Practice Test 002",
  difficulty: "Academic",
  duration: 30,
  audio: "/audio/listening/test002.mp3",
  transcript: "/assets/listening/test002/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer."
  ],

  audioTimeline: {
    section1: { start: 0,    end: 335  },
    section2: { start: 336,  end: 705  },
    section3: { start: 706,  end: 1198 },
    section4: { start: 1199, end: 1738 }
  },

  sections: [

    /* ============================================================
       SECTION 1
       Scenario: Nathan Collins phones the Riverside Community
       Art Centre to register for an evening art course.
       Question type: Form completion (Q1–10)
    ============================================================ */
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 335,

      instruction:
        "Complete the registration form below. " +
        "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle: "RIVERSIDE COMMUNITY ART CENTRE — REGISTRATION FORM",

      form: [
        {
          id: 1,
          label: "Full name",
          answer: "Nathan Collins"
        },
        {
          id: 2,
          label: "Home address",
          answer: "27 Willow Road"
        },
        {
          id: 3,
          label: "Postcode",
          answer: "BS14 8PL"
        },
        {
          id: 4,
          label: "Telephone number",
          answer: "07831 694582"
        },
        {
          id: 5,
          label: "Course selected",
          answer: "watercolour"
        },
        {
          id: 6,
          label: "Preferred evening",
          answer: "Thursday"
        },
        {
          id: 7,
          label: "How heard about centre",
          answer: "neighbour"
        },
        {
          id: 8,
          label: "Equipment hire",
          answer: "painting set"
        },
        {
          id: 9,
          label: "Refundable deposit",
          prefix: "£",
          answer: "25"
        },
        {
          id: 10,
          label: "Reason for joining",
          answer: "personal interest"
        }
      ]
    },

    /* ============================================================
       SECTION 2
       Scenario: A guide (Emily) gives a talk about Riverside
       Botanical Gardens before a guided tour.
       Q11–15: MCQ  |  Q16–20: Map labelling
    ============================================================ */
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 336,
      audioEnd: 705,

      groups: [

        {
          id: "section2_mcq",
          type: "mcq",
          title: "Questions 11–15",
          instruction: "Choose the correct letter, A, B or C.",
          questions: [

            {
              id: 11,
              question:
                "Why is today's tour route different from the usual one?",
              options: [
                { letter: "A", text: "The Japanese Garden is temporarily closed." },
                { letter: "B", text: "The Orchid House is closed for new equipment." },
                { letter: "C", text: "The bridge crossing the lake is under repair." }
              ],
              answer: "B"
            },

            {
              id: 12,
              question:
                "Why are visitors asked to stay on the marked paths?",
              options: [
                { letter: "A", text: "Maintenance vehicles are operating nearby." },
                { letter: "B", text: "The paths have recently been resurfaced." },
                { letter: "C", text: "Rare alpine plants are beginning to flower." }
              ],
              answer: "C"
            },

            {
              id: 13,
              question:
                "What restriction applies to photography in the gardens?",
              options: [
                { letter: "A", text: "Visitors must pay for a photography permit." },
                { letter: "B", text: "Drones are not permitted anywhere on the property." },
                { letter: "C", text: "Photography is prohibited in most areas." }
              ],
              answer: "B"
            },

            {
              id: 14,
              question:
                "What does the guide say about the Glasshouse?",
              options: [
                { letter: "A", text: "It is the oldest structure in the gardens." },
                { letter: "B", text: "It will be closed during today's tour." },
                { letter: "C", text: "It was completed in 2012." }
              ],
              answer: "C"
            },

            {
              id: 15,
              question:
                "What will visitors be able to do during the free time at the end of the tour?",
              options: [
                { letter: "A", text: "Join a second guided walk." },
                { letter: "B", text: "Explore the gardens independently." },
                { letter: "C", text: "Take part in a photography workshop." }
              ],
              answer: "B"
            }

          ]
        },

        {
          id: "section2_map",
          type: "map",
          title: "Questions 16–20",
          instruction:
            "Label the map of Riverside Botanical Gardens below.\n" +
            "Choose FIVE answers from the box and write the correct letter, A–H, " +
            "next to Questions 16–20.",
          image: "/images/listening/test002-map.svg",
          options: [
            { letter: "A", text: "Bridge"           },
            { letter: "B", text: "Café"              },
            { letter: "C", text: "Children's Garden" },
            { letter: "D", text: "Gift Shop"         },
            { letter: "E", text: "Glasshouse"        },
            { letter: "F", text: "Japanese Garden"   },
            { letter: "G", text: "Rose Garden"       },
            { letter: "H", text: "Visitor Centre"    }
          ],
          questions: [
            {
              id: 16,
              label: "Current starting point (southern side)",
              answer: "H"
            },
            {
              id: 17,
              label: "First stop on today's tour",
              answer: "F"
            },
            {
              id: 18,
              label: "Structure crossed to reach Glasshouse",
              answer: "A"
            },
            {
              id: 19,
              label: "Building visited after the bridge",
              answer: "E"
            },
            {
              id: 20,
              label: "Where the guided tour officially ends",
              answer: "C"
            }
          ]
        }

      ]
    },

    /* ============================================================
       SECTION 3
       Scenario: Emma and Liam meet their supervisor Dr. Harris
       to discuss their Renewable Energy Research Project.
       Q21–25: Matching (speaker opinions)
       Q26–30: MCQ
    ============================================================ */
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 706,
      audioEnd: 1198,

      groups: [

        {
          id: "section3_matching",
          type: "matching",
          title: "Questions 21–25",
          instruction:
            "Who expresses each of the following opinions?\n" +
            "Choose the correct letter, A, B or C.",
          options: [
            { letter: "A", text: "Emma"      },
            { letter: "B", text: "Liam"      },
            { letter: "C", text: "Dr. Harris" }
          ],
          questions: [
            {
              id: 21,
              item: "Suggests comparing different types of public buildings.",
              answer: "C"
            },
            {
              id: 22,
              item: "Initially wanted to focus only on solar energy.",
              answer: "A"
            },
            {
              id: 23,
              item: "Was concerned about obtaining reliable financial figures.",
              answer: "A"
            },
            {
              id: 24,
              item: "Recommended collecting maintenance frequency instead of costs.",
              answer: "C"
            },
            {
              id: 25,
              item: "Recognises that analysing results may require more time than expected.",
              answer: "C"
            }
          ]
        },

        {
          id: "section3_mcq",
          type: "mcq",
          title: "Questions 26–30",
          instruction: "Choose the correct letter, A, B or C.",
          questions: [

            {
              id: 26,
              question:
                "Why does Dr. Harris advise the students to narrow the scope of their project?",
              options: [
                { letter: "A", text: "Smaller studies generally produce stronger findings." },
                { letter: "B", text: "The university limits the size of undergraduate projects." },
                { letter: "C", text: "There are too few renewable energy sites available." }
              ],
              answer: "A"
            },

            {
              id: 27,
              question:
                "What is identified as the main disadvantage of interviews?",
              options: [
                { letter: "A", text: "Participants often refuse to answer honestly." },
                { letter: "B", text: "They are time-consuming to arrange." },
                { letter: "C", text: "They are difficult to compare statistically." }
              ],
              answer: "B"
            },

            {
              id: 28,
              question:
                "What advice does Dr. Harris give about background reading?",
              options: [
                { letter: "A", text: "Use websites only for statistical information." },
                { letter: "B", text: "Base the main discussion on peer-reviewed research." },
                { letter: "C", text: "Avoid government publications completely." }
              ],
              answer: "B"
            },

            {
              id: 29,
              question:
                "According to Dr. Harris, why should the timetable be changed?",
              options: [
                { letter: "A", text: "Questionnaire data usually arrive later than expected." },
                { letter: "B", text: "Analysing the findings often takes longer than students expect." },
                { letter: "C", text: "Preparing questionnaires requires additional approval." }
              ],
              answer: "B"
            },

            {
              id: 30,
              question:
                "What does Dr. Harris recommend for presenting findings?",
              options: [
                { letter: "A", text: "Present all findings mainly in tables." },
                { letter: "B", text: "Explain technical terms and use graphs where appropriate." },
                { letter: "C", text: "Avoid discussing specialist concepts." }
              ],
              answer: "B"
            }

          ]
        }

      ]
    },

    /* ============================================================
       SECTION 4
       Scenario: An academic lecture on Coral Reef Conservation —
       threats, restoration techniques and future solutions.
       Q31–34: Notes completion
       Q35–37: Table completion
       Q38–40: Flowchart completion
    ============================================================ */
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1199,
      audioEnd: 1738,

      groups: [

        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–34",
          instruction:
            "Complete the notes below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "Coral Reef Conservation: Challenges and Future Solutions",
          notes: [
            {
              type: "heading",
              text: "Threats to coral reefs"
            },
            {
              type: "text",
              text:
                "Although coral reefs cover less than one per cent of the ocean floor, " +
                "they support approximately twenty-five per cent of all known marine species."
            },
            {
              type: "blank",
              id: 31,
              suffix: "is considered the greatest long-term threat to coral reefs."
            },
            {
              type: "blank",
              id: 32,
              suffix: "causes corals to lose the algae that provide food and colour."
            },
            {
              type: "blank",
              id: 33,
              suffix:
                "from rivers carries fertilisers, plastics and chemical waste into coastal waters."
            },
            {
              type: "blank",
              id: 34,
              suffix:
                "are trained to monitor reef health and report illegal fishing activity."
            }
          ],
          answers: {
            31: "Climate change",
            32: "Coral bleaching",
            33: "Pollution",
            34: "Local residents"
          }
        },

        {
          id: "section4_table",
          type: "table",
          title: "Questions 35–37",
          instruction:
            "Complete the table below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          tableTitle: "Modern Coral Reef Restoration Techniques",
          headers: [ "Technique", "How it works", "Key advantage" ],
          rows: [
            [
              { type: "text", value: "Coral nurseries" },
              { id: 35 },
              { type: "text", value: "under controlled conditions before transplantation" }
            ],
            [
              { type: "text", value: "Underwater drones" },
              { id: 36 },
              { type: "text", value: "thousands of square metres quickly" }
            ],
            [
              { type: "text", value: "Artificial intelligence" },
              { id: 37 },
              { type: "text", value: "patterns of bleaching before visible to the human eye" }
            ]
          ],
          answers: {
            35: "grow coral fragments",
            36: "photograph",
            37: "detect"
          }
        },

        {
          id: "section4_flowchart",
          type: "flowchart",
          title: "Questions 38–40",
          instruction:
            "Complete the flow chart below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          flowchartTitle: "Successful Coral Reef Conservation",
          steps: [
            {
              type: "text",
              text: "Reduce greenhouse gas emissions to address climate change."
            },
            {
              type: "blank",
              id: 38,
              suffix: "and controlling fishing practices improve local reef conditions."
            },
            {
              type: "blank",
              id: 39,
              suffix: "helps identify damaged reef areas quickly and efficiently."
            },
            {
              type: "blank",
              id: 40,
              suffix: "ensures conservation policies work across national borders."
            }
          ],
          answers: {
            38: "Improving water quality",
            39: "Artificial intelligence",
            40: "International cooperation"
          }
        }

      ]
    }

  ]

};

export default listeningTest002;
