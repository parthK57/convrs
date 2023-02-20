/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('./Assets/login-img.jpg')",
      },
    },
  },
  plugins: [],
};
