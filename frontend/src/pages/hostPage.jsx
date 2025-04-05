import { useState, useEffect } from "react";
import { ClipboardCopy } from "lucide-react";

export default function HostMeetingCard() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [roomId, setRoomId] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    setRoomId(id);
    setCopied(false);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-[#3C4F67FF]' : 'bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7]'}`}>
      <div className={`shadow-xl rounded-2xl border w-[350px] p-6 relative ${darkMode ? 'bg-gradient-to-br from-[#1A3C66] to-[#2B7DBD] text-white border-[#CBD5E1]' : 'bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] text-[#1A3C66] border-[#2B7DBD]'}`}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-sm font-medium text-[#2B7DBD] dark:text-yellow-300"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <h2 className="text-xl font-semibold text-center mb-1">
          Host a New Meeting
        </h2>

        <p className="text-sm text-center mb-4 text-gray-600 dark:text-gray-300">
          Set your group name and generate a unique room ID.
        </p>

        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={`w-full px-3 py-2 mb-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#2B7DBD] ${darkMode ? 'border-gray-500 bg-[#2B7DBD] text-white' : 'border-gray-300 bg-white text-[#1A3C66]'}`}
        />

        <input
          type="text"
          placeholder="Meeting Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-3 py-2 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#2B7DBD] ${darkMode ? 'border-gray-500 bg-[#2B7DBD] text-white' : 'border-gray-300 bg-white text-[#1A3C66]'}`}
        />

        <button
          onClick={generateRoomId}
          className="w-full mb-3 bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Generate Room ID
        </button>

        {roomId && (
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[#2B7DBD] dark:text-white font-mono">
              Room ID: <span className="font-semibold">{roomId}</span>
            </span>
            <button onClick={copyRoomId} className="text-[#2B7DBD] dark:text-white">
              <ClipboardCopy size={18} className={`transition-transform ${copied ? 'scale-125 text-green-500' : 'hover:text-[#1D6FA3]'}`} />
            </button>
          </div>
        )}

        <button
          disabled={!roomId}
          className={`w-full font-medium py-2 px-4 rounded-md transition-colors duration-200 ${
            roomId ? 'bg-[#1A3C66] hover:bg-[#2B7DBD] text-white' : 'bg-gray-500 opacity-50 cursor-not-allowed'
          }`}
        >
          Start Meeting
        </button>
      </div>
    </div>
  );
}