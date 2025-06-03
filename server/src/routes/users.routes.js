import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getUserData, getUserAvatar, getUserRecipes, updateUserData } from "../controllers/user.controller.js";
import uploadMiddleware from "../middleware/upload.middleware.js";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware.js";
import { updateUserValidation } from "../middleware/validation.middleware.js";

const router = new Router();

router.get("/", authMiddleware, getUserData);
router.patch("/", authMiddleware, uploadMiddleware.single("avatar"), updateUserValidation, errorHandlerMiddleware, updateUserData);
router.get("/avatar", authMiddleware, getUserAvatar);
router.get("/recipes", authMiddleware, getUserRecipes);

export default router;