import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
        if(allowedTypes.includes(file.mimetype)){
            callback(null, true);
        }else{
            console.log("Допускаются только файлы формата JPG/JPEG/PNG");
            callback(new Error("Ошибка загрузки"), false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 10 }
});

export default upload;