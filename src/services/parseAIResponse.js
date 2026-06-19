export function parseAIResponse(content) {
  try {
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return {
      success: false,
      error:
        "Unable to parse AI response.",
    };
  }
}