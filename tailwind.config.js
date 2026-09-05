/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "3rem", xl: "4rem" },
    },
    extend: {
      colors: {
        // NKENTU's real identity is dark: near-black pages, off-white text.
        // Token names are kept as-is (ink = text, paper = page background)
        // so every component that already composes them stays correct —
        // only the two hex values flip which one reads as "light".
        ink: {
          DEFAULT: "#F5F2FA",
          soft: "#C9C2DA",
        },
        paper: {
          DEFAULT: "#180F20",
          warm: "#1F1428",
        },
        sand: {
          DEFAULT: "#1C1329",
          dark: "#291C3B",
        },
        // Fixed dark color, independent of the ink/paper theme swap above —
        // for text placed on light accent chips (status badges) that stay
        // light-tinted regardless of theme.
        night: {
          DEFAULT: "#1C1A17",
        },
        // Palette exactly as sampled from the official NKENTU brand board
        // (logo + colour swatches): purple #804AFB, orange #FD6702,
        // turquoise #0BE7C9, magenta #D70397, plus black/white.
        clay: {
          50: "#F9F6FF",
          100: "#ECE4FE",
          300: "#B392FD",
          500: "#804AFB",
          600: "#663BC9",
          700: "#46298A",
        },
        ochre: {
          100: "#FFE1CC",
          300: "#FEA467",
          500: "#FD6702",
          700: "#B14801",
        },
        turquoise: {
          100: "#CFFBF3",
          300: "#6DF1DF",
          500: "#0BE7C9",
          700: "#08A491",
        },
        magenta: {
          100: "#F9D2EB",
          300: "#E768C1",
          500: "#D70397",
          700: "#95026A",
        },
        moss: {
          100: "#DCE2CE",
          300: "#8FA06E",
          500: "#4B5D3A",
          700: "#374527",
        },
        stone: {
          200: "#E4DDCC",
          400: "#B7AD98",
          600: "#7A7263",
        },
      },
      fontFamily: {
        display: ["'Fredoka'", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["'Archivo'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 6.5rem)", { lineHeight: "0.94", letterSpacing: "0" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4.25rem)", { lineHeight: "0.98", letterSpacing: "0" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.02", letterSpacing: "0" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "page-fade": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "hero-zoom": {
          from: { transform: "scale(1.08)" },
          to: { transform: "scale(1)" },
        },
      },
      animation: {
        "page-fade": "page-fade 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "hero-zoom": "hero-zoom 14s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
