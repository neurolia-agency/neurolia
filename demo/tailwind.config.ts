import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-card": "var(--surface-card)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        "primary-glow": "var(--primary-glow)",
        "text-primary": "var(--text)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [],
};

export default config;
