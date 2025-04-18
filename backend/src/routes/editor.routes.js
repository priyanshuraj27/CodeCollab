import { Router } from "express";
import {
    createEditor,
  getEditor,
  saveEditor,
  deleteEditor,
} from "../controllers/editor.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const editorRouter = Router();

// 🔒 Protected Routes

editorRouter.get("/get-editor/:projectId", verifyJWT, getEditor);
editorRouter.patch("/save-editor/:projectId", verifyJWT, saveEditor);
editorRouter.delete("/delete-editor/:projectId", verifyJWT, deleteEditor);
editorRouter.post("/create-editor/:projectId", verifyJWT, createEditor);

export default editorRouter;