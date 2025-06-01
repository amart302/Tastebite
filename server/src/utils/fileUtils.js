import fs from "fs/promises";
import { join } from "path";
import { getDirname } from "./pathUtils.js";

export async function deleteUploadedFiles(req){
    if(!req?.files && !req?.file) return;

    try {
        if(req.file){
            await fs.unlink(req.file.path);
        }else if(req.files){
            await Promise.all(req.files.map(file => fs.unlink(file.path)));
        }
    } catch (error) {
        console.log('Ошибка при удалении файлов:', error.message);
    }
}

export async function deleteFilesByName(file, files = null){
    try {
        const __dirname = getDirname(import.meta.url);
        
        if(file){
            await fs.unlink(join(__dirname, "../../uploads/images", file));
        }else if(files){
            await Promise.all(files.map(file => fs.unlink(join(__dirname, "../../uploads/images", file))));
        }
    } catch (error) {
        console.log('Ошибка при удалении файлов:', error.message);
    }
}