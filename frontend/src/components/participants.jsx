import React from 'react';
import { Settings, UserPlus, Mic, MicOff, Video, VideoOff } from "lucide-react";

const ParticipantsList = ({ participants, darkMode }) => {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {participants.length} People in Room
        </span>
        <button className={`
          flex items-center text-sm font-medium transition-colors
          ${darkMode 
            ? "text-[#2B7DBD] hover:text-white" 
            : "text-[#2B7DBD] hover:text-[#1A3C66]"}
        `}>
          <UserPlus size={16} className="mr-1" />
          Invite
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {participants.map(participant => (
          <div
            key={participant.email}
            className={`
              flex items-center p-3 rounded-xl transition-colors
              ${darkMode 
                ? "hover:bg-slate-800 bg-slate-900" 
                : "hover:bg-blue-50 bg-white border border-gray-200"}
            `}
          >
            {/* Profile */}
            <div className="relative mr-4">
              {participant.profileImage ? (
                <img
                  src={`https://codelab-sq6v.onrender.com/${participant.profileImage}`}
                  alt={participant.fullname}
                  className="h-10 w-10 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2B7DBD] to-[#1A3C66] flex items-center justify-center text-white font-semibold shadow-md">
                  {participant.fullname.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {participant.fullname}
                </p>
                {participant.isHost && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full 
                    ${darkMode 
                      ? "bg-yellow-600 text-yellow-100" 
                      : "bg-yellow-100 text-yellow-700"}
                  `}>
                    Host
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 mt-1 text-xs">
                <div className={`flex items-center gap-1 ${
                  participant.isMicOn
                    ? darkMode ? "text-green-400" : "text-green-600"
                    : darkMode ? "text-red-400" : "text-red-600"
                }`}>
                  {participant.isMicOn ? <Mic size={14} /> : <MicOff size={14} />}
                  <span>{participant.isMicOn ? "Mic On" : "Mic Off"}</span>
                </div>
                <div className={`flex items-center gap-1 ${
                  participant.isCameraOn
                    ? darkMode ? "text-green-400" : "text-green-600"
                    : darkMode ? "text-red-400" : "text-red-600"
                }`}>
                  {participant.isCameraOn ? <Video size={14} /> : <VideoOff size={14} />}
                  <span>{participant.isCameraOn ? "Camera On" : "Camera Off"}</span>
                </div>
              </div>
            </div>

            {/* Host Control Icon */}
            {participant.isHost && (
              <div className={`ml-3 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                <Settings size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;
