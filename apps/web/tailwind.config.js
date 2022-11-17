// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@labxd/gustxd/tailwind-preset")],

  content: [
    "./src/**/*.{html,tsx}",
    "./node_modules/@labxd/gustxd/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-x": {
          "0%": { left: "0" },
          "100%": {
            left: "100%",
          },
        },
        "slide-y": {
          "0%": { top: "0" },
          "100%": {
            top: "100%",
          },
        },
        "fade-in-first": {
          "0%": { opacity: 0 },
          "1%": { opacity: 1 },
          "50%": { opacity: 1 },
          "55%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
        "fade-in-last": {
          "0%": { opacity: 0 },
          "50%": { opacity: 0 },
          "51%": { opacity: 1 },
          "95%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        "slide-x": "slide-x 12s linear infinite",
        "slide-y": "slide-y 12s linear infinite",
        "fade-in-first": "fade-in-first 12s linear infinite",
        "fade-in-last": "fade-in-last 12s linear infinite",
      },
    },
  },
  plugins: [],
}
