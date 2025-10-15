import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import usersRouter from "./routes/users.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import recipesRoutes from "./routes/recipes.routes.js";
import { connectDB } from "./db.js";
import { getDirname } from "./utils/pathUtils.js";

const app = express();
const __dirname = getDirname(import.meta.url);

app.use(cors({
    origin: process.env.CORSORIGIN,
    credentials: true
}));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/media/image", express.static(path.join(__dirname, "../uploads/images")));
app.use("/media/video", express.static(path.join(__dirname, "../uploads/video")));
app.use("/auth", authRoutes);
app.use("/user", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/recipes", recipesRoutes);

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