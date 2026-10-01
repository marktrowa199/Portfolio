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

The contact form submits directly from the browser to `https://api.web3forms.com/submit`, matching [Web3Forms' official Next.js pattern](https://docs.web3forms.com/how-to-guides/static-site-generators/next.js). Get a free access key from [web3forms.com](https://web3forms.com) after verifying the address that should receive messages.

For local development, copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_web3forms_access_key
```

Restart the dev server after changing it, and **rebuild** before deploying — the value is inlined into the client bundle at build time, so a change requires a new build.

**Why there is no API route.** Web3Forms only accepts browser-originated requests. Per their [troubleshooting docs](https://docs.web3forms.com/getting-started/troubleshooting), calling the API server-side or proxying it "in another API or server side code" returns `403 This method is not allowed`; server-side use requires a paid plan *and* safelisting your server IP. A proxy therefore cannot work on the free tier.

**The key is visible in page source.** That is by design and documented as safe — Web3Forms states the key "is not a secret API Key… it works as an alias to your email address." It is protected by being rate-limited and useless for reading your mail. Spam is handled by the honeypot field in the form plus Web3Forms' own filtering; their Pro plan adds domain restriction if you ever want tighter control.

**Deploying to Vercel:** add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` under **Project → Settings → Environment Variables**, then redeploy. Setting it only in `.env.local` will *not* reach the deployment.

**Submitted fields:** `access_key`, `name`, `email`, `subject`, `message`, `from_name`, `replyto`, `botcheck`. The subject is prefixed with `Portfolio Contact — `, `from_name` is the visitor's name so the inbox shows who wrote, and `replyto` addresses the visitor. Delivery failures are read from the response body as well as the status code, because a rejected key returns `403` with an empty body while other rejections return `200` with `success: false`.
