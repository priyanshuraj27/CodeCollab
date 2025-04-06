import React from 'react';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa'; // For the "Go Inside" icon

const GroupCard = ({ groupName, groupDescription, tags }) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`p-4 rounded-xl shadow-lg mb-4 transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#2B7DBD] text-white border-[#CBD5E1]'
          : 'bg-[#D1F1D5] text-[#1A3C66] border-[#2B7DBD]'
      }`}
    >
      <h3
        className={`text-xl font-semibold mb-2 ${
          isDarkMode ? 'text-white' : 'text-[#1A3C66]'
        }`}
      >
        {groupName}
      </h3>
      <p
        className={`text-sm mb-3 ${
          isDarkMode ? 'text-gray-300' : 'text-[#1A3C66]'
        }`}
      >
        {groupDescription}
      </p>

      <div className="flex flex-wrap mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`inline-block text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full ${
              isDarkMode
                ? 'bg-[#1A3C66] text-[#CBD5E1]'
                : 'bg-[#A7C7E7] text-[#1A3C66]'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        className={`w-full p-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 ${
          isDarkMode
            ? 'bg-[#CBD5E1] text-[#1A3C66] hover:bg-[#A7C7E7]'
            : 'bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white'
        }`}
      >
        Go Inside <FaArrowRight />
      </button>
    </div>
  );
};

export default GroupCard;
