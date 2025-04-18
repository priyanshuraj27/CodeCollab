import Chat from "../models/chat.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ✅ Get all chat messages for a project
export const getProjectChat = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const chat = await Chat.findOne({ project: projectId })
    .populate("participants", "fullName email avatar")
    .populate("messages.sender", "fullName email avatar");

  // ✅ Instead of throwing, return empty response
  if (!chat) {
    return res
      .status(200)
      .json(new ApiResponse(200, "No chat yet for this project", null));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Chat fetched successfully", chat));
});

// ✅ Send a new message
export const sendMessage = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { content } = req.body;
  const senderId = req.user._id;

  if (!content) throw new ApiError(400, "Message content is required");

  let chat = await Chat.findOne({ project: projectId });

  // ✅ Auto-create chat if it doesn't exist
  if (!chat) {
    chat = await Chat.create({
      project: projectId,
      participants: [senderId],
      messages: [{ sender: senderId, content }],
    });
  } else {
    // Add sender to participants if not already
    if (!chat.participants.includes(senderId)) {
      chat.participants.push(senderId);
    }

    // Push new message
    chat.messages.push({ sender: senderId, content });
    await chat.save();
  }

  // Populate and return updated chat
  const updatedChat = await Chat.findById(chat._id)
    .populate("participants", "fullName email avatar")
    .populate("messages.sender", "fullName email avatar");

  res
    .status(201)
    .json(new ApiResponse(201, "Message sent successfully", updatedChat));
});

// ✅ Edit a message
export const editMessage = asyncHandler(async (req, res) => {
  const { projectId, messageId } = req.params;
  const { newContent } = req.body;
  const userId = req.user._id;

  const chat = await Chat.findOne({ project: projectId });
  if (!chat) throw new ApiError(404, "Chat not found");

  const message = chat.messages.id(messageId);
  if (!message) throw new ApiError(404, "Message not found");

  if (!message.sender.equals(userId)) {
    throw new ApiError(403, "You can only edit your own messages");
  }

  message.content = newContent;
  await chat.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Message edited successfully", chat));
});

// ✅ Delete a message
export const deleteMessage = asyncHandler(async (req, res) => {
  const { projectId, messageId } = req.params;
  const userId = req.user._id;

  const chat = await Chat.findOne({ project: projectId });
  if (!chat) throw new ApiError(404, "Chat not found");

  const message = chat.messages.id(messageId);
  if (!message) throw new ApiError(404, "Message not found");

  if (!message.sender.equals(userId)) {
    throw new ApiError(403, "You can only delete your own messages");
  }

  message.deleteOne();
  await chat.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Message deleted successfully", chat));
});
