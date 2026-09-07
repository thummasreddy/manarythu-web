/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ManaRythu agricultural identity: fresh + natural + local + trust
        brand: {
          50: "#f1f8ec",
          100: "#e0f0d3",
          200: "#c2e0a3",
          300: "#9ccb6e",
          400: "#74b34a",
          500: "#5a9a32", // primary agricultural green
          600: "#467a25",
          700: "#37601f",
          800: "#2d4d1c",
          900: "#26401c",
        },
        cream: {
          50: "#fdfbf6",
          100: "#faf5ea",
          200: "#f4ead0",
        },
        earth: {
          400: "#b88a4e",
          500: "#9c6f37",
          600: "#7d5729",
        },
        clay: {
          500: "#c8553d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 8px 24px -8px rgb(45 64 28 / 0.18)",
      },
    },
  },
  plugins: [],
};
