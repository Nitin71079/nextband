export async function evaluateEssay(
  essay
) {
  try {
    const response =
      await fetch(
        "/api/evaluate-writing",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              essay,
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

    return (
      data.feedback ||
      "No feedback received."
    );
  } catch (error) {
    console.error(
      error
    );

    return "AI evaluation failed.";
  }
}