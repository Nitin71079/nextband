export async function callAI(
  prompt
) {
  try {
    return {
      success: false,
      error:
        "AI provider not connected.",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.message,
    };
  }
}