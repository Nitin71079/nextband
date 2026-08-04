const listeningTest006 = {
  id: "listening-test-006",
  title: "IELTS Listening Practice Test 006",
  difficulty: "Academic",
  duration: 40,
  audio: "/audio/listening/test006.mp3",
  transcript: "/assets/listening/test006/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0,    end: 315  },
    section2: { start: 316,  end: 690  },
    section3: { start: 691,  end: 1195 },
    section4: { start: 1196, end: 1750 }
  },

  sections: [

    /* ============================================================
       SECTION 1
       Scenario: Sophie calls Riverside Leisure Centre to enrol
       in an adult swimming programme.
       Question type: Form completion (Q1–10)
    ============================================================ */
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 315,

      instruction:
        "Complete the enrolment form below. " +
        "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle: "RIVERSIDE LEISURE CENTRE — ADULT SWIMMING PROGRAMME ENROLMENT FORM",

      form: [
        {
          id: 1,
          label: "Full name",
          answer: "Sophie Cartwright"
        },
        {
          id: 2,
          label: "Contact number",
          answer: "07912 348576"
        },
        {
          id: 3,
          label: "Programme selected",
          answer: "Improvers"
        },
        {
          id: 4,
          label: "Preferred session day",
          answer: "Wednesday"
        },
        {
          id: 5,
          label: "Session time",
          answer: "7:00 pm"
        },
        {
          id: 6,
          label: "Swimwear requirement",
          answer: "cap"
        },
        {
          id: 7,
          label: "Medical condition declared",
          answer: "asthma"
        },
        {
          id: 8,
          label: "Monthly fee",
          answer: "£38"
        },
        {
          id: 9,
          label: "Payment method",
          answer: "direct debit"
        },
        {
          id: 10,
          label: "Membership card collected from",
          answer: "reception"
        }
      ]
    },

    /* ============================================================
       SECTION 2
       Scenario: Staff member (Marcus) gives a welcome talk to
       new volunteers at the Harwood Community Library.
       Q11–15: Multiple Choice  |  Q16–20: Map Labelling
    ============================================================ */
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 316,
      audioEnd: 690,

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
                "What is the main purpose of the Harwood Community Library's volunteer programme?",
              options: [
                { letter: "A", text: "To reduce the number of paid staff required." },
                { letter: "B", text: "To extend opening hours and expand community services." },
                { letter: "C", text: "To train volunteers for careers in library management." }
              ],
              answer: "B"
            },

            {
              id: 12,
              question:
                "What must volunteers do before working unsupervised with members of the public?",
              options: [
                { letter: "A", text: "Complete an online safety course." },
                { letter: "B", text: "Shadow an experienced staff member for two shifts." },
                { letter: "C", text: "Attend a half-day induction workshop." }
              ],
              answer: "C"
            },

            {
              id: 13,
              question:
                "Why are volunteers not permitted to use the staff room computers?",
              options: [
                { letter: "A", text: "They contain confidential borrower records." },
                { letter: "B", text: "The computers are reserved for senior librarians." },
                { letter: "C", text: "The internet connection is for staff work only." }
              ],
              answer: "A"
            },

            {
              id: 14,
              question:
                "What does Marcus say about the children's storytelling sessions?",
              options: [
                { letter: "A", text: "Only qualified teachers may lead them." },
                { letter: "B", text: "Volunteers are welcome to take part after completing a short training module." },
                { letter: "C", text: "They are currently suspended due to refurbishment." }
              ],
              answer: "B"
            },

            {
              id: 15,
              question:
                "What should volunteers do if a member of the public becomes aggressive?",
              options: [
                { letter: "A", text: "Ask the person to leave immediately." },
                { letter: "B", text: "Contact the nearest staff member without confronting the person." },
                { letter: "C", text: "Call the police straight away." }
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
            "Label the map of Harwood Community Library below.\n" +
            "Choose FIVE answers from the box and write the correct letter, A–H, " +
            "next to Questions 16–20.",
          image: "/images/listening/test006-map.svg",
          options: [
            { letter: "A", text: "Children's Corner"    },
            { letter: "B", text: "Community Notice Board" },
            { letter: "C", text: "Digital Resource Suite" },
            { letter: "D", text: "Fiction Collection"   },
            { letter: "E", text: "Local History Archive" },
            { letter: "F", text: "Quiet Reading Room"   },
            { letter: "G", text: "Returns Desk"         },
            { letter: "H", text: "Study Pods"           }
          ],
          questions: [
            {
              id: 16,
              label: "Room where today's induction workshop takes place",
              answer: "C"
            },
            {
              id: 17,
              label: "Area dedicated to books and materials for under-twelves",
              answer: "A"
            },
            {
              id: 18,
              label: "Room where silence must be maintained at all times",
              answer: "F"
            },
            {
              id: 19,
              label: "Counter where borrowed items are handed in on return",
              answer: "G"
            },
            {
              id: 20,
              label: "Section containing historical photographs and local newspapers",
              answer: "E"
            }
          ]
        }

      ]
    },

    /* ============================================================
       SECTION 3
       Scenario: Two Environmental Science students (Priya, James)
       discuss their fieldwork report with tutor Dr. Okafor.
       Q21–25: Matching (who expresses each opinion)
       Q26–30: Multiple Choice
    ============================================================ */
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 691,
      audioEnd: 1195,

      groups: [

        {
          id: "section3_matching",
          type: "matching",
          title: "Questions 21–25",
          instruction:
            "Who expresses each of the following opinions about the fieldwork report?\n" +
            "Choose the correct letter, A, B or C.",
          options: [
            { letter: "A", text: "Priya"      },
            { letter: "B", text: "James"      },
            { letter: "C", text: "Dr. Okafor" }
          ],
          questions: [
            {
              id: 21,
              item: "Feels that combining field measurements with satellite data would strengthen the analysis.",
              answer: "C"
            },
            {
              id: 22,
              item: "Originally planned to collect water samples from three separate river sites.",
              answer: "A"
            },
            {
              id: 23,
              item: "Believes the data collected on the first day was compromised by adverse weather.",
              answer: "B"
            },
            {
              id: 24,
              item: "Recommends that all raw data files be stored in a shared folder before submission.",
              answer: "C"
            },
            {
              id: 25,
              item: "Suggests acknowledging the limitations of the sampling method in the discussion section.",
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
                "Why did the students reduce the number of sampling sites from three to two?",
              options: [
                { letter: "A", text: "Access to the third site was blocked by flooding." },
                { letter: "B", text: "The equipment available was insufficient for three sites." },
                { letter: "C", text: "The university required a shorter fieldwork period." }
              ],
              answer: "A"
            },

            {
              id: 27,
              question:
                "What concern does Dr. Okafor raise about the students' graph in section three?",
              options: [
                { letter: "A", text: "The scale on the vertical axis is misleading." },
                { letter: "B", text: "The graph includes data from an unreliable source." },
                { letter: "C", text: "The legend does not match the data series shown." }
              ],
              answer: "A"
            },

            {
              id: 28,
              question:
                "What prevented the students from completing the pH measurements on day two?",
              options: [
                { letter: "A", text: "The pH meter malfunctioned in the field." },
                { letter: "B", text: "They ran out of testing solution." },
                { letter: "C", text: "Time ran out before they reached the lower section of the river." }
              ],
              answer: "C"
            },

            {
              id: 29,
              question:
                "What does Dr. Okafor advise regarding the conclusion?",
              options: [
                { letter: "A", text: "It should restate every result mentioned in the discussion." },
                { letter: "B", text: "It should summarise the key findings and suggest further research." },
                { letter: "C", text: "It should be at least three paragraphs in length." }
              ],
              answer: "B"
            },

            {
              id: 30,
              question:
                "What does Dr. Okafor say about the deadline extension request?",
              options: [
                { letter: "A", text: "An extension can be granted if supported by evidence." },
                { letter: "B", text: "No extensions are possible for fieldwork reports." },
                { letter: "C", text: "Students should submit whatever work they have completed." }
              ],
              answer: "A"
            }

          ]
        }

      ]
    },

    /* ============================================================
       SECTION 4
       Scenario: Academic lecture on The Science of Sleep and
       Cognitive Performance.
       Q31–34: Notes completion
       Q35–37: Table completion
       Q38–40: Flowchart completion
    ============================================================ */
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1196,
      audioEnd: 1750,

      groups: [

        /* ---- Notes Completion: Q31–34 ---- */
        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–34",
          instruction:
            "Complete the notes below.\n" +
            "Write NO MORE THAN TWO WORDS for each answer.",
          notesTitle: "The Science of Sleep and Cognitive Performance",
          notes: [
            {
              type: "heading",
              text: "Why sleep matters for the brain"
            },
            {
              type: "text",
              text:
                "During sleep the brain does not simply rest — it carries out essential maintenance. " +
                "Memory consolidation, emotional regulation and the removal of metabolic waste products " +
                "all occur during specific sleep stages. Researchers now regard adequate sleep as " +
                "one of the most important factors in long-term cognitive health."
            },
            {
              type: "blank",
              id: 31,
              prefix: "During slow-wave sleep the brain replays recently learned information, transferring it from short-term storage to ",
              suffix:
                " memory, which explains why students who sleep after studying retain more than those who do not."
            },
            {
              type: "blank",
              id: 32,
              prefix: "The glymphatic system becomes significantly more active during sleep, flushing ",
              suffix:
                " proteins and other waste products from brain tissue — a process strongly linked to the prevention of neurodegenerative diseases."
            },
            {
              type: "blank",
              id: 33,
              prefix: "Insufficient sleep reduces activity in the prefrontal cortex, impairing ",
              suffix:
                " thinking — the ability to plan ahead, weigh options and make sound judgements under pressure."
            },
            {
              type: "blank",
              id: 34,
              prefix: "Chronic sleep deprivation has been shown to disrupt the body's ",
              suffix:
                " rhythm, altering the timing of hormone release and increasing the risk of metabolic disorders."
            }
          ],
          answers: {
            31: "long-term",
            32: "toxic",
            33: "executive",
            34: "circadian"
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
          tableTitle: "Sleep Stages: Functions and Effects of Deprivation",
          headers: ["Sleep stage", "Primary function", "Effect of deprivation"],
          rows: [
            [
              { type: "text", value: "Slow-wave (deep) sleep" },
              { type: "text", value: "Memory consolidation and physical restoration" },
              { id: 35 }
            ],
            [
              { type: "text", value: "REM sleep" },
              { id: 36 },
              { type: "text", value: "Increased emotional reactivity" }
            ],
            [
              { type: "text", value: "Light sleep (stage 2)" },
              { type: "text", value: "Motor skill learning and mental relaxation" },
              { id: 37 }
            ]
          ],
          answers: {
            35: "impaired memory",
            36: "Emotional processing",
            37: "Reduced concentration"
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
          flowchartTitle: "How Sleep Deprivation Affects Academic Performance",
          steps: [
            {
              type: "text",
              text:
                "A student consistently sleeps fewer than six hours per night during the examination period."
            },
            {
              type: "blank",
              id: 38,
              prefix: "Reduced slow-wave sleep limits ",
              suffix:
                " consolidation, meaning information studied the previous day is less effectively stored."
            },
            {
              type: "blank",
              id: 39,
              prefix: "Lower prefrontal cortex activity reduces the ability to ",
              suffix:
                " problems logically and apply knowledge flexibly during examination tasks."
            },
            {
              type: "blank",
              id: 40,
              prefix: "Over time, accumulated sleep debt leads to ",
              suffix:
                " fatigue, making recovery progressively more difficult even after a single long sleep."
            }
          ],
          answers: {
            38: "memory",
            39: "analyse",
            40: "cognitive"
          }
        }

      ]
    }

  ]
};

export default listeningTest006;
