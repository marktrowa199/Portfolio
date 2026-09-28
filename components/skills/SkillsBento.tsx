type Skill = { name: string; tag?: string; note: string };
type SkillGroup = { title: string; color: string; subtitle: string; skills: Skill[] };

const groups: SkillGroup[] = [
  {
    title: "Software & data foundations", color: "blue", subtitle: "Programming, databases, and version control.",
    skills: [
      { name: "Python", tag: "CertNexus Certified", note: "Scripting, algorithmic logic, backend development, and AI data processing" },
      { name: "SQL", tag: "DataCamp Certified", note: "Relational querying, schema design, filtering, and database operations" },
      { name: "Git & GitHub", tag: "Certified", note: "Version control workflows, commit history, repository management, and branching" },
      { name: "OpenAI API integration", tag: "DataCamp", note: "Interfacing with LLM endpoints, prompt handling, and AI automation" },
      { name: "Data processing · Pandas", tag: "DataCamp", note: "Dataset inspection, cleaning, anomaly handling, and tabular reporting" },
    ],
  },
  {
    title: "Hardware, IoT & robotics", color: "green", subtitle: "Hands-on integration from the AGROSENTINEL capstone.",
    skills: [
      { name: "Raspberry Pi 5", note: "Central robotic computing and controller setup" },
      { name: "ESP32 microcontrollers", note: "Sensor and peripheral actuation management" },
      { name: "Motor drivers & actuators", note: "Movement control and automated spraying mechanisms" },
      { name: "Sensor integration", note: "NDVI and environmental telemetry data acquisition" },
    ],
  },
  {
    title: "IT operations & infrastructure", color: "yellow", subtitle: "Enterprise systems experience at Concentrix.",
    skills: [
      { name: "Windows OS imaging & deployment", note: "Reimaging, system preparation, and workstation provisioning" },
      { name: "Account & VPN configuration", note: "Secure user onboarding, credential setup, and VPN tunnels" },
      { name: "Hardware diagnostics & upgrades", note: "Desktop component troubleshooting and preventive maintenance" },
      { name: "IT asset lifecycle management", note: "Inventory tracking, equipment lifecycle, and setup/retrieval" },
      { name: "Ticket monitoring & resolution", note: "Enterprise ticketing workflow and issue documentation" },
    ],
  },
  {
    title: "Credentials & collaboration", color: "red", subtitle: "Verified credentials and cross-functional capabilities.",
    skills: [
      { name: "IT Specialist: Python · CertNexus", note: "Industry certification in core Python programming" },
      { name: "Security, compliance & identity · Microsoft", note: "Security fundamentals, compliance principles, and access control" },
      { name: "Python Data Associate · DataCamp", note: "Data manipulation, exploratory analysis, and data algorithms" },
      { name: "Teamwork & collaboration", note: "Cross-functional communication across development and IT support" },
      { name: "Technical communication", note: "Clear ticket documentation and technical problem escalation" },
    ],
  },
];

export default function SkillsBento() {
  return (
    <section id="skills" className="section-space scroll-mt-20">
      <div className="section-wrap">
        <div className="mb-9 max-w-3xl sm:mb-12">
          <h2 className="section-title">A toolkit shaped by what I’ve built.</h2>
          <p className="section-intro mt-4">Skills, credentials, and the practical context behind them.</p>
        </div>
        <div className="skill-wall">
          {groups.map((group) => (
            <article key={group.title} className={`skill-module skill-module--${group.color}`}>
              <div className="skill-module__header">
                <h3>{group.title}</h3>
              </div>
              <p className="skill-module__subtitle">{group.subtitle}</p>
              <ul className="skill-module__items">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className="skill-module__name">{skill.name}</span>
                    {skill.tag && <span className="skill-module__tag">{skill.tag}</span>}
                    <span className="skill-module__note">{skill.note}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
