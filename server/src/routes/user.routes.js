import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getUserData, getUserAvatar } from "../controllers/user.controller.js";

const router = new Router();

router.get("/avatar", authMiddleware, getUserAvatar);
router.get("/", authMiddleware, getUserData);

export default router;