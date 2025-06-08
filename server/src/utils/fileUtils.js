import fs from "fs/promises";
import { join } from "path";
import { getDirname } from "./pathUtils.js";

export async function deleteFilesByName(file, files = null){
    try {
        const __dirname = getDirname(import.meta.url);
        
        if(file){
            await fs.unlink(join(__dirname, "../../uploads/images", file));
        }else if(files){
            await Promise.all(files.map(async (file) => {
                const filePath = file.type.startsWith("image/") ? "../../uploads/images" : "../../uploads/video";
                try {
                    await fs.unlink(join(__dirname, filePath, file.name));
                } catch (err) {
                    console.error(`Не удалось удалить файл`, err.message);
                }
                
            }));
        }
    } catch (error) {
        console.log('Ошибка при удалении файлов:', error.message);
    }
}