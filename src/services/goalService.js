export function saveGoals(
  goals
) {
  localStorage.setItem(
    "nextbandGoals",
    JSON.stringify(goals)
  );
}

export function getGoals() {
  return JSON.parse(
    localStorage.getItem(
      "nextbandGoals"
    ) || "{}"
  );
}