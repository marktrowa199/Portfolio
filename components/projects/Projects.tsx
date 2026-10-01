"use client";

import { ExternalLink, Github } from "lucide-react";
import { ImageLightboxProvider, type LightboxImage } from "@/components/ui/ImageLightbox";
import ProjectScreenshot from "./ProjectScreenshot";

type ProjectImage = LightboxImage;

type Project = {
  id: string;
  title: string;
  tagline: string;
  category: string;
  summary: string;
  color: "blue" | "yellow" | "red" | "green";
  features?: string[];
  technologies?: string[];
  screenshot?: ProjectImage;
  /** Extra project photos shown as a grid inside the card rather than as their own project. */
  gallery?: ProjectImage[];
  galleryLabel?: string;
  demoUrl?: string;
  repositoryUrl?: string;
};

/**
 * The JobUp capture lives at `public/screenshots/screenshotJobUp.png` — the file must
 * be under `public/` to be served at all.
 *
 * `width`/`height` are the real intrinsic pixels (862 x 933). They let the browser
 * reserve the correct box before the image loads, which avoids layout shift; the
 * stylesheet then constrains the rendered size without ever cropping or distorting.
 */
const JOBUP_SCREENSHOT = {
  src: "/screenshots/screenshotJobUp.png",
  alt: "JobUp application interface showing the job discovery dashboard",
  width: 862,
  height: 933,
};

/**
 * Capstone photographs for AGROSENTINEL. Both are 4:3 landscape captures (2400 x 1800 and
 * 2048 x 1536) and are shown side by side inside the existing capstone card — they are
 * evidence for that project, not separate projects.
 */
const AGROSENTINEL_PHOTOS: ProjectImage[] = [
  {
    src: "/screenshots/agrosentinel.jpg",
    alt: "AGROSENTINEL capstone project photograph",
    width: 2400,
    height: 1800,
  },
  {
    src: "/screenshots/capstone.jpg",
    alt: "AGROSENTINEL capstone project photograph, second of two",
    width: 2048,
    height: 1536,
  },
];

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
    gallery: AGROSENTINEL_PHOTOS,
    galleryLabel: "From the build",
  },
];

function ProjectGallery({ label, images }: { label: string; images: ProjectImage[] }) {
  return (
    <div className="project-gallery">
      <h4 className="project-gallery__label">{label}</h4>
      <div className="project-gallery__grid">
        {images.map((image, index) => (
          <figure className="project-gallery__item" key={image.src}>
            <ProjectScreenshot {...image} gallery={images} galleryIndex={index} />
          </figure>
        ))}
      </div>
    </div>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  const hasLinks = Boolean(project.demoUrl || project.repositoryUrl);
  // Every image in this card shares one viewer set, so arrow keys move within the project
  // instead of jumping to a different one.
  const gallery = project.gallery ?? (project.screenshot ? [project.screenshot] : []);

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
          gallery={gallery}
        />
      )}

      <div className="project-block__body">
        <div className="project-block__overview">
          <h3 className="text-2xl font-semibold leading-tight">{project.title}</h3>
          <p className="project-block__tagline">{project.tagline}</p>
          <p className="mt-2.5 max-w-[62ch] text-[.93rem] leading-relaxed text-[var(--text-muted)]">{project.summary}</p>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery label={project.galleryLabel ?? "Project photos"} images={project.gallery} />
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
    <ImageLightboxProvider>
      <section id="projects" data-scroll-reveal className="section-space scroll-mt-20 border-t border-[var(--border)]">
        <div className="section-wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">03 · Projects</p>
              <h2 className="section-title mt-3">Two builds, from real work.</h2>
            </div>
            <p className="section-intro">A full-stack AI web app, and an IoT and computer-vision capstone.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectBlock key={project.id} project={project} />)}
          </div>
        </div>
      </section>
    </ImageLightboxProvider>
  );
}