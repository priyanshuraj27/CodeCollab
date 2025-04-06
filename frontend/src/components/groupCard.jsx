import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaPlus, FaEllipsisV, FaTrash } from 'react-icons/fa';
import axiosInstance from '../api/axiosInstance';
import { showErrorToast, showSuccessToast } from '../utils/toast';

const GroupCard = ({ groupName, groupDescription, tags, projectId, onDelete }) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  return (
    <div
      className={`relative p-4 rounded-xl shadow-lg mb-4 transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#2B7DBD] text-white border-[#CBD5E1]'
          : 'bg-[#D1F1D5] text-[#1A3C66] border-[#2B7DBD]'
      }`}
    >
      {/* 3-dot menu */}
      <div className="absolute top-4 right-4">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV className="text-lg" />
        </button>
        {menuOpen && (
          <div
            className={`absolute right-0 mt-2 py-1 w-40 rounded-md shadow-lg z-10 ${
              isDarkMode ? 'bg-[#1A3C66] text-white' : 'bg-white text-black'
            }`}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                setShowConfirm(true);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 flex items-center gap-2"
            >
              <FaTrash className="text-red-500" /> Delete Project
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className={`p-6 rounded-xl shadow-lg max-w-sm w-full ${
              isDarkMode ? 'bg-[#1A3C66] text-white' : 'bg-white text-[#1A3C66]'
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete <strong>{groupName}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleDelete();
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Content */}
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
