const academicTest005 = {
  id: "academic-005",

  title: "Ancient Civilizations",

  type: "Academic",

  difficulty: "Hard",

  estimatedBand: "7.5-8.5",

  passages: [
    {
      id: 1,

      title: "Early Urban Societies",

      content: `
Ancient civilizations emerged near rivers due to access to water, fertile land, and transportation routes.

These societies developed complex political systems and trade networks.
      `,

      questions: [
        {
          id: 1,

          type: "multiple-choice",

          question:
            "Why were rivers important?",

          options: [
            "Entertainment",
            "Transportation",
            "Sports",
            "Decoration",
          ],

          answer:
            "Transportation",
        },
      ],
    },

    {
      id: 2,
      title: "Trade Networks",
      content:
        "Trade allowed civilizations to exchange resources, technology, and cultural ideas.",
      questions: [],
    },

    {
      id: 3,
      title: "Archaeological Evidence",
      content:
        "Modern archaeology continues uncovering evidence of ancient life and governance.",
      questions: [],
    },
  ],
};

export default academicTest005;