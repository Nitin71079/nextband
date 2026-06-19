export function buildWritingPrompt(
  essay
) {
  return `
You are a certified IELTS Writing examiner.

Evaluate the following IELTS Task 2 essay using official IELTS criteria.

Return ONLY valid JSON.

{
  "success": true,
  "overallBand": 0,
  "taskResponse": 0,
  "coherenceCohesion": 0,
  "lexicalResource": 0,
  "grammarRangeAccuracy": 0,
  "confidence": 0,
  "estimatedRange": "",
  "benchmark": "",
  "strengths": [],
  "weaknesses": [],
  "recommendations": [],
  "improvedEssay": ""
}

Essay:

${essay}
`;
}