import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User.js";

const generateAccessToken = (id, role) => {
    const payload = { id, role };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};

export async function singup(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const { username, email, role, password, } = req.body;
        const hashPassword = bcrypt.hashSync(password, 8);

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if(existingUser){
            if(existingUser.username === username) return res.status(409).json({ message: "Пользователь с таким именем уже существует" });
            else if(existingUser.email === email) return res.status(409).json({ message: "Пользователь с такой почтой уже существует" });
        }
        await User.create({
            username: username,
            email: email,
            role: role,
            password: hashPassword
        });
        res.status(200).json({ message: "Регистрация прошла успешно" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ошибка регистрации" });
    }
};

export async function signin(req, res) {
    try {
        const { email, password, } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        
        if(!existingUser){
            return res.status(401).json({ message: "Не правильный логин или пароль! Повторите вход" });
        }

        const validPassword = bcrypt.compareSync(password, existingUser.password);
        if(!validPassword){
            return res.status(401).json({ message: "Не правильный логин или пароль! Повторите вход" });
        }

        const token = generateAccessToken(existingUser.id, existingUser.role);
        res.status(200).json({ token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ошибка авторизации" });
    }
};