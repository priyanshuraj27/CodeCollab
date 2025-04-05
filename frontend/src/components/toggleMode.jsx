import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sync with existing theme on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all shadow-lg
        ${darkMode 
          ? "bg-[#1A3C66] shadow-[#1A3C66]/60 hover:shadow-[#2B7DBD]/50" 
          : "bg-gradient-to-r from-[#2B7DBD] to-[#1D6FA3] shadow-[#2B7DBD]/40 hover:shadow-[#1D6FA3]/50"}`}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {darkMode ? (
          <Sun size={22} className="text-yellow-300 drop-shadow-md" />
        ) : (
          <Moon size={22} className="text-white drop-shadow-md" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeButton;
