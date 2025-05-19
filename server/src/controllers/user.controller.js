import { User } from "../models/User.js";

export async function getUserAvatar(req, res) {
    try {
        const { id } = req.user;
        const user = await User.findOne({ _id: id }, { avatar: 1 });
        res.status(200).json(user.avatar);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ошибка при попытке получить данные пользователя" });
    }
}