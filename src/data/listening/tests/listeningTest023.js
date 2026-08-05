const listeningTest023 = {
  id: "listening-test-023",
  title: "IELTS Listening Practice Test 023",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test003.mp3",
  transcript: "/assets/listening/test003/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0,    end: 342  },
    section2: { start: 343,  end: 712  },
    section3: { start: 713,  end: 1205 },
    section4: { start: 1206, end: 1748 }
  },

  sections: [

    /* ============================================================
       SECTION 1
       Scenario: Sophie Grant phones the Lakeside Field Studies
       Centre to book a residential science programme for a school.
       Question type: Form completion (Q1–10)
    ============================================================ */
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 342,

      instruction:
        "Complete the booking form below. " +
        "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle: "LAKESIDE FIELD STUDIES CENTRE — SCHOOL BOOKING FORM",

      form: [
        {
          id: 1,
          label: "Contact name",
          answer: "Sophie Grant"
        },
        {
          id: 2,
          label: "School name",
          answer: "Thornfield Academy"
        },
        {
          id: 3,
          label: "Year group",
          answer: "Year 10"
        },
        {
          id: 4,
          label: "Number of students",
          answer: "32"
        },
        {
          id: 5,
          label: "Programme selected",
          answer: "ecology fieldwork"
        },
        {
          id: 6,
          label: "Preferred month",
          answer: "October"
        },
        {
          id: 7,
          label: "Number of nights",
          answer: "3"
        },
        {
          id: 8,
          label: "Special dietary requirement",
          answer: "vegetarian"
        },
        {
          id: 9,
          label: "Cost per student",
          prefix: "£",
          answer: "185"
        },
        {
          id: 10,
          label: "Confirmation method",
          answer: "email"
        }
      ]
    },

    /* ============================================================
       SECTION 2
       Scenario: A ranger (James) gives a public information talk
       about Greenvale Nature Reserve at the visitor centre.
       Q11–15: MCQ  |  Q16–20: Map labelling
    ============================================================ */
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 343,
      audioEnd: 712,

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
                "Why has one of the main walking trails been closed this month?",
              options: [
                { letter: "A", text: "Wildlife breeding is taking place in that area." },
                { letter: "B", text: "Erosion damage is being repaired on the path." },
                { letter: "C", text: "A new observation hide is being constructed." }
              ],
              answer: "A"
            },

            {
              id: 12,
              question:
                "What does the ranger say about the reserve's guided walks?",
              options: [
                { letter: "A", text: "They run every day throughout the year." },
                { letter: "B", text: "Booking in advance is essential." },
                { letter: "C", text: "They are available on weekend mornings only." }
              ],
              answer: "B"
            },

            {
              id: 13,
              question:
                "What is the main purpose of the new information boards installed last year?",
              options: [
                { letter: "A", text: "To replace the printed trail maps." },
                { letter: "B", text: "To help visitors identify species they observe." },
                { letter: "C", text: "To provide emergency contact numbers." }
              ],
              answer: "B"
            },

            {
              id: 14,
              question:
                "What rule applies to dogs visiting the reserve?",
              options: [
                { letter: "A", text: "Dogs are not permitted anywhere on the reserve." },
                { letter: "B", text: "Dogs must be kept on a lead at all times." },
                { letter: "C", text: "Dogs are only allowed in the car park area." }
              ],
              answer: "B"
            },

            {
              id: 15,
              question:
                "According to the ranger, what is the best time to observe otters?",
              options: [
                { letter: "A", text: "Early morning near the river bank." },
                { letter: "B", text: "Midday around the central pond." },
                { letter: "C", text: "Late afternoon along the woodland trail." }
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
            "Label the map of Greenvale Nature Reserve below.\n" +
            "Choose FIVE answers from the box and write the correct letter, A–H, " +
            "next to Questions 16–20.",
          image: "/images/listening/test003-map.svg",
          options: [
            { letter: "A", text: "Bird Hide"          },
            { letter: "B", text: "Car Park"           },
            { letter: "C", text: "Education Centre"   },
            { letter: "D", text: "Meadow Trail"       },
            { letter: "E", text: "Picnic Area"        },
            { letter: "F", text: "River Bank Path"    },
            { letter: "G", text: "Visitor Centre"     },
            { letter: "H", text: "Woodland Trail"     }
          ],
          questions: [
            {
              id: 16,
              label: "Entrance and reception point",
              answer: "G"
            },
            {
              id: 17,
              label: "Building used for school visits and workshops",
              answer: "C"
            },
            {
              id: 18,
              label: "Structure overlooking the wetland area",
              answer: "A"
            },
            {
              id: 19,
              label: "Area closed to visitors this month",
              answer: "D"
            },
            {
              id: 20,
              label: "Recommended spot for early-morning otter watching",
              answer: "F"
            }
          ]
        }

      ]
    },

    /* ============================================================
       SECTION 3
       Scenario: Two students, Priya and Marcus, meet their tutor
       Dr. Chen to discuss their Earth Sciences group assignment
       on soil erosion and land management.
       Q21–25: Matching (speaker opinions)
       Q26–30: MCQ
    ============================================================ */
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 713,
      audioEnd: 1205,

      groups: [

        {
          id: "section3_matching",
          type: "matching",
          title: "Questions 21–25",
          instruction:
            "Who expresses each of the following opinions about the assignment?\n" +
            "Choose the correct letter, A, B or C.",
          options: [
            { letter: "A", text: "Priya"    },
            { letter: "B", text: "Marcus"   },
            { letter: "C", text: "Dr. Chen" }
          ],
          questions: [
            {
              id: 21,
              item: "Thinks the case study approach will produce the most convincing results.",
              answer: "C"
            },
            {
              id: 22,
              item: "Wanted to focus the project entirely on agricultural land.",
              answer: "B"
            },
            {
              id: 23,
              item: "Is concerned that field measurements will be difficult to carry out.",
              answer: "A"
            },
            {
              id: 24,
              item: "Suggests including satellite imagery to strengthen the analysis.",
              answer: "C"
            },
            {
              id: 25,
              item: "Plans to contact a local farming cooperative for primary data.",
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
                "Why does Dr. Chen recommend restricting the study to two regions?",
              options: [
                { letter: "A", text: "Data from more regions would be too complex to compare." },
                { letter: "B", text: "The university can only fund travel to two locations." },
                { letter: "C", text: "Fewer sites guarantee more accurate measurements." }
              ],
              answer: "A"
            },

            {
              id: 27,
              question:
                "What does Dr. Chen identify as the key weakness of using only secondary data?",
              options: [
                { letter: "A", text: "Secondary sources are rarely available for this topic." },
                { letter: "B", text: "It limits the originality and contribution of the study." },
                { letter: "C", text: "Existing studies often contain significant errors." }
              ],
              answer: "B"
            },

            {
              id: 28,
              question:
                "What does Dr. Chen suggest the students do before choosing their methodology?",
              options: [
                { letter: "A", text: "Submit a brief proposal for departmental approval." },
                { letter: "B", text: "Read at least five recent peer-reviewed articles." },
                { letter: "C", text: "Visit one of the proposed sites to assess feasibility." }
              ],
              answer: "B"
            },

            {
              id: 29,
              question:
                "What problem does Marcus raise regarding the fieldwork schedule?",
              options: [
                { letter: "A", text: "The proposed dates conflict with university examinations." },
                { letter: "B", text: "Seasonal weather conditions may affect data collection." },
                { letter: "C", text: "Transport to the sites has not yet been arranged." }
              ],
              answer: "B"
            },

            {
              id: 30,
              question:
                "What does Dr. Chen recommend for the conclusion of the assignment?",
              options: [
                { letter: "A", text: "Suggest specific policy recommendations for land managers." },
                { letter: "B", text: "Summarise only the statistical findings." },
                { letter: "C", text: "Avoid making comparisons with international studies." }
              ],
              answer: "A"
            }

          ]
        }

      ]
    },

    /* ============================================================
       SECTION 4
       Scenario: Academic lecture on Monitoring Volcanoes —
       Predicting Eruptions and Reducing Risk.
       Q31–34: Notes completion
       Q35–37: Table completion
       Q38–40: Flowchart completion
    ============================================================ */
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1206,
      audioEnd: 1748,

      groups: [

        /* ---- Notes Completion: Q31–34 ---- */
        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–34",
          instruction:
            "Complete the notes below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "Monitoring Volcanoes: Predicting Eruptions and Reducing Risk",
          notes: [
            {
              type: "heading",
              text: "How volcanoes erupt"
            },
            {
              type: "text",
              text:
                "Molten rock called magma builds up inside underground magma chambers. " +
                "As pressure increases, the surrounding rock begins to fracture and magma " +
                "forces its way through cracks in the Earth's crust."
            },
            {
              type: "blank",
              id: 31,
              suffix:
                "detect thousands of tiny vibrations caused by small earthquakes every day."
            },
            {
              type: "blank",
              id: 32,
              suffix:
                "equipped with high-resolution radar can detect centimetre-scale changes in a volcano's shape."
            },
            {
              type: "blank",
              id: 33,
              suffix:
                "escaping through cracks near the summit often indicates fresh magma has risen."
            },
            {
              type: "blank",
              id: 34,
              suffix:
                "compares current measurements with records from previous eruptions to identify warning patterns."
            }
          ],
          answers: {
            31: "Seismometers",
            32: "Satellites",
            33: "Sulphur dioxide",
            34: "Advanced software"
          }
        },

        /* ---- Table Completion: Q35–37 ---- */
        {
          id: "section4_table",
          type: "table",
          title: "Questions 35–37",
          instruction:
            "Complete the table below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          tableTitle: "Volcano Monitoring Methods",
          headers: ["Monitoring method", "What it measures", "Limitation"],
          rows: [
            [
              { type: "text", value: "Seismic monitoring" },
              { id: 35 },
              { type: "text", value: "Activity may occur without volcanic cause" }
            ],
            [
              { type: "text", value: "Satellite radar" },
              { type: "text", value: "Surface inflation or deflation" },
              { id: 36 }
            ],
            [
              { type: "text", value: "Gas analysis" },
              { type: "text", value: "Sulphur dioxide output" },
              { id: 37 }
            ]
          ],
          answers: {
            35: "earthquake patterns",
            36: "Requires clear weather",
            37: "Varies between volcanoes"
          }
        },

        /* ---- Flowchart Completion: Q38–40 ---- */
        {
          id: "section4_flowchart",
          type: "flowchart",
          title: "Questions 38–40",
          instruction:
            "Complete the flow chart below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          flowchartTitle: "Reducing Risk from Volcanic Eruptions",
          steps: [
            {
              type: "text",
              text:
                "Multiple monitoring systems collect seismic, satellite, GPS and gas data simultaneously."
            },
            {
              type: "blank",
              id: 38,
              suffix:
                "analyses all incoming data and recognises warning patterns from historical records."
            },
            {
              type: "blank",
              id: 39,
              suffix:
                "prepare evacuation plans, inspect roads and test communication systems when risk increases."
            },
            {
              type: "blank",
              id: 40,
              suffix:
                "through regular disaster training ensures communities evacuate efficiently and safely."
            }
          ],
          answers: {
            38: "Advanced software",
            39: "Emergency authorities",
            40: "Public education"
          }
        }

      ]
    }

  ]
};

export default listeningTest023;
