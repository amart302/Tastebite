import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getUserData, getUserAvatar, updateUserData, deleteUser } from "../controllers/users.controller.js";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware.js";
import { updateUserValidation } from "../middleware/validation.middleware.js";
import { createSingleUploadMiddleware } from "../middleware/upload.middleware.js";

const router = new Router();

router.get("/", authMiddleware, getUserData);
router.patch("/", authMiddleware, createSingleUploadMiddleware("avatar"), updateUserValidation, errorHandlerMiddleware, updateUserData);
router.get("/avatar", authMiddleware, getUserAvatar);
router.delete("/", authMiddleware, deleteUser);

export default router;