---
name: Niel Arthur B. Rocacurva Portfolio
description: A focused portfolio for practical software, data, and systems work.
colors:
  primary-teal-light: "#0F766E"
  primary-teal-dark: "#5EEAD4"
  neutral-page-light: "#F8FAFC"
  neutral-surface-light: "#FFFFFF"
  neutral-page-dark: "#0F172A"
  neutral-surface-dark: "#172235"
  border-light: "#D8E1EB"
  border-dark: "#344256"
  text-heading-light: "#0F172A"
  text-body-light: "#475569"
  text-heading-dark: "#F8FAFC"
  text-body-dark: "#BAC6D5"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.6rem, 4.9vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.45rem)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.04em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
spacing:
  section: "clamp(3.75rem, 7vw, 6rem)"
  component-gap: "16px"
  control-height: "44px"
components:
  button-primary:
    backgroundColor: "var(--accent)"
    textColor: "var(--accent-ink)"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  project-card:
    backgroundColor: "var(--bg-raised)"
    textColor: "var(--text-main)"
    rounded: "{rounded.lg}"
    padding: "24px"
  skill-row:
    backgroundColor: "var(--bg-main)"
    textColor: "var(--text-main)"
    rounded: "{rounded.sm}"
    padding: "12px 2px"
---

# Design System: Practical Work, Clearly Built

## Overview

**Creative North Star: "Practical work, clearly built."**

This portfolio should read like a considered introduction to an early-career engineer: direct, calm, and grounded in documented projects. A subtle modular structure connects software, data, IoT, and systems work without turning the interface into a toy or an operations dashboard.

**Key Characteristics:**

- Slate and white surfaces with one clear teal action color
- Dark mode uses deep navy and raised slate surfaces
- Open layouts, thin dividers, and compact evidence groups
- Real project and experience details lead over decoration

## Colors

Teal identifies primary actions, focus, and a few selected details. Slate neutrals carry most of the interface in both themes. Muted blue, green, amber, and red distinguish a small number of project or skill categories; they remain accents rather than large color fields. Text and surface roles stay semantic so the theme toggle updates the whole page consistently.

## Typography

Poppins provides the geometric sans-serif voice for headings and body copy. Headings are compact and clearly stepped without dominating the page. Body text stays around a readable 1rem with generous line height. Monospace is reserved for short technical annotations, not general interface copy.

## Layout

Use a centered content width near 76rem and fluid section spacing. The hero pairs a clear introduction with a concise technical-focus list. Follow it with About, Skills, Projects, Experience, and Contact. Project evidence receives visual priority, while longer contribution and timeline details remain grouped and scannable. At narrow widths, columns collapse naturally and controls retain touch-sized targets.

## Elevation & Depth

Surfaces rely on subtle borders and tonal separation. Keep shadows soft and limited to raised controls or cards; do not add glows, glass effects, or hard offset shadows.

## Shapes

Use clean, slightly softened corners (6–12px). Most content sits directly on the page or a raised surface; avoid nested cards, pill-heavy layouts, and decorative studs.

## Components

- **Primary action:** teal fill, strong text contrast, at least 48px tall, and a visible keyboard focus outline.
- **Project card:** neutral surface, thin border, small category accent, and a clear summary/contribution/functionality/technology hierarchy.
- **Skill group:** restrained heading and open list rows instead of individual nested tiles.
- **Experience entry:** date and type beside the role, organization, location, detailed responsibilities, and relevant tags.
- **Navigation:** concise links, persistent theme control, accessible mobile menu, and working resume preview/download.

## Do's and Don'ts

- **The Evidence First Rule.** Let documented projects and responsibilities establish the portfolio's credibility.
- **The Restraint Rule.** Use accent color to guide attention, not as a page-wide decoration.
- **The Readable Detail Rule.** Keep important project and experience information available in clear, scannable groups.
- Do preserve theme persistence, visible focus, semantic controls, and reduced-motion support.
- Don't introduce unsupported project claims, metrics, technologies, screenshots, or links.
- Don't use circuit-board graphics, cyberpunk effects, generic SaaS gradients, or excessive card decoration.
