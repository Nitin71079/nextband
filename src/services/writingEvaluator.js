import { calculateIELTSTotalWritingBand, roundIELTSBand, countWords } from "../utils/writingBandCalculator";

function analyzeTextQuality(text) {
  const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return { isGibberish: true, vocabularyVariety: 0, sentenceCount: 0 };
  }

  const uniqueWords = new Set(words).size;
  const uniqueRatio = uniqueWords / words.length;

  // Check for repeated single word mashing (e.g., "test test test")
  const isRepetitive = words.length > 10 && uniqueRatio < 0.25;

  // Check for non-word keyboard mashing (e.g., "asdfghjkl zxcvbnm")
  const avgWordLen = words.reduce((acc, w) => acc + w.length, 0) / words.length;
  const hasRealVowels = words.filter(w => /[aeiouy]/i.test(w)).length / words.length;
  const isMashed = hasRealVowels < 0.6 || avgWordLen > 14;

  const sentenceCount = (text.match(/[\.\?!]+/g) || []).length;

  return {
    isGibberish: isRepetitive || isMashed,
    uniqueRatio,
    sentenceCount,
    wordCount: words.length,
  };
}

export function evaluateWriting({
  task1Text = "",
  task2Text = "",
  task1Type = "Chart/Diagram",
  task1Question = "",
  task2Question = "",
}) {
  const t1Words = countWords(task1Text);
  const t2Words = countWords(task2Text);

  const t1Eval = evaluateTask1(task1Text, t1Words);
  const t2Eval = evaluateTask2(task2Text, t2Words);

  const finalOverallBand = calculateIELTSTotalWritingBand(t1Eval.band, t2Eval.band);

  return {
    success: true,
    overallBand: finalOverallBand,
    calculationBreakdown: `Task 1: Band ${t1Eval.band.toFixed(1)} | Task 2: Band ${t2Eval.band.toFixed(1)} → Overall Band ${finalOverallBand.toFixed(1)}`,
    task1: t1Eval,
    task2: t2Eval,
    improvedTask1: `A Band 9 model answer for Task 1...`,
    improvedTask2: `A Band 9 model answer for Task 2...`,
  };
}

function evaluateTask1(text, wordCount) {
  const { isGibberish, uniqueRatio, sentenceCount } = analyzeTextQuality(text);

  if (isGibberish || wordCount < 30) {
    const lowBand = wordCount < 10 ? 1.0 : 2.0;
    return {
      band: lowBand,
      wordCount,
      taskAchievement: lowBand,
      coherenceCohesion: lowBand,
      lexicalResource: lowBand,
      grammarRangeAccuracy: lowBand,
      strengths: ["Submitted response."],
      weaknesses: ["Response lacks meaningful English sentences or coherent structure."],
      recommendations: ["Write complete sentences addressing the prompt data."],
    };
  }

  let ta = 3.5;
  let cc = 3.5;
  let lr = 3.5;
  let gra = 3.5;

  if (wordCount >= 150) ta += 1.5;
  else if (wordCount >= 100) ta += 1.0;
  else if (wordCount >= 60) ta += 0.5;

  const lower = text.toLowerCase();
  if (lower.includes("overall") || lower.includes("shows") || lower.includes("illustrates") || lower.includes("dear")) ta += 1.0;
  if (lower.includes("compared") || lower.includes("whereas") || lower.includes("while") || lower.includes("however")) cc += 1.0;
  if (uniqueRatio > 0.5) lr += 0.5;
  if (sentenceCount >= 4) gra += 0.5;

  ta = Math.min(9.0, Math.max(1.0, ta));
  cc = Math.min(9.0, Math.max(1.0, cc));
  lr = Math.min(9.0, Math.max(1.0, lr));
  gra = Math.min(9.0, Math.max(1.0, gra));

  const band = roundIELTSBand((ta + cc + lr + gra) / 4);

  return {
    band,
    wordCount,
    taskAchievement: ta,
    coherenceCohesion: cc,
    lexicalResource: lr,
    grammarRangeAccuracy: gra,
    strengths: ta >= 6.0 ? ["Provided a clear overview of main trends."] : ["Basic sentence structure presented."],
    weaknesses: ta < 6.0 ? ["Overview or detailed data comparison is missing or incomplete."] : [],
    recommendations: ["Use specific trend and comparison vocabulary."],
  };
}

function evaluateTask2(text, wordCount) {
  const { isGibberish, uniqueRatio, sentenceCount } = analyzeTextQuality(text);

  if (isGibberish || wordCount < 40) {
    const lowBand = wordCount < 15 ? 1.0 : 2.0;
    return {
      band: lowBand,
      wordCount,
      taskResponse: lowBand,
      coherenceCohesion: lowBand,
      lexicalResource: lowBand,
      grammarRangeAccuracy: lowBand,
      strengths: ["Submitted response."],
      weaknesses: ["Response lacks coherent arguments or meaningful English sentences."],
      recommendations: ["Develop clear paragraphing with supporting arguments."],
    };
  }

  let tr = 3.5;
  let cc = 3.5;
  let lr = 3.5;
  let gra = 3.5;

  if (wordCount >= 250) tr += 1.5;
  else if (wordCount >= 180) tr += 1.0;
  else if (wordCount >= 100) tr += 0.5;

  const lower = text.toLowerCase();
  if (lower.includes("agree") || lower.includes("disagree") || lower.includes("opinion") || lower.includes("believe") || lower.includes("conclude")) tr += 1.0;
  if (lower.includes("however") || lower.includes("therefore") || lower.includes("furthermore") || lower.includes("in addition")) cc += 1.0;
  if (uniqueRatio > 0.55) lr += 0.5;
  if (sentenceCount >= 6) gra += 0.5;

  tr = Math.min(9.0, Math.max(1.0, tr));
  cc = Math.min(9.0, Math.max(1.0, cc));
  lr = Math.min(9.0, Math.max(1.0, lr));
  gra = Math.min(9.0, Math.max(1.0, gra));

  const band = roundIELTSBand((tr + cc + lr + gra) / 4);

  return {
    band,
    wordCount,
    taskResponse: tr,
    coherenceCohesion: cc,
    lexicalResource: lr,
    grammarRangeAccuracy: gra,
    strengths: tr >= 6.0 ? ["Addressed main prompt questions with relevant points."] : ["Presents basic essay structure."],
    weaknesses: tr < 6.0 ? ["Develop arguments further with specific examples."] : [],
    recommendations: ["Expand paragraphing and use academic collocations."],
  };
}
