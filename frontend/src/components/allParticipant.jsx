import React, { useState, useEffect } from "react";
import ParticipantsList from "./participants";
import { X } from "lucide-react";

const ParticipantsSidebar = ({ projectId, onClose, darkMode = false, participants = [], loading = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!projectId) {
    return (
      <div className="fixed top-0 right-0 h-full w-80 z-50 bg-yellow-100 text-yellow-800 p-4 shadow-lg">
        <p>⚠️ No project selected. Please select a project to view participants.</p>
        <button
          onClick={onClose}
          className="mt-4 px-3 py-1 bg-yellow-300 hover:bg-yellow-400 rounded text-sm"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div
        className={`fixed top-0 right-0 h-full w-80 z-50 ${
          darkMode ? "bg-slate-900" : "bg-white"
        } shadow-lg transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={handleClose}
          className={`absolute top-3 right-3 ${
            darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-black"
          }`}
        >
          <X size={20} />
        </button>

        <ParticipantsList participants={participants} loading={loading} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default ParticipantsSidebar;
