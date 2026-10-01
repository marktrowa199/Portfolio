# Project screenshots

The JobUp screenshot lives here:

    public/screenshots/screenshotJobUp.png

## Why it must be under `public/`

Next.js only serves files from `public/` at a URL. An image placed anywhere else —
for example `components/screenshots/` — is source-tree content the browser can never
request, so it silently 404s and the card falls back to the placeholder.

## If you replace the file

Update the `JOBUP_SCREENSHOT` constant in `components/projects/Projects.tsx`:

- `src` — the public path, including any filename change
- `width` / `height` — the new file's real intrinsic pixel size

The dimensions matter: they let the browser reserve the correct box before the image
loads, which avoids layout shift. The current file is **862 x 933** (portrait).

Portrait images get a height cap (`.project-shot--portrait`) so a tall capture cannot
make the card enormous. `object-fit: contain` means it is never cropped or stretched.
Landscape images render at full card width. Orientation is detected automatically, so
nothing else needs changing.
