import { calculateOverallScore, calculateComparableScore, toeflToCEFR, rawTaskPointsToBand } from "../../lib/toefl2026/scoring.js";

function runTests() {
  console.log("Running 2026 TOEFL Psychometric Scoring Unit Tests...");

  const testCases = [
    { input: [1, 1, 1, 1], expected: 1.0 },
    { input: [2, 2, 2, 2], expected: 2.0 },
    { input: [4, 4, 4, 4], expected: 4.0 },
    { input: [4, 4.5, 5, 5.5], expected: 5.0 }, // (4 + 4.5 + 5 + 5.5) / 4 = 4.75 -> 5.0
    { input: [5, 5, 5, 5], expected: 5.0 },
    { input: [6, 6, 6, 6], expected: 6.0 },
  ];

  let passed = 0;
  testCases.forEach(({ input, expected }, idx) => {
    const res = calculateOverallScore(...input);
    if (res.predictedScore === expected) {
      console.log(`✓ Test ${idx + 1} PASSED: (${input.join(", ")}) -> ${res.predictedScore}`);
      passed++;
    } else {
      console.error(`✕ Test ${idx + 1} FAILED: (${input.join(", ")}) -> Expected ${expected}, got ${res.predictedScore}`);
    }
  });

  // Verify 1.0 maps to '0+'
  const band1Comparable = calculateComparableScore(1.0);
  if (band1Comparable === "0+") {
    console.log("✓ Comparable score mapping test PASSED: 1.0 -> '0+'");
    passed++;
  } else {
    console.error(`✕ Comparable score test FAILED: 1.0 -> Expected '0+', got ${band1Comparable}`);
  }

  console.log(`\nResults: ${passed} / ${testCases.length + 1} tests passed successfully.`);
  if (passed !== testCases.length + 1) {
    process.exit(1);
  }
}

runTests();
