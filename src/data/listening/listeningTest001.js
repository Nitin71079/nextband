const listeningTest001 = {
  id: 1,

  title: "IELTS Listening Test 001",

  sections: [
    {
      id: 1,
      title: "Section 1 - Student Accommodation",

      audio: "/listening/test001.mp3",

      questions: [
        { id: 1, type: "fill", question: "Service Required: _______", answer: "Accommodation" },
        { id: 2, type: "fill", question: "Number of Apartments Available: _______", answer: "2" },
        { id: 3, type: "fill", question: "Weekly Rent of Apartment 1 (£): _______", answer: "180" },
        { id: 4, type: "fill", question: "Weekly Rent of Apartment 2 (£): _______", answer: "220" },
        { id: 5, type: "fill", question: "Apartment Selected: _______", answer: "First" },
        { id: 6, type: "fill", question: "Distance from Campus: _______", answer: "2 kilometres" },
        { id: 7, type: "fill", question: "Internet Included: _______", answer: "Yes" },
        { id: 8, type: "fill", question: "Deposit Amount (£): _______", answer: "500" },
        { id: 9, type: "fill", question: "Move-in Month: _______", answer: "September" },
        { id: 10, type: "fill", question: "Number of Bedrooms: _______", answer: "2" },
      ],
    },

    {
      id: 2,
      title: "Section 2 - Campus Tour",

      audio: "/listening/test002.mp3",

      questions: [
        {
          id: 11,
          type: "mcq",
          question: "Where does the tour begin?",
          options: ["Student Centre", "Entrance Hall", "Library"],
          answer: "Entrance Hall",
        },
        {
          id: 12,
          type: "mcq",
          question: "What building is visited first?",
          options: ["Library", "Sports Centre", "Student Centre"],
          answer: "Library",
        },
        {
          id: 13,
          type: "mcq",
          question: "How long is the tour?",
          options: ["60 minutes", "90 minutes", "120 minutes"],
          answer: "90 minutes",
        },
        {
          id: 14,
          type: "mcq",
          question: "Who leads the tour?",
          options: ["Professor", "Guide", "Student"],
          answer: "Guide",
        },
        {
          id: 15,
          type: "mcq",
          question: "Which facility is highlighted?",
          options: ["Sports Centre", "Library", "Laboratory"],
          answer: "Sports Centre",
        },
        {
          id: 16,
          type: "mcq",
          question: "What time does the tour start?",
          options: ["9 AM", "10 AM", "11 AM"],
          answer: "10 AM",
        },
        {
          id: 17,
          type: "mcq",
          question: "How many students attend?",
          options: ["15", "20", "25"],
          answer: "20",
        },
        {
          id: 18,
          type: "mcq",
          question: "Which department is introduced?",
          options: ["Business", "Engineering", "Science"],
          answer: "Engineering",
        },
        {
          id: 19,
          type: "mcq",
          question: "What brochure is provided?",
          options: ["Campus Guide", "Student Handbook", "Course Guide"],
          answer: "Campus Guide",
        },
        {
          id: 20,
          type: "mcq",
          question: "Where does the tour end?",
          options: ["Student Centre", "Library", "Engineering Block"],
          answer: "Student Centre",
        },
      ],
    },

    {
      id: 3,
      title: "Section 3 - University Project",

      audio: "/listening/test003.mp3",

      questions: [
        {
          id: 21,
          type: "matching",
          question: "Project Topic",
          options: [
            "Climate Change",
            "Artificial Intelligence",
            "Agriculture",
            "Healthcare",
          ],
          answer: "Climate Change",
        },
        {
          id: 22,
          type: "matching",
          question: "Team Leader",
          options: ["Sarah", "Emma", "John", "Michael"],
          answer: "Sarah",
        },
        {
          id: 23,
          type: "matching",
          question: "Number of Students Involved",
          options: ["2", "3", "4", "5"],
          answer: "4",
        },
        {
          id: 24,
          type: "matching",
          question: "Project Deadline",
          options: ["March", "April", "May", "June"],
          answer: "May",
        },
        {
          id: 25,
          type: "matching",
          question: "Software Used",
          options: ["Python", "Java", "MATLAB", "R"],
          answer: "Python",
        },
        {
          id: 26,
          type: "matching",
          question: "Data Source Selected",
          options: ["Survey", "Interview", "Database", "Observation"],
          answer: "Survey",
        },
        {
          id: 27,
          type: "matching",
          question: "Meeting Frequency",
          options: ["Daily", "Weekly", "Monthly", "Quarterly"],
          answer: "Weekly",
        },
        {
          id: 28,
          type: "matching",
          question: "Main Challenge",
          options: ["Budget", "Technology", "Staff", "Time"],
          answer: "Budget",
        },
        {
          id: 29,
          type: "matching",
          question: "Target Grade",
          options: ["A", "B", "C", "D"],
          answer: "A",
        },
        {
          id: 30,
          type: "matching",
          question: "Project Reviewer",
          options: ["Professor", "Dean", "Tutor", "Supervisor"],
          answer: "Professor",
        },
      ],
    },

    {
      id: 4,
      title: "Section 4 - Academic Lecture",

      audio: "/listening/test004.mp3",

      questions: [
        { id: 31, type: "sentence", question: "Lecture Topic: _______", answer: "Renewable Energy" },
        { id: 32, type: "sentence", question: "Main Energy Source: _______", answer: "Solar" },
        { id: 33, type: "sentence", question: "Country Mentioned: _______", answer: "Germany" },
        { id: 34, type: "sentence", question: "Statistic Presented: _______", answer: "40 percent" },
        { id: 35, type: "sentence", question: "Major Challenge: _______", answer: "Storage" },
        { id: 36, type: "sentence", question: "Proposed Solution: _______", answer: "Battery Technology" },
        { id: 37, type: "sentence", question: "Industry Benefiting: _______", answer: "Manufacturing" },
        { id: 38, type: "sentence", question: "Year Referenced: _______", answer: "2030" },
        { id: 39, type: "sentence", question: "Research Organisation: _______", answer: "IEA" },
        { id: 40, type: "sentence", question: "Lecture Conclusion: _______", answer: "Sustainability" },
      ],
    },
  ],
};

export default listeningTest001;