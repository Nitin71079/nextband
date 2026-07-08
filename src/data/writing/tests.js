import test1 from "../../assets/writing/task1/test1.png";
import test2 from "../../assets/writing/task1/test2.png";
import test3 from "../../assets/writing/task1/test3.png";
import test4 from "../../assets/writing/task1/test4.png";
import test5 from "../../assets/writing/task1/test5.png";
import test6 from "../../assets/writing/task1/test6.png";
import test7 from "../../assets/writing/task1/test7.png";
import test8 from "../../assets/writing/task1/test8.png";
import test9 from "../../assets/writing/task1/test9.png";
import test10 from "../../assets/writing/task1/test10.png";
import test11 from "../../assets/writing/task1/test11.png";
import test12 from "../../assets/writing/task1/test12.png";
import test13 from "../../assets/writing/task1/test13.png";
import test14 from "../../assets/writing/task1/test14.png";
import test15 from "../../assets/writing/task1/test15.png";
import test16 from "../../assets/writing/task1/test16.png";
import test17 from "../../assets/writing/task1/test17.png";
import test18 from "../../assets/writing/task1/test18.png";
import test19 from "../../assets/writing/task1/test19.png";
import test20 from "../../assets/writing/task1/test20.png";
const writingTests = [
  {
    id: 1,
    title: "Writing Test 1",
    duration: 60,
    difficulty: "Easy",

    task1: {
      image: test1,
      type: "Line Graph",
      question:
        "The line graph below illustrates the changes in the global average temperature between 1980 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Some people believe governments should invest more in public transport than road infrastructure. To what extent do you agree or disagree?"
    }
  },

  {
    id: 2,
    title: "Writing Test 2",
    duration: 60,
    difficulty: "Easy",

    task1: {
      image: test2,
      type: "Multiple Line Graph",
      question:
        "The line graph compares the number of internet users per 100 people in four different countries from 2000 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Many people think children should begin learning a foreign language at primary school. Do the advantages outweigh the disadvantages?"
    }
  },

  {
    id: 3,
    title: "Writing Test 3",
    duration: 60,
    difficulty: "Easy",

    task1: {
      image: test3,
      type: "Bar Chart",
      question:
        "The bar chart shows worldwide mobile phone sales between 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Some people believe technology has made communication easier, while others think it has reduced real human interaction. Discuss both views and give your own opinion."
    }
  },

  {
    id: 4,
    title: "Writing Test 4",
    duration: 60,
    difficulty: "Easy",

    task1: {
      image: test4,
      type: "Horizontal Bar Chart",
      question:
        "The bar chart compares the populations of five major cities in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Some people believe university education should be free for everyone. To what extent do you agree or disagree?"
    }
  },

  {
    id: 5,
    title: "Writing Test 5",
    duration: 60,
    difficulty: "Easy",

    task1: {
      image: test5,
      type: "Grouped Column Chart",
      question:
        "The chart illustrates the value of goods exported from four continents between 2018 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "In many countries, people are living longer. What are the causes of this trend, and what effects does it have on society?"
    }
  },

  {
    id: 6,
    title: "Writing Test 6",
    duration: 60,
    difficulty: "Medium",

    task1: {
      image: test6,
      type: "Pie Chart",
      question:
        "The pie chart shows the proportions of different energy sources used in a country in 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Some people think governments should spend more money on healthcare than on other public services. Discuss both views and give your opinion."
    }
  },

  {
    id: 7,
    title: "Writing Test 7",
    duration: 60,
    difficulty: "Medium",

    task1: {
      image: test7,
      type: "Multiple Pie Charts",
      question:
        "The pie charts compare the market shares of three companies in 2010, 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Some people think advertisements encourage us to buy unnecessary things, while others believe they provide useful information. Discuss both views and give your opinion."
    }
  },

  {
    id: 8,
    title: "Writing Test 8",
    duration: 60,
    difficulty: "Medium",

    task1: {
      image: test8,
      type: "Table",
      question:
        "The table presents the number of international tourist arrivals in four countries between 2015 and 2019. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Some people believe that working from home is more beneficial than working in an office. Discuss both views and give your opinion."
    }
  },

  {
    id: 9,
    title: "Writing Test 9",
    duration: 60,
    difficulty: "Medium",

    task1: {
      image: test9,
      type: "Table",
      question:
        "The table shows the percentage of households with internet access across three income groups in 2010, 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Some people think environmental problems should be solved internationally rather than nationally. Discuss both views and give your opinion."
    }
  },

  {
    id: 10,
    title: "Writing Test 10",
    duration: 60,
    difficulty: "Medium",

    task1: {
      image: test10,
      type: "Map",
      question:
        "The maps below show how a university campus changed between 2005 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
    },

    task2: {
      question:
        "Many people choose to travel abroad rather than explore their own country. Why is this the case? Is it a positive or negative trend?"
    }
  },

  // Continue the same pattern...

  {
    id: 11,
    title: "Writing Test 11",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test11,
      type: "Process Diagram",
      question: "The diagram illustrates the process of producing sugar from sugar cane. Summarise the information by selecting and reporting the main features, and describe the process."
    },
    task2: {
      question: "Some people think success in life depends mainly on hard work, while others believe money and appearance are more important. Discuss both views and give your opinion."
    }
  },

  {
    id: 12,
    title: "Writing Test 12",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test12,
      type: "Process Diagram",
      question: "The diagram illustrates the stages of the natural water cycle. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Some people believe that museums should focus on educating people, while others think they should mainly entertain visitors. Discuss both views and give your opinion."
    }
  },

  {
    id: 13,
    title: "Writing Test 13",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test13,
      type: "Mixed Chart",
      question: "The chart compares tourist arrivals and annual growth rates between 2015 and 2020. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Some people think governments should control the amount of violence shown in films and television. To what extent do you agree or disagree?"
    }
  },

  {
    id: 14,
    title: "Writing Test 14",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test14,
      type: "Stacked Bar Chart",
      question: "The stacked bar chart illustrates energy consumption from four different sources between 2010 and 2020. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "In many countries, the gap between rich and poor is increasing. What problems does this cause, and what solutions can you suggest?"
    }
  },

  {
    id: 15,
    title: "Writing Test 15",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test15,
      type: "Area Chart",
      question: "The area chart shows changes in the world's total forest area between 2000 and 2020. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Some people believe that schools should teach financial management as a compulsory subject. Do you agree or disagree?"
    }
  },

  {
    id: 16,
    title: "Writing Test 16",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test16,
      type: "Scatter Plot",
      question: "The scatter plot illustrates the relationship between GDP per capita and life expectancy in different countries. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Some people believe that public libraries are no longer necessary because information is available online. Discuss both views and give your opinion."
    }
  },

  {
    id: 17,
    title: "Writing Test 17",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test17,
      type: "Bubble Chart",
      question: "The bubble chart compares the market share, profit margin and sales performance of five products. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Many people think that international tourism creates more benefits than problems. To what extent do you agree or disagree?"
    }
  },

  {
    id: 18,
    title: "Writing Test 18",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test18,
      type: "Population Pyramid",
      question: "The population pyramid illustrates the age and gender distribution of a country's population in 2020. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Some people believe that children should spend less time using electronic devices and more time playing outdoors. Discuss both views and give your opinion."
    }
  },

  {
    id: 19,
    title: "Writing Test 19",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test19,
      type: "Dual Axis Line Graph",
      question: "The graph compares carbon dioxide emissions and GDP between 2010 and 2020. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Many people believe that the best way to reduce crime is to give longer prison sentences. To what extent do you agree or disagree?"
    }
  },

  {
    id: 20,
    title: "Writing Test 20",
    duration: 60,
    difficulty: "Hard",
    task1: {
      image: test20,
      type: "Comparison Diagram",
      question: "The diagrams compare the average amount of household water used per day in 2000 and 2020. Summarise the information by selecting and reporting the main features."
    },
    task2: {
      question: "Some people think that the main purpose of education is to prepare students for employment, while others believe it should develop individuals more broadly. Discuss both views and give your opinion."
    }
  }
];

export default writingTests;