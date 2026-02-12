/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: ["0.625rem", { lineHeight: "0.875rem" }], // 10 / 14
      base: ["0.875rem", { lineHeight: "1.25rem" }], // 14 / 20
      lg: ["1rem", { lineHeight: "1.5rem" }], // 16 / 24
      xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20 / 28
      "2xl": ["1.563rem", { lineHeight: "2rem" }], // 25 / 32
      "3xl": ["1.953rem", { lineHeight: "2.5rem" }], // 31 / 40
      "4xl": ["2.441rem", { lineHeight: "3rem" }], // 39 / 48
      "5xl": ["3.052rem", { lineHeight: "3.75rem" }], // 49 / 60
      "6xl": ["3.815rem", { lineHeight: "4.5rem" }], // 61 / 72
      "7xl": ["4.768rem", { lineHeight: "5.5rem" }], // 76 / 88
      "8xl": ["5.96rem", { lineHeight: "6.75rem" }], // 95 / 108
      "9xl": ["7.451rem", { lineHeight: "8.25rem" }], // 119 / 132
    },
    extend: {
      colors: {
        primary: "var(--primary)",
      },
      borderColor: {
        border: "var(--border)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
