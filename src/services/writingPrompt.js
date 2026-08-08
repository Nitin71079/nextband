export function buildWritingPrompt({
  task1Text = "",
  task2Text = "",
  task1Type = "Chart/Diagram",
  task1Question = "",
  task2Question = "",
  examType = "academic",
}) {
  return `
You are an expert, certified senior IELTS Writing Examiner evaluating an ${examType.toUpperCase()} Writing test.

Evaluate the candidate's IELTS Writing performance for both Task 1 and Task 2 according to official IELTS band descriptors.

### TASK 1 DETAILS:
- Task 1 Type: ${task1Type}
- Question Prompt: ${task1Question || "IELTS Task 1 Prompt"}
- Candidate's Task 1 Response:
"""
${task1Text}
"""

---

### TASK 2 DETAILS:
- Question Prompt: ${task2Question || "IELTS Task 2 Prompt"}
- Candidate's Task 2 Response:
"""
${task2Text}
"""

---

### EVALUATION CRITERIA & TASK-SPECIFIC GUIDELINES:

1. **TASK 1 EVALUATION (Weight: 33.3%)**:
   - If Academic Task 1 (Line Graph, Bar Chart, Pie Chart, Table, Process Diagram, Map):
     * Line Graph: Evaluate overall trend description, key comparisons, and significant fluctuations.
     * Bar Chart: Evaluate category comparisons, highest/lowest values, and key contrasts.
     * Pie Chart: Evaluate proportion comparisons, major changes, and avoidance of raw figure listing.
     * Table: Evaluate data comparisons, grouping of similar figures, and structural patterns.
     * Process Diagram: Evaluate stage ordering, passive voice usage, and sequential logic.
     * Map: Evaluate spatial additions, removals, layout comparisons, and overall development.
   - If General Training Task 1 (Formal Letter, Semi-formal Letter, Informal Letter):
     * Formal Letter: Evaluate formal salutation ("Dear Sir or Madam,"), professional complaint/application/inquiry conventions, and tone.
     * Semi-formal Letter: Evaluate professional salutation ("Dear Mr Smith,"), workplace/landlord/manager courtesy, and clear request handling.
     * Informal Letter: Evaluate friendly salutation ("Dear John,"), personal tone, and invitation/thanks/advice conventions.
   - Grade 4 sub-criteria: Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy (1.0 to 9.0).

2. **TASK 2 EVALUATION (Weight: 66.7%)**:
   - Recognized Essay Types: Opinion (Agree/Disagree), Discussion (Both views + opinion), Advantages & Disadvantages, Problem & Solution, Two-Part Question.
   - Evaluate Task Response (addressing all parts of prompt, clear position throughout), Coherence & Cohesion (paragraphing, cohesive devices), Lexical Resource, Grammatical Range & Accuracy.

3. **CRITICAL PENALTY & ACCURACY MANDATE (VERY IMPORTANT)**:
   - If the candidate submits random words, keyboard mashing, repeated words, or nonsensical text that fails to form meaningful English sentences addressing the prompt, YOU MUST AWARD LOW BAND SCORES (Band 1.0 to Band 3.0) for Task Achievement/Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy!
   - DO NOT AWARD Band 5.0, 6.0, or 7.0 for low-quality, repetitive, or nonsensical submissions under any circumstances! Band 6.0 requires functional sentence control, relevant main ideas, and logical paragraphing.

4. **OVERALL BAND COMPUTATION**:
   Final Overall Band = (Task 1 Band * 0.3333) + (Task 2 Band * 0.6667), rounded using official IELTS half-band rounding rules (>= 0.25 rounds to .5, >= 0.75 rounds to next whole band).

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
      "Clear overview presenting main trends or appropriate letter opening."
    ],
    "weaknesses": [
      "Minor grammatical slips or imprecise data reporting/tone shift."
    ],
    "recommendations": [
      "Vary comparative structures or refine formal letter salutations."
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
      "Well-developed argument directly addressing prompt questions."
    ],
    "weaknesses": [
      "Slight repetition of vocabulary in body paragraphs."
    ],
    "recommendations": [
      "Use broader academic collocations to elevate Lexical Resource."
    ]
  },
  "improvedTask1": "A refined, Band 9 model answer for Task 1...",
  "improvedTask2": "A refined, Band 9 model answer for Task 2..."
}
`;
}