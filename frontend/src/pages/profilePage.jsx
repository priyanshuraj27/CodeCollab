// src/pages/ProfilePage.jsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import profileImage from "../assets/logo.png";
import { setLogin } from "../redux/authSlice";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.fullName || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const avatarRes = await axiosInstance.patch("/users/update-avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        dispatch(setLogin(avatarRes.data.data));
        toast.success("Avatar updated!");
      }

      if (name !== user.fullName) {
        const accountRes = await axiosInstance.patch(
          "/users/update-account",
          { fullName: name },
          { withCredentials: true }
        );

        dispatch(setLogin(accountRes.data.data));
        toast.success("Profile updated!");
      }

      setIsEditing(false);
      setAvatarFile(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong!");
    }
  };

  const cardGradient = isDarkMode
    ? "from-[#1A3C66] to-[#2B7DBD]"
    : "from-[#D1F1D5] to-[#A7C7E7]";

  const textColor = isDarkMode ? "text-white" : "text-[#1A3C66]";

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isDarkMode ? "bg-[#3C4F67FF]" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-xl p-8 rounded-2xl shadow-xl border bg-gradient-to-br ${cardGradient} ${
          isDarkMode ? "border-[#CBD5E1]" : "border-[#2B7DBD]"
        }`}
      >
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-white object-cover"
            />
            <div>
              <p className={`font-semibold text-lg ${textColor}`}>{name}</p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-200" : "text-[#1A3C66]"
                }`}
              >
                {email}
              </p>
            </div>
          </div>
          <button
            className={`px-4 py-1 rounded-md font-medium transition duration-300 ${
              isDarkMode
                ? "bg-[#CBD5E1] text-[#1A3C66] hover:bg-[#A7C7E7]"
                : "bg-[#2B7DBD] text-white hover:bg-[#1D6FA3]"
            }`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          <ProfileField
            label="Name"
            value={name}
            setValue={setName}
            isEditing={isEditing}
            isDarkMode={isDarkMode}
          />
          <LockedField label="Email" value={email} isDarkMode={isDarkMode} />
          <LockedField label="Username" value={username} isDarkMode={isDarkMode} />

          {/* Avatar Upload */}
          {isEditing && (
            <div>
              <label
                className={`block mb-1 font-semibold ${
                  isDarkMode ? "text-white" : "text-[#1A3C66]"
                }`}
              >
                Update Avatar
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="text-sm"
              />
            </div>
          )}
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            className={`mt-6 w-full py-2 rounded-lg font-medium transition duration-300 ${
              isDarkMode
                ? "bg-[#CBD5E1] text-[#1A3C66] hover:bg-[#A7C7E7]"
                : "bg-[#2B7DBD] text-white hover:bg-[#1D6FA3]"
            }`}
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const ProfileField = ({ label, value, setValue, isEditing, isDarkMode }) => (
  <div>
    <label className={`block mb-1 font-semibold ${isDarkMode ? "text-white" : "text-[#1A3C66]"}`}>
      {label}
    </label>
    {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full p-2 rounded-md focus:outline-none border ${
          isDarkMode
            ? "bg-[#1A3C66] text-white border-gray-500"
            : "bg-white text-[#1A3C66] border-gray-300"
        }`}
      />
    ) : (
      <p className={`p-2 rounded-md ${isDarkMode ? "bg-[#1A3C66] text-white" : "bg-white text-[#1A3C66]"}`}>
        {value}
      </p>
    )}
  </div>
);

const LockedField = ({ label, value, isDarkMode }) => (
  <div>
    <label className={`block mb-1 font-semibold ${isDarkMode ? "text-white" : "text-[#1A3C66]"}`}>
      {label}
    </label>
    <p className={`p-2 rounded-md ${isDarkMode ? "bg-[#1A3C66] text-white" : "bg-white text-[#1A3C66]"}`}>
      {value}
    </p>
  </div>
);

export default ProfilePage;
