import React from "react";
import { FaUserPlus, FaRegEye } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const Signup = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? "bg-[#3C4F67FF]" : "bg-gray-100"}`}>
      <div className={`p-8 rounded-2xl shadow-lg border max-w-sm w-full bg-gradient-to-br ${isDarkMode ? "from-[#1A3C66] to-[#2B7DBD] border-[#CBD5E1]" : "from-[#D1F1D5] to-[#A7C7E7] border-[#2B7DBD]"}`}>
        
        <div className="flex justify-center items-center mb-4">
          <img src={logo} alt="CodeCollab Logo" className="h-16" />
        </div>

        <h2 className={`text-xl font-semibold text-center ${isDarkMode ? "text-white" : "text-[#1A3C66]"} mb-6`}>
          Create a New Account
        </h2>

        <form>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-[#1A3C66]"}`}>Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${isDarkMode ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]" : "border-gray-300 focus:ring-[#2B7DBD]"}`}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-[#1A3C66]"}`}>Email</label>
            <input
              type="email"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${isDarkMode ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]" : "border-gray-300 focus:ring-[#2B7DBD]"}`}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 relative">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-[#1A3C66]"}`}>Password</label>
            <div className="relative">
              <input
                type="password"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${isDarkMode ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]" : "border-gray-300 focus:ring-[#2B7DBD]"}`}
                placeholder="Create a password"
              />
              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 top-1/2 transform -translate-y-1/2">
                <FaRegEye />
              </span>
            </div>
          </div>

          <div className="mb-4 relative">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-[#1A3C66]"}`}>Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${isDarkMode ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]" : "border-gray-300 focus:ring-[#2B7DBD]"}`}
                placeholder="Confirm your password"
              />
              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 top-1/2 transform -translate-y-1/2">
                <FaRegEye />
              </span>
            </div>
          </div>

          <button className={`w-full text-white p-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 ${isDarkMode ? "bg-[#CBD5E1] text-[#1A3C66] hover:bg-[#A7C7E7]" : "bg-[#2B7DBD] hover:bg-[#1D6FA3]"}`}>
            <FaUserPlus /> Sign Up
          </button>
        </form>

        <p className={`text-center text-sm mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Already have an account? <a href="/login" className={`hover:underline ${isDarkMode ? "text-[#CBD5E1]" : "text-[#2B7DBD]"}`}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
