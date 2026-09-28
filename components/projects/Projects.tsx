type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  color: "blue" | "yellow" | "red" | "green";
  context?: string;
  contribution?: string;
  features?: string[];
  technologies?: string[];
  demoUrl?: string;
  sourceNote?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "agrosentinel",
    title: "AGROSENTINEL: IoT & NDVI Crop Disease Robot",
    category: "CAPSTONE · ROBOTICS",
    summary: "Autonomous agricultural robot with AI-based disease detection and automated spraying. The capstone addresses early crop disease detection and localized treatment.",
    color: "blue",
    context: "Agricultural crop diseases can spread without early localized detection, while manual broadcast spraying uses chemical treatments broadly and increases human exposure.",
    contribution: "Assisted in developing the agricultural robot; assembled and integrated the Raspberry Pi 5, ESP32, motor drivers, sensors, and spraying system; tested movement and spraying; and supported plant disease model training with image datasets.",
    features: [
      "Raspberry Pi 5 central unit and ESP32 microcontroller integration.",
      "Motor actuators, crop image capture, plant health evaluation, and localized spraying concept.",
      "Movement and spraying functionality tested across test tracks.",
    ],
    technologies: ["Python", "Raspberry Pi 5", "ESP32", "Motor Drivers", "Sensors", "AI Image Training", "IoT"],
    featured: true,
  },
  {
    id: "jobup",
    title: "JobUp",
    demoUrl: "https://job-up.vercel.app/",
    category: "AI · JOB SEARCH",
    summary: "AI-powered job application assistant / job search platform.",
    color: "yellow",
    sourceNote: "Further project details and a repository link aren’t available in the current source.",
  },

];

function ProjectBlock({ project }: { project: Project }) {
  return (
    <article className={`project-block project-block--${project.color} brick-lift ${project.featured ? "project-block--featured" : ""}`}>
      <div className="project-block__header">
        <span className="font-mono text-xs font-semibold tracking-[.08em]">{project.category}</span>
      </div>
      <div className="project-block__body">
        <div className="project-block__overview">
          <h3 className={project.featured ? "text-3xl font-semibold leading-tight sm:text-4xl" : "text-2xl font-semibold leading-tight"}>{project.title}</h3>
          <p className="mt-3 max-w-[62ch] leading-relaxed text-[var(--text-muted)]">{project.summary}</p>
        </div>

        {project.context && (
          <div className="project-fact project-fact--context">
            <h4>Problem &amp; context</h4>
            <p>{project.context}</p>
          </div>
        )}

        {project.contribution && (
          <div className="project-fact project-fact--contribution">
            <h4>My contribution</h4>
            <p>{project.contribution}</p>
          </div>
        )}

        {project.features && (
          <div className="project-fact project-fact--features">
            <h4>Key functionality</h4>
            <ul>
              {project.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        )}

        {project.technologies && (
          <div className="project-fact project-fact--technologies">
            <h4>Technologies</h4>
            <ul className="project-tech-list">
              {project.technologies.map((technology) => <li className="project-technology" key={technology}>{technology}</li>)}
            </ul>
          </div>
        )}

        {project.sourceNote && <p className="project-block__link-placeholder">{project.sourceNote}</p>}
        {project.demoUrl && (
          <div className="project-block__actions">
            <a className="project-demo-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} demo (opens in a new tab)`}>
              View Demo
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-space scroll-mt-20">
      <div className="section-wrap">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <h2 className="section-title">Projects, assembled from real work.</h2>
          <p className="section-intro mt-4">Robotics, data, and tools for practical problems.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => <ProjectBlock key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
