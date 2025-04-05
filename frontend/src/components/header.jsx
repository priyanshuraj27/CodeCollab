import React from "react";
import ThemeButton from "./toggleMode";
import logo from "../assets/logo.png"; // ✅ Correct import

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#D1F1D5] to-[#A7C7E7] shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="CodeCollab Logo" className="w-32 h-auto" />
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <ThemeButton />
        <button className="bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white px-4 py-2 rounded-md shadow-md cursor-pointer">
          Join
        </button>
        <button className="bg-[#1A3C66] hover:bg-[#2B7DBD] text-white px-4 py-2 rounded-md shadow-md cursor-pointer">
          Host
        </button>
      </div>
    </header>
  );
};

export default Header;
