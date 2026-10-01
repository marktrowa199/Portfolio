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
- **Layout**: Open project and experience content with light dividers; modular grouping supports scanning without turning every item into a card.
- **Theme support**: Persistent light and dark modes use shared CSS variables for colors, surfaces, text, and depth.
- **Portfolio focus**: The hero summarizes software, data, IoT, and systems work; the project section leads with AGROSENTINEL.
- **Interactions**: Responsive navigation, resume preview and download, theme toggle, and email/phone copy feedback.

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
│   │   └── Projects.tsx          # JobUp, AGROSENTINEL
│   ├── skills/
│   │   └── SkillsBento.tsx       # Grouped skills grounded in source projects
│   └── timeline/
│       └── Timeline.tsx          # Concentrix Practicum, AGROSENTINEL Capstone, OLFU Degree
├── public/
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

## Contact Form Email Setup

The contact form sends messages from the Next.js server through Gmail SMTP. For local development, copy `.env.example` to `.env.local` and set:

```dotenv
CONTACT_GMAIL_USER=arthurnielzz@gmail.com
CONTACT_GMAIL_APP_PASSWORD=your-google-app-password
```

Create a Google app password for the Gmail account after enabling 2-Step Verification. Add the same variables to the server-side environment settings for your production deployment; do not prefix them with `NEXT_PUBLIC_` or commit `.env.local`. Restart the server after changing environment values.

To send through a different provider instead of Gmail, also set `CONTACT_SMTP_HOST` and `CONTACT_SMTP_PORT` (for example `smtp.example.com` and `587`). Leave them unset to use Gmail's SMTP settings.

The API validates and size-limits requests, uses a honeypot and a basic per-process rate limit, and sets the sender's email as `Reply-To`. The in-memory rate limit is best-effort for a single server process; deployments with multiple instances should use a shared rate-limit store.
