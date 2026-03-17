import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e0785a",
          hover: "#c9654a",
          light: "#fce8e0",
        },
        accent: {
          DEFAULT: "#52b788",
          light: "#d8f3dc",
        },
        surface: {
          DEFAULT: "#fef9f4",
          elevated: "#fffefb",
        },
        text: {
          primary: "#2d2926",
          secondary: "#5c5652",
          muted: "#8a8580",
        },
        border: {
          DEFAULT: "#ebe5de",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "system-ui", "sans-serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.25" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.5rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.5" }],
        "3xl": ["2rem", { lineHeight: "1.25" }],
        "4xl": ["2rem", { lineHeight: "1.25" }],
      },
      spacing: {
        4.5: "1.125rem",
        18: "4.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(45, 41, 38, 0.06)",
        "soft-md": "0 4px 12px rgba(45, 41, 38, 0.08)",
        "soft-lg": "0 8px 24px rgba(45, 41, 38, 0.1)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};
export default config;
