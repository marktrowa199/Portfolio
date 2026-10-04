"use client";

import Image from "next/image";
import { useNearViewport } from "./useNearViewport";
import { LIGHTBOX_SIZES, type LightboxImage } from "./ImageLightbox";

type ImagePreloadProps = {
  images: LightboxImage[];
  /**
   * Rendered above this, out of the way, and each image points at the thumbnail so the
   * browser is already fetching it when the section scrolls into view.
   */
  className?: string;
};

/**
 * Warms the browser cache for the images the shared viewer will request.
 *
 * The viewer asks for the full-size variant, which is a different file from the small
 * thumbnail the page actually shows. Without this, the first click on any image starts a
 * multi-hundred-kilobyte download and the visitor watches a spinner. Preloading the exact
 * same URL the viewer will use — same `src`, same `sizes` — moves that download into the
 * background so the click is a cache hit and paints on the first frame.
 *
 * Work starts once the element comes near the viewport, not at first paint, so it never
 * competes with the images higher up the page for bandwidth.
 */
export default function ImagePreload({ images, className }: ImagePreloadProps) {
  const [ref, isNear] = useNearViewport<HTMLDivElement>();

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {isNear &&
        images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            // Must stay identical to the viewer's own `sizes`, or the browser requests a
            // different optimizer URL and the preloaded bytes go unused.
            sizes={LIGHTBOX_SIZES}
            priority
            className="image-preload__img"
          />
        ))}
    </div>
  );
}