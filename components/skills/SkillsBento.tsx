type Skill = { name: string; note: string };
type SkillGroup = { title: string; color: string; subtitle: string; skills: Skill[] };

const groups: SkillGroup[] = [
  {
    title: "Programming",
    color: "blue",
    subtitle: "Core languages I write and reason in.",
    skills: [
      { name: "Python", note: "Scripting, backend services, data processing, and API work" },
      { name: "SQL", note: "Relational querying, joins, schema design, and reporting" },
      { name: "JavaScript", note: "Client-side behaviour and the Next.js application layer" },
      { name: "HTML", note: "Semantic structure and accessible markup" },
      { name: "CSS", note: "Layout, responsive design, and component styling" },
    ],
  },
  {
    title: "Development",
    color: "yellow",
    subtitle: "Frameworks and tooling used to ship a working product.",
    skills: [
      { name: "FastAPI", note: "Python REST API services with typed request and response models" },
      { name: "Flask", note: "Lightweight Python web applications and prototypes" },
      { name: "Next.js", note: "React-based frontend and server-rendered application structure" },
      { name: "Tailwind CSS", note: "Utility-first styling and responsive component systems" },
    ],
  },
  {
    title: "Data / AI",
    color: "green",
    subtitle: "Working with data and language models.",
    skills: [
      { name: "Data Analytics", note: "Exploring datasets, cleaning values, and drawing out findings" },
      { name: "Machine Learning", note: "Model training and evaluation, including computer-vision detection" },
      { name: "SQL Analytics", note: "Aggregations and reporting queries used to answer real questions" },
      { name: "OpenAI API", note: "Prompting, embeddings, and wiring model calls into an application" },
    ],
  },
  {
    title: "Tools",
    color: "red",
    subtitle: "Everyday software for version control and data work.",
    skills: [
      { name: "Git", note: "Branching, committing, and keeping a readable project history" },
      { name: "GitHub", note: "Repositories, pull requests, and hosting deployed projects" },
      { name: "VS Code", note: "Primary editor, with extensions for Python, SQL, and debugging" },
      { name: "PostgreSQL", note: "Relational database hosting and querying" },
      { name: "MySQL", note: "Relational database design and administration" },
    ],
  },
  {
    title: "IT / Infrastructure",
    color: "blue",
    subtitle: "Systems and support work from the Concentrix internship.",
    skills: [
      { name: "Networking", note: "IP addressing, connectivity, and switching and routing concepts" },
      { name: "IT Operations", note: "Device deployment, account provisioning, and asset lifecycle records" },
      { name: "Hardware Troubleshooting", note: "Diagnosing desktop faults and replacing failed components" },
      { name: "VPN Configuration", note: "Setting up secure remote access for staff" },
    ],
  },
];

export default function SkillsBento() {
  return (
    <section id="skills" className="section-space scroll-mt-20">
      <div className="section-wrap">
        <div className="mb-9 max-w-3xl sm:mb-12">
          <p className="eyebrow">04 · Skills</p>
          <h2 className="section-title mt-4">A toolkit shaped by what I’ve built.</h2>
          <p className="section-intro mt-4">Grouped by what each one is actually used for.</p>
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
