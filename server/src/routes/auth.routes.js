import { Router } from "express";
import { body } from "express-validator";
import { singup, signin } from '../controllers/auth.controller.js';

const router = new Router();

router.post("/singup", [
    body("username")
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
        .isLength({ min: 4, max: 4 }).withMessage("Пароль должен состоять из 4 символов")
], singup);

router.post("/signin", [
    body("email")
        .notEmpty().withMessage("Email не должен быть пустым")
        .isEmail().withMessage("Введите корректный email")
        .isLength({ max: 100 }).withMessage("Email слишком длинный")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль не должен быть пустым")
        .isLength({ min: 4, max: 4 }).withMessage("Пароль должен состоять из 4 символов")
], signin);

export default router;