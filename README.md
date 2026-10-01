# Niel Arthur B. Rocacurva — Developer Portfolio

A modern, high-craft personal developer portfolio engineered for **Niel Arthur B. Rocacurva**, a **BSIT Graduate** from Our Lady of Fatima University - Quezon City, applying for **Associate Software Engineer** and **Junior Software Engineer** roles.

Built with **React**, **Next.js 14 (App Router)**, **Tailwind CSS**, and **TypeScript**, with a restrained modular visual system centered on practical software work.

---

## 🚀 Quick Start (Running Locally)

1. Open your terminal in this directory (`C:\Users\Arthur\.gemini\antigravity\scratch\portfolio`):
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser at:
   ```
   http://localhost:3000
   ```

---

## Design System

- **Palette**: Slate surfaces, navy text, and a restrained teal accent, with the same hierarchy in dark mode.
- **Layout**: Open project and experience content with light dividers; modular grouping supports scanning without turning every item into a card. Section headings sit in a label/title + supporting-line row, and Experience and Education share one two-column band, to keep the page compact.
- **Theme support**: Persistent light and dark modes use shared CSS variables for colors, surfaces, text, and depth.
- **Portfolio focus**: The hero summarizes software, data, IoT, and systems work; the project section leads with JobUp.
- **Interactions**: Responsive navigation with a scroll-spy active indicator, anchor links, smooth scrolling, back-to-top, resume preview and download, theme toggle, email/phone copy feedback, paginated certificates (6 desktop / 4 tablet / 2 mobile per page), and a pure-CSS technology marquee that pauses on hover, on keyboard focus, and on demand.

---

## 📦 Modular Component Structure

Each major portfolio section lives in its own isolated subfolder inside `components/` for maximum maintainability:

```
portfolio/
├── app/
│   ├── layout.tsx                # Google Fonts, Theme script, SEO Metadata for Niel Arthur
│   ├── page.tsx                  # Modular page assembly importing from section directories
│   └── globals.css               # Tailwind directives, CSS variables, custom scrollbars
├── components/
│   ├── about/
│   │   └── About.tsx             # Concise BSIT background and credentials
│   ├── contact/
│   │   └── Contact.tsx           # arthurnielzz@gmail.com, phone, GitHub, LinkedIn
│   ├── footer/
│   │   └── Footer.tsx            # Name, copyright, and back-to-top link
│   ├── hero/
│   │   ├── Hero.tsx              # Role, project CTA, and contact actions
│   │   └── SignalCanvas.tsx      # Technical focus panel
│   ├── navbar/
│   │   ├── Navbar.tsx            # Desktop/mobile navigation and resume preview
│   │   └── ThemeToggle.tsx       # Sun/Moon theme switcher persisted in localStorage
│   ├── projects/
│   │   ├── Projects.tsx          # JobUp, AGROSENTINEL
│   │   └── ProjectScreenshot.tsx # Responsive project image, with a placeholder fallback
│   ├── skills/
│   │   └── TechnologyCarousel.tsx # Infinite CSS marquee of the tech stack
│   └── timeline/
│       └── Timeline.tsx          # Concentrix Practicum, AGROSENTINEL Capstone, OLFU Degree
├── public/
│   ├── screenshots/               # JobUp capture (see its README)
│   ├── resume.pdf
│   └── resume-placeholder.txt
├── tailwind.config.ts            # Tailwind theme and font variables
├── tsconfig.json                 # Path aliases (@/*)
└── package.json                  # Next 14, React 18, Tailwind CSS, Lucide-React
```

---

## 🌐 Verified Profile Links

- **GitHub**: [github.com/marktrowa199](https://github.com/marktrowa199)
- **LinkedIn**: [linkedin.com/in/niel-arthur-rocacurva-874876307](https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/)
- **Email**: `arthurnielzz@gmail.com`
- **Phone**: `(+63) 946-417-9851`
- **Work Mode**: Open to Remote | On-site | Hybrid

---

## Contact Form Setup (Web3Forms)

The contact form posts to `https://api.web3forms.com/submit` through the server route at `app/api/contact/route.ts`. Get a free access key from [web3forms.com](https://web3forms.com) after verifying the address that should receive messages.

For local development, copy `.env.example` to `.env.local` and set:

```dotenv
VITE_WEB3FORMS_ACCESS_KEY=your_actual_web3forms_access_key
```

Restart the server after changing environment values.

**On the `VITE_` prefix:** this is a Next.js project, not Vite, so the prefix carries no meaning here — it is kept only so the variable name already in your `.env` keeps working. `WEB3FORMS_ACCESS_KEY` (unprefixed) is also accepted.

**Why the key is read on the server:** Web3Forms keys are designed to be visible in the browser, and the usual `VITE_*` / `NEXT_PUBLIC_*` pattern inlines the value into the shipped bundle. Reading it in the route handler keeps it out of the client JavaScript entirely. The trade-off is that the form needs a running server, so it will not work on a purely static host.

**Deploying to Vercel:** add `VITE_WEB3FORMS_ACCESS_KEY` under **Project → Settings → Environment Variables** and redeploy. Setting it only in `.env.local` will *not* reach the deployment.

The API validates and size-limits requests, enforces same-origin, uses a honeypot and a basic per-process rate limit, prefixes the outgoing subject with `Portfolio Contact — `, sets the visitor's name as `from_name`, and sets the visitor's address as `replyto`. Delivery failures are read from the response body rather than the status code: an invalid key returns `403` with an empty body, while other rejections return `200` with `success: false`. The in-memory rate limit is best-effort for a single server process; deployments with multiple instances should use a shared rate-limit store.

Field names were verified against [Web3Forms' advanced options documentation](https://docs.web3forms.com/getting-started/examples/advanced-all-options).
