import React, { useState, useEffect } from "react";
import { Clipboard, Save, Minimize2, Maximize2, Check } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setFontSize,setLanguage } from "../redux/themeslice";

const TopBar = ({ roomId, onCopyCode, onSave }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const fontSize = useSelector((state) => state.theme.fontSize);
  const language = useSelector((state) => state.theme.language);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleCopy = () => {
    if (onCopyCode) {
      onCopyCode();
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleFontSizeChange = (e) => {
    dispatch(setFontSize(Number(e.target.value)));
  };

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  const bgClass = darkMode
    ? "bg-gradient-to-r from-[#2B7DBD] to-[#1A3C66]"
    : "bg-gradient-to-r from-[#D1F1D5] to-[#A7C7E7]";

  const textColor = darkMode ? "text-white" : "text-gray-900";
  const selectBg = darkMode ? "bg-[#1A3C66] text-white" : "bg-white text-black";
  const buttonCopy = darkMode
    ? "bg-cyan-500 hover:bg-cyan-600 text-white"
    : "bg-blue-300 hover:bg-blue-400 text-gray-900";
  const buttonSave = darkMode
    ? "bg-blue-500 hover:bg-blue-600 text-white"
    : "bg-green-400 hover:bg-green-500 text-gray-900";

  return (
    <div className={`flex items-center justify-between px-4 py-2 ${bgClass}`}>
      <div className={`text-xl font-semibold ${textColor}`}>CodeCollab</div>

      <div className="flex items-center gap-3">
        <select
          value={language}
          onChange={handleLanguageChange}
          className={`px-2 py-1 rounded ${selectBg}`}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>

        <select
          value={fontSize}
          onChange={handleFontSizeChange}
          className={`px-2 py-1 rounded ${selectBg}`}
        >
          {[12, 14, 16, 18, 20].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>

        <button
          onClick={handleCopy}
          className={`px-3 py-1 rounded flex items-center gap-1 ${buttonCopy}`}
        >
          {copied ? <Check size={16} /> : <Clipboard size={16} />}{" "}
          {copied ? "Copied" : "Copy"}
        </button>

        <button
          onClick={onSave}
          className={`px-3 py-1 rounded flex items-center gap-1 ${buttonSave}`}
        >
          <Save size={16} /> Save
        </button>

        <button
          onClick={toggleFullscreen}
          className={`p-2 rounded-full hover:bg-white/10 ${
            darkMode ? "text-white" : "text-black hover:bg-black/10"
          }`}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
