import { ExternalLink, Github } from "lucide-react";
import ProjectScreenshot from "./ProjectScreenshot";

type Project = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  summary: string;
  color: "blue" | "yellow" | "red" | "green";
  features?: string[];
  technologies?: string[];
  screenshot?: { src: string; alt: string; width: number; height: number };
  demoUrl?: string;
  repositoryUrl?: string;
};

/**
 * Intrinsic size of the JobUp capture. Update `width`/`height` to the real pixel
 * dimensions of your file if they differ; the aspect ratio is preserved either way.
 * Drop the file at the `src` path under `public/` — no other change is needed.
 */
const JOBUP_SCREENSHOT = {
  src: "/images/jobup-screenshot.png",
  alt: "JobUp application interface showing the job discovery dashboard",
  width: 1440,
  height: 900,
};

const projects: Project[] = [
  {
    id: "jobup",
    title: "JobUp",
    tagline: "AI-Powered Job Application Assistant",
    category: "AI · FULL-STACK WEB APP",
    summary:
      "A full-stack web application that helps users discover job opportunities, review requirements, tailor applications, and track application progress. Python and FastAPI behind a Next.js frontend, with OpenAI API calls used to tailor application text against a specific role's requirements.",
    color: "yellow",
    features: [
      "Discover and open job listings, with the key requirements surfaced up front.",
      "Tailor an application draft against the requirements of a specific role.",
      "Track every application and its progress in one place.",
      "REST API between the FastAPI backend and the Next.js frontend.",
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
    screenshot: JOBUP_SCREENSHOT,
    demoUrl: "https://job-up.vercel.app/",
    repositoryUrl: "https://github.com/marktrowa199/JobUp",
  },
  {
    id: "agrosentinel",
    title: "AGROSENTINEL",
    tagline: "IoT + Computer Vision Capstone Project",
    category: "CAPSTONE · IOT & ROBOTICS",
    summary:
      "An IoT and computer-vision based agricultural system for spinach leaf-necrosis detection and automated fungicide spraying. Leaf necrosis spreads quickly in dense beds, and broadcast spraying treats the whole field whether or not it is affected — so detection is targeted instead.",
    color: "blue",
    features: [
      "Raspberry Pi 5 (4GB) coordinating an ESP32 across sensors and actuators.",
      "NDVI reads plant health from captured crop imagery before a decision is made.",
      "YOLOv5 localises necrotic leaf regions within the captured frames.",
      "Automated sprayer treats detected areas rather than the whole field.",
      "Movement and spraying verified across physical test tracks.",
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

function ProjectBlock({ project }: { project: Project }) {
  const hasLinks = Boolean(project.demoUrl || project.repositoryUrl);

  return (
    <article className={`project-block project-block--${project.color} brick-lift`}>
      <div className="project-block__header">
        <span className="font-mono text-xs font-semibold tracking-[.08em]">{project.category}</span>
      </div>

      {project.screenshot && (
        <ProjectScreenshot
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          width={project.screenshot.width}
          height={project.screenshot.height}
        />
      )}

      <div className="project-block__body">
        <div className="project-block__overview">
          <h3 className="text-2xl font-semibold leading-tight">{project.title}</h3>
          <p className="project-block__tagline">{project.tagline}</p>
          <p className="mt-2.5 max-w-[62ch] text-[.93rem] leading-relaxed text-[var(--text-muted)]">{project.summary}</p>
        </div>

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
        <div className="section-head">
          <div>
            <p className="eyebrow">03 · Projects</p>
            <h2 className="section-title mt-3">Two builds, from real work.</h2>
          </div>
          <p className="section-intro">A full-stack AI web app, and an IoT and computer-vision capstone.</p>
        </div>
        <div className="grid items-start gap-5 lg:grid-cols-2">
          {projects.map((project) => <ProjectBlock key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
