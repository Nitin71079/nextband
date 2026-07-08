const academicTest001 = {
  id: 1,

  title: "Academic Reading Test 1",

  duration: 60,

  passages: [

    {
      id: 1,

      title: "The History of Glass",

      content: `

Lorem ipsum...

`,

      sections: [

        {
          id: 1,

          title: "Questions 1-5",

          instruction:
            "Choose the correct heading for each paragraph.",

          type: "matching-headings",

          questions: [

            {
              id: 1,

              question: "Paragraph A",

              options: [
                "i",
                "ii",
                "iii",
                "iv",
                "v"
              ],

              answer: "ii"
            },

            {
              id: 2,

              question: "Paragraph B",

              options: [
                "i",
                "ii",
                "iii",
                "iv",
                "v"
              ],

              answer: "iv"
            }

          ]
        },

        {
          id: 2,

          title: "Questions 6-10",

          instruction:
            "Do the following statements agree with the information given?",

          type:
            "true-false-not-given",

          questions: [

            {
              id: 6,

              question:
                "Glass was first made in Egypt.",

              answer: "True"
            }

          ]
        },

        {
          id: 3,

          title: "Questions 11-13",

          instruction:
            "Complete the summary below. Use NO MORE THAN TWO WORDS.",

          type:
            "summary-completion",

          questions: [

            {
              id: 11,

              question:
                "Glass was produced using ______.",

              answer: "sand"
            }

          ]
        }

      ]

    }

  ]

};

export default academicTest001; 