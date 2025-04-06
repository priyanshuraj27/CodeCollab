import { motion } from "framer-motion";
import { X } from "lucide-react";

const EscNotification = ({ show, darkMode, onClose }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm z-50 flex items-center shadow-xl
        ${darkMode 
          ? "bg-[#1A3C66] text-white border border-[#2B7DBD]" 
          : "bg-gradient-to-r from-[#D1F1D5] to-[#A7C7E7] text-gray-900 border border-blue-300"
        }
      `}
    >
      <span className="mr-2">Press ESC again to exit fullscreen</span>
      <X 
        size={14} 
        onClick={onClose} 
        className={`cursor-pointer transition ${
          darkMode ? "hover:text-[#2B7DBD]" : "hover:text-blue-800"
        }`} 
      />
    </motion.div>
  );
};

export default EscNotification;
