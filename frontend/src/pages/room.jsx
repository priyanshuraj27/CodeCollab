import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from "../utils/toast";
import { setLoading } from "../redux/authSlice";
import {
    LeaveRoomModal,
    AccessDenied,
    ControlBar,
    ProfileSidebar,
    EscNotification,
    ShareLinkPopup,
    LoadingScreen,
    Footer,
    Header
  } from "../components";
  
const RoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const codeEditorRef = useRef(null);
  const socketRef = useRef(null);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [host , setHost] = useState({});
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [roomLink, setRoomLink] = useState("");
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarContent, setSidebarContent] = useState("participants");
  const [isFullScreenApp, setIsFullScreenApp] = useState(false);
  const [showEscNotification, setShowEscNotification] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [notification, setNotification] = useState(null);
  const socketInitialized = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      AccessDeniedScreenComponent(
        darkMode,
        navigate,
        "/login",
        4,
        "Access Denied",
        "Please log in to access the room.",
        "Redirecting in",
        { redirectFrom: "/room/roomId" }
      );
      const timer = setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Please log in to access the room.",
            redirectFrom: "/room",
          },
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, navigate]);

  const showNotification = useCallback((message, type = "info") => {
    setNotification({
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  useEffect(() => {
    if (isAuthenticated && userData && roomId && !socketInitialized.current) {
      socketInitialized.current = true;
      dispatch(setLoading(true));
      const url = `https://codelab-sq6v.onrender.com/room/${roomId}`;
      axios
        .get(url, {
          params: { user: userData },
          withCredentials: true,
        })
        .then((response) => {
          dispatch(setLoading(false));
          if (response.data.status === "error" || response.data.status === "warning") {
            navigate("/join", {
              state: { message: response.data.message },
            });
          } else if (response.data.status === "success") {
            showSuccessToast(response.data.message);
            setHost(response.data.host);
            setIsHost(response.data.host._id === userData._id);

            const socketOptions = {
              transports: ["websocket", "polling"],
              reconnectionAttempts: 5,
            };

            socketRef.current = io(`https://codelab-sq6v.onrender.com`, socketOptions);

            socketRef.current.on("connect_error", (err) => {
              showErrorToast("Failed to connect to the server. Please try again.");
              navigate("/join", {
                state: { message: "Failed to connect to the server. Please try again." },
              });
            });

            socketRef.current.emit("join-room", {
              roomId,
              user: {
                ...userData,
                isHost,
                isMicOn,
                isCameraOn,
              },
            });

            socketRef.current.on("room-state", (data) => {
              setParticipants(data.roomUsers);
              setCode(data.code);
              setLanguage(data.language);
              setMessages(data.messages);
              setIsHost(data.isHost);
            });

            socketRef.current.on("user-joined", (data) => {
              if (data.user) {
                showNotification(`${data.user?.fullname || 'unknown'} joined the room`, "success");
              }
              setParticipants(data.roomUsers);
            });

            socketRef.current.on("code-update", (newCode) => setCode(newCode));
            socketRef.current.on("language-update", (newLanguage) => setLanguage(newLanguage));
            socketRef.current.on("new-message", (messageData) => {
              setMessages(messageData);
              showNotification(`${messageData.sender.fullname} sent a message in chats`, "info");
            });

            socketRef.current.on("user-left", (data) => {
              setParticipants(data.roomUsers);
              if (data.user && data.user._id !== userData._id) {
                showNotification(`${data.user.fullname} left the room`, "info");
              }
            });

            socketRef.current.on("user-typing", (username) => {
              setTypingContent(`${username} is Typing...`);
              setIsTyping(true);
              if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1000);
            });

            socketRef.current.on("room-closed", () => {
              showNotification("The host left the room. The session is ending.", "error");
              setTimeout(() => navigate("/"), 3000);
            });

            socketRef.current.on("user-blocked", (user) => {
              if (user._id === userData._id) {
                showNotification("You have been blocked from this room.", "error");
                setTimeout(() => navigate("/"), 3000);
              } else {
                showNotification(`User ${user.fullname} has been blocked from this room.`, "error");
              }
            });
          }
          setRoomLink(`${window.location.origin}/room/${roomId}`);
        })
        .catch((err) => {
          dispatch(setLoading(false));
          navigate("/join", {
            state: { message: err.response?.data?.message || "Something went wrong!" },
          });
        });

      return () => {
        if (socketRef?.current) {
          socketRef.current.emit("leave-room");
          socketRef.current.disconnect();
        }
        if (typingTimeoutRef?.current) clearTimeout(typingTimeoutRef.current);
      };
    }
  }, [isAuthenticated, userData, roomId, navigate, showNotification, dispatch]);

  useEffect(() => {
    if (isFullScreenApp) {
      setShowEscNotification(true);
      const timer = setTimeout(() => setShowEscNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFullScreenApp]);

  const toggleCamera = useCallback(() => setIsCameraOn((prev) => !prev), []);
  const toggleMic = useCallback(() => setIsMicOn((prev) => !prev), []);
  const toggleFullScreenApp = useCallback(() => setIsFullScreenApp((prev) => !prev), []);
  const shareRoomLink = useCallback(() => setShowCopyPopup(true), []);

  return (
    <div className={`room-container ${darkMode ? "dark" : "light"}`}>
      {/* Add your components here: Header, Sidebar, CodeEditor, etc. */}
      <Header />
      <ControlBar
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        toggleMic={toggleMic}
        toggleCamera={toggleCamera}
        shareRoomLink={shareRoomLink}
      />
      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
        setLanguage={setLanguage}
        socketRef={socketRef}
        roomId={roomId}
      />
      {showEscNotification && <EscNotification />}
      <Footer />
      <AnimatePresence>
        {showCopyPopup && <ShareLinkPopup link={roomLink} onClose={() => setShowCopyPopup(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default RoomPage;
