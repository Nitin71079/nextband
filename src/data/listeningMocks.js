export const listeningMocks = [
  {
    id: 1,

    title: "IELTS Listening Test 1",

    duration: "30 Minutes",

    audio:
      "/audio/listening1.mp3",

    questions: [
      {
        type:
          "sentence-completion",

        question:
          "The student is enrolling in an _____ preparation course.",

        answer:
          "IELTS"
      },

      {
        type:
          "sentence-completion",

        question:
          "The course begins next _____.",

        answer:
          "month"
      },

      {
        type:
          "multiple-choice",

        question:
          "What is included in the course fee?",

        options: [
          "Books only",
          "Books and mock tests",
          "Accommodation",
          "Transport"
        ],

        answer:
          "Books and mock tests"
      }
    ]
  }
];