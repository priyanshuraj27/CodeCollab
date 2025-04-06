import React, { useEffect, useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";

const slogans = [
  "Code smarter, together.",
  "Real-time collaboration made simple.",
  "Innovate. Collaborate. Elevate.",
  "Where developers unite."
];

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.theme.darkMode);

  // Slogan slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axiosInstance.get("/users/is-logged-in", {
          withCredentials: true,
        });
        setIsLoggedIn(res.status === 200);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 px-4 py-8 ${
        isDark
          ? "bg-[#3C4F67] text-white"
          : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] text-black"
      }`}
    >
      <div className="text-center w-full max-w-md">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="CodeCollab Logo"
            className="mx-auto w-48 h-48"
          />
        </div>

        {/* Slogans */}
        <div className="h-12 mb-8 text-2xl font-semibold">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {slogans[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Auth Buttons (hide if logged in) */}
        {!isLoggedIn && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-6 py-2 rounded-md bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white shadow-md"
            >
              <LogIn className="h-4 w-4" /> Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-6 py-2 rounded-md bg-[#1A3C66] hover:bg-[#2B7DBD] text-white shadow-md"
            >
              <UserPlus className="h-4 w-4" /> Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
