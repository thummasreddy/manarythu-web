/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          25: "#f6faf2",
          50: "#f1f8ec",
          100: "#dff2d3",
          150: "#c9e6b3",
          200: "#b0db93",
          300: "#8ecb6c",
          400: "#69b33f",
          500: "#4a8f2a",
          600: "#3a7223",
          700: "#2d5a1d",
          800: "#244818",
          900: "#1d3a15",
          950: "#11230d",
        },
        cream: {
          25: "#fffefb",
          50: "#fffdf9",
          100: "#fef9ef",
          200: "#f9f0dc",
          300: "#f2e1c0",
          400: "#e8cda0",
        },
        earth: {
          300: "#d6b58a",
          400: "#c29a67",
          500: "#a97e4a",
          600: "#8a6539",
          700: "#6e4f2c",
          800: "#5d4226",
        },
        clay: {
          400: "#e07a5f",
          500: "#c85a3d",
          600: "#a8482e",
          700: "#873925",
        },
        leaf: {
          200: "#a8e6d8",
          300: "#7dd3c0",
          400: "#4ec0a6",
          500: "#2ca88a",
          700: "#1f6f5a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(29 58 21 / 0.04), 0 1px 3px -1px rgb(29 58 21 / 0.04)",
        "card-hover": "0 20px 40px -16px rgb(29 58 21 / 0.18)",
        elevated: "0 8px 30px -8px rgb(29 58 21 / 0.14)",
        soft: "0 4px 20px -4px rgb(29 58 21 / 0.10)",
        inner: "inset 0 2px 6px 0 rgb(29 58 21 / 0.04)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 70% 30%, rgb(138 203 108 / 0.35), transparent 45%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite reverse",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
