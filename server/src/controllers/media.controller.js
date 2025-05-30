import fs from "fs";
import { join } from 'path';
import { getDirname } from "../utils/pathUtils.js";

const __dirname = getDirname(import.meta.url);

export function getVideo(req, res){
    try {
        const { video } = req.params;
        const videoPath = join(__dirname, "../../uploads/video", video);
        
        if (!fs.existsSync(videoPath)) {
            return res.status(404).json({ message: "Видео не найдено" });
        }

        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;
            console.log(range, parts, start, end, chunkSize, fileSize)
            const file = fs.createReadStream(videoPath, { start, end });
            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4",
            });
            file.pipe(res);
        } else {
            res.writeHead(200, {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
            });
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось загрузить видео" });
    }
}

export function getImage(req, res){
    try {
        const { image } = req.params;
        const imagePath = join(__dirname, "../../uploads/images", image);
        
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ message: "Изображение не найдено" });
        }
        res.sendFile(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось загрузить изображение" })
    }
}