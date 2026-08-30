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
          DEFAULT: "#0D0B14",
          warm: "#17131F",
        },
        sand: {
          DEFAULT: "#171320",
          dark: "#221C30",
        },
        // Fixed dark color, independent of the ink/paper theme swap above —
        // for text placed on light accent chips (status badges) that stay
        // light-tinted regardless of theme.
        night: {
          DEFAULT: "#1C1A17",
        },
        clay: {
          50: "#F4EFFE",
          100: "#E5D9FD",
          300: "#B79BFA",
          500: "#8B5CF6",
          600: "#7C3FE0",
          700: "#5B21B6",
        },
        ochre: {
          100: "#FFE3C2",
          300: "#FFAF66",
          500: "#FF7A1A",
          700: "#C2540A",
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
        display: ["'Fraunces'", "ui-serif", "Georgia", "serif"],
        sans: ["'Work Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
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
      },
      animation: {
        "page-fade": "page-fade 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
