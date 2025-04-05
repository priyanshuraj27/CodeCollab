import React from 'react';
import { motion } from 'framer-motion';

const LeaveRoomModal = ({ 
  onDownload, 
  onLeave, 
  timer,
  darkMode = false
}) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={`
          w-full max-w-md p-6 rounded-2xl shadow-2xl transition-all duration-200 relative
          ${darkMode 
            ? "border border-[#2B7DBD] bg-gradient-to-b from-slate-800 to-slate-900"
            : "border border-[#2B7DBD] bg-gradient-to-b from-[#D1F1D5] to-[#A7C7E7]"}
        `}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.01,
          boxShadow: darkMode
            ? "0 0 15px rgba(43, 125, 189, 0.5)"
            : "0 0 15px rgba(43, 125, 189, 0.3)"
        }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={`text-2xl font-bold text-center mb-4
          ${darkMode ? "text-[#2B7DBD]" : "text-[#1A3C66]"}`}>
          Host has Left the Room
        </h2>

        <p className={`text-center mb-6 text-base leading-relaxed 
          ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          The session host has left. Do you want to download your code before leaving?
        </p>

        <div className="flex justify-center gap-4">
          <motion.button
            onClick={onDownload}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 5px 10px rgba(43, 125, 189, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-5 py-2.5 rounded-xl font-medium transition-all duration-300
              ${darkMode 
                ? "bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white" 
                : "bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white"}
            `}
          >
            Download Code
          </motion.button>

          <motion.button
            onClick={onLeave}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 5px 10px rgba(239, 68, 68, 0.25)"
            }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-5 py-2.5 rounded-xl font-medium transition-all duration-300
              ${darkMode 
                ? "bg-red-700 hover:bg-red-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"}
            `}
          >
            Leave Room
          </motion.button>
        </div>

        <p className={`mt-6 text-sm text-center 
          ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Automatically leaving in <span className="font-semibold">{timer}</span> seconds...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LeaveRoomModal;
