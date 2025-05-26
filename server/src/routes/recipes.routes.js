import { Router } from "express";
import { addrecipe } from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = new Router();

// router.get("/", getCategories);
router.post("/additem", addrecipe);

export default router;