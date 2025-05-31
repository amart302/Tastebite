import { Router } from "express";
import { body } from "express-validator";
import { signup, signin } from '../controllers/auth.controller.js';
import validateRequestMiddleware from "../middleware/validateRequest.middleware.js";

const router = new Router();

router.post("/signup", [
    body("fullname")
        .trim()
        .notEmpty().withMessage("Имя пользователя не должно быть пустым")
        .isLength({ max: 150 }).withMessage("Максимальная длина имени пользователя 150 символов"),
    body("email")
        .notEmpty().withMessage("Почта не должна быть пустой")
        .isLength({ max: 150 }).withMessage("Максимальная длина почты 150 символов")
        .isEmail().withMessage("Введите корректную почту")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль не должен быть пустым")
        .isLength({ min: 6, max: 150 }).withMessage("Длина пароля должна быть от 6 до 150 символов")
], validateRequestMiddleware, signup);

router.post("/signin", [
    body("email")
        .notEmpty().withMessage("Почта не должна быть пустой")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 150 }).withMessage("Максимальная длина почты 150 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль не должен быть пустым")
        .isLength({ min: 6, max: 150 }).withMessage("Длина пароля должна быть от 6 до 150 символов")
], validateRequestMiddleware, signin);

export default router;