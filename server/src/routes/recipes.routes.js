import { Router } from "express";
import { body } from "express-validator";
import { addrecipe } from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload.middleware.js";

const router = new Router();

// router.get("/", getCategories);
router.post("/additem", [
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
        .optional()
        .isInt({ min: 1 }).withMessage('Количество порций должно быть положительным числом')
], uploadMiddleware.array("files", 10), addrecipe);

export default router;