import writingTests from "../tests";

const academicWritingTests = writingTests.map((t, idx) => ({
  ...t,
  id: idx + 1,
  title: `Academic Writing Test ${idx + 1}`,
  category: "academic",
}));

export default academicWritingTests;
