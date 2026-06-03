const academicTest004 = {
  id: "academic-004",

  title: "Ocean Exploration",

  type: "Academic",

  difficulty: "Medium-Hard",

  estimatedBand: "7.0-8.0",

  passages: [
    {
      id: 1,

      title: "Deep Sea Research",

      content: `
Scientists continue exploring the deep ocean to discover unknown species and geological formations.

Modern submersibles allow researchers to reach depths that were previously inaccessible.
      `,

      questions: [
        {
          id: 1,

          type: "multiple-choice",

          question:
            "What do modern submersibles allow?",

          options: [
            "Faster airplanes",
            "Ocean depth exploration",
            "Space travel",
            "River transport",
          ],

          answer:
            "Ocean depth exploration",
        },
      ],
    },

    {
      id: 2,
      title: "Marine Biodiversity",
      content:
        "Thousands of marine species remain undiscovered in deep ocean ecosystems.",
      questions: [],
    },

    {
      id: 3,
      title: "Ocean Technology",
      content:
        "Autonomous underwater vehicles are becoming essential tools for exploration.",
      questions: [],
    },
  ],
};

export default academicTest004;