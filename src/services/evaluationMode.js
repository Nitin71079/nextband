import {
  AI_CONFIG,
} from "../config/aiConfig";

export function useGPTEvaluation() {
  return (
    AI_CONFIG.enabled
  );
}