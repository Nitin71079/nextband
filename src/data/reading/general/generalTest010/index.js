import passage1 from "./passage1";
import passage2 from "./passage2";
import passage3 from "./passage3";

import questions1 from "./questions1";
import questions2 from "./questions2";
import questions3 from "./questions3";

const generalTest010 = {
  id: 10,
  title: "General Reading Test 010",
  duration: 60,

  passages: [
    { id: 1, ...passage1, questions: questions1 },
    { id: 2, ...passage2, questions: questions2 },
    { id: 3, ...passage3, questions: questions3 },
  ],
};

export default generalTest010;