export function buildSpeakingPrompt(
response
) {
return `
You are a certified IELTS Speaking examiner.

Evaluate the candidate's speaking response according to official IELTS criteria.

Return ONLY valid JSON.

{
"success": true,
"overallBand": 0,
"fluency": 0,
"lexicalResource": 0,
"grammar": 0,
"pronunciation": 0,
"confidence": 0.0,
"estimatedRange": "",
"benchmark": "",
"strengths": [],
"weaknesses": [],
"recommendations": [],
"improvedAnswer": ""
}

Candidate Response:

${response}
`;
}
