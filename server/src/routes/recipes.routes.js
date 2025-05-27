import { Router } from "express";
import { body, check } from "express-validator";
import { addRecipe, getRecipes } from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload.middleware.js";

const router = new Router();

router.get("/", getRecipes);
router.post("/additem", authMiddleware, [
    body("title")
        .trim()
        .notEmpty().withMessage("Название обязательно")
        .isLength({ max: 50 }).withMessage("Максимальная длина названия 50 символов"),
    body("category")
        .trim()
        .notEmpty().withMessage("Категория обязательна"),
    body("description")
        .optional()
        .isLength({ max: 3000 }).withMessage("Максимальная длина описания 3000 символов"),
    body("prepTime")
        .notEmpty().withMessage("Время готовки обязательно")
        .isInt({ min: 1 }).withMessage("Время приготовления не должно быть отрицательным числом"),
    body('servings')
        .notEmpty().withMessage("Количество порций обязательно")
        .isInt({ min: 1 }).withMessage('Количество порций должно быть положительным числом'),
    body("ingredients").isArray({ min: 1 }).withMessage("Добавьте игредиенты"),
    body("instructions").isArray({ min: 1 }).withMessage("Добавьте инструкцию"),
], uploadMiddleware.array("files", 10), addRecipe);

export default router;