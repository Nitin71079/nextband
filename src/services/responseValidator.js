export function validateWritingResponse(
  data
) {
  return (
    data &&
    typeof data.overallBand ===
      "number"
  );
}

export function validateSpeakingResponse(
  data
) {
  return (
    data &&
    typeof data.overallBand ===
      "number"
  );
}