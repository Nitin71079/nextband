export function recommendExpert(
  weakestSkill
) {
  if (
    weakestSkill ===
    "Writing"
  ) {
    return 1;
  }

  if (
    weakestSkill ===
    "Speaking"
  ) {
    return 2;
  }

  return 1;
}