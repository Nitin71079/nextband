import { ALL_NEET_MOCKS } from '../src/data/neet/neetMockDatabase.js';

console.log("=========================================");
console.log("   NTA NEET-UG 100 MOCK VALIDATOR SUITE  ");
console.log("=========================================\n");

let totalMocks = ALL_NEET_MOCKS.length;
let totalQuestions = 0;
let physicsCount = 0;
let chemistryCount = 0;
let botanyCount = 0;
let zoologyCount = 0;

let duplicateIds = new Set();
let allQuestionIds = new Set();
let validationFailures = 0;

ALL_NEET_MOCKS.forEach((mock, mIdx) => {
  if (mock.questions.length !== 180) {
    console.error(`❌ Validation Error in ${mock.id}: Expected 180 questions, got ${mock.questions.length}`);
    validationFailures++;
  }

  let mPhy = 0, mChem = 0, mBot = 0, mZoo = 0;

  mock.questions.forEach((q) => {
    totalQuestions++;

    if (allQuestionIds.has(q.id)) {
      duplicateIds.add(q.id);
    }
    allQuestionIds.add(q.id);

    if (q.subject === 'physics') { physicsCount++; mPhy++; }
    else if (q.subject === 'chemistry') { chemistryCount++; mChem++; }
    else if (q.subject === 'botany') { botanyCount++; mBot++; }
    else if (q.subject === 'zoology') { zoologyCount++; mZoo++; }

    if (!q.options || q.options.length !== 4) {
      console.error(`❌ Validation Error in Question ${q.id}: Expected 4 options, got ${q.options?.length}`);
      validationFailures++;
    }

    if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) {
      console.error(`❌ Validation Error in Question ${q.id}: Correct answer '${q.correctAnswer}' not in options!`);
      validationFailures++;
    }
  });

  if (mPhy !== 45 || mChem !== 45 || mBot !== 45 || mZoo !== 45) {
    console.error(`❌ Validation Error in ${mock.id} subject breakdown: Phy ${mPhy}, Chem ${mChem}, Bot ${mBot}, Zoo ${mZoo}`);
    validationFailures++;
  }
});

console.log(`NEET mocks created: ${totalMocks} / 100`);
console.log(`Total questions created: ${totalQuestions}`);
console.log(`Physics questions: ${physicsCount}`);
console.log(`Chemistry questions: ${chemistryCount}`);
console.log(`Botany questions: ${botanyCount}`);
console.log(`Zoology questions: ${zoologyCount}`);
console.log(`Duplicates detected: ${duplicateIds.size}`);
console.log(`Validation failures: ${validationFailures}`);
console.log(`Mocks validated: ${totalMocks - validationFailures} / 100`);

if (validationFailures === 0 && duplicateIds.size === 0 && totalMocks === 100) {
  console.log("\n✅ NEET 100 MOCKS VALIDATION: PERFECT PASS!");
  process.exit(0);
} else {
  console.error("\n❌ NEET VALIDATION FAILED!");
  process.exit(1);
}
