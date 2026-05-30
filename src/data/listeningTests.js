const listeningTests = [
  {
    id: 1,

    title:
      "University Registration",

    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

    questions: [
      {
        question:
          "What is the student asking about?",

        options: [
          "Travel booking",
          "Course registration",
          "Hotel reservation",
          "Sports event"
        ],

        answer:
          "Course registration"
      },

      {
        question:
          "What document is required?",

        options: [
          "Passport",
          "Student ID",
          "Visa",
          "Bank card"
        ],

        answer:
          "Student ID"
      }
    ]
  },

  {
    id: 2,

    title:
      "Library Membership",

    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",

    questions: [
      {
        question:
          "What service is being discussed?",

        options: [
          "Hospital",
          "Cinema",
          "Library",
          "Airport"
        ],

        answer:
          "Library"
      }
    ]
  }
];

export default listeningTests;