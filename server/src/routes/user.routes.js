import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getUserData, getUserAvatar, getUserRecipes, updateUserData } from "../controllers/user.controller.js";
import uploadMiddleware from "../middleware/upload.middleware.js";
import { body } from "express-validator";
import validateRequestMiddleware from "../middleware/validateRequest.middleware.js";

const router = new Router();

router.get("/", authMiddleware, getUserData);
router.patch("/", authMiddleware, uploadMiddleware.single("avatar"), [
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
        .custom(value => {
            if(value){
                if(value.length < 6 || value.length > 150) throw new Error("Длина пароля должна быть от 6 до 150 символов");
            }
            return true;
        })
], validateRequestMiddleware, updateUserData);
router.get("/avatar", authMiddleware, getUserAvatar);
router.get("/recipes", authMiddleware, getUserRecipes);

export default router;