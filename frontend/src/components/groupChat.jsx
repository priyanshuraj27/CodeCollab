// ChatUI.jsx
import { useState } from "react";
import { Video, Phone, Moon, Sun } from "lucide-react";

export default function ChatUI() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`fixed top-0 right-0 h-screen w-[360px] shadow-lg z-50 transition-colors duration-300 
      ${darkMode ? "bg-[#3C4F67] text-white" : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] text-gray-900"}`}>

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div>
          <h2 className="text-lg font-semibold">🎮 Game 🎮</h2>
          <p className="text-sm text-gray-400">3 members</p>
        </div>
        <div className="flex gap-3 items-center">
          <Phone className="w-5 h-5 cursor-pointer hover:text-[#2B7DBD]" />
          <Video className="w-5 h-5 cursor-pointer hover:text-[#2B7DBD]" />
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-300 hover:text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800 hover:text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-144px)]">
        {/* You */}
        <div className="text-right">
          <div className="inline-block bg-[#2B7DBD] text-white rounded-xl px-4 py-2 text-sm shadow-md">
            Hi!
          </div>
          <p className="text-xs text-gray-300 mt-1">10:10</p>
        </div>

        <div className="text-right">
          <div className="inline-block bg-[#2B7DBD] text-white rounded-xl px-4 py-2 text-sm shadow-md max-w-xs">
            Great, thanks for letting me know! I really look forward to experiencing it soon. 🎉
          </div>
          <p className="text-xs text-gray-300 mt-1">10:11</p>
        </div>

        {/* Others */}
        <div>
          <p className="text-sm font-semibold text-gray-500">David Wayne</p>
          <div className="inline-block bg-white text-gray-900 rounded-xl px-4 py-2 text-sm shadow max-w-xs">
            Does this update fix error 352 for the Engineer character?
          </div>
          <p className="text-xs text-gray-400 mt-1">10:11</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-500">Edward Davidson</p>
          <div className="inline-block bg-white text-gray-900 rounded-xl px-4 py-2 text-sm shadow max-w-xs">
            Oh! They fixed it and upgraded the security further. 🚀
          </div>
          <p className="text-xs text-gray-400 mt-1">10:14</p>
        </div>

        {/* You */}
        <div className="text-right">
          <div className="inline-block bg-[#2B7DBD] text-white rounded-xl px-4 py-2 text-sm shadow-md">
            Great! 😊
          </div>
          <p className="text-xs text-gray-300 mt-1">10:20</p>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center p-4 border-t border-gray-300">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 text-sm text-black outline-none"
        />
        <button className="ml-2 bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white px-4 py-2 rounded-full">
          Send
        </button>
      </div>
    </div>
  );
}
