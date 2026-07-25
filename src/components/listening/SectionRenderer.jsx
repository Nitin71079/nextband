import FormRenderer from "./renderers/FormRenderer";
import MCQRenderer from "./renderers/MCQRenderer";
import MapRenderer from "./renderers/MapRenderer";
import MatchingRenderer from "./renderers/MatchingRenderer";
import NotesRenderer from "./renderers/NotesRenderer";
import TableRenderer from "./renderers/TableRenderer";
import FlowChartRenderer from "./renderers/FlowChartRenderer";
import DiagramRenderer from "./renderers/DiagramRenderer";

export default function SectionRenderer({
  section,
  answers,
  updateAnswer,
  toggleFlag,
  flagged,
}) {
  return (
    <div className="section-renderer">
      <h2 className="section-title">{section.title}</h2>

      {/* Section 1 */}
      {section.type === "form" && (
        <FormRenderer
          section={section}
          answers={answers}
          updateAnswer={updateAnswer}
          toggleFlag={toggleFlag}
          flagged={flagged}
        />
      )}

      {/* Sections 2-4 */}
      {section.groups?.map((group) => {
        switch (group.type) {
          case "mcq":
            return (
              <MCQRenderer
                key={group.id}
                group={group}
                answers={answers}
                updateAnswer={updateAnswer}
                toggleFlag={toggleFlag}
                flagged={flagged}
              />
            );

          case "map":
            return (
              <MapRenderer
                key={group.id}
                group={group}
                answers={answers}
                updateAnswer={updateAnswer}
                toggleFlag={toggleFlag}
                flagged={flagged}
              />
            );

          case "matching":
            return (
              <MatchingRenderer
                key={group.id}
                group={group}
                answers={answers}
                updateAnswer={updateAnswer}
                toggleFlag={toggleFlag}
                flagged={flagged}
              />
            );

          case "notes":
            return (
              <NotesRenderer
                key={group.id}
                group={group}
                answers={answers}
                updateAnswer={updateAnswer}
                toggleFlag={toggleFlag}
                flagged={flagged}
              />
            );

          case "table":
            return (
              <TableRenderer
                key={group.id}
                group={group}
                answers={answers}
                updateAnswer={updateAnswer}
                toggleFlag={toggleFlag}
                flagged={flagged}
              />
            );

          case "flowchart":
            return (
              <FlowChartRenderer
                key={group.id}
                group={group}
                answers={answers}
                updateAnswer={updateAnswer}
                toggleFlag={toggleFlag}
                flagged={flagged}
              />
            );

          case "diagram":
            return (
              <DiagramRenderer
                key={group.id}
                group={group}
                answers={answers}
                updateAnswer={updateAnswer}
                toggleFlag={toggleFlag}
                flagged={flagged}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}