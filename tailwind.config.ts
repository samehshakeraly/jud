import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-tajawal)", "system-ui", "sans-serif"],
        quran: ["var(--font-amiri-quran)", "var(--font-amiri)", "serif"],
        display: ["var(--font-amiri)", "serif"],
      },
      colors: {
        cream: {
          50: "#FCFBF7",
          100: "#F8F5EC",
          200: "#EFE9D6",
        },
        olive: {
          50: "#F4F4EC",
          100: "#E4E5CF",
          200: "#C8CB9F",
          300: "#A4A86A",
          400: "#82864A",
          500: "#65683A",
          600: "#4F5230",
          700: "#3F4127",
          800: "#2C2E1C",
        },
        gold: {
          400: "#C8A95A",
          500: "#B58C3E",
          600: "#8B6A2A",
        },
        ink: {
          50: "#F5F5F4",
          100: "#E7E5E4",
          200: "#D6D3D1",
          400: "#78716C",
          600: "#44403C",
          800: "#1C1917",
          900: "#0F0E0D",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.06)",
        glow: "0 0 0 1px rgba(181, 140, 62, 0.25), 0 8px 24px rgba(181, 140, 62, 0.18)",
      },
      backgroundImage: {
        "arab-pattern":
          "radial-gradient(circle at 1px 1px, rgba(101, 104, 58, 0.08) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
