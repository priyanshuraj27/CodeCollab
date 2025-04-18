import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaPlus, FaTrash } from 'react-icons/fa';
import { FaEllipsisV } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';
import { showErrorToast, showSuccessToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

const GroupCard = ({ groupName, groupDescription, tags, projectId, onDelete }) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/projects/${projectId}`, {
        withCredentials: true,
      });
      showSuccessToast(res.data.message || 'Project deleted');
      setMenuOpen(false);
      onDelete(projectId);
    } catch (err) {
      showErrorToast(err?.response?.data?.message || 'Failed to delete project');
      setMenuOpen(false);
    }
  };

  const handleEnterRoom = () => {
    navigate(`/room/${projectId}`);
  };

  return (
    <div
      className={`relative flex flex-col justify-between p-4 rounded-xl shadow-lg transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#2B7DBD] text-white border-[#CBD5E1]'
          : 'bg-[#D1F1D5] text-[#1A3C66] border-[#2B7DBD]'
      }`}
      style={{
        minWidth: '250px',
        minHeight: '300px',
        maxWidth: '300px',
      }}
    >
      {/* 3-dot menu (optional for later) */}
      <div className="absolute top-3 right-3">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV />
        </button>
        {menuOpen && (
          <div
            className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg z-10 ${
              isDarkMode ? 'bg-[#1A3C66] text-white' : 'bg-white text-black'
            }`}
          >
            <button
              onClick={() => setShowConfirm(true)}
              className="block px-4 py-2 text-sm w-full text-left hover:bg-red-100"
            >
              <FaTrash className="inline mr-2 text-red-500" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center rounded-xl">
          <div
            className={`p-4 rounded-lg shadow-md text-center ${
              isDarkMode ? 'bg-[#1A3C66] text-white' : 'bg-white text-black'
            }`}
          >
            <p className="mb-4">Are you sure you want to delete this project?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-1">{groupName}</h3>
        <p className="text-sm mb-3">{groupDescription}</p>

        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center gap-1 text-sm font-medium">
            <FaPlus className="text-xs" /> Tags:
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                isDarkMode
                  ? 'bg-[#1A3C66] text-[#CBD5E1]'
                  : 'bg-[#A7C7E7] text-[#1A3C66]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleEnterRoom}
        className={`w-full mt-auto p-2 rounded-lg font-medium transition duration-300 flex items-center justify-center gap-2 ${
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
