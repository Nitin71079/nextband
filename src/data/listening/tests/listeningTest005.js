const listeningTest005 = {
  id: "listening-test-005",
  title: "IELTS Listening Practice Test 005",
  difficulty: "Academic",
  duration: 30,
  audio: "/audio/listening/test005.mp3",
  transcript: "/assets/listening/test005/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0,    end: 330  },
    section2: { start: 331,  end: 700  },
    section3: { start: 701,  end: 1210 },
    section4: { start: 1211, end: 1760 }
  },

  sections: [

    /* ============================================================
       SECTION 1
       Scenario: Daniel phones the City Science Museum to book
       tickets for a school group visit.
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

      formTitle: "CITY SCIENCE MUSEUM — GROUP VISIT BOOKING FORM",

      form: [
        {
          id: 1,
          label: "Contact name",
          answer: "Daniel Hartley"
        },
        {
          id: 2,
          label: "School name",
          answer: "Westbridge Academy"
        },
        {
          id: 3,
          label: "Number of students",
          answer: "28"
        },
        {
          id: 4,
          label: "Year group",
          answer: "Year 9"
        },
        {
          id: 5,
          label: "Preferred date",
          answer: "14th March"
        },
        {
          id: 6,
          label: "Tour type selected",
          answer: "guided tour"
        },
        {
          id: 7,
          label: "Special requirement",
          answer: "wheelchair access"
        },
        {
          id: 8,
          label: "Cost per student",
          prefix: "£",
          answer: "6.50"
        },
        {
          id: 9,
          label: "Lunch arrangements",
          answer: "picnic area"
        },
        {
          id: 10,
          label: "Confirmation sent by",
          answer: "email"
        }
      ]
    },

    /* ============================================================
       SECTION 2
       Scenario: Guide (Laura) gives an introductory talk and
       tour directions at the City Science Museum.
       Q11–15: Multiple Choice  |  Q16–20: Map Labelling
    ============================================================ */
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 331,
      audioEnd: 700,

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
                "When did the City Science Museum first open?",
              options: [
                { letter: "A", text: "1988" },
                { letter: "B", text: "1998" },
                { letter: "C", text: "2008" }
              ],
              answer: "B"
            },

            {
              id: 12,
              question:
                "Where can visitors find first aid assistance during their visit?",
              options: [
                { letter: "A", text: "At the main entrance." },
                { letter: "B", text: "In the café." },
                { letter: "C", text: "At the Visitor Services Office." }
              ],
              answer: "C"
            },

            {
              id: 13,
              question:
                "Why is photography not allowed in the Space Exploration Gallery?",
              options: [
                { letter: "A", text: "Several exhibits contain light-sensitive materials." },
                { letter: "B", text: "Flash disturbs other visitors." },
                { letter: "C", text: "Video recording equipment is in use." }
              ],
              answer: "A"
            },

            {
              id: 14,
              question:
                "Why will today's tour begin in the Innovation Gallery rather than the Robotics Laboratory?",
              options: [
                { letter: "A", text: "The Robotics Laboratory is being refurbished." },
                { letter: "B", text: "A private school workshop is taking place there." },
                { letter: "C", text: "The Robotics Laboratory is closed on weekdays." }
              ],
              answer: "B"
            },

            {
              id: 15,
              question:
                "What does the guide say about the Planetarium presentation?",
              options: [
                { letter: "A", text: "Visitors can enter at any point during the show." },
                { letter: "B", text: "It lasts approximately thirty minutes." },
                { letter: "C", text: "Late arrivals will not be admitted once it has begun." }
              ],
              answer: "C"
            }

          ]
        },

        {
          id: "section2_map",
          type: "map",
          title: "Questions 16–20",
          instruction:
            "Label the map of the City Science Museum below.\n" +
            "Choose FIVE answers from the box and write the correct letter, A–H, " +
            "next to Questions 16–20.",
          image: "/images/listening/test005-map.svg",
          options: [
            { letter: "A", text: "Café"                   },
            { letter: "B", text: "Discovery Room"         },
            { letter: "C", text: "Energy Zone"            },
            { letter: "D", text: "Information Desk"       },
            { letter: "E", text: "Innovation Gallery"     },
            { letter: "F", text: "Museum Shop"            },
            { letter: "G", text: "Planetarium"            },
            { letter: "H", text: "Space Exploration Gallery" }
          ],
          questions: [
            {
              id: 16,
              label: "First gallery visited on today's tour",
              answer: "E"
            },
            {
              id: 17,
              label: "Area where interactive energy experiments are demonstrated",
              answer: "C"
            },
            {
              id: 18,
              label: "First-floor room in the north-east corner where the sky simulation takes place",
              answer: "G"
            },
            {
              id: 19,
              label: "Room where today's guided tour ends",
              answer: "B"
            },
            {
              id: 20,
              label: "Counter passed when walking straight ahead from the Main Entrance",
              answer: "D"
            }
          ]
        }

      ]
    },

    /* ============================================================
       SECTION 3
       Scenario: Three Psychology students (Mia, Ethan) discuss
       their research project with supervisor Dr. Patel.
       Q21–25: Matching (who expresses each opinion)
       Q26–30: Multiple Choice
    ============================================================ */
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 701,
      audioEnd: 1210,

      groups: [

        {
          id: "section3_matching",
          type: "matching",
          title: "Questions 21–25",
          instruction:
            "Who expresses each of the following opinions about the research project?\n" +
            "Choose the correct letter, A, B or C.",
          options: [
            { letter: "A", text: "Mia"       },
            { letter: "B", text: "Ethan"     },
            { letter: "C", text: "Dr. Patel" }
          ],
          questions: [
            {
              id: 21,
              item: "Thinks comparing students from different academic disciplines would produce more meaningful conclusions.",
              answer: "C"
            },
            {
              id: 22,
              item: "Was originally planning to investigate stress levels across all university students.",
              answer: "B"
            },
            {
              id: 23,
              item: "Suggests that questionnaires could be followed up with a small number of interviews.",
              answer: "C"
            },
            {
              id: 24,
              item: "Proposed asking students about their financial situation.",
              answer: "B"
            },
            {
              id: 25,
              item: "Believes that making participants feel comfortable leads to more honest responses.",
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
                "Why did the students initially consider focusing only on first-year students?",
              options: [
                { letter: "A", text: "First-year students are easier to recruit as participants." },
                { letter: "B", text: "They are adjusting to university life." },
                { letter: "C", text: "Final-year students were unavailable for interviews." }
              ],
              answer: "B"
            },

            {
              id: 27,
              question:
                "What concern do the students have about conducting face-to-face interviews?",
              options: [
                { letter: "A", text: "The university does not permit student-led interviews." },
                { letter: "B", text: "Arranging suitable meeting times could be difficult." },
                { letter: "C", text: "Participants may give dishonest answers." }
              ],
              answer: "B"
            },

            {
              id: 28,
              question:
                "What does Dr. Patel say about using government publications as sources?",
              options: [
                { letter: "A", text: "They should replace peer-reviewed research in the literature review." },
                { letter: "B", text: "They are only useful for recent statistics." },
                { letter: "C", text: "They are useful for national statistics but should be distinguished from academic analysis." }
              ],
              answer: "C"
            },

            {
              id: 29,
              question:
                "What does Dr. Patel recommend regarding the project schedule?",
              options: [
                { letter: "A", text: "More time should be allowed for data analysis." },
                { letter: "B", text: "The questionnaire distribution period should be shortened." },
                { letter: "C", text: "The entire project should be completed within three weeks." }
              ],
              answer: "A"
            },

            {
              id: 30,
              question:
                "What advice does Dr. Patel give about presenting the findings?",
              options: [
                { letter: "A", text: "Include as many detailed tables as possible." },
                { letter: "B", text: "Use graphs for most results and one summary table." },
                { letter: "C", text: "Avoid using any visual materials to keep the presentation clear." }
              ],
              answer: "B"
            }

          ]
        }

      ]
    },

    /* ============================================================
       SECTION 4
       Scenario: Academic lecture on The Future of Vertical Farming.
       Q31–34: Notes completion
       Q35–37: Table completion
       Q38–40: Flowchart completion
    ============================================================ */
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1211,
      audioEnd: 1760,

      groups: [

        /* ---- Notes Completion: Q31–34 ---- */
        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–34",
          instruction:
            "Complete the notes below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "The Future of Vertical Farming",
          notes: [
            {
              type: "heading",
              text: "What is vertical farming?"
            },
            {
              type: "text",
              text:
                "Vertical farms produce crops in stacked layers inside specially designed buildings. " +
                "Temperature, humidity, light intensity and nutrient supply are carefully controlled " +
                "throughout the growing cycle. One facility can produce the equivalent of several " +
                "hectares of conventional farmland."
            },
            {
              type: "blank",
              id: 31,
              prefix: "Most vertical farms use ",
              suffix:
                " irrigation systems that collect, filter and reuse water, consuming up to 90% less water than conventional farms."
            },
            {
              type: "blank",
              id: 32,
              prefix: "High-efficiency ",
              suffix:
                " lighting replaces natural sunlight; farmers can adjust colour and intensity to improve growth rates and nutritional quality."
            },
            {
              type: "blank",
              id: 33,
              prefix: "Artificial intelligence analyses sensor data to detect problems such as ",
              suffix:
                " or disease before visible symptoms appear, reducing waste and improving productivity."
            },
            {
              type: "blank",
              id: 34,
              prefix: "Vertical farming is expected to focus on ",
              suffix:
                " crops such as leafy vegetables, herbs and certain fruits rather than staple crops like wheat or rice."
            }
          ],
          answers: {
            31: "recirculating",
            32: "LED",
            33: "nutrient deficiencies",
            34: "high-value"
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
          tableTitle: "Vertical Farming: Advantages and Challenges",
          headers: ["Aspect", "Advantage", "Challenge / Limitation"],
          rows: [
            [
              { type: "text", value: "Water use" },
              { type: "text", value: "Up to 90% reduction through recirculating systems" },
              { id: 35 }
            ],
            [
              { type: "text", value: "Lighting" },
              { id: 36 },
              { type: "text", value: "High electricity consumption" }
            ],
            [
              { type: "text", value: "Pest control" },
              { type: "text", value: "Far less need for chemical pesticides" },
              { id: 37 }
            ]
          ],
          answers: {
            35: "Needs high energy",
            36: "Adjustable wavelengths improve growth",
            37: "Only for indoor crops"
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
          flowchartTitle: "How Automation Improves Vertical Farm Productivity",
          steps: [
            {
              type: "text",
              text:
                "Thousands of sensors continuously collect data on temperature, humidity, light levels and crop health."
            },
            {
              type: "blank",
              id: 38,
              prefix: "Artificial ",
              suffix:
                " analyses the incoming data and identifies early signs of nutrient deficiency or disease."
            },
            {
              type: "blank",
              id: 39,
              prefix: "Robots ",
              suffix:
                " seedlings between growing areas and harvest mature plants without human intervention."
            },
            {
              type: "blank",
              id: 40,
              prefix: "Early corrective action reduces ",
              suffix:
                " and improves overall yield, lowering the cost per unit of produce over time."
            }
          ],
          answers: {
            38: "intelligence",
            39: "transport",
            40: "waste"
          }
        }

      ]
    }

  ]
};

export default listeningTest005;
