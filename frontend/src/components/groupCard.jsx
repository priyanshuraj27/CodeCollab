import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaPlus, FaEllipsisV, FaTrash } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';
import { showErrorToast, showSuccessToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom'; // ✅ Import this

const GroupCard = ({ groupName, groupDescription, tags, projectId, onDelete }) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate(); // ✅ React Router hook

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/projects/${projectId}`, {
        withCredentials: true,
      });
      showSuccessToast(res.data.message || 'Project deleted');
      setMenuOpen(false);
      onDelete(projectId); // notify parent to remove from UI
    } catch (err) {
      showErrorToast(err?.response?.data?.message || 'Failed to delete project');
      setMenuOpen(false);
    }
  };

  const handleEnterRoom = () => {
    navigate(`/room/${projectId}`); // ✅ Go to /room/:projectId
  };

  return (
    <div
      className={`relative p-4 rounded-xl shadow-lg mb-4 transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#2B7DBD] text-white border-[#CBD5E1]'
          : 'bg-[#D1F1D5] text-[#1A3C66] border-[#2B7DBD]'
      }`}
    >
      {/* ... existing 3-dot menu and confirm modal ... */}

      <h3 className="text-xl font-semibold mb-2">{groupName}</h3>
      <p className="text-sm mb-3">{groupDescription}</p>

      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center gap-1 text-sm font-medium">
          <FaPlus className="text-xs" /> Tags:
        </span>
      </div>

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
        onClick={handleEnterRoom} // ✅ Bind click
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
