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
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: {
      start: 0,
      end: 330
    },
    section2: {
      start: 331,
      end: 680
    },
    section3: {
      start: 681,
      end: 1170
    },
    section4: {
      start: 1171,
      end: 1710
    }
  },

  sections: [

    // ─────────────────────────────────────────────
    // SECTION 1 – Form Completion
    // Scenario: A woman calls a leisure centre to
    // book a swimming lane and enquire about classes.
    // ─────────────────────────────────────────────
    {
      id: 1,

      title: "Section 1",

      type: "form",

      audioStart: 0,

      audioEnd: 330,

      instruction:
        "Complete the booking form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle: "GREENFIELD LEISURE CENTRE – LANE BOOKING FORM",

      form: [
        {
          id: 1,
          label: "Member Name",
          answer: "Sandra Howell"
        },
        {
          id: 2,
          label: "Membership Number",
          answer: "GL4728"
        },
        {
          id: 3,
          label: "Activity Requested",
          answer: "lane swimming"
        },
        {
          id: 4,
          label: "Preferred Day",
          answer: "Tuesday"
        },
        {
          id: 5,
          label: "Preferred Time",
          suffix: " am",
          answer: "7:30"
        },
        {
          id: 6,
          label: "Number of Sessions",
          answer: "8"
        },
        {
          id: 7,
          label: "Name of Fitness Class",
          answer: "aqua aerobics"
        },
        {
          id: 8,
          label: "Class Fee (per session)",
          prefix: "£",
          answer: "12"
        },
        {
          id: 9,
          label: "Special Requirement",
          answer: "shallow end"
        },
        {
          id: 10,
          label: "Confirmation Method",
          answer: "email"
        }
      ]
    },

    // ─────────────────────────────────────────────
    // SECTION 2 – MCQ + Map Labelling
    // Scenario: A guide gives an introductory talk
    // at the Hartley City Museum.
    // ─────────────────────────────────────────────
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
              question:
                "When was the Hartley City Museum originally opened?",
              options: [
                { letter: "A", text: "1887" },
                { letter: "B", text: "1902" },
                { letter: "C", text: "1923" }
              ],
              answer: "A"
            },
            {
              id: 12,
              question:
                "What is the current main source of funding for the museum?",
              options: [
                { letter: "A", text: "Government grants" },
                { letter: "B", text: "Entry ticket sales" },
                { letter: "C", text: "Private donations" }
              ],
              answer: "C"
            },
            {
              id: 13,
              question:
                "Which gallery is temporarily closed during the visit?",
              options: [
                { letter: "A", text: "Natural History Gallery" },
                { letter: "B", text: "Ancient Civilisations Gallery" },
                { letter: "C", text: "Modern Art Gallery" }
              ],
              answer: "B"
            },
            {
              id: 14,
              question:
                "What must visitors do before entering the photography exhibition?",
              options: [
                { letter: "A", text: "Purchase a separate ticket" },
                { letter: "B", text: "Register at the front desk" },
                { letter: "C", text: "Leave bags in a locker" }
              ],
              answer: "A"
            },
            {
              id: 15,
              question:
                "What facility is new since the recent renovation?",
              options: [
                { letter: "A", text: "The rooftop café" },
                { letter: "B", text: "The children's workshop room" },
                { letter: "C", text: "The underground car park" }
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
            "Label the map of the museum's ground floor below.\nChoose FIVE answers from the box and write the correct letter, A–G, next to Questions 16–20.",

          image: "/images/listening/test002-map.svg",

          options: [
            { letter: "A", text: "Gift Shop" },
            { letter: "B", text: "Café" },
            { letter: "C", text: "Lecture Theatre" },
            { letter: "D", text: "Egyptian Exhibition" },
            { letter: "E", text: "Cloakroom" },
            { letter: "F", text: "Children's Workshop" },
            { letter: "G", text: "Photography Exhibition" }
          ],

          questions: [
            { id: 16, answer: "E" },
            { id: 17, answer: "D" },
            { id: 18, answer: "G" },
            { id: 19, answer: "F" },
            { id: 20, answer: "B" }
          ]
        }

      ]
    },

    // ─────────────────────────────────────────────
    // SECTION 3 – Matching + MCQ
    // Scenario: Two students (Priya and Tom) discuss
    // their psychology research project with their
    // tutor, Dr. Chen.
    // ─────────────────────────────────────────────
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
            "What does each person say about the research methodology?\nChoose the correct letter, A, B or C.",

          options: [
            { letter: "A", text: "Priya" },
            { letter: "B", text: "Tom" },
            { letter: "C", text: "Dr. Chen" }
          ],

          questions: [
            {
              id: 21,
              item: "Believes that the sample size is sufficient for a valid conclusion.",
              answer: "C"
            },
            {
              id: 22,
              item: "Suggested using a control group in the experiment.",
              answer: "B"
            },
            {
              id: 23,
              item: "Is concerned that the data collection period is too short.",
              answer: "A"
            },
            {
              id: 24,
              item: "Recommends piloting the survey with a small group first.",
              answer: "C"
            },
            {
              id: 25,
              item: "Plans to revise the wording of two survey questions.",
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
              question:
                "Why did the students change their original research topic?",
              options: [
                { letter: "A", text: "The topic was already covered by another group." },
                { letter: "B", text: "They could not access the required participants." },
                { letter: "C", text: "The university ethics committee rejected it." }
              ],
              answer: "C"
            },
            {
              id: 27,
              question:
                "According to Dr. Chen, what is the main advantage of using observational methods?",
              options: [
                { letter: "A", text: "They are less time-consuming than surveys." },
                { letter: "B", text: "They capture behaviour in a natural setting." },
                { letter: "C", text: "They produce quantitative data more easily." }
              ],
              answer: "B"
            },
            {
              id: 28,
              question:
                "What does Dr. Chen advise the students to include in their final report?",
              options: [
                { letter: "A", text: "A section acknowledging the study's limitations." },
                { letter: "B", text: "A comparison with three other published studies." },
                { letter: "C", text: "An appendix with all raw interview recordings." }
              ],
              answer: "A"
            },
            {
              id: 29,
              question:
                "What issue does Tom raise about the interview transcripts?",
              options: [
                { letter: "A", text: "They are too lengthy to analyse by the deadline." },
                { letter: "B", text: "Some recordings are unclear in quality." },
                { letter: "C", text: "Participants gave very similar answers." }
              ],
              answer: "B"
            },
            {
              id: 30,
              question:
                "When must the students submit their draft literature review?",
              options: [
                { letter: "A", text: "The following Monday" },
                { letter: "B", text: "End of the current week" },
                { letter: "C", text: "In two weeks' time" }
              ],
              answer: "A"
            }
          ]
        }

      ]
    },

    // ─────────────────────────────────────────────
    // SECTION 4 – Notes + Table + Flowchart
    // Scenario: An academic lecture on urban water
    // management and sustainable cities.
    // ─────────────────────────────────────────────
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
            "Complete the notes below.\nWrite NO MORE THAN TWO WORDS for each answer.",

          notesTitle: "Urban Water Management",

          notes: [
            {
              type: "heading",
              text: "Background"
            },
            {
              type: "text",
              text:
                "Over half of the world's population now lives in cities, placing extreme pressure on freshwater resources and drainage infrastructure."
            },
            {
              type: "blank",
              id: 31,
              suffix: "is the term used for rainfall that flows across hard surfaces and enters drainage systems."
            },
            {
              type: "blank",
              id: 32,
              suffix: "can absorb rainwater and reduce flooding in urban areas."
            },
            {
              type: "blank",
              id: 33,
              suffix: "describes a city's ability to withstand and recover from water-related disruptions."
            },
            {
              type: "blank",
              id: 34,
              suffix: "is the leading cause of freshwater scarcity in rapidly growing cities."
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
            "Complete the table below.\nWrite NO MORE THAN TWO WORDS for each answer.",

          tableTitle: "Water Management Approaches in Three Cities",

          headers: ["City", "Key Approach", "Reported Benefit"],

          rows: [
            [
              { type: "text", value: "Singapore" },
              { type: "text", value: "NEWater recycling programme" },
              { id: 35 }
            ],
            [
              { type: "text", value: "Copenhagen" },
              { id: 36 },
              { type: "text", value: "reduced flood damage costs" }
            ],
            [
              { type: "text", value: "Mumbai" },
              { type: "text", value: "upgraded drainage tunnels" },
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
            "Complete the flow chart below.\nWrite NO MORE THAN TWO WORDS for each answer.",

          flowchartTitle: "Implementing a Sustainable Urban Water Cycle",

          steps: [
            {
              type: "text",
              text: "Rainfall collected from rooftops and hard surfaces"
            },
            {
              type: "blank",
              id: 38,
              suffix: "filters pollutants before water enters storage tanks."
            },
            {
              type: "blank",
              id: 39,
              suffix: "distributes treated water to households and industry."
            },
            {
              type: "blank",
              id: 40,
              suffix: "converts wastewater into energy to power treatment facilities."
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

export default listeningTest002;
