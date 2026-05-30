import OpenAI from "openai";

const openai =
  new OpenAI({
    apiKey:
      import.meta.env
        .VITE_OPENAI_API_KEY,

    dangerouslyAllowBrowser:
      true
  });

export async function evaluateSpeaking(
  transcript,
  cueCard
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
                "You are a professional IELTS speaking examiner. Evaluate speaking responses and provide estimated IELTS band score, fluency feedback, grammar feedback, vocabulary feedback, coherence analysis, pronunciation suggestions, and improvement tips."
            },

            {
              role:
                "user",

              content: `
IELTS Cue Card:
${cueCard}

Student Transcript:
${transcript}

Please provide:
1. Estimated IELTS Band
2. Fluency Feedback
3. Grammar Feedback
4. Vocabulary Feedback
5. Coherence Feedback
6. Pronunciation Suggestions
7. Improvement Tips
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

    return "AI speaking evaluation failed.";
  }
}