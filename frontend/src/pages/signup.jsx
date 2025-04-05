import React, { useState } from "react";
import { FaUserPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const Signup = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    try {
      const res = await axiosInstance.post("/users/register", {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      showSuccessToast("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      showErrorToast(
        err?.response?.data?.message || "Signup failed. Try again."
      );
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        isDarkMode ? "bg-[#3C4F67FF]" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg border max-w-sm w-full bg-gradient-to-br ${
          isDarkMode
            ? "from-[#1A3C66] to-[#2B7DBD] border-[#CBD5E1]"
            : "from-[#D1F1D5] to-[#A7C7E7] border-[#2B7DBD]"
        }`}
      >
        <div className="flex justify-center items-center mb-4">
          <img src={logo} alt="CodeCollab Logo" className="h-16" />
        </div>

        <h2
          className={`text-xl font-semibold text-center mb-6 ${
            isDarkMode ? "text-white" : "text-[#1A3C66]"
          }`}
        >
          Create a New Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-[#1A3C66]"
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              value={formData.fullName}
              required
              placeholder="Enter your name"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                isDarkMode
                  ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]"
                  : "border-gray-300 focus:ring-[#2B7DBD]"
              }`}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-[#1A3C66]"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              placeholder="Enter your email"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                isDarkMode
                  ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]"
                  : "border-gray-300 focus:ring-[#2B7DBD]"
              }`}
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-[#1A3C66]"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
              placeholder="Choose a username"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                isDarkMode
                  ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]"
                  : "border-gray-300 focus:ring-[#2B7DBD]"
              }`}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-[#1A3C66]"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
                required
                placeholder="Create a password"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  isDarkMode
                    ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]"
                    : "border-gray-300 focus:ring-[#2B7DBD]"
                }`}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-[#1A3C66]"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
                placeholder="Confirm your password"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  isDarkMode
                    ? "border-gray-500 bg-[#2B7DBD] text-white focus:ring-[#CBD5E1]"
                    : "border-gray-300 focus:ring-[#2B7DBD]"
                }`}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white p-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 ${
              isDarkMode
                ? "bg-[#CBD5E1] text-[#1A3C66] hover:bg-[#A7C7E7]"
                : "bg-[#2B7DBD] hover:bg-[#1D6FA3]"
            }`}
          >
            <FaUserPlus /> Sign Up
          </button>
        </form>

        <p
          className={`text-center text-sm mt-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <a
            href="/login"
            className={`hover:underline ${
              isDarkMode ? "text-[#CBD5E1]" : "text-[#2B7DBD]"
            }`}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
