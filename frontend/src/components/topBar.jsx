import React, { useState, useEffect } from "react";
import { Clipboard, Save, Expand, Minimize2, Maximize2 } from "lucide-react";
import { useSelector } from "react-redux";

const TopBar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [isFullscreen, setIsFullscreen] = useState(false);

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
        <select className={`px-2 py-1 rounded ${selectBg}`}>
          <option>JavaScript</option>
          <option>Python</option>
          <option>C++</option>
        </select>

        <select className={`px-2 py-1 rounded ${selectBg}`}>
          <option>14px</option>
          <option>16px</option>
          <option>18px</option>
        </select>

        <button className={`px-3 py-1 rounded flex items-center gap-1 ${buttonCopy}`}>
          <Clipboard size={16} /> Copy
        </button>

        <button className={`px-3 py-1 rounded flex items-center gap-1 ${buttonSave}`}>
          <Save size={16} /> Save
        </button>

        {/* Fullscreen toggle button */}
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
