export const initSocketServer = (io) => {
  const roomUsers = {}; // roomId => [users]

  io.on("connection", (socket) => {
    // ✅ Handle joining a room
    socket.on("join-room", ({ roomId, user }) => {
      socket.join(roomId);

      if (!roomUsers[roomId]) roomUsers[roomId] = [];
      roomUsers[roomId].push({ ...user, socketId: socket.id });

      // Notify others in the room
      socket.to(roomId).emit("user-joined", {
        user,
        roomUsers: roomUsers[roomId],
      });
    });

    // ✅ Handle code changes
    socket.on("code-change", ({ roomId, code }) => {
      io.to(roomId).emit("code-update", { code });
    });

    // 💬 ✅ Handle chat messages with consistent structure
    socket.on("chat-message", ({ roomId, message }) => {
      // console.log("Message received:", message);

      if (message?.sender && message?.content) {
        io.to(roomId).emit("receive-message", {
          sender: message.sender,
          content: message.content,
          sentAt : Date.now(),
        });
      } else {
        console.warn("Invalid message format received:", message);
      }
    });
    socket.on("delete-message", ({ roomId, messageId }) => {
      io.to(roomId).emit("message-deleted", { messageId });
    });
    // 🚪 Handle disconnect
    socket.on("disconnect", () => {
      for (const roomId in roomUsers) {
        roomUsers[roomId] = roomUsers[roomId].filter(
          (user) => user.socketId !== socket.id
        );

        socket.to(roomId).emit("user-left", {
          socketId: socket.id,
          roomUsers: roomUsers[roomId],
        });

        if (roomUsers[roomId].length === 0) {
          delete roomUsers[roomId];
        }
      }
    });
  });
};
