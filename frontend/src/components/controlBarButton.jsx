// ControlBarButton.jsx
import { motion } from "framer-motion";

const ControlBarButton = ({
  onClick,
  active,
  darkMode,
  title,
  children,
}) => {
  // Define styles based on active and darkMode status
  const baseStyle = "p-3 rounded-full transition-all duration-200 shadow-lg";

  const activeStyle = darkMode
    ? "bg-[#2B7DBD] text-white hover:bg-[#1D6FA3]"
    : "bg-[#2B7DBD] text-white hover:bg-[#1D6FA3]";

  const inactiveStyle = darkMode
    ? "bg-[#3C4F67] text-[#9CA3AF] hover:bg-[#2B7DBD]/20"
    : "bg-white text-[#2B7DBD] hover:bg-blue-100";

  const buttonStyle = active ? activeStyle : inactiveStyle;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${buttonStyle}`}
      title={title}
    >
      {children}
    </motion.button>
  );
};

export default ControlBarButton;
