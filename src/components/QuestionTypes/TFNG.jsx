const OPTIONS = [
  { label: "True",      key: "True",      cls: "true-btn" },
  { label: "False",     key: "False",     cls: "false-btn" },
  { label: "Not Given", key: "Not Given", cls: "ng-btn" },
];

export default function TFNG({ question, value, onChange }) {
  return (
    <div className="ielts-tfng-group">
      {OPTIONS.map(({ label, key, cls }) => (
        <button
          key={key}
          type="button"
          className={`ielts-tfng-btn ${cls}${value === key ? " selected" : ""}`}
          onClick={() => onChange(question.id, key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
