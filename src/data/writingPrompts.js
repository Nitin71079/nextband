const writingPrompts = [
  {
    id: 1,
    title: "IELTS Academic Writing Test 01 (Official Specification)",
    timeAllowedMinutes: 60,
    task1: {
      type: "Academic Data Report (Bar Chart & Table)",
      title: "Task 1: Global Renewable Energy Production Trends (2010–2025)",
      promptText: "The chart and table below give information about renewable energy production (in Gigawatt hours) across five regions between 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      minWords: 150,
      suggestedTimeMinutes: 20,
      rubricDimensions: ["Task Achievement", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"]
    },
    task2: {
      type: "Opinion & Argumentative Essay",
      title: "Task 2: Urban Transport Investment Priorities",
      promptText: "Some urban planners argue that municipal governments should allocate the majority of public transport funding to expanding zero-emission electric bus and rail networks, while others believe building new road bypasses is essential for reducing traffic congestion. Discuss both views and give your own opinion.",
      minWords: 250,
      suggestedTimeMinutes: 40,
      rubricDimensions: ["Task Response", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"]
    }
  },
  {
    id: 2,
    title: "IELTS Academic Writing Test 02 (Official Specification)",
    timeAllowedMinutes: 60,
    task1: {
      type: "Process Diagram & Flowchart",
      title: "Task 1: Industrial Desalination and Potable Water Filtration Process",
      promptText: "The diagram below illustrates the multi-stage industrial process of seawater desalination and municipal distribution. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      minWords: 150,
      suggestedTimeMinutes: 20,
      rubricDimensions: ["Task Achievement", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"]
    },
    task2: {
      type: "Advantages & Disadvantages Essay",
      title: "Task 2: Telecommuting and Remote Higher Education",
      promptText: "An increasing number of universities and global corporations now offer fully virtual degree programs and remote employment opportunities. Discuss the advantages and disadvantages of this trend for individuals and society as a whole.",
      minWords: 250,
      suggestedTimeMinutes: 40,
      rubricDimensions: ["Task Response", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"]
    }
  },
  {
    id: 3,
    title: "IELTS General Training Writing Test 01 (Official Specification)",
    timeAllowedMinutes: 60,
    task1: {
      type: "Formal Correspondence Letter",
      title: "Task 1: Formal Complaint Regarding Municipal Transit Delay",
      promptText: "You recently experienced severe delays and inadequate customer assistance while traveling on a regional train service. Write a letter to the rail company's customer service manager. In your letter: (1) explain the details of your journey, (2) describe the impact of the delay on your schedule, and (3) state what actions you expect the company to take.",
      minWords: 150,
      suggestedTimeMinutes: 20,
      rubricDimensions: ["Task Achievement", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"]
    },
    task2: {
      type: "Direct Problem & Solution Essay",
      title: "Task 2: Fast Fashion and Consumer Environmental Impact",
      promptText: "In many countries, the consumption of low-cost, disposable clothing ('fast fashion') has grown rapidly, causing significant environmental damage. What are the main causes of this development, and what measures can be taken to encourage more sustainable consumer habits?",
      minWords: 250,
      suggestedTimeMinutes: 40,
      rubricDimensions: ["Task Response", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"]
    }
  }
];

export default writingPrompts;