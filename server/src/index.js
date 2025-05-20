import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import { connectDB } from "./db.js";
import { getDirname } from "./utils/pathUtils.js";

const app = express();
const __dirname = getDirname(import.meta.url);

app.use(cors({
    origin: process.env.CORSORIGIN,
    credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))
app.use("/auth", authRoutes);
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {        
        app.listen(PORT, () => {
            console.clear();
            console.log(`Сервер запущен на http://localhost:${PORT}`);
            connectDB();
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();