import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  return (
    <footer
      className={`p-6 border-t shadow-md transition-all duration-300
        ${darkMode
          ? "bg-[#3C4F67] border-gray-800"
          : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p
            className={`text-sm transition-colors duration-300 
              ${darkMode ? "text-gray-100 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
          >
            © {new Date().getFullYear()}{" "}
            <span className={`font-semibold ${darkMode ? "text-[#2B7DBD]" : "text-[#1A3C66]"}`}>
              CodeCollab
            </span>. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6">
          <motion.a
            href="https://github.com/priyanshuraj27"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 hover:drop-shadow-lg
              ${darkMode ? "text-gray-100 hover:text-[#2B7DBD]" : "text-gray-700 hover:text-[#1D6FA3]"}`}
          >
            <FaGithub size={24} />
          </motion.a>

          <motion.a
            href="https://twitter.com/Bhuvan_goel04"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 hover:drop-shadow-lg
              ${darkMode ? "text-gray-100 hover:text-[#2B7DBD]" : "text-gray-700 hover:text-[#1D6FA3]"}`}
          >
            <FaTwitter size={24} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/priyanshu-raj-iiitn"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-all duration-300 hover:drop-shadow-lg
              ${darkMode ? "text-gray-100 hover:text-[#2B7DBD]" : "text-gray-700 hover:text-[#1A3C66]"}`}
          >
            <FaLinkedin size={24} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
