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
        ink: {
          DEFAULT: "#1C1A17",
          soft: "#3A362F",
        },
        paper: {
          DEFAULT: "#FAF6EF",
          warm: "#F3ECDD",
        },
        sand: {
          DEFAULT: "#EDE3D0",
          dark: "#DDCEAE",
        },
        clay: {
          50: "#FBEDE6",
          100: "#F3D2C1",
          300: "#DE8F63",
          500: "#C1502E",
          600: "#A4401F",
          700: "#7E3018",
        },
        ochre: {
          100: "#F3E1B5",
          300: "#E4BE6C",
          500: "#D9A441",
          700: "#A87724",
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
    },
  },
  plugins: [],
};
