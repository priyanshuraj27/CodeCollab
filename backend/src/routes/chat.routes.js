import { Router } from "express";
import {
  getProjectChat,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../controllers/chat.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

// 🔒 Protected Routes
chatRouter.get("/:projectId", verifyJWT, getProjectChat);
chatRouter.post("/:projectId", verifyJWT, sendMessage);
chatRouter.patch("/:projectId/:messageId", verifyJWT, editMessage);
chatRouter.delete("/:projectId/:messageId", verifyJWT, deleteMessage);

export default chatRouter;
