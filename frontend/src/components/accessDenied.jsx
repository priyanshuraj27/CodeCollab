import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] dark:from-[#3C4F67] dark:to-[#3C4F67] text-center px-6 py-8 transition-colors duration-300">
      <div className="bg-white dark:bg-[#2B7DBD]/10 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Lock className="h-12 w-12 text-[#2B7DBD] dark:text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-[#1A3C66] dark:text-white">
          Access Denied
        </h1>
        <p className="text-[#1A3C66]/80 dark:text-gray-300 mb-6">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white rounded-lg shadow-md"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;
