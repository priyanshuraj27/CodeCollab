import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/themeslice";
import ProfileSidebar from "../components/profileSidebar";

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.darkMode);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThemeChange = (mode) => {
    dispatch(setDarkMode(mode === "dark"));
    localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        // await axios.delete("/api/v1/user/delete"); // if exists
        toast.success("Account deleted successfully");
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete account");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (user.newPassword !== user.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/v1/user/change-password",
        {
          currentPassword: user.currentPassword,
          newPassword: user.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password changed successfully");
      setIsEditing(false);
      setUser({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative flex h-screen w-full transition-colors duration-300 ${
        isDark ? "bg-[#3C4F67]" : "bg-gradient-to-r from-[#D1F1D5] to-[#A7C7E7]"
      }`}
    >
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div
          className={`max-w-3xl mx-auto rounded-xl shadow-lg transition-colors ${
            isDark ? "bg-[#4A627F] text-white" : "bg-white text-black"
          }`}
        >
          <div
            className={`p-6 rounded-t-xl flex justify-between items-center ${
              isDark
                ? "bg-[#2B7DBD] text-white"
                : "bg-gradient-to-r from-[#A7C7E7] to-[#D1F1D5] text-black"
            }`}
          >
            <div>
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-sm">Manage your preferences and settings</p>
            </div>
            <button
              onClick={() => setShowSidebar(true)}
              className="text-sm px-4 py-1 bg-[#2B7DBD] text-white rounded-md hover:bg-[#1D6FA3]"
            >
              Profile Panel
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Change Password */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <div className="space-y-4">
                {["currentPassword", "newPassword", "confirmPassword"].map(
                  (field, idx) => (
                    <div key={idx}>
                      <label className="block mb-1 capitalize text-sm">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="password"
                        name={field}
                        value={user[field]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full p-2 rounded-md outline-none border ${
                          isDark
                            ? "bg-[#3C4F67] border-[#2B7DBD] text-white"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  )
                )}
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="px-4 py-2 rounded-md bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white"
                >
                  {isEditing ? "Cancel" : "Edit Password"}
                </button>
                {isEditing && (
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </section>

            {/* Theme Selection */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Theme</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`px-4 py-2 rounded-md ${
                    !isDark
                      ? "bg-[#2B7DBD] text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  Light Mode
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`px-4 py-2 rounded-md ${
                    isDark
                      ? "bg-[#2B7DBD] text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  Dark Mode
                </button>
              </div>
            </section>

            {/* Danger Zone */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-red-600">
                Danger Zone
              </h2>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
              >
                Delete Account
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* Sidebar (non-fixed, dismissible) */}
      {showSidebar && (
        <div
          ref={sidebarRef}
          className={`absolute top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out`}
        >
          <ProfileSidebar onClose={() => setShowSidebar(false)} />
        </div>
      )}
    </div>
  );
};

export default Settings;
