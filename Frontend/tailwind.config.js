/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#2bee79",
        "background-light": "#f6f8f7",
        "background-dark": "#102217",
        "card-dark": "#1c2720",
        "accent-dark": "#28392f",
        "text-secondary": "#9db9a8"
      },
      fontFamily: {
        "display": ["system-ui", "-apple-system", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "2.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}