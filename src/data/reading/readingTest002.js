const academicTest002 = {
  id: 2,

  title:
    "Academic Reading Test 2",

  level:
    "Academic",

  estimatedBand:
    "7.0 - 8.5",

  passages: [
    {
      id: 1,

      title:
        "The Future of Electric Vehicles",

      content: `
Electric vehicles are becoming increasingly common around the world.

Governments support EV adoption through incentives and environmental regulations.

Battery technology continues to improve while charging infrastructure expands rapidly.
      `,

      questions: [
        {
          id: 1,
          type:
            "multiple-choice",
          question:
            "Why are governments supporting EV adoption?",
          options: [
            "To increase fuel consumption",
            "Environmental reasons",
            "To reduce roads",
            "To reduce electricity use"
          ],
          answer:
            "Environmental reasons"
        },

        {
          id: 2,
          type:
            "true-false-not-given",
          question:
            "Battery technology is improving.",
          answer:
            "True"
        }
      ]
    },

    {
      id: 2,

      title:
        "Smart Cities",

      content: `
Smart cities use technology and data to improve transportation, energy efficiency and public services.

Sensors and connected infrastructure provide real-time information for city management.
      `,

      questions: [
        {
          id: 14,
          type:
            "multiple-choice",
          question:
            "What do smart cities use extensively?",
          options: [
            "Paper records",
            "Technology and data",
            "Horse transport",
            "Manual systems"
          ],
          answer:
            "Technology and data"
        }
      ]
    },

    {
      id: 3,

      title:
        "AI and Employment",

      content: `
Artificial intelligence is changing the labor market.

While some jobs may be automated, new opportunities are emerging in technology-focused sectors.
      `,

      questions: [
        {
          id: 27,
          type:
            "multiple-choice",
          question:
            "What is AI changing?",
          options: [
            "Weather",
            "Labor market",
            "Ocean levels",
            "Agriculture only"
          ],
          answer:
            "Labor market"
        }
      ]
    }
  ]
};

export default academicTest002;