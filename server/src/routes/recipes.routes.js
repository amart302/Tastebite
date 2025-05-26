import { Router } from "express";
import { addrecipe } from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload.middleware.js";

const router = new Router();

// router.get("/", getCategories);
router.post("/additem", uploadMiddleware.array("files", 10), addrecipe);

export default router;