import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./db.js";

const app = express();

app.use(cors({
    origin: process.env.corsOrigin,
    credentials: true
}));
app.use(express.json());
app.use("/auth", authRoutes);

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