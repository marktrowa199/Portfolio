"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

type ProjectScreenshotProps = {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the source file. Keeps the real aspect ratio. */
  width: number;
  height: number;
  label?: string;
};

/**
 * Responsive project screenshot.
 *
 * Width and height are the source's intrinsic pixels, and the stylesheet forces
 * `height: auto` at every breakpoint, so the browser preserves the original aspect
 * ratio and never crops. If the file is missing the component falls back to a neutral
 * panel rather than showing a broken image.
 */
export default function ProjectScreenshot({
  src,
  alt,
  width,
  height,
  label = "Project preview",
}: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="project-shot project-shot--empty" role="img" aria-label={`No screenshot available for ${alt}`}>
        <ImageOff aria-hidden="true" className="h-5 w-5" />
        <p className="project-shot__label">{label}</p>
        <p className="project-shot__note">Screenshot not yet added</p>
      </div>
    );
  }

  // A portrait capture rendered at full card width would make the card very tall, so it
  // gets a height cap instead. `object-fit: contain` keeps the real aspect ratio and
  // never crops; the image simply centres in the frame.
  const portrait = height > width;

  return (
    <div className={`project-shot${portrait ? " project-shot--portrait" : ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={portrait ? "(min-width: 640px) 24rem, 88vw" : "(min-width: 1024px) 44rem, (min-width: 640px) 60vw, 92vw"}
        className="project-shot__img"
        onError={() => setFailed(true)}
        priority={false}
      />
    </div>
  );
}
