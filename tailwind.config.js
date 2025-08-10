/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#34C94B",
        secondary: "#06b6d4",
        accent: "#f59e0b",
        background: "#ffffff",
        text: "#121212",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
