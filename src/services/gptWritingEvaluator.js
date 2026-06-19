import {
  postJSON,
} from "./apiClient";

export async function evaluateWritingGPT(
  essay
) {
  return await postJSON(
    "/api/evaluate-writing",
    {
      essay,
    }
  );
}