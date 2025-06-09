import bcrypt from 'bcryptjs';
import { Recipe } from "../models/Recipe.js";
import { User } from "../models/User.js";
import { deleteFilesByName } from '../utils/fileUtils.js';

export async function getUserData(req, res){
    try {
        const { id } = req.user;
        const user = await User.findOne({ _id: id }).select("-password -role").populate("posts");
        if(!user){
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Не удалось загрузить данные пользователя" });
    }
}

export async function getUserAvatar(req, res){
    try {
        const { id } = req.user;
        const user = await User.findOne({ _id: id }, { avatar: 1 });
        if(!user){
            return res.status(404).json({ success: false, message: "Пользователь не найден" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Не удалось загрузить аватар пользователя" });
    }
}

export async function updateUserData(req, res){
    try {
        const { id } = req.user;
        const avatar = req.file;
        const password = req.body.password;
        const user = await User.findOne({ _id: id }).select("-password -role");

        if(!user){
            return res.status(404).json({ success: false, message: "Пользователь не найден" });
        }

        if(password){
            const hashPassword = bcrypt.hashSync(password, 8);
            req.body.password = hashPassword;
        }
        if(avatar){
            req.body.avatar = avatar.filename;
            deleteFilesByName(user.avatar);
        };

        Object.assign(user, req.body);
        await user.save();
        res.status(200).json({ success: true, message: "Данные пользователя успешно обновлены" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Не удалось обновить данные пользователя" });
    }
}

export async function deleteUser(req, res){
    try {
        const { id } = req.user;
        const user = await User.findOne({ _id: id }).populate("posts");;

        if(!user){
            return res.status(404).json({ success: false, message: "Пользователь не найден" });
        }

        const { posts } = user;
        const allFiles = posts.reduce((arr, post) => {
                arr.push(...post.files);
            return arr;
        }, []);
        
        if(posts.length > 0){
            await deleteFilesByName(null, allFiles);
            await Recipe.deleteMany({ _id: { $in: posts } });
        }
        await deleteFilesByName(user.avatar);
        await User.findOneAndDelete({ _id: id });
        res.status(200).json({ success: true, message: "Пользователь успешно удален" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Не удалось удалить пользователя" });
    }
}