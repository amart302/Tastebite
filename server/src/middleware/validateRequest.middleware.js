import { validationResult } from "express-validator";
import fs from "fs/promises";

async function deleteUploadedFiles(req){
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

export default async function (req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        await deleteUploadedFiles(req);
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};