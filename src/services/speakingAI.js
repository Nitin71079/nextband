export async function evaluateSpeech(
  transcript
) {
  const response =
    await fetch(
      "/api/evaluate-speaking",
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            {
              transcript,
            }
          ),
      }
    );

  return await response.json();
}