export function buildWritingPrompt({
  task1Text = "",
  task2Text = "",
  task1Type = "Chart/Diagram",
  task1Question = "",
  task2Question = "",
}) {
  return `
You are an expert, certified IELTS Writing Examiner.

Evaluate the candidate's IELTS Writing performance for both Task 1 and Task 2.

### TASK 1 DETAILS:
- Chart/Diagram Type: ${task1Type}
- Question Prompt: ${task1Question || "Academic Task 1 Report"}
- Candidate's Task 1 Response:
"""
${task1Text}
"""

---

### TASK 2 DETAILS:
- Question Prompt: ${task2Question || "Academic Task 2 Essay"}
- Candidate's Task 2 Response:
"""
${task2Text}
"""

---

### EVALUATION CRITERIA & WEIGHTING RULES:
1. Evaluate Task 1 separately using 4 criteria (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy). Calculate Task 1 overall band (1.0 to 9.0).
2. Evaluate Task 2 separately using 4 criteria (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy). Calculate Task 2 overall band (1.0 to 9.0).
3. Weighting Formula for Final Overall Writing Band:
   Final Overall Band = (Task 1 Band * 0.3333) + (Task 2 Band * 0.6667)
   Round according to official IELTS rules (fraction >= 0.25 rounds to .5, fraction >= 0.75 rounds to next whole band).

Respond ONLY with valid JSON in the following exact format:

{
  "success": true,
  "overallBand": 6.5,
  "calculationBreakdown": "33% Task 1 (Band 6.0) + 67% Task 2 (Band 7.0) = Final Overall Band 6.5",
  "task1": {
    "band": 6.0,
    "wordCount": 165,
    "taskAchievement": 6.0,
    "coherenceCohesion": 6.0,
    "lexicalResource": 6.0,
    "grammarRangeAccuracy": 6.0,
    "strengths": [
      "Clear overview presenting main trends.",
      "Accurate reporting of key data points."
    ],
    "weaknesses": [
      "Minor grammatical slips in complex comparisons."
    ],
    "recommendations": [
      "Vary comparative vocabulary (e.g., 'substantially higher' vs 'dramatically increased')."
    ]
  },
  "task2": {
    "band": 7.0,
    "wordCount": 275,
    "taskResponse": 7.0,
    "coherenceCohesion": 7.0,
    "lexicalResource": 7.0,
    "grammarRangeAccuracy": 7.0,
    "strengths": [
      "Well-developed argument with relevant supporting examples.",
      "Logical paragraph structure with clear topic sentences."
    ],
    "weaknesses": [
      "Slight repetition of vocabulary in the third body paragraph."
    ],
    "recommendations": [
      "Use broader academic collocations to enhance Lexical Resource."
    ]
  },
  "improvedTask1": "A refined, Band 9 version of Task 1...",
  "improvedTask2": "A refined, Band 9 version of Task 2..."
}
`;
}