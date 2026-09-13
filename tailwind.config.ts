/* eslint-disable @typescript-eslint/no-var-requires */
// Single source of truth: design-tokens.json (mirrored from manarythu-docs).
// Do not edit color/shadow values here — update the token file and re-sync.
const tokens = require("./design-tokens.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: tokens.colors.brand,
        cream: tokens.colors.cream,
        earth: tokens.colors.earth,
        clay: tokens.colors.clay,
        leaf: tokens.colors.leaf,
        success: tokens.colors.semantic.success,
        warning: tokens.colors.semantic.warning,
        danger: tokens.colors.semantic.error,
        info: tokens.colors.semantic.info,
        surface: tokens.colors.semantic.surface,
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": tokens.radius["2xl"],
        "3xl": tokens.radius["3xl"],
        "4xl": tokens.radius["4xl"],
      },
      boxShadow: {
        card: tokens.shadows.card,
        "card-hover": tokens.shadows["card-hover"],
        elevated: tokens.shadows.elevated,
        soft: tokens.shadows.soft,
        inner: tokens.shadows.inner,
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
