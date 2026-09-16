# Niel Arthur B. Rocacurva — Developer Portfolio ("Systems & Signals")

A modern, high-craft personal developer portfolio engineered for **Niel Arthur B. Rocacurva**, a **BSIT Graduate** from Our Lady of Fatima University - Quezon City, applying for **Associate Software Engineer** and **Junior Software Engineer** roles.

Built with **React**, **Next.js 14 (App Router)**, **Tailwind CSS**, and **TypeScript**, styled around an authentic `#0A192F` deep navy command-deck aesthetic.

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

## 🎨 Design System & Visual Motif: "Systems & Signals"

- **Main Theme**: Deep Navy (`#0A192F`), Elevated Surface Slate (`#112240`), Card Border (`#233554`)
- **Accent Signals**: Electric Cyan (`#64FFDA` / `#35D9DB`) and Sky Blue (`#57CBFF`)
- **Light Mode Support**: Seamless toggle in the navigation bar switching to a `#F4F7FB` slate-white layout with high-contrast `#0A192F` dark navy text and accessible teal accents.
- **Micro-Interactions**:
  - **Interactive Signal Canvas**: Floating 60fps data node network in the hero section that reacts to mouse movement.
  - **Terminal-Framed Project Showcases**: Styled as engineering command windows (`AGROSENTINEL: IoT & NDVI Crop Disease Robot`, Python & SQL Analytics Pipeline, IT Operations Diagnostics).
  - **Competency Bento Grid**: Categorized skills matrix with zero fake percentage bars.
  - **One-Click Email & Phone Copy**: Instant clipboard copy buttons with visual badge feedback.

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
│   │   └── About.tsx             # BSIT narrative + niel_arthur_manifest.json specs sheet
│   ├── contact/
│   │   └── Contact.tsx           # arthurnielzz@gmail.com, phone, GitHub, LinkedIn
│   ├── footer/
│   │   └── Footer.tsx            # Telemetry clock, operational status, and credits
│   ├── hero/
│   │   ├── Hero.tsx              # Career objective, recruiter scan strip, action cluster
│   │   └── SignalCanvas.tsx      # 60fps interactive signal node visualizer
│   ├── navbar/
│   │   ├── Navbar.tsx            # Header telemetry, desktop & mobile drawer menu
│   │   └── ThemeToggle.tsx       # Sun/Moon theme switcher persisted in localStorage
│   ├── projects/
│   │   └── Projects.tsx          # AGROSENTINEL, SQL & Python Analytics, IT Ops Suite
│   ├── skills/
│   │   └── SkillsBento.tsx       # Python, SQL, Git, Hardware (RPi5/ESP32), Concentrix IT Ops
│   └── timeline/
│       └── Timeline.tsx          # Concentrix Practicum, AGROSENTINEL Capstone, OLFU Degree
├── public/
│   └── resume-placeholder.txt
├── tailwind.config.ts            # Custom #0A192F color tokens and font variables
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
