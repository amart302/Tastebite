import { Router } from "express";
import { body } from "express-validator";
import { signup, signin } from '../controllers/auth.controller.js';
import validateRequestMiddleware from "../middleware/validateRequest.middleware.js";

const router = new Router();

router.post("/signup", [
    body("fullname")
        .trim()
        .notEmpty().withMessage("Имя пользователя не должно быть пустым")
        .isLength({ max: 100 }).withMessage("Имя пользователя слишком длинное"),
    body("email")
        .notEmpty().withMessage("Email не должен быть пустым")
        .isLength({ max: 100 }).withMessage("Email слишком длинный")
        .isEmail().withMessage("Введите корректный email")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль не должен быть пустым")
        .isLength({ min: 6, max: 6 }).withMessage("Пароль должен состоять из 6 символов")
], validateRequestMiddleware, signup);

router.post("/signin", [
    body("email")
        .notEmpty().withMessage("Email не должен быть пустым")
        .isEmail().withMessage("Введите корректный email")
        .isLength({ max: 100 }).withMessage("Email слишком длинный")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль не должен быть пустым")
        .isLength({ min: 6, max: 6 }).withMessage("Пароль должен состоять из 6 символов")
], validateRequestMiddleware, signin);

export default router;