import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isDarkMode ? "light" : "dark");
    root.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="relative w-20 p-2 overflow-hidden text-lg group"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transform transition-all duration-500 ${
          isDarkMode
            ? "translate-y-0 opacity-100 rotate-0"
            : "-translate-y-full opacity-0 rotate-180"
        } group-hover:animate-bounceOnce`}
      >
        🌙
      </span>

      <span
        className={`absolute inset-0 flex items-center justify-center transform transition-all duration-500 ${
          !isDarkMode
            ? "translate-y-0 opacity-100 rotate-0"
            : "translate-y-full opacity-0 -rotate-180"
        } group-hover:animate-bounceOnce`}
      >
        ☀️
      </span>
      <span className="opacity-0">.</span>
    </button>
  );
}
