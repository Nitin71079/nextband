const listeningTest004 = {
  id: "listening-test-004",
  title: "IELTS Listening Practice Test 004",
  difficulty: "Academic",
  duration: 30,
  audio: "/audio/listening/test004.mp3",
  transcript: "/assets/listening/test004/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0,    end: 320  },
    section2: { start: 321,  end: 680  },
    section3: { start: 681,  end: 1180 },
    section4: { start: 1181, end: 1740 }
  },

  sections: [

    /* ============================================================
       SECTION 1
       Scenario: Natalie Morgan phones Greenfields Cookery School
       to book a weekend cookery workshop.
       Question type: Form completion (Q1–10)
    ============================================================ */
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 320,

      instruction:
        "Complete the booking form below. " +
        "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle: "GREENFIELDS COOKERY SCHOOL — WORKSHOP BOOKING FORM",

      form: [
        {
          id: 1,
          label: "Name",
          answer: "Natalie Morgan"
        },
        {
          id: 2,
          label: "Telephone number",
          answer: "07843 615920"
        },
        {
          id: 3,
          label: "Course booked",
          answer: "Artisan Bread"
        },
        {
          id: 4,
          label: "Lunch required",
          answer: "Yes"
        },
        {
          id: 5,
          label: "Food not eaten",
          answer: "shellfish"
        },
        {
          id: 6,
          label: "Personal item to bring",
          answer: "apron"
        },
        {
          id: 7,
          label: "Heard about school through",
          answer: "sister"
        },
        {
          id: 8,
          label: "Payment today",
          answer: "deposit"
        },
        {
          id: 9,
          label: "Course finishes at",
          answer: "4:30"
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
       Scenario: Claire gives an orientation talk at Green Valley
       Wildlife Rescue Centre to new volunteers.
       Q11–15: Multiple Choice  |  Q16–20: Map Labelling
    ============================================================ */
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 321,
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
                "What is the Wildlife Rescue Centre mainly responsible for?",
              options: [
                { letter: "A", text: "Housing unwanted pets." },
                { letter: "B", text: "Treating and releasing wild animals." },
                { letter: "C", text: "Breeding endangered species." }
              ],
              answer: "B"
            },

            {
              id: 12,
              question:
                "Why are some rehabilitation areas restricted to qualified staff only?",
              options: [
                { letter: "A", text: "They contain dangerous equipment." },
                { letter: "B", text: "The animals need limited human contact." },
                { letter: "C", text: "Visitors could become lost." }
              ],
              answer: "B"
            },

            {
              id: 13,
              question:
                "What will new volunteers do first when they begin at the centre?",
              options: [
                { letter: "A", text: "Feed injured animals." },
                { letter: "B", text: "Assist with veterinary procedures." },
                { letter: "C", text: "Prepare food and clean equipment." }
              ],
              answer: "C"
            },

            {
              id: 14,
              question:
                "Why is photography prohibited inside rehabilitation buildings?",
              options: [
                { letter: "A", text: "Flash damages medical equipment." },
                { letter: "B", text: "It may disturb animals and reveal sensitive locations." },
                { letter: "C", text: "Staff members prefer privacy." }
              ],
              answer: "B"
            },

            {
              id: 15,
              question:
                "What happens after the site tour during today's induction?",
              options: [
                { letter: "A", text: "Volunteers receive uniforms." },
                { letter: "B", text: "Volunteers choose a department." },
                { letter: "C", text: "Volunteers begin feeding animals immediately." }
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
            "Label the map of Green Valley Wildlife Rescue Centre below.\n" +
            "Choose FIVE answers from the box and write the correct letter, A–H, " +
            "next to Questions 16–20.",
          image: "/images/listening/test004-map.svg",
          options: [
            { letter: "A", text: "Bird Rehabilitation Unit" },
            { letter: "B", text: "Car Park"                 },
            { letter: "C", text: "Education Centre"         },
            { letter: "D", text: "Food Preparation Centre"  },
            { letter: "E", text: "Picnic Area"              },
            { letter: "F", text: "Reception Building"       },
            { letter: "G", text: "Veterinary Clinic"        },
            { letter: "H", text: "Woodland Path"            }
          ],
          questions: [
            {
              id: 16,
              label: "Building where today's training session continues",
              answer: "C"
            },
            {
              id: 17,
              label: "Unit caring for injured owls and hawks",
              answer: "A"
            },
            {
              id: 18,
              label: "Clinic where animals receive medical treatment",
              answer: "G"
            },
            {
              id: 19,
              label: "Centre where volunteers prepare animal meals each morning",
              answer: "D"
            },
            {
              id: 20,
              label: "Building where volunteers check in each morning",
              answer: "F"
            }
          ]
        }

      ]
    },

    /* ============================================================
       SECTION 3
       Scenario: Three architecture students (Emma, Ryan, Aisha)
       discuss their sustainable housing project with tutor
       Dr. Williams.
       Q21–25: Matching (who expresses each opinion)
       Q26–30: Multiple Choice
    ============================================================ */
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 681,
      audioEnd: 1180,

      groups: [

        {
          id: "section3_matching",
          type: "matching",
          title: "Questions 21–25",
          instruction:
            "Who expresses each of the following opinions?\n" +
            "Choose the correct letter, A, B or C.",
          options: [
            { letter: "A", text: "Emma"        },
            { letter: "B", text: "Ryan"        },
            { letter: "C", text: "Dr. Williams" }
          ],
          questions: [
            {
              id: 21,
              item: "Believes a focused case study produces a stronger analysis.",
              answer: "C"
            },
            {
              id: 22,
              item: "Initially considered exploring sustainable construction worldwide.",
              answer: "B"
            },
            {
              id: 23,
              item: "Recognised that the project's scope needed to be reduced.",
              answer: "A"
            },
            {
              id: 24,
              item: "Suggests that peer-reviewed sources should form the basis of their arguments.",
              answer: "C"
            },
            {
              id: 25,
              item: "Reports that interviews with local architects went better than expected.",
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
                "Why did the students initially rely on newspaper articles?",
              options: [
                { letter: "A", text: "They were easier to find." },
                { letter: "B", text: "The tutor had recommended them." },
                { letter: "C", text: "Academic journals were unavailable online." }
              ],
              answer: "A"
            },

            {
              id: 27,
              question:
                "What difficulty do the students face when evaluating environmental impact?",
              options: [
                { letter: "A", text: "There is no single international measurement standard." },
                { letter: "B", text: "Their case study lacks sufficient data." },
                { letter: "C", text: "Sustainability reports are rarely published." }
              ],
              answer: "A"
            },

            {
              id: 28,
              question:
                "Why were the architect interviews not recorded?",
              options: [
                { letter: "A", text: "The students forgot to bring recording equipment." },
                { letter: "B", text: "University regulations prohibited recording." },
                { letter: "C", text: "Both architects preferred not to be recorded." }
              ],
              answer: "C"
            },

            {
              id: 29,
              question:
                "What advice does Dr. Williams give about using video in the presentation?",
              options: [
                { letter: "A", text: "It should not be used under any circumstances." },
                { letter: "B", text: "A well-designed diagram may communicate the same information more efficiently." },
                { letter: "C", text: "Video is more persuasive than graphs for numerical data." }
              ],
              answer: "B"
            },

            {
              id: 30,
              question:
                "What does Dr. Williams recommend for the question-and-answer session?",
              options: [
                { letter: "A", text: "Memorise responses to likely questions in advance." },
                { letter: "B", text: "Understand the research thoroughly rather than memorising answers." },
                { letter: "C", text: "Avoid answering questions that fall outside the project scope." }
              ],
              answer: "B"
            }

          ]
        }

      ]
    },

    /* ============================================================
       SECTION 4
       Scenario: Academic lecture on The Development of Smart Cities.
       Q31–34: Notes completion
       Q35–37: Table completion
       Q38–40: Flowchart completion
    ============================================================ */
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1181,
      audioEnd: 1740,

      groups: [

        /* ---- Notes Completion: Q31–34 ---- */
        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–34",
          instruction:
            "Complete the notes below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "The Development of Smart Cities",
          notes: [
            {
              type: "heading",
              text: "What is a smart city?"
            },
            {
              type: "text",
              text:
                "A smart city uses digital technologies to improve quality of life, " +
                "make public services more efficient and support environmental sustainability. " +
                "The concept gained international attention when rapid urbanisation put pressure " +
                "on transport, energy and public infrastructure."
            },
            {
              type: "blank",
              id: 31,
              prefix: "Thousands of electronic ",
              suffix:
                " installed throughout the city collect real-time data on traffic, air quality and water use."
            },
            {
              type: "blank",
              id: 32,
              prefix: "Traffic ",
              suffix:
                " are automatically adjusted by computer systems that analyse sensor data, reducing congestion and fuel use."
            },
            {
              type: "blank",
              id: 33,
              prefix: "Intelligent ",
              suffix:
                " in modern buildings adjust heating, cooling and lighting according to occupancy, producing substantial energy savings across the city."
            },
            {
              type: "blank",
              id: 34,
              prefix: "Underground sensors monitor water ",
              suffix:
                " continuously; an unusual drop alerts engineers to a leak before significant water loss occurs."
            }
          ],
          answers: {
            31: "sensors",
            32: "signals",
            33: "control systems",
            34: "pressure"
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
          tableTitle: "Smart City Technology: Benefits and Challenges",
          headers: ["Area", "Key benefit", "Main challenge"],
          rows: [
            [
              { type: "text", value: "Traffic management" },
              { type: "text", value: "Reduces congestion and air pollution" },
              { id: 35 }
            ],
            [
              { type: "text", value: "Data collection" },
              { id: 36 },
              { type: "text", value: "Risk to data privacy" }
            ],
            [
              { type: "text", value: "Infrastructure investment" },
              { type: "text", value: "Improves long-term efficiency" },
              { id: 37 }
            ]
          ],
          answers: {
            35: "requires sensors",
            36: "Real-time monitoring",
            37: "Insufficient funding"
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
          flowchartTitle: "How Smart Cities Could Prevent Urban Problems in the Future",
          steps: [
            {
              type: "text",
              text:
                "Sensors and cameras across the city continuously collect data on traffic, energy and infrastructure."
            },
            {
              type: "blank",
              id: 38,
              prefix: "Artificial ",
              suffix:
                " processes the data and identifies patterns that suggest a potential problem several hours ahead."
            },
            {
              type: "blank",
              id: 39,
              prefix: "City authorities take ",
              suffix:
                " action — adjusting signals, rerouting traffic or scheduling repairs — before disruption occurs."
            },
            {
              type: "blank",
              id: 40,
              prefix: "Effective outcomes depend on long-term planning, public ",
              suffix:
                " and strong government alongside the digital systems."
            }
          ],
          answers: {
            38: "intelligence",
            39: "preventative",
            40: "participation"
          }
        }

      ]
    }

  ]
};

export default listeningTest004;
