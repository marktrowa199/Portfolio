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
- **Phone**: `(+63) 946-417-9851` · `(+63) 993-706-1214`
- **Work Mode**: Open to Remote | On-site | Hybrid

---

## Contact

The contact section has no form. Visitors reach you through the channels listed on the page, each with a `mailto:` / `tel:` link and a copy-to-clipboard button. Update the `email` and `phones` arrays at the top of `components/contact/Contact.tsx` — they drive the rendered list.

No environment variables are required for the contact section.
