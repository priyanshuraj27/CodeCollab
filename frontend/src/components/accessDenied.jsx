import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AccessDenied = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 py-8 transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#3C4F67FF] text-white"
          : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] text-[#1A3C66]"
      }`}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg max-w-md w-full text-center transition-all duration-300 ${
          isDarkMode
            ? "bg-[#2B7DBD]/10 border border-[#2B7DBD]/40"
            : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] border border-gray-200"
        }`}
      >
        <div className="flex justify-center mb-4">
          <Lock
            className={`h-12 w-12 transition-colors ${
              isDarkMode ? "text-white" : "text-[#2B7DBD]"
            }`}
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p
          className={`mb-6 ${
            isDarkMode ? "text-gray-300" : "text-[#1A3C66]/80"
          }`}
        >
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="px-5 py-2 bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white rounded-lg shadow-md transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
