const speakingSets = [
  {
    id: 1,
    title: "IELTS Speaking Full Test 01 (Official Specification)",
    totalDurationMinutes: "11-14",
    part1: {
      title: "Part 1: Introduction & Personal Interview (4–5 minutes)",
      topics: ["Hometown & Accommodation", "Work or Study Habits", "Use of Digital Technology"],
      questions: [
        "Can you describe the town or city where you grew up?",
        "Do you prefer spending your free time indoors or outdoors?",
        "How often do you use digital devices for work or personal communication?"
      ]
    },
    part2: {
      title: "Part 2: Individual Long Turn / Cue Card (3-4 minutes)",
      prepTimeSeconds: 60,
      speakTimeSeconds: 120,
      cueCardPrompt: "Describe a memorable journey or trip you have taken in recent years.",
      bulletPoints: [
        "Where you traveled to and who accompanied you",
        "What mode of transport you utilized during the journey",
        "What activities you undertook while staying there",
        "And explain why this particular journey remains significant to you"
      ]
    },
    part3: {
      title: "Part 3: Two-Way Abstract Discussion (4–5 minutes)",
      theme: "Global Tourism Trends, Transportation Innovation & Cultural Exchange",
      questions: [
        "In what ways has international travel changed compared to several decades ago?",
        "Some economists argue that over-tourism damages historical landmarks. How can municipal authorities balance tourism revenue with cultural preservation?",
        "Do you believe virtual reality technology will ever replace physical holiday travel in the future?"
      ]
    }
  },
  {
    id: 2,
    title: "IELTS Speaking Full Test 02 (Official Specification)",
    totalDurationMinutes: "11-14",
    part1: {
      title: "Part 1: Introduction & Personal Interview (4–5 minutes)",
      topics: ["Daily Routines", "Music & Performing Arts", "Environmental Awareness"],
      questions: [
        "What is your favorite part of the daily routine?",
        "What genre of music do you enjoy listening to when relaxing?",
        "How do people in your community recycle or conserve energy?"
      ]
    },
    part2: {
      title: "Part 2: Individual Long Turn / Cue Card (3-4 minutes)",
      prepTimeSeconds: 60,
      speakTimeSeconds: 120,
      cueCardPrompt: "Describe an influential person or mentor who has inspired you.",
      bulletPoints: [
        "Who this individual is and how you first met them",
        "What specific advice or guidance they provided to you",
        "What personal qualities or achievements make them stand out",
        "And explain how their influence has impacted your life decisions"
      ]
    },
    part3: {
      title: "Part 3: Two-Way Abstract Discussion (4–5 minutes)",
      theme: "Leadership, Role Models, and Societal Values",
      questions: [
        "What qualities distinguish a genuine public leader from a famous celebrity?",
        "How do modern social media platforms alter the way young people choose their role models?",
        "Should high-profile figures be held to higher moral and ethical standards than ordinary citizens?"
      ]
    }
  }
];

export default speakingSets;