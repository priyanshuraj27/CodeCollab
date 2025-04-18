import { useEffect, useRef, useState } from "react";
import { Video, Phone, X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function ChatUI({ projectId: roomId, onClose }) {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showDeleteFor, setShowDeleteFor] = useState(null);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  const currentUser = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Initialize socket
  useEffect(() => {
    socketRef.current = io("http://localhost:3000", { withCredentials: true });

    socketRef.current.on("connect", () => {
      // console.log("✅ Socket connected:", socketRef.current.id);
    });

    if (roomId && currentUser) {
      socketRef.current.emit("join-room", {
        roomId,
        user: { _id: currentUser._id, fullName: currentUser.fullName },
      });

      socketRef.current.on("receive-message", (msg) => {
        if (!msg?.content || !msg?.sender) return;
        setMessages((prev) => [...prev, msg]);
      });

      socketRef.current.on("message-deleted", ({ messageId }) => {
        setMessages((prev) => prev.filter((m) => m._id !== messageId));
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, currentUser]);

  // Fetch chat history
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/chat/${roomId}`, {
          withCredentials: true,
        });
        if (res.data?.data) {
          setChat(res.data.data);
          setMessages(res.data.data.messages || []);
        } else {
          setChat({ messages: [] });
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to fetch chat", error);
      }
    };

    if (roomId) fetchChat();
  }, [roomId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMsg = {
      content: message.trim(),
      sender: { _id: currentUser._id, fullName: currentUser.fullName },
      sentAt: new Date().toISOString(),
    };

    try {
      await axios.post(
        `http://localhost:3000/api/v1/chat/${roomId}`,
        { content: newMsg.content },
        { withCredentials: true }
      );

      setMessage("");
      socketRef.current?.emit("chat-message", {
        roomId,
        message: newMsg,
      });
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleDeleteMessage = async (msgId) => {
    console.log("Deleting message with ID:", msgId);
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/chat/${roomId}/${msgId}`, {
        withCredentials: true,
      });

      socketRef.current?.emit("delete-message", {
        roomId,
        messageId: msgId,
      });
      setShowDeleteFor(null);
    } catch (err) {
      console.error("Error deleting message", err);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-[360px] shadow-lg z-50 transition-colors duration-300 
        ${darkMode ? "bg-[#3C4F67] text-white" : "bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] text-gray-900"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div>
          <h2 className="text-lg font-semibold">💬 Chat Room</h2>
          <p className="text-sm text-gray-400">{messages.length} messages</p>
        </div>
        <div className="flex gap-3 items-center">
          <Phone className="w-5 h-5 cursor-pointer hover:text-[#2B7DBD]" />
          <Video className="w-5 h-5 cursor-pointer hover:text-[#2B7DBD]" />
          <X className="w-5 h-5 cursor-pointer hover:text-red-500" onClick={onClose} />
        </div>
      </div>

      {/* Chat Body */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-144px)]">
        {messages.map((msg) => {
          if (!msg || !msg.sender) return null;
          // console.log("Rendering message:", msg);
          const isMe = msg.sender._id === currentUser._id;
          const messageId = msg._id;

          return (
            <div
              key={messageId}
              className={`${isMe ? "text-right" : "text-left"} w-full`}
              onDoubleClick={() => {
                if (isMe) {
                  setShowDeleteFor((prev) => (prev === messageId ? null : messageId));
                }
              }}
            >
              {!isMe && (
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  {msg.sender.fullName}
                </p>
              )}

              <div className="relative inline-block cursor-pointer">
                <div
                  className={`inline-block px-4 py-2 text-sm rounded-xl shadow-md max-w-xs ${
                    isMe ? "bg-[#2B7DBD] text-white" : "bg-white text-gray-900"
                  }`}
                >
                  {msg.content}
                </div>

                {showDeleteFor === messageId && isMe && (
                  <button
                    onClick={() => handleDeleteMessage(messageId)}
                    className="absolute -bottom-6 left-0 text-xs text-red-500 bg-white border border-red-300 px-2 py-[2px] rounded shadow hover:bg-red-100"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="text-xs mt-1 text-gray-400">
                {new Date(msg.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-4 border-t border-gray-300">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 rounded-full px-4 py-2 text-sm text-black outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
