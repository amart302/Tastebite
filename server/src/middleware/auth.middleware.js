import jwt from "jsonwebtoken";
import "dotenv/config";

export default function (req, res, next){
    if(req.method === "OPTIONS") return next();

    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(403).json({ message: "Пользователь не авторизован" });
        }
        const token = authHeader.split(" ")[1];
        const decoded  = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Ошибка доступа" });
    }
};