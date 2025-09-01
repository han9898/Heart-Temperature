/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: { max: "480px" },
      md: "803px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        pretendard: ["pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
