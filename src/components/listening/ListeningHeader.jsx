import "../../styles/listening/ListeningHeader.css";

export default function ListeningHeader({ title, section, totalSections }) {
  return (
    <header className="listening-header">
      <div className="listening-header-left">
        <h1>{title}</h1>
        <span className="section-pill">
          Section {section} of {totalSections}
        </span>
      </div>
      <div className="listening-header-right">
        <div className="logo">KNARROW</div>
      </div>
    </header>
  );
}
