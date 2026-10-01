# Project screenshots

Place the JobUp screenshot in this folder as:

    public/images/jobup-screenshot.png

That exact path is what `components/projects/Projects.tsx` already points at, so
dropping the file in is all that is needed — no code change required.

Notes:

- The file renders responsively. `width`/`height` in the `JOBUP_SCREENSHOT` constant
  in `Projects.tsx` are the intrinsic pixel size; set them to your screenshot's real
  dimensions so the browser reserves the right box and avoids layout shift. The image is
  displayed with `width: 100%; height: auto`, so the aspect ratio is always preserved
  and nothing is cropped regardless of those numbers.
- Until the file exists, the card shows a neutral "Screenshot not yet added" panel
  instead of a broken image.
- Prefer `.png` or `.webp`. A `.webp` file will need its `src` updated to
  `/images/jobup-screenshot.webp`.
