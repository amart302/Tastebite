import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let uploadDir = "uploads/images";
        
        if(file.mimetype.startsWith("video/")) uploadDir = "uploads/video";
        callback(null, uploadDir);
    },
    filename: function (req, file, callback) {
        let filename = Date.now() + path.extname(file.originalname);
        callback(null, filename);
    },
});

export default multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
        if(allowedTypes.includes(file.mimetype)){
            callback(null, true);
        }else{
            console.log("Допускаются только файлы формата JPG/JPEG/PNG");
            callback(new Error("Ошибка загрузки"), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 100,
        files: 10
    }
});