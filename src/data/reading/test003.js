const test003 = {
  id: 3,

  title:
    "Artificial Intelligence in Education",

  level:
    "Academic",

  passages: [
    {
      id: 1,

      title:
        "AI and Modern Learning",

      content: `
Artificial intelligence has become an increasingly important tool in education.

Schools and universities now use AI-powered systems to personalize learning experiences,
identify knowledge gaps and provide instant feedback.

Supporters argue that AI improves learning outcomes while critics worry about privacy
and excessive dependence on technology.
      `,

      questions: [
        {
          id: 1,

          type:
            "multiple-choice",

          question:
            "What is one benefit of AI mentioned in the passage?",

          options: [
            "Higher taxes",
            "Personalized learning",
            "More homework",
            "Reduced internet access",
          ],

          answer:
            "Personalized learning",
        },

        {
          id: 2,

          type:
            "true-false-not-given",

          question:
            "AI can identify knowledge gaps.",

          answer:
            "True",
        },

        {
          id: 3,

          type:
            "true-false-not-given",

          question:
            "All universities require AI systems.",

          answer:
            "Not Given",
        },
      ],
    },
  ],
};

export default test003;