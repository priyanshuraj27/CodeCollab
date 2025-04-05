import { useState } from "react";
import { useSelector } from "react-redux";
import { Settings, Bell, LogOut, User, X } from "lucide-react";

export default function ProfileSidebar() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div
      className={`fixed right-0 top-0 w-80 h-screen p-6 flex flex-col justify-between border-l z-50 transition-colors duration-300 ${
        darkMode
          ? "bg-[#3C4F67FF] text-white border-[#2B7DBD]"
          : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] text-[#1A3C66] border-[#2B7DBD]"
      }`}
    >
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold">Profile</h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2B7DBD] to-[#1A3C66] flex items-center justify-center text-white text-3xl font-bold">
            P
          </div>
          <h3 className="mt-3 text-lg font-semibold">Priyanshu</h3>
          <p className="text-sm opacity-80">priyanshu@gmail.com</p>
        </div>

        <div className="space-y-4">
          <button className="flex items-center gap-3 text-sm font-medium w-full hover:text-[#2B7DBD] transition-colors">
            <User size={18} /> Edit Profile
          </button>

          <button
            onClick={handleNotificationClick}
            className="flex items-center gap-3 text-sm font-medium w-full hover:text-[#2B7DBD] transition-colors"
          >
            <Bell size={18} /> Notifications
          </button>

          <button className="flex items-center gap-3 text-sm font-medium w-full hover:text-[#2B7DBD] transition-colors">
            <Settings size={18} /> Settings
          </button>
        </div>

        {showNotifications && (
          <div
            className={`mt-6 p-4 rounded-xl border transition-colors duration-300 ${
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
      </div>

      <div className="mt-auto pt-6">
        <button className="flex items-center gap-3 justify-center w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
