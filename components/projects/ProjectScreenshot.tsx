"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff, ZoomIn } from "lucide-react";
import { useImageLightbox, type LightboxImage } from "@/components/ui/ImageLightbox";

type ProjectScreenshotProps = {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the source file. Keeps the real aspect ratio. */
  width: number;
  height: number;
  label?: string;
  /** Every image in the same project, so the viewer can page between them. */
  gallery?: LightboxImage[];
  /** This image's position inside `gallery`. */
  galleryIndex?: number;
};

/**
 * Responsive, clickable project screenshot.
 *
 * Width and height are the source's intrinsic pixels, and the stylesheet forces
 * `height: auto` at every breakpoint, so the browser preserves the original aspect
 * ratio and never crops. If the file is missing the component falls back to a neutral
 * panel rather than showing a broken image. Otherwise the whole frame is one button that
 * opens the shared lightbox, so every project image behaves identically.
 */
export default function ProjectScreenshot({
  src,
  alt,
  width,
  height,
  label = "Project preview",
  gallery,
  galleryIndex = 0,
}: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false);
  const { openImage } = useImageLightbox();

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
  const image: LightboxImage = { src, alt, width, height };

  return (
    <div className={`project-shot${portrait ? " project-shot--portrait" : ""}`}>
      <button
        type="button"
        className="project-shot__trigger"
        onClick={() => openImage(gallery && gallery.length > 0 ? gallery : [image], galleryIndex)}
        aria-label={`Open a larger view of ${alt}`}
      >
        {/* The button already names the image, so the inner img stays decorative and the
            description is not announced twice. */}
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          sizes={portrait ? "(min-width: 768px) 15rem, (min-width: 640px) 14rem, 88vw" : "(min-width: 1024px) 44rem, (min-width: 640px) 60vw, 92vw"}
          className="project-shot__img"
          onError={() => setFailed(true)}
          priority={false}
        />
        <span className="project-shot__zoom" aria-hidden="true">
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}