/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#068FFF",
        "blue-secondary": "#4E4FEB",
      },
      spacing: {
        navbar: "50.13px", // for screens under sm
        "navbar-md": "",
        "navbar-lg": "",
        "navbar-xl": "",
      },
    },
  },
  plugins: [],
};
