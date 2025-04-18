import {
  Video, VideoOff, Mic, MicOff, Users,
  MessageCircle, LogOut, Bot, Clipboard,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import ControlBarButton from "./controlBarButton";
import { useSelector } from "react-redux";

const ControlBar = ({
  isCameraOn, toggleCamera,
  isMicOn, toggleMic,
  sidebarContent, toggleSidebar,
  showSidebar, shareRoomLink,
  isFullScreenApp, toggleFullScreenApp,
  leaveRoom,
  toggleChat, // ✅ new prop to toggle ChatUI in Room.jsx
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`w-16 flex flex-col items-center py-6 space-y-6 shadow-lg z-10 px-2 ${
        darkMode
          ? "bg-[#3C4F67FF]"
          : "bg-gradient-to-b from-[#D1F1D5] to-[#A7C7E7]"
      }`}
    >
      {/* CAMERA + MIC */}
      <div className="space-y-6">
        <ControlBarButton
          onClick={toggleCamera}
          active={true}
          activeColor={
            isCameraOn
              ? "bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
          }
          darkMode={darkMode}
          title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
        >
          {isCameraOn ? <Video size={22} /> : <VideoOff size={22} />}
        </ControlBarButton>

        <ControlBarButton
          onClick={toggleMic}
          active={true}
          activeColor={
            isMicOn
              ? "bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
          }
          darkMode={darkMode}
          title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
        >
          {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
        </ControlBarButton>
      </div>

      {/* PARTICIPANTS + CHAT + AI */}
      <div className="space-y-6">
        <ControlBarButton
          onClick={() => toggleSidebar("participants")}
          active={showSidebar && sidebarContent === "participants"}
          activeColor="bg-[#2B7DBD] text-white hover:bg-[#1D6FA3]"
          darkMode={darkMode}
          title="Show Participants"
        >
          <Users size={22} />
        </ControlBarButton>

        <ControlBarButton
          onClick={toggleChat} // ✅ updated to toggle chat panel
          active={false} // optional: you can manage chat state if needed
          activeColor="bg-[#2B7DBD] text-white hover:bg-[#1D6FA3]"
          darkMode={darkMode}
          title="Open Chat"
        >
          <MessageCircle size={22} />
        </ControlBarButton>

        <ControlBarButton
          onClick={() => {}}
          active={false}
          inactiveColor={{
            dark: "bg-[#2B7DBD]/10 hover:bg-[#2B7DBD]/20 text-purple-300",
            light: "bg-white hover:bg-blue-100 text-purple-600",
          }}
          darkMode={darkMode}
          title="AI Assistant"
        >
          <Bot size={22} />
        </ControlBarButton>
      </div>

      {/* SHARE + FULLSCREEN + LEAVE */}
      <div className="space-y-6">
        <ControlBarButton
          onClick={shareRoomLink}
          active={false}
          darkMode={darkMode}
          title="Share Room Link"
        >
          <Clipboard size={22} />
        </ControlBarButton>

        <ControlBarButton
          onClick={toggleFullScreenApp}
          active={false}
          darkMode={darkMode}
          title={isFullScreenApp ? "Exit Full Screen" : "Enter Full Screen"}
        >
          {isFullScreenApp ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </ControlBarButton>

        <ControlBarButton
          onClick={leaveRoom}
          active={true}
          activeColor="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
          darkMode={darkMode}
          title="Leave Room"
        >
          <LogOut size={22} />
        </ControlBarButton>
      </div>
    </div>
  );
};

export default ControlBar;
