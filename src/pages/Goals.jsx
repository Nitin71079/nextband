import GoalSettings
from "../components/GoalSettings";

import {
  saveGoals,
} from "../services/goalService";

export default function Goals() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <GoalSettings
        onSave={(
          goals
        ) => {
          saveGoals(
            goals
          );

          alert(
            "Goals Saved!"
          );
        }}
      />
    </div>
  );
}