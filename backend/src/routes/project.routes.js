import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addCollaborator,
  removeCollaborator,
  joinProjectByCode,
  getProjectsByTag,
} from "../controllers/project.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

projectRouter.use(verifyJWT);

// ➕ Create a new project
projectRouter.post("/", createProject);

// 📂 Get all projects for logged-in user
projectRouter.get("/", getAllProjects);

// 🔍 Get a specific project by ID
projectRouter.get("/:projectId", getProjectById);

// ✏️ Update a project
projectRouter.patch("/:projectId", updateProject);

// ❌ Delete a project
projectRouter.delete("/:projectId", deleteProject);

// ➕ Add a collaborator
projectRouter.post("/:projectId/collaborators", addCollaborator);

// ❌ Remove a collaborator
projectRouter.delete("/:projectId/collaborators/:userId", removeCollaborator);

// 🧩 Join project via join code
projectRouter.post("/join", joinProjectByCode);

// 🏷️ Get projects by tag
projectRouter.get("/tag/:tag", getProjectsByTag);

export default projectRouter;
