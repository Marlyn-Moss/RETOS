/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        retos: {
          dark: "#064e3b",
          primary: "#065f46",
          medium: "#047857",
          light: "#d1fae5",
          soft: "#ecfdf5",
        },
      },
    },
  },
  plugins: [],
};

