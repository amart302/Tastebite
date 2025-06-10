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
    body("ingredients")
        .custom(value => {
            JSON.parse(value).forEach(item => {
                if(item.name.trim().length > 40) throw new Error("Максимальная длина названия ингредиента 40 символов");
                if(item.amount.length > 10) throw new Error("Максимальная длина колличества ингредиента 10 символов");
                if(item.unit.trim().length > 10) throw new Error("Максимальная длина единицы измерения ингредиента 10 символов");
            });
            
            if(!JSON.parse(value).length) throw new Error("Добавьте ингредиенты");
            return true;
        }),
    body("instructions")
        .custom(value => {
            JSON.parse(value).map(item => {
                if(item.trim().length > 500) throw new Error("Максимальная длина шага инструкции 500 символов");
            });

            if(!JSON.parse(value).length) throw new Error("Добавьте инструкции");
            return true;
        })
];

export const updateValidation = [
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
    body("ingredients")
        .custom(value => {
            JSON.parse(value).forEach(item => {
                if(item.name.trim().length > 40) throw new Error("Максимальная длина названия ингредиента 40 символов");
                if(item.amount.length > 10) throw new Error("Максимальная длина колличества ингредиента 10 символов");
                if(item.unit.trim().length > 10) throw new Error("Максимальная длина единицы измерения ингредиента 10 символов");
            });
            
            if(!JSON.parse(value).length) throw new Error("Добавьте ингредиенты");
            return true;
        }),
    body("instructions")
        .custom(value => {
            JSON.parse(value).map(item => {
                if(item.trim().length > 500) throw new Error("Максимальная длина шага инструкции 500 символов");
            });

            if(!JSON.parse(value).length) throw new Error("Добавьте инструкции");
            return true;
        })
];