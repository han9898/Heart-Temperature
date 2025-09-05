/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector"],
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
      keyframes: {
        bounceOnce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        bounceOnce: "bounceOnce 0.4s ease",
      },
    },
  },
  plugins: [],
};
