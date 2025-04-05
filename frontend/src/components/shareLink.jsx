import { motion } from "framer-motion";
import { Copy, X, Check } from "lucide-react";

const ShareLinkPopup = ({
  show,
  roomLink,
  isCopied,
  setIsCopied,
  onClose,
  darkMode
}) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.25 }}
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md rounded-2xl px-6 py-5 shadow-xl border
        ${darkMode
          ? "bg-gradient-to-br from-slate-900 to-slate-800 border-[#2B7DBD]"
          : "bg-gradient-to-br from-white to-blue-50 border-[#2B7DBD]"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? "text-[#2B7DBD]" : "text-[#1A3C66]"}`}>
          Share Room Link
        </h3>
        <button
          onClick={onClose}
          className={`rounded-full p-1 transition-colors ${
            darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
          }`}
        >
          <X size={20} />
        </button>
      </div>

      {/* Link Box */}
      <div className={`flex items-center gap-3 mb-4 p-3 rounded-xl text-sm border shadow-sm font-mono truncate ${
        darkMode
          ? "bg-slate-800 border-[#2B7DBD]/50 text-white"
          : "bg-blue-50 border-[#2B7DBD]/30 text-gray-700"
      }`}>
        <span className="truncate flex-grow">{roomLink}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(roomLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}
          className={`rounded-md p-2 text-white shadow-md transition-all ${
            isCopied
              ? "bg-green-500"
              : "bg-gradient-to-r from-[#2B7DBD] to-[#1A3C66] hover:from-[#1D6FA3] hover:to-[#2B7DBD]"
          }`}
        >
          {isCopied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>

      {/* Footer */}
      <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        Share this link to invite others to your collaborative coding session.
      </p>
    </motion.div>
  );
};

export default ShareLinkPopup;
