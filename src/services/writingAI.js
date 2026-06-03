export async function evaluateEssay(
  essay
) {
  const response =
    await fetch(
      "/api/evaluate-writing",
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
              essay,
            }
          ),
      }
    );

  return await response.json();
}