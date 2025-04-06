import React, { useState, useEffect } from "react";
import { Settings, Bell, LogOut, User, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { setLogout } from "../redux/authSlice";

export default function ProfileSidebar({ closeSidebar }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout", {}, {
        withCredentials: true,
      });
      dispatch(setLogout());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 shadow-lg z-50 transform transition-transform duration-300 profile-sidebar ${
        darkMode
          ? "bg-[#3C4F67FF] text-white border-l border-[#2B7DBD]"
          : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] text-[#1A3C66] border-l border-[#2B7DBD]"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={closeSidebar} className="hover:text-red-500 transition">
          <X size={20} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2B7DBD] to-[#1A3C66] flex items-center justify-center text-white text-3xl font-bold">
          {user?.name?.[0] || "U"}
        </div>
        <h3 className="mt-3 text-lg font-semibold">
          {user?.name || "Loading..."}
        </h3>
        <p className="text-sm opacity-80">{user?.email || ""}</p>
      </div>

      {/* Buttons */}
      <div className="space-y-4 px-6">
        <button
          onClick={() => navigate("/profile-page")}
          className="flex items-center gap-3 text-sm font-medium w-full hover:text-[#2B7DBD] transition-colors"
        >
          <User size={18} /> Your Profile
        </button>

        <button
          onClick={handleNotificationClick}
          className="flex items-center gap-3 text-sm font-medium w-full hover:text-[#2B7DBD] transition-colors"
        >
          <Bell size={18} /> Notifications
        </button>

        <button onClick={() => navigate("/settings")}
          className="flex items-center gap-3 text-sm font-medium w-full hover:text-[#2B7DBD] transition-colors"
        >
          <Settings size={18} /> Settings
        </button>
      </div>

      {/* Notifications Popup */}
      {showNotifications && (
        <div
          className={`mt-6 mx-6 p-4 rounded-xl border transition-colors duration-300 ${
            darkMode
              ? "bg-[#2B7DBD] border-[#CBD5E1] text-white"
              : "bg-white border-[#1A3C66] text-[#1A3C66]"
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Notification Access</h4>
            <button onClick={handleNotificationClick} className="hover:text-red-500">
              <X size={16} />
            </button>
          </div>
          <p className="text-sm mb-4">
            Allow CodeCollab to send you notifications about upcoming meetings?
          </p>
          <div className="flex justify-between">
            <button className="px-4 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white transition">
              Allow
            </button>
            <button className="px-4 py-1 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white transition">
              Deny
            </button>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="mt-auto px-6 py-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 justify-center w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

