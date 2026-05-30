import OpenAI from "openai";

const openai =
  new OpenAI({
    apiKey:
      import.meta.env
        .VITE_OPENAI_API_KEY,

    dangerouslyAllowBrowser:
      true
  });

export async function evaluateEssay(
  essay,
  prompt
) {
  try {
    const response =
      await openai.chat.completions.create(
        {
          model:
            "gpt-4.1-mini",

          messages: [
            {
              role:
                "system",

              content:
                "You are an IELTS examiner. Evaluate essays professionally and provide estimated IELTS band score, strengths, weaknesses, grammar feedback, vocabulary feedback, coherence feedback, and improvement tips."
            },

            {
              role:
                "user",

              content: `
IELTS Writing Prompt:
${prompt}

Student Essay:
${essay}

Please provide:
1. Estimated IELTS Band
2. Task Response Feedback
3. Coherence & Cohesion Feedback
4. Vocabulary Feedback
5. Grammar Feedback
6. Improvement Suggestions
`
            }
          ],

          temperature:
            0.7
        }
      );

    return response
      .choices[0]
      .message.content;
  } catch (error) {
    console.error(
      error
    );

    return "AI evaluation failed.";
  }
}