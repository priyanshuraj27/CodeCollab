import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controllers.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// ✅ Public Routes 
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);

// 🔒 Protected Routes
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.post("/change-password", verifyJWT, changeCurrentPassword);
userRouter.get("/current-user", verifyJWT, getCurrentUser);
userRouter.patch("/update-account", verifyJWT, updateAccountDetails);
userRouter.patch("/update-avatar", verifyJWT, upload.single("avatar"), updateUserAvatar);

export default userRouter;
