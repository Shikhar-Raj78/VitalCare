/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          1000: "#245b2b",
          900: "#61aa40",
        },
      },
    },
  },
  plugins: [],
};
