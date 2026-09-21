import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // DARK MODE PALETTE (UNTOUCHED #0A192F THEME)
        navy: {
          950: "#050c18",
          900: "#0A192F", // Main portfolio color
          800: "#112240", // Light Navy / Surface
          700: "#1d3257", // Component border / highlight
          600: "#233554", // Dark Slate
        },
        cyan: {
          DEFAULT: "#64FFDA", // Electric Cyan / Mint
          dim: "rgba(100, 255, 218, 0.12)",
          glow: "rgba(100, 255, 218, 0.25)",
        },
        signal: {
          blue: "#57CBFF", // Cobalt / Sky
          emerald: "#10B981", // Online telemetry
          amber: "#F59E0B",
        },
        slate: {
          lightest: "#CCD6F6", // Primary Heading Text
          light: "#A8B2D1", // Secondary Text
          muted: "#8892B0", // Body Text
        },

        // DEDICATED LIGHT MODE DESIGN SYSTEM
        light: {
          bg: "#F6F7F9",        // Soft warm-gray / off-white canvas
          card: "#FFFFFF",      // Crisp elevated white card surface
          hover: "#FAFBFC",     // Micro-interaction card hover
          inset: "#EEF1F6",     // Inset code snippets, tags, and pills
          border: "#E2E6EC",    // Subtle low-contrast hairline border
          "border-subtle": "#EDF0F5",
          "border-hover": "#0F766E",
          text: "#1E2530",      // Deep charcoal primary text
          heading: "#111620",   // Rich dark charcoal headings
          muted: "#525E72",     // Warm muted slate body text
          dim: "#7B879C",       // Secondary metadata / tags
          teal: "#0F766E",      // High contrast teal accent (WCAG AA)
          "teal-light": "#E6F4F2", // Soft teal badge tint
          "teal-border": "#B2DFDB", // Soft teal badge border
          blue: "#0284C7",      // Secondary signal blue
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "light-soft": "0 2px 14px -2px rgba(17, 24, 39, 0.04), 0 1px 3px 0 rgba(17, 24, 39, 0.02)",
        "light-hover": "0 12px 28px -6px rgba(17, 24, 39, 0.07), 0 4px 10px -2px rgba(17, 24, 39, 0.03)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "terminal-blink": "blink 1s step-start infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
    plugins: [
      plugin(({ addVariant }) => {
        addVariant("light", ".light &");
      }),
    ],
};

export default config;
