const academicTest002 = {
  id: "academic-002",

  title:
    "Artificial Intelligence",

  type:
    "Academic",

  difficulty:
    "Medium",

  estimatedBand:
    "6.5-7.5",

  passages: [
    {
      id: 1,

      title:
        "The Rise of AI",

      content: `
Artificial Intelligence has transformed
many industries including healthcare,
finance, and education.

Machine learning algorithms are capable
of identifying patterns in large datasets
and making predictions with remarkable
accuracy.
      `,

      questions: [
        {
          id: 1,

          type:
            "multiple-choice",

          question:
            "Which industries are mentioned?",

          options: [
            "Healthcare",
            "Finance",
            "Education",
            "All of the above",
          ],

          answer:
            "All of the above",
        },
      ],
    },

    {
      id: 2,

      title:
        "AI In Education",

      content:
        "Content Here",

      questions: [],
    },

    {
      id: 3,

      title:
        "Future Challenges",

      content:
        "Content Here",

      questions: [],
    },
  ],
};

export default academicTest002;