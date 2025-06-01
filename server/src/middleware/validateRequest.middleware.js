import { validationResult } from "express-validator";
import { deleteUploadedFiles } from "../utils/fileUtils.js";

export default async function (req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        await deleteUploadedFiles(req);
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};