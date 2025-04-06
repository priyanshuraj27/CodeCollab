import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const LoadingScreen = ({ title = "Loading", message = "Please wait..." }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all ${
        darkMode
          ? "bg-[#3C4F67] text-white"
          : "bg-gradient-to-br from-[#D1F1D5] via-white to-[#A7C7E7] text-gray-800"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-2xl shadow-xl text-center ${
          darkMode
            ? "border-2 border-[#2B7DBD] bg-[#1A3C66]/70 backdrop-blur-md"
            : "border border-[#A7C7E7] bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {/* Pulsing animation */}
          <div className="relative mb-6">
            <motion.div
              className={`w-16 h-16 rounded-full ${
                darkMode ? "bg-[#2B7DBD]" : "bg-[#1A3C66]"
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className={`absolute inset-0 w-16 h-16 rounded-full ${
                darkMode
                  ? "border-4 border-[#2B7DBD]"
                  : "border-4 border-[#2B7DBD]"
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-[#2B7DBD]" : "text-[#1A3C66]"
            }`}
          >
            {title}
          </h2>

          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            {message}
          </p>

          {/* Animated dots */}
          <div className="flex space-x-2 mt-4">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  darkMode ? "bg-[#2B7DBD]" : "bg-[#1A3C66]"
                }`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
