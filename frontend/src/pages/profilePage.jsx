import React, { useState } from "react";
import { useSelector } from "react-redux";
import profileImage from "../assets/logo.png"; // Replace with your actual image path

const ProfilePage = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const [name, setName] = useState("Priyanshu Raj");
  const [email] = useState("priyanshu@gmail.com"); // Email remains constant (non-editable)
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("India");
  const [isEditing, setIsEditing] = useState(false);

  const cardGradient = isDarkMode
    ? "from-[#1A3C66] to-[#2B7DBD]"
    : "from-[#D1F1D5] to-[#A7C7E7]";

  const textColor = isDarkMode ? "text-white" : "text-[#1A3C66]";

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
              src={profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-white"
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
          <LockedField
            label="Email"
            value={email}
            isDarkMode={isDarkMode}
          />
          <ProfileField
            label="Mobile"
            value={mobile || "Add number"}
            setValue={setMobile}
            isEditing={isEditing}
            isDarkMode={isDarkMode}
            isPlaceholder={!mobile}
          />
          <ProfileField
            label="Location"
            value={location}
            setValue={setLocation}
            isEditing={isEditing}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            className={`mt-6 w-full py-2 rounded-lg font-medium transition duration-300 ${
              isDarkMode
                ? "bg-[#CBD5E1] text-[#1A3C66] hover:bg-[#A7C7E7]"
                : "bg-[#2B7DBD] text-white hover:bg-[#1D6FA3]"
            }`}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  value,
  setValue,
  isEditing,
  isDarkMode,
  isPlaceholder,
}) => {
  const inputClass = `${
    isDarkMode
      ? "bg-[#2B7DBD] text-white border-gray-400"
      : "bg-white text-black border-gray-300"
  } w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#2B7DBD]`;

  return (
    <div>
      <label
        className={`block text-sm font-medium mb-1 ${
          isDarkMode ? "text-gray-200" : "text-[#1A3C66]"
        }`}
      >
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
          placeholder={isPlaceholder ? `Enter your ${label.toLowerCase()}` : ""}
        />
      ) : (
        <div
          className={`p-2 rounded-lg ${
            isDarkMode ? "text-white bg-[#2B7DBD]" : "bg-white text-black"
          } border ${isDarkMode ? "border-gray-400" : "border-gray-300"}`}
        >
          {value}
        </div>
      )}
    </div>
  );
};

const LockedField = ({ label, value, isDarkMode }) => {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-1 ${
          isDarkMode ? "text-gray-200" : "text-[#1A3C66]"
        }`}
      >
        {label}
      </label>
      <div
        className={`p-2 rounded-lg ${
          isDarkMode ? "text-white bg-[#2B7DBD]" : "bg-white text-black"
        } border ${isDarkMode ? "border-gray-400" : "border-gray-300"}`}
      >
        {value}
      </div>
    </div>
  );
};

export default ProfilePage;
