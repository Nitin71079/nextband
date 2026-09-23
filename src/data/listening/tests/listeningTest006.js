const listeningTest006 = {
  id: "listening-test-006",
  title: "IELTS Listening Practice Test 006",
  difficulty: "Academic",
  duration: 30,
  audio: "/audio/listening/test006.mp3",
  transcript: "/assets/listening/test006/transcript.pdf",

  instructions: [
    "You will hear each recording ONCE only.",
    "Answer all questions.",
    "Write NO MORE THAN TWO WORDS AND/OR A NUMBER where instructed."
  ],

  audioTimeline: {
    section1: { start: 0,    end: 320  },
    section2: { start: 321,  end: 650  },
    section3: { start: 651,  end: 1100 },
    section4: { start: 1101, end: 1650 }
  },

  sections: [

    /* ============================================================
       SECTION 1
       Scenario: Registration for Metropolitan Library Membership
       Question type: Form completion (Q1–10)
    ============================================================ */
    {
      id: 1,
      title: "Section 1",
      type: "form",
      audioStart: 0,
      audioEnd: 320,

      instruction:
        "Complete the form below. " +
        "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",

      formTitle: "METROPOLITAN LIBRARY — MEMBERSHIP REGISTRATION FORM",

      form: [
        {
          id: 1,
          label: "First name",
          answer: "Arthur"
        },
        {
          id: 2,
          label: "Surname",
          answer: "Pendelton"
        },
        {
          id: 3,
          label: "House number and street name",
          answer: "14 Maple Avenue"
        },
        {
          id: 4,
          label: "Postcode",
          answer: "CB2 1TN"
        },
        {
          id: 5,
          label: "Contact phone number",
          answer: "01223 847291"
        },
        {
          id: 6,
          label: "Occupation",
          answer: "architect"
        },
        {
          id: 7,
          label: "Type of membership requested",
          answer: "Standard Adult"
        },
        {
          id: 8,
          label: "Notification method preference",
          answer: "SMS"
        },
        {
          id: 9,
          label: "Annual membership fee",
          prefix: "£",
          answer: "30"
        },
        {
          id: 10,
          label: "Proof of identity provided",
          answer: "passport"
        }
      ]
    },

    /* ============================================================
       SECTION 2
       Scenario: Talk on the newly built Community Center and its facilities.
       Question type: Table completion & Multiple Choice (Q11–20)
    ============================================================ */
    {
      id: 2,
      title: "Section 2",
      type: "mixed",
      audioStart: 321,
      audioEnd: 650,

      groups: [
        {
          id: "section2_table",
          type: "table",
          title: "Questions 11–15",
          instruction:
            "Complete the table below.\n" +
            "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          tableTitle: "Community Center Opening Hours",
          headers: ["Facility", "Opening Time", "Closing Time"],
          rows: [
            [
              { type: "text", value: "Cafeteria" },
              { type: "text", value: "8:00 AM" },
              { id: 11 }
            ],
            [
              { type: "text", value: "Fitness Suite" },
              { type: "text", value: "9:00 AM" },
              { id: 12 }
            ],
            [
              { type: "text", value: "Children's Playroom" },
              { id: 13 },
              { type: "text", value: "4:00 PM" }
            ]
          ],
          answers: {
            11: "6:00 PM",
            12: "9:00 PM",
            13: "10:00 AM"
          }
        },
        {
          id: 14,
          type: "multiple_choice",
          title: "Questions 14–15",
          instruction: "Choose the correct letter, A, B, or C.",
          questions: [
            {
              id: 14,
              question: "The new community center was built to replace an old:",
              options: [
                { key: "A", text: "Local hospital" },
                { key: "B", text: "Primary school" },
                { key: "C", text: "Sports stadium" }
              ],
              answer: "B"
            },
            {
              id: 15,
              question: "Senior citizens receive a discount during off-peak hours of:",
              options: [
                { key: "A", text: "15 percent" },
                { key: "B", text: "20 percent" },
                { key: "C", text: "25 percent" }
              ],
              answer: "C"
            }
          ]
        },
        {
          id: 16,
          type: "matching",
          title: "Questions 16–20",
          instruction: "Match each facility feature (16–20) with the correct description (A–E).",
          items: [
            { id: 16, text: "Main Auditorium", answer: "A" },
            { id: 17, text: "Online Reservation Portal", answer: "B" },
            { id: 18, text: "Roof Garden Expansion", answer: "C" },
            { id: 19, text: "Fitness Center Lockers", answer: "D" },
            { id: 20, text: "Cafeteria Terrace", answer: "E" }
          ],
          options: [
            { key: "A", text: "Features acoustic wood paneling" },
            { key: "B", text: "Used for booking meeting rooms" },
            { key: "C", text: "Planned for completion next summer" },
            { key: "D", text: "Free for members" },
            { key: "E", text: "Overlooks local park" }
          ]
        }
      ]
    },

    /* ============================================================
       SECTION 3
       Scenario: Discussion between Sarah and Tom on freshwater microplastics.
       Question type: Multiple Choice & Matching (Q21–30)
    ============================================================ */
    {
      id: 3,
      title: "Section 3",
      type: "mixed",
      audioStart: 651,
      audioEnd: 1100,

      groups: [
        {
          id: "section3_mc",
          type: "multiple_choice",
          title: "Questions 21–25",
          instruction: "Choose the correct letter, A, B, or C.",
          questions: [
            {
              id: 21,
              question: "What is the primary focus of Sarah and Tom's research paper?",
              options: [
                { key: "A", text: "Oceanic plastic debris" },
                { key: "B", text: "Microplastics in freshwater ecosystems" },
                { key: "C", text: "Industrial chemical runoff" }
              ],
              answer: "B"
            },
            {
              id: 22,
              question: "What unexpected finding did they observe in their laboratory samples?",
              options: [
                { key: "A", text: "High concentration of synthetic fibers" },
                { key: "B", text: "Presence of heavy metals" },
                { key: "C", text: "Zero pesticide traces" }
              ],
              answer: "A"
            },
            {
              id: 23,
              question: "Which funding source did their project receive?",
              options: [
                { key: "A", text: "Government Environmental Agency Grant" },
                { key: "B", text: "University Student Research Grant" },
                { key: "C", text: "Private Corporate Sponsorship" }
              ],
              answer: "B"
            },
            {
              id: 24,
              question: "What will be the next stage of their research?",
              options: [
                { key: "A", text: "Testing riverbank soil" },
                { key: "B", text: "Analyzing fish tissue samples" },
                { key: "C", text: "Interviewing local fishermen" }
              ],
              answer: "B"
            },
            {
              id: 25,
              question: "Which water sampling method did they implement?",
              options: [
                { key: "A", text: "Manual net skimming" },
                { key: "B", text: "Automated water filtration" },
                { key: "C", text: "Submersible drone retrieval" }
              ],
              answer: "B"
            }
          ]
        },
        {
          id: "section3_matching",
          type: "matching",
          title: "Questions 26–30",
          instruction: "Which student is responsible for each task below?",
          items: [
            { id: 26, text: "Statistical data visualization", answer: "Tom" },
            { id: 27, text: "Specimen identification", answer: "Sarah" },
            { id: 28, text: "Chemical reagents preparation", answer: "Tom" },
            { id: 29, text: "Drafting the methodology section", answer: "Both" },
            { id: 30, text: "Final paper proofreading", answer: "Sarah" }
          ],
          options: [
            { key: "Tom", text: "Tom" },
            { key: "Sarah", text: "Sarah" },
            { key: "Both", text: "Both Sarah and Tom" }
          ]
        }
      ]
    },

    /* ============================================================
       SECTION 4
       Scenario: Academic lecture on Urban Forests: Improving the Health of Modern Cities
       Question type: Notes Completion (Q31–40)
    ============================================================ */
    {
      id: 4,
      title: "Section 4",
      type: "mixed",
      audioStart: 1101,
      audioEnd: 1650,

      groups: [
        {
          id: "section4_notes",
          type: "notes",
          title: "Questions 31–40",
          instruction:
            "Complete the notes below.\n" +
            "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          notesTitle: "Urban Forests: Improving the Health of Modern Cities",
          notes: [
            {
              type: "heading",
              text: "Definition & Components"
            },
            {
              type: "text",
              text:
                "An urban forest refers to all trees, shrubs, and vegetation across a city. " +
                "This includes parks, residential streets, private gardens, and vegetation on building structures."
            },
            {
              type: "blank",
              id: 31,
              prefix: "Urban forests include vegetation in parks, residential streets, and green ",
              suffix: " on city buildings."
            },

            {
              type: "heading",
              text: "Environmental Benefits"
            },
            {
              type: "blank",
              id: 32,
              prefix: "Trees absorb harmful air pollutants such as nitrogen dioxide and fine ",
              suffix: " matter."
            },
            {
              type: "blank",
              id: 33,
              prefix: "The urban heat island effect is reduced through tree shade and moisture released by ",
              suffix: "."
            },
            {
              type: "blank",
              id: 34,
              prefix: "Tree roots help prevent urban flooding by improving soil ",
              suffix: ", allowing rainwater to soak into the ground."
            },

            {
              type: "heading",
              text: "Public Health & Urban Planning"
            },
            {
              type: "blank",
              id: 35,
              prefix: "Living near urban green spaces encourages residents to ",
              suffix: " regularly and lowers stress levels."
            },
            {
              type: "blank",
              id: 36,
              prefix: "Hospital patients with views of parks have been shown to experience shorter ",
              suffix: "."
            },
            {
              type: "blank",
              id: 37,
              prefix: "Urban planners collaborate with ",
              suffix: " to choose suitable tree species for local climates."
            },

            {
              type: "heading",
              text: "Technology & Community Involvement"
            },
            {
              type: "blank",
              id: 38,
              prefix: "Authorities monitor large-scale urban forest health using drones, GIS, and ",
              suffix: "."
            },
            {
              type: "blank",
              id: 39,
              prefix: "Artificial intelligence processes environmental data to detect early signs of disease, storm damage, or ",
              suffix: "."
            },
            {
              type: "blank",
              id: 40,
              prefix: "Cities organize ",
              suffix: " planting programs to engage residents and reduce maintenance costs."
            }
          ],
          answers: {
            31: "roofs",
            32: "particulate",
            33: "transpiration",
            34: "structure",
            35: "exercise",
            36: "recovery times",
            37: "ecologists",
            38: "satellite imagery",
            39: "drought stress",
            40: "volunteer"
          }
        }
      ]
    }

  ]
};

export default listeningTest006;
