const focusAreas = [
  { title: "Software", detail: "Python · APIs" },
  { title: "Data", detail: "SQL · PostgreSQL" },
  { title: "Connected systems", detail: "Raspberry Pi · ESP32" },
  { title: "IT operations", detail: "Windows · VPN" },
];

export default function SignalCanvas() {
  return (
    <aside className="focus-sheet" aria-label="Technical focus areas">
      <p className="focus-sheet__heading">Areas I work across</p>
      <ul className="focus-sheet__list">
        {focusAreas.map((area) => (
          <li key={area.title}>
            <span className="focus-sheet__marker" aria-hidden="true" />
            <h2>{area.title}</h2>
            <p>{area.detail}</p>
          </li>
        ))}
      </ul>
      <p className="focus-sheet__caption">Practical software, data, and systems work.</p>
    </aside>
  );
}
