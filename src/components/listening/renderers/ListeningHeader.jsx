export default function ListeningHeader({
  title,
  section,
  totalSections,
}) {
  return (
    <div className="listening-header">
      <div>
        <h1>{title}</h1>

        <p>
          Section {section} of {totalSections}
        </p>
      </div>
    </div>
  );
}