import { body } from "express-validator";


export const signUpValidation = [
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
];

export const signInValidation = [
    body("email")
        .notEmpty().withMessage("Почта не должна быть пустой")
        .isEmail().withMessage("Введите корректную почту")
        .isLength({ max: 150 }).withMessage("Максимальная длина почты 150 символов")
        .normalizeEmail(),
    body("password")
        .trim()
        .notEmpty().withMessage("Пароль не должен быть пустым")
        .isLength({ min: 6, max: 150 }).withMessage("Длина пароля должна быть от 6 до 150 символов")
];

export const updateUserValidation = [
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
];

export const addRecipeValidation = [
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
            if(!JSON.parse(value).length) throw new Error("Добавьте ингредиенты");
            return true;
        }),
    body("instructions")
        .custom(value => {
            if(!JSON.parse(value).length) throw new Error("Добавьте инструкции");
            return true;
        }),
    body("files")
        .custom((value, { req }) => {
            const files = req.files;
            if (!files || files.length === 0) throw new Error("Загрузите файлы");
            if (files.length > 10) throw new Error("Максимальное количество загружаемых файлов — 10");

            let hasUploadedImage  = false;
            files.forEach(item => {
                if(item.mimetype.startsWith("image")) hasUploadedImage = true;
            });

            if(!hasUploadedImage) throw new Error("Загрузите хотя бы одно изображение");

            return true;
        })
];