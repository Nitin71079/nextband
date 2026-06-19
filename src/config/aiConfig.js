export const AI_CONFIG = {
  enabled:
    import.meta.env
      .VITE_OPENAI_ENABLED ===
    "true",

  provider:
    "openai",

  model:
    "gpt-4o",
};