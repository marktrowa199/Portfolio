import { ExternalLink, Github, ImageOff } from "lucide-react";

type Project = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  summary: string;
  color: "blue" | "yellow" | "red" | "green";
  context?: string;
  contribution?: string;
  features?: string[];
  technologies?: string[];
  demoUrl?: string;
  repositoryUrl?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "jobup",
    title: "JobUp",
    tagline: "AI-Powered Job Application Assistant",
    category: "AI · FULL-STACK WEB APP",
    summary:
      "A full-stack web application designed to help users discover job opportunities, review requirements, tailor applications, and track application progress.",
    color: "yellow",
    context:
      "Job hunting is repetitive: reading listings, matching requirements, rewriting the same application, and losing track of what was sent where. Most helpers stop at a saved list of links.",
    contribution:
      "Built the full stack, from the Python and FastAPI backend through the Next.js frontend, including the SQL schema that stores listings and application progress, and the OpenAI API integration used to tailor application text against a job's requirements.",
    features: [
      "Job discovery with listings that can be opened and reviewed in full.",
      "Requirement review so the important qualifications are surfaced before applying.",
      "Application tailoring that adapts a draft against a specific role's requirements.",
      "Progress tracking for every application submitted.",
      "REST API between the Next.js frontend and the FastAPI backend.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "SQL",
      "OpenAI API",
      "REST APIs",
      "Vercel",
      "Render",
    ],
    demoUrl: "https://job-up.vercel.app/",
    repositoryUrl: "https://github.com/marktrowa199/JobUp",
    featured: true,
  },
  {
    id: "agrosentinel",
    title: "AGROSENTINEL",
    tagline: "IoT + Computer Vision Capstone Project",
    category: "CAPSTONE · IOT & ROBOTICS",
    summary:
      "An IoT and computer-vision based agricultural system designed for spinach leaf-necrosis detection and automated fungicide spraying.",
    color: "blue",
    context:
      "Leaf necrosis spreads quickly in dense spinach beds, and once it appears, a farmer has to walk the rows by eye. Broadcast spraying treats the whole field whether or not it is affected, wasting chemical and raising exposure.",
    contribution:
      "Contributed to the build as a team member: assembled and integrated the Raspberry Pi 5 and ESP32 with the motor drivers, sensors, and sprayer; tested movement and spraying across test tracks; and supported training the leaf-necrosis detection model with image datasets.",
    features: [
      "Raspberry Pi 5 (4GB) as the central unit, coordinating an ESP32 microcontroller over the sensor and actuator network.",
      "NDVI used to read plant health from captured crop imagery before a decision is made.",
      "YOLOv5 computer vision used to localise necrotic leaf regions in the captured frames.",
      "Automated sprayer triggered to treat detected areas instead of the whole field.",
      "Movement and spraying behaviour verified across physical test tracks.",
    ],
    technologies: [
      "Raspberry Pi 5 4GB",
      "ESP32",
      "NDVI",
      "YOLOv5",
      "Computer Vision",
      "IoT",
      "Automated Sprayer",
    ],
  },
];

/**
 * No project screenshots exist in the repository, so this is an explicit, honest
 * placeholder rather than invented imagery. Swap it for a real capture when one exists.
 */
function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div className="project-block__media" role="img" aria-label={`Placeholder for a ${title} screenshot. No project image is available yet.`}>
      <ImageOff aria-hidden="true" className="h-6 w-6" />
      <p className="project-block__media-label">Project preview</p>
      <p className="project-block__media-note">Screenshot not yet added</p>
    </div>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  const hasLinks = Boolean(project.demoUrl || project.repositoryUrl);

  return (
    <article className={`project-block project-block--${project.color} brick-lift${project.featured ? " project-block--featured" : ""}`}>
      <div className="project-block__header">
        <span className="font-mono text-xs font-semibold tracking-[.08em]">{project.category}</span>
      </div>
      <div className="project-block__body">
        <div className="project-block__overview">
          <h3 className={project.featured ? "text-3xl font-semibold leading-tight sm:text-4xl" : "text-2xl font-semibold leading-tight"}>
            {project.title}
          </h3>
          <p className="project-block__tagline">{project.tagline}</p>
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

        {project.featured && <ProjectPlaceholder title={project.title} />}

        {hasLinks && (
          <div className="project-block__actions">
            {project.demoUrl && (
              <a className="project-demo-link project-demo-link--primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View the ${project.title} demo (opens in a new tab)`}>
                View Demo <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
            {project.repositoryUrl && (
              <a className="project-demo-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`View the ${project.title} source code on GitHub (opens in a new tab)`}>
                <Github aria-hidden="true" className="h-4 w-4" /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-space scroll-mt-20 border-t border-[var(--border)]">
      <div className="section-wrap">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="eyebrow">03 · Projects</p>
          <h2 className="section-title mt-4">Projects, assembled from real work.</h2>
          <p className="section-intro mt-4">Two builds: one full-stack AI web app, one IoT and computer-vision capstone.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => <ProjectBlock key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
