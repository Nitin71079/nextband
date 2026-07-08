const questions1 = [
  {
    id: 1,
    type: "multiple_choice",
    question: "Why is earthquake prediction considered difficult?",
    options: [
      "Earthquakes only occur underwater.",
      "Scientists cannot accurately predict the exact time and location of major earthquakes.",
      "There are too few earthquakes to study.",
      "Seismic waves travel too slowly."
    ],
    answer: "Scientists cannot accurately predict the exact time and location of major earthquakes.",
    explanation: "The introduction explains that precise short-term prediction remains beyond current scientific capability.",
    difficulty: "Easy",
    skill: "Main Idea"
  },

  {
    id: 2,
    type: "multiple_choice",
    question: "What causes most earthquakes?",
    options: [
      "Volcanic eruptions",
      "Weather changes",
      "Stress released along tectonic plate boundaries",
      "Ocean currents"
    ],
    answer: "Stress released along tectonic plate boundaries",
    explanation: "The passage explains that accumulated stress between tectonic plates causes earthquakes.",
    difficulty: "Easy",
    skill: "Detail"
  },

  {
    id: 3,
    type: "multiple_choice",
    question: "What is the primary function of seismometers?",
    options: [
      "Measure air pressure",
      "Record tiny ground movements",
      "Predict volcanic eruptions",
      "Monitor ocean temperatures"
    ],
    answer: "Record tiny ground movements",
    explanation: "Paragraph 3 explains that seismometers detect seismic activity.",
    difficulty: "Medium",
    skill: "Scanning"
  },

  {
    id: 4,
    type: "multiple_choice",
    question: "Why do scientists use probabilistic forecasting?",
    options: [
      "Because exact prediction is currently impossible.",
      "Because earthquakes only happen every hundred years.",
      "To replace engineering standards.",
      "To prevent tectonic plate movement."
    ],
    answer: "Because exact prediction is currently impossible.",
    explanation: "Probabilistic forecasting estimates the likelihood of future earthquakes.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 5,
    type: "multiple_choice",
    question: "According to the passage, what has reduced earthquake casualties most effectively?",
    options: [
      "Animal behaviour monitoring",
      "Earthquake-resistant engineering",
      "Gas emission measurements",
      "Satellite communication"
    ],
    answer: "Earthquake-resistant engineering",
    explanation: "Improved engineering standards have significantly reduced casualties.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 6,
    type: "true_false_not_given",
    question: "Most earthquakes occur along tectonic plate boundaries.",
    answer: "True",
    explanation: "This is directly stated in Paragraph 2.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 7,
    type: "true_false_not_given",
    question: "Animal behaviour has been proven to predict earthquakes reliably.",
    answer: "False",
    explanation: "The passage says no proposed indicator has shown consistent reliability.",
    difficulty: "Easy",
    skill: "Detail"
  },

  {
    id: 8,
    type: "true_false_not_given",
    question: "Artificial intelligence has completely solved earthquake prediction.",
    answer: "False",
    explanation: "AI assists research but has not solved short-term prediction.",
    difficulty: "Medium",
    skill: "Inference"
  },

  {
    id: 9,
    type: "true_false_not_given",
    question: "Every country requires earthquake-resistant buildings.",
    answer: "Not Given",
    explanation: "The passage never states this.",
    difficulty: "Hard",
    skill: "Inference"
  },

  {
    id: 10,
    type: "sentence_completion",
    question: "Stress is released in the form of seismic ________.",
    answer: "waves",
    explanation: "Earthquakes release seismic waves.",
    difficulty: "Easy",
    skill: "Vocabulary"
  },

  {
    id: 11,
    type: "sentence_completion",
    question: "Satellite technology measures changes in the Earth's ________.",
    answer: "surface",
    explanation: "Paragraph 3 discusses monitoring surface movement.",
    difficulty: "Easy",
    skill: "Scanning"
  },

  {
    id: 12,
    type: "sentence_completion",
    question: "Machine learning analyses large volumes of seismic ________.",
    answer: "data",
    explanation: "AI processes seismic datasets.",
    difficulty: "Medium",
    skill: "Detail"
  },

  {
    id: 13,
    type: "sentence_completion",
    question: "Scientists recommend prioritising earthquake ________ rather than perfect prediction.",
    answer: "preparedness",
    explanation: "The conclusion emphasizes preparedness.",
    difficulty: "Medium",
    skill: "Vocabulary"
  }
];

export default questions1;