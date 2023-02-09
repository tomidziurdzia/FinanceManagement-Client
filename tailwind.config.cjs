/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#C8EE44",
        secondary: "#29A073",
      },
    },
    fontFamily: {
      roboto: ["Roboto Mono", "monospace"],
    },
  },
  plugins: [],
};
