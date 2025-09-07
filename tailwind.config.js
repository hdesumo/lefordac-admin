/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "lefordac-blue": "#2563eb",
        "lefordac-accent": "#facc15",
        "lefordac-secondary": "#1e40af",
      },
    },
  },
  plugins: [],
}
