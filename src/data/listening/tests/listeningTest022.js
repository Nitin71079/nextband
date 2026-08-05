const listeningTest022 = {
  id: "listening-test-022",
  title: "IELTS Listening Practice Test 022",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test002.mp3",
  transcript: "/assets/listening/test002/transcript.txt",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer."
  ],

  audioTimeline: {
    section1: { start: 0,    end: 330  },
    section2: { start: 331,  end: 680  },
    section3: { start: 681,  end: 1170 },
    section4: { start: 1171, end: 1710 }
  },

  sections: [

    /* ============================================================
       SECTION 1  (00:00 – ~05:30)
       Scenario: Sandra phones Greenfield Leisure Centre to book
       lane swimming sessions and ask about fitness classes.
       Question type: Form completion (Q1–10)
    ============================================================ */
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 330,

      instruction:
        "Complete the booking form below. " +
        "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle: "GREENFIELD LEISURE CENTRE — LANE SWIMMING BOOKING FORM",

      form: [
        {
          id: 1,
          label: "Customer name",
          answer: "Sandra Howell"
        },
        {
          id: 2,
          label: "Membership number",
          answer: "GL4728"
        },
        {
          id: 3,
          label: "Activity booked",
          answer: "lane swimming"
        },
        {
          id: 4,
          label: "Preferred day",
          answer: "Tuesday"
        },
        {
          id: 5,
          label: "Session time",
          answer: "7:30"
        },
        {
          id: 6,
          label: "Number of sessions",
          answer: "8"
        },
        {
          id: 7,
          label: "Class of interest",
          answer: "aqua aerobics"
        },
        {
          id: 8,
          label: "Class fee per session",
          prefix: "£",
          answer: "12"
        },
        {
          id: 9,
          label: "Special requirement (lane position)",
          answer: "shallow end"
        },
        {
          id: 10,
          label: "Confirmation method",
          answer: "email"
        }
      ]
    },

    /* ============================================================
       SECTION 2  (~05:31 – ~11:20)
       Scenario: Guide Caroline gives an introductory talk at
       the Hartley City Museum before a group tour.
       Q11–15: MCQ  |  Q16–20: Map labelling (ground floor)
    ============================================================ */
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 331,
      audioEnd: 680,

      groups: [

        {
          id: "section2_mcq",
          type: "mcq",
          title: "Questions 11–15",
          instruction: "Choose the correct letter, A, B or C.",
          questions: [

            {
              id: 11,
              question: "When was the Hartley City Museum originally opened?",
              options: [
                { letter: "A", text: "1887" },
                { letter: "B", text: "1907" },
                { letter: "C", text: "1927" }
              ],
              answer: "A"
            },

            {
              id: 12,
              question: "Where does the majority of the museum's operating budget come from today?",
              options: [
                { letter: "A", text: "Government grants" },
                { letter: "B", text: "Ticket revenue" },
                { letter: "C", text: "Private donations" }
              ],
              answer: "C"
            },

            {
              id: 13,
              question: "Which part of the museum is temporarily closed on the day of the visit?",
              options: [
                { letter: "A", text: "The Natural History Gallery" },
                { letter: "B", text: "The Ancient Civilisations Gallery" },
                { letter: "C", text: "The Modern Art Gallery" }
              ],
              answer: "B"
            },

            {
              id: 14,
              question: "What must visitors do before entering the photography exhibition?",
              options: [
                { letter: "A", text: "Purchase a separate ticket at the admissions desk" },
                { letter: "B", text: "Register their name with the guide" },
                { letter: "C", text: "Leave their bags in the cloakroom" }
              ],
              answer: "A"
            },

            {
              id: 15,
              question: "What was added to the museum as part of the recent renovation?",
              options: [
                { letter: "A", text: "A rooftop café" },
                { letter: "B", text: "An underground car park" },
                { letter: "C", text: "A new lecture theatre" }
              ],
              answer: "A"
            }

          ]
        },

        {
          id: "section2_map",
          type: "map",
          title: "Questions 16–20",
          instruction:
            "Label the map of the Hartley City Museum ground floor below.\n" +
            "Choose FIVE answers from the box and write the correct letter, A–H, " +
            "next to Questions 16–20.",
          image: "/images/listening/test002-map.svg",
          options: [
            { letter: "A", text: "Café" },
            { letter: "B", text: "Children's Workshop" },
            { letter: "C", text: "Cloakroom" },
            { letter: "D", text: "Egyptian Exhibition" },
            { letter: "E", text: "Information Desk" },
            { letter: "F", text: "Gift Shop" },
            { letter: "G", text: "Photography Exhibition" },
            { letter: "H", text: "Lecture Theatre" }
          ],
          questions: [
            {
              id: 16,
              label: "Room in top-left corner (store coats and bags)",
              answer: "C"
            },
            {
              id: 17,
              label: "Large space north of Entrance Hall (over 300 artefacts)",
              answer: "D"
            },
            {
              id: 18,
              label: "Top-right room (ticketed, fragile prints)",
              answer: "G"
            },
            {
              id: 19,
              label: "Middle-left room (hands-on crafts for children)",
              answer: "B"
            },
            {
              id: 20,
              label: "Middle-right room adjacent to atrium (hot meals and beverages)",
              answer: "A"
            }
          ]
        }

      ]
    },

    /* ============================================================
       SECTION 3  (~11:21 – ~19:30)
       Scenario: Priya and Tom meet their tutor Dr Chen to discuss
       their psychology research project on social media and
       self-esteem in undergraduates.
       Q21–25: Matching (who says what)
       Q26–30: MCQ
    ============================================================ */
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 681,
      audioEnd: 1170,

      groups: [

        {
          id: "section3_matching",
          type: "matching",
          title: "Questions 21–25",
          instruction:
            "Who expresses each of the following opinions?\n" +
            "Choose the correct letter, A, B or C.",
          options: [
            { letter: "A", text: "Priya"    },
            { letter: "B", text: "Tom"      },
            { letter: "C", text: "Dr Chen"  }
          ],
          questions: [
            {
              id: 21,
              item: "Believes a sample of thirty to forty participants is sufficient for a valid conclusion.",
              answer: "C"
            },
            {
              id: 22,
              item: "Suggested using a control group to strengthen the research design.",
              answer: "B"
            },
            {
              id: 23,
              item: "Is concerned that the data collection period is too short to capture trends.",
              answer: "A"
            },
            {
              id: 24,
              item: "Strongly recommends piloting the survey with a small group first.",
              answer: "C"
            },
            {
              id: 25,
              item: "Plans to revise the wording of two problematic questions before the pilot.",
              answer: "A"
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
              question: "Why did the students change their original research topic?",
              options: [
                { letter: "A", text: "It was too broad for an undergraduate project." },
                { letter: "B", text: "They could not find enough participants." },
                { letter: "C", text: "The university ethics committee rejected the proposal." }
              ],
              answer: "C"
            },

            {
              id: 27,
              question: "According to Dr Chen, what is the main advantage of observational methods?",
              options: [
                { letter: "A", text: "They are quicker to analyse than surveys." },
                { letter: "B", text: "They capture behaviour in a natural setting." },
                { letter: "C", text: "They are easier to organise than interviews." }
              ],
              answer: "B"
            },

            {
              id: 28,
              question: "What does Dr Chen say the final report must include?",
              options: [
                { letter: "A", text: "A section explicitly acknowledging the study's limitations." },
                { letter: "B", text: "A comparison with at least three previous studies." },
                { letter: "C", text: "A separate appendix containing all raw data." }
              ],
              answer: "A"
            },

            {
              id: 29,
              question: "What problem has Tom encountered while preparing the research?",
              options: [
                { letter: "A", text: "Several participants have withdrawn from the study." },
                { letter: "B", text: "Some interview recordings are unclear and difficult to transcribe." },
                { letter: "C", text: "The survey has not yet been approved by the department." }
              ],
              answer: "B"
            },

            {
              id: 30,
              question: "When is the draft literature review due?",
              options: [
                { letter: "A", text: "The following Monday" },
                { letter: "B", text: "End of the current week" },
                { letter: "C", text: "Two weeks from today" }
              ],
              answer: "A"
            }

          ]
        }

      ]
    },

    /* ============================================================
       SECTION 4  (~19:31 – ~28:30)
       Scenario: Lecture on urban water management and sustainable
       cities — surface runoff, permeable paving, city examples,
       and the sustainable urban water cycle.
       Q31–34: Notes completion
       Q35–37: Table completion (city comparisons)
       Q38–40: Flowchart completion (water cycle stages)
    ============================================================ */
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1171,
      audioEnd: 1710,

      groups: [

        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–34",
          instruction:
            "Complete the notes below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "Urban Water Management and Sustainable Cities",
          notes: [
            {
              type: "heading",
              text: "Key concepts"
            },
            {
              type: "text",
              text:
                "More than half the world's population now lives in cities. " +
                "This places enormous pressure on freshwater resources and " +
                "drainage systems designed decades — sometimes centuries — ago."
            },
            {
              type: "blank",
              id: 31,
              suffix:
                " is the term for rainfall that flows across hard urban surfaces and enters the drainage network."
            },
            {
              type: "blank",
              id: 32,
              suffix:
                " replaces solid concrete surfaces with materials that allow water to seep through, reducing flood risk."
            },
            {
              type: "blank",
              id: 33,
              suffix:
                " refers to how well a city can withstand and recover from water-related disruptions such as floods or droughts."
            },
            {
              type: "blank",
              id: 34,
              suffix:
                " is identified as the leading cause of freshwater scarcity in rapidly growing cities, particularly in South and Southeast Asia."
            }
          ],
          answers: {
            31: "Surface runoff",
            32: "Permeable paving",
            33: "Water resilience",
            34: "Population growth"
          }
        },

        {
          id: "section4_table",
          type: "table",
          title: "Questions 35–37",
          instruction:
            "Complete the table below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          tableTitle: "City Water Management Strategies",
          headers: ["City", "Key approach", "Reported benefit"],
          rows: [
            [
              { type: "text", value: "Singapore" },
              { type: "text", value: "NEWater programme (advanced water recycling)" },
              { id: 35 }
            ],
            [
              { type: "text", value: "Copenhagen" },
              { id: 36 },
              { type: "text", value: "Dramatically reduced flood damage costs" }
            ],
            [
              { type: "text", value: "Mumbai" },
              { type: "text", value: "Upgraded drainage tunnels beneath the city" },
              { id: 37 }
            ]
          ],
          answers: {
            35: "water independence",
            36: "cloudburst management",
            37: "faster flood recovery"
          }
        },

        {
          id: "section4_flowchart",
          type: "flowchart",
          title: "Questions 38–40",
          instruction:
            "Complete the flow chart below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          flowchartTitle: "Stages of a Sustainable Urban Water Cycle",
          steps: [
            {
              type: "text",
              text:
                "Rainfall is collected from rooftops and hard surfaces."
            },
            {
              type: "blank",
              id: 38,
              suffix:
                " — engineered ecosystems of plants, gravel and microorganisms — filter pollutants such as heavy metals, oils and pathogens."
            },
            {
              type: "blank",
              id: 39,
              suffix:
                " tracks consumption in real time, identifies leaks, and manages water distribution efficiently."
            },
            {
              type: "blank",
              id: 40,
              suffix:
                " converts organic matter in wastewater into methane gas, which can generate electricity to power the treatment facility."
            }
          ],
          answers: {
            38: "Constructed wetlands",
            39: "Smart metering",
            40: "Biogas generation"
          }
        }

      ]
    }

  ]

};

export default listeningTest022;
