import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import {
  TopBar,
  ControlBar,
  ShareLinkPopup,
  EscNotification,
  LeaveRoomModal,
  AccessDenied,
  ParticipantsSidebar,
  ChatUI,
} from "../components";
import CodeEditor from "../components/codeEditor";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const token = useSelector((state) => state.auth.token);

  const [accessDenied, setAccessDenied] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showEscNotification, setShowEscNotification] = useState(false);
  const [lastEscTime, setLastEscTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hostLeft, setHostLeft] = useState(false);
  const [leaveTimer, setLeaveTimer] = useState(10);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarContent, setSidebarContent] = useState(null);

  const [participants, setParticipants] = useState([]);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]); // Chat messages state

  const editorRef = useRef();
  const socketRef = useRef();

  const toggleCamera = () => setIsCameraOn((prev) => !prev);
  const toggleMic = () => setIsMicOn((prev) => !prev);

  const toggleFullScreenApp = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const toggleSidebar = (content) => {
    if (showSidebar && sidebarContent === content) {
      setShowSidebar(false);
      setSidebarContent(null);
    } else {
      setShowSidebar(true);
      setSidebarContent(content);
    }
  };

  const shareRoomLink = () => setShowSharePopup(true);
  const leaveRoom = () => navigate("/home");

  const handleCodeDownload = () => {
    const code = editorRef.current?.getCode() || "// No code available";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-${roomId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const isAllowed = true; // Replace with your auth logic
        if (!isAllowed) setAccessDenied(true);
      } catch (err) {
        setAccessDenied(true);
      }
    };
    checkAccess();
  }, [roomId]);

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

  useEffect(() => {
    if (showEscNotification) {
      const timer = setTimeout(() => setShowEscNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showEscNotification]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

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

  useEffect(() => {
    if (!roomId) return;

    socketRef.current = io("http://localhost:3000");

    socketRef.current.emit("join-room", {
      roomId,
      user: { fullname: "Guest" },
    });

    // Receive code updates
    socketRef.current.on("code-update", ({ code }) => {
      if (editorRef.current?.getCode() !== code) {
        editorRef.current.setCode(code);
      }
    });

    // Receive chat messages
    socketRef.current.on("chat-message", (message) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (text) => {
    const message = {
      text,
      sender: "Guest", // Replace with actual user
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit("chat-message", { roomId, message });
    console.log("Sent message:", message);
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/projects/${roomId}/participants`,
          {
            withCredentials: true,
          }
        );
        setParticipants(res.data.data.participants);
        setOwner(res.data.data.owner);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId && showSidebar && sidebarContent === "participants") {
      fetchParticipants();
    }
  }, [roomId, showSidebar, sidebarContent]);

  const roomLink = `${window.location.origin}/room/${roomId}`;
  if (accessDenied) return <AccessDenied />;

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-[#3C4F67FF]" : "bg-gray-100"}`}>
      <TopBar
        roomId={roomId}
        onCopyCode={() => {
          const code = editorRef.current?.getCode();
          if (code) {
            navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        <ControlBar
          isCameraOn={isCameraOn}
          toggleCamera={toggleCamera}
          isMicOn={isMicOn}
          toggleMic={toggleMic}
          isFullScreenApp={isFullscreen}
          toggleFullScreenApp={toggleFullScreenApp}
          shareRoomLink={shareRoomLink}
          leaveRoom={leaveRoom}
          sidebarContent={sidebarContent}
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          toggleChat={() => toggleSidebar("chat")}
        />

        <div className="flex-1 flex">
          <div className="flex-1 p-2">
            <CodeEditor
              ref={editorRef}
              onCodeChange={(newCode) => {
                if (socketRef.current) {
                  socketRef.current.emit("code-change", { roomId, code: newCode });
                }
              }}
            />
          </div>

          {showSidebar && sidebarContent === "participants" && (
            <ParticipantsSidebar
              projectId={roomId}
              darkMode={isDarkMode}
              onClose={() => setShowSidebar(false)}
              participants={participants}
              owner={owner}
              loading={loading}
            />
          )}

          {showSidebar && sidebarContent === "chat" && (
            <ChatUI
              projectId={roomId}
              onClose={() => setShowSidebar(false)}
              darkMode={isDarkMode}
              messages={messages}
              sendMessage={sendMessage}
            />
          )}
        </div>
      </div>

      <ShareLinkPopup
        show={showSharePopup}
        roomLink={roomLink}
        isCopied={isCopied}
        setIsCopied={setIsCopied}
        onClose={() => setShowSharePopup(false)}
        darkMode={isDarkMode}
      />

      <EscNotification
        show={showEscNotification && isFullscreen}
        darkMode={isDarkMode}
        onClose={() => setShowEscNotification(false)}
      />

      {hostLeft && (
        <LeaveRoomModal
          onDownload={handleCodeDownload}
          onLeave={leaveRoom}
          timer={leaveTimer}
          darkMode={isDarkMode}
        />
      )}

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
