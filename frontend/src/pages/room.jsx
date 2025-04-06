import React, { useState, useEffect } from "react";
import {
  TopBar,
  ControlBar,
  ShareLinkPopup,
  EscNotification,
  LeaveRoomModal,
  AccessDenied,
} from "../components";
import CodeEditor from "../components/codeEditor";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const [accessDenied, setAccessDenied] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showEscNotification, setShowEscNotification] = useState(false);
  const [lastEscTime, setLastEscTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hostLeft, setHostLeft] = useState(false);
  const [leaveTimer, setLeaveTimer] = useState(10);

  const roomLink = `${window.location.origin}/room/${roomId}`;

  const shareRoomLink = () => {
    setShowSharePopup(true);
  };

  const leaveRoom = () => {
    navigate("/home");
  };

  const handleCodeDownload = () => {
    const blob = new Blob(["// Your code goes here..."], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-${roomId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 🔐 Simulate Access Check (Replace with real logic later)
  useEffect(() => {
    const checkAccess = async () => {
      try {
        // TODO: Replace with backend check (e.g. fetch /api/room/validate)
        const isAllowed = false;
        if (!isAllowed) {
          setAccessDenied(true);
        }
      } catch (err) {
        setAccessDenied(true);
      }
    };

    checkAccess();
  }, [roomId]);

  // ESC key behavior
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        const now = Date.now();
        if (now - lastEscTime < 2000) {
          leaveRoom();
        } else {
          setShowEscNotification(true);
          setLastEscTime(now);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastEscTime, isFullscreen]);

  // Auto-dismiss ESC notification
  useEffect(() => {
    if (showEscNotification) {
      const timer = setTimeout(() => setShowEscNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showEscNotification]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Auto leave on host-left modal timer
  useEffect(() => {
    if (hostLeft && leaveTimer > 0) {
      const interval = setInterval(() => {
        setLeaveTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (hostLeft && leaveTimer === 0) {
      leaveRoom();
    }
  }, [hostLeft, leaveTimer]);

  // 🚫 Access Denied Handling
  if (accessDenied) return <AccessDenied />;

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-[#3C4F67FF]" : "bg-gray-100"}`}>
      {/* TopBar */}
      <TopBar roomId={roomId} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <ControlBar
          darkMode={isDarkMode}
          shareRoomLink={shareRoomLink}
          leaveRoom={leaveRoom}
        />
        <div className="flex-1 p-2">
          <CodeEditor />
        </div>
      </div>

      {/* Share Link Popup */}
      <ShareLinkPopup
        show={showSharePopup}
        roomLink={roomLink}
        isCopied={isCopied}
        setIsCopied={setIsCopied}
        onClose={() => setShowSharePopup(false)}
        darkMode={isDarkMode}
      />

      {/* ESC Notification */}
      <EscNotification
        show={showEscNotification && isFullscreen}
        darkMode={isDarkMode}
        onClose={() => setShowEscNotification(false)}
      />

      {/* Leave Room Modal */}
      {hostLeft && (
        <LeaveRoomModal
          onDownload={handleCodeDownload}
          onLeave={leaveRoom}
          timer={leaveTimer}
          darkMode={isDarkMode}
        />
      )}

      {/* 🔧 TEMP TEST BUTTON to simulate host left */}
      <button
        onClick={() => {
          setHostLeft(true);
          setLeaveTimer(10);
        }}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50"
      >
        Simulate Host Leaving
      </button>
    </div>
  );
};

export default Room;
