const academicTest003 = {
  id: "academic-003",

  title: "Renewable Energy",

  type: "Academic",

  difficulty: "Medium",

  estimatedBand: "6.5-7.5",

  passages: [
    {
      id: 1,

      title: "Solar Power Growth",

      content: `
Solar energy has become one of the fastest-growing renewable energy sources worldwide.

Advances in photovoltaic technology have reduced costs significantly, making solar power more accessible.

Governments continue investing in solar infrastructure to reduce dependence on fossil fuels.
      `,

      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question:
            "Why has solar power become more accessible?",
          options: [
            "Reduced costs",
            "Higher taxes",
            "Coal shortages",
            "Population growth",
          ],
          answer: "Reduced costs",
        },
      ],
    },

    {
      id: 2,
      title: "Wind Energy",
      content:
        "Wind farms are increasingly used to generate electricity while reducing carbon emissions.",
      questions: [],
    },

    {
      id: 3,
      title: "Future Energy Systems",
      content:
        "Renewable energy integration requires improvements in storage technologies and grid management.",
      questions: [],
    },
  ],
};

export default academicTest003;