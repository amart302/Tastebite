import { Router } from "express";
import { addRecipe, getRecipes, getRecipe } from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload.middleware.js";
import validateRequestMiddleware from "../middleware/errorHandler.middleware.js";
import { addRecipeValidation } from "../middleware/validation.middleware.js";

const router = new Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/additem", authMiddleware, uploadMiddleware.array("files", 10), addRecipeValidation, validateRequestMiddleware, addRecipe);

export default router;