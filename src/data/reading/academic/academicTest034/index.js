import passage1 from "./passage1";
import passage2 from "./passage2";
import passage3 from "./passage3";

import questions1 from "./questions1";
import questions2 from "./questions2";
import questions3 from "./questions3";

const academicTest034 = {
  id: 34,
  title: "Academic Reading Test 034",
  duration: 60,
  passages: [
    { ...passage1, questions: questions1 },
    { ...passage2, questions: questions2 },
    { ...passage3, questions: questions3 },
  ],
};

export default academicTest034;