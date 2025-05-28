import { Router } from "express";
import { body } from "express-validator";
import { addRecipe, getRecipes, getRecipe } from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import uploadMiddleware from "../middleware/upload.middleware.js";
import validateRequestMiddleware from "../middleware/validateRequest.middleware.js";

const router = new Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/additem", authMiddleware, uploadMiddleware.array("files", 10), [
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
    body("ingredients")
        .custom(value => {
            if(!JSON.parse(value).length) throw new Error("Добавьте хотя бы один ингредиент");
            return true;
        }),
    body("instructions")
        .custom(value => {
            if(!JSON.parse(value).length) throw new Error("Добавьте хотя бы одну инструкцию");
            return true;
        }),
    body("files")
        .custom((value, { req }) => {
            const files = req.files;
            if (!files || files.length === 0) throw new Error("Загрузите хотя бы одно изображение");
            if (files.length > 10) throw new Error("Количество загружаемых файлов не должно превышать число 10");

            let hasUploadedImage  = false;
            files.forEach(item => {
                if(item.mimetype.startsWith("image")) hasUploadedImage = true;
            });

            if(!hasUploadedImage) throw new Error("Загрузите хотя бы одно изображение");

            return true;
        })
], validateRequestMiddleware, addRecipe);

export default router;