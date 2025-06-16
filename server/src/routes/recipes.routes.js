import { Router } from "express";
import { addRecipe, getRecipes, getRecipe, deleteRecipe, updateRecipe, getRecipesByCategory } from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createUploadMiddleware } from "../middleware/upload.middleware.js";
import validateRequestMiddleware from "../middleware/errorHandler.middleware.js";
import { addRecipeValidation, updateValidation } from "../middleware/validation.middleware.js";

const router = new Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.get("/category/:title", getRecipesByCategory);
router.post("/", authMiddleware, createUploadMiddleware("files"), addRecipeValidation, validateRequestMiddleware, addRecipe);
router.patch("/:id", authMiddleware, createUploadMiddleware("files"), updateValidation, validateRequestMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

export default router;