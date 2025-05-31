import { Recipe } from "../models/Recipe.js";
import { User } from "../models/User.js";

export async function getUserData(req, res){
    try {
        const { id } = req.user;
        const user = await User.findOne({ _id: id }).select("-password -role");
        if(!user){
            res.status(404).json({ message: "Пользователь не найден" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось загрузить данные пользователя" });
    }
}

export async function getUserAvatar(req, res){
    try {
        const { id } = req.user;
        const avatar = await User.findOne({ _id: id }, { avatar: 1 });
        if(!avatar){
            res.status(404).json({ message: "Пользователь не найден" });
        }
        res.status(200).json(avatar);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось загрузить аватар пользователя" });
    }
}

export async function updateUserData(req, res){
    try {
        console.log(req.body, 123);
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось обновить данные пользователя" });
    }
}

export async function getUserRecipes(req, res){
    try {
        const { id } = req.user;
        const user = await User.findOne({ _id: id }).select("-password -role");
        if (!user || !user.posts.length) {
            return res.status(404).json({ message: "Посты не найдены" });
        }

        const posts = await Recipe.find({ _id: { $in: user.posts } });
        
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось загрузить рецепты пользователя" });
    }
}