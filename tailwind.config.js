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
        "navbar-sm": "58.13px",
        "navbar-md": "75.2px",
        "navbar-lg": "84px",
      },
      backgroundImage: {
        "blob-scatter": "url('/src/assets/images/blob-scatter.svg')",
      },
    },
  },
  plugins: [],
};
