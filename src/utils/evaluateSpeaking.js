export async function evaluateSpeaking(
  transcript,
  cueCard
) {
  try {
    const response =
      await fetch(
        "/api/evaluate-speaking",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              transcript: `
IELTS Cue Card:
${cueCard}

Student Transcript:
${transcript}
`,
            }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "Evaluation failed"
      );
    }

    return `
Overall Band: ${data.overallBand}

Fluency & Coherence: ${data.fluency}
Lexical Resource: ${data.lexicalResource}
Grammar: ${data.grammar}
Pronunciation: ${data.pronunciation}
`;
  } catch (error) {
    console.error(
      error
    );

    return "AI speaking evaluation failed.";
  }
}