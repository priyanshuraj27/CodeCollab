import React, { useState } from "react";
import { FaRegEye, FaArrowRight, FaMoon, FaSun } from "react-icons/fa";
import logo from "../assets/logo.png";

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-[#3C4F67FF]" : "bg-gray-100"}`}>
      <div className={`p-8 rounded-2xl shadow-lg border max-w-sm w-full bg-gradient-to-br ${darkMode ? "from-[#1A3C66] to-[#2B7DBD] border-[#CBD5E1]" : "from-[#D1F1D5] to-[#A7C7E7] border-[#2B7DBD]"}`}>
        <div className="flex justify-between items-center mb-4">
          <img src={logo} alt="CodeCollab Logo" className="h-16" />
          <button onClick={() => setDarkMode(!darkMode)} className="text-xl text-grey-500">
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-[#00295AFF]" />}
          </button>
        </div>
        <h2 className={`text-xl font-semibold text-center ${darkMode ? "text-white" : "text-[#1A3C66]"} mb-6`}>
          Login to Your Account
        </h2>
        <form>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-[#1A3C66]"}`}>Email</label>
            <input
              type="email"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${darkMode ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]" : "border-gray-300 focus:ring-[#2B7DBD]"}`}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-[#1A3C66]"}`}>Password</label>
            <div className="relative">
              <input
                type="password"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${darkMode ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]" : "border-gray-300 focus:ring-[#2B7DBD]"}`}
                placeholder="Enter your password"
              />
              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 top-1/2 transform -translate-y-1/2">
                <FaRegEye />
              </span>
            </div>
          </div>
          <button className={`w-full text-white p-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 ${darkMode ? "bg-[#CBD5E1] text-[#1A3C66] hover:bg-[#A7C7E7]" : "bg-[#2B7DBD] hover:bg-[#1D6FA3]"}`}>
            <FaArrowRight /> Login
          </button>
        </form>
        <p className={`text-center text-sm mt-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Don't have an account? <a href="/signup" className={`hover:underline ${darkMode ? "text-[#CBD5E1]" : "text-[#2B7DBD]"}`}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;