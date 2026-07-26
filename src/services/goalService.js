export function saveGoals(
  goals
) {
  localStorage.setItem(
    "knarrowGoals",
    JSON.stringify(goals)
  );
}

export function getGoals() {
  return JSON.parse(
    localStorage.getItem(
      "knarrowGoals"
    ) || "{}"
  );
}