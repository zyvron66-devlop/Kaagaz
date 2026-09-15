/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F0F1EC",
        paperline: "#D8D9CF",
        ink: "#20262B",
        stamp: "#2B4570",
        stampdark: "#1C2E4A",
        red: "#C1443C",
      },
      fontFamily: {
        serif: ["Source Serif 4", "Georgia", "serif"],
        sans: ["IBM Plex Sans", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
