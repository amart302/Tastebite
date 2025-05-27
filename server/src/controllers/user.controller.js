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
        res.status(500).json({ message: "Ошибка при попытке получить данные пользователя" });
    }
}