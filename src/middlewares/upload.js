import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:"uploads/",
    filename: (req, file, cb) => {
        const unique = 
        Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(null, unique + path.extname(file.originalname));
    }
});

const allowTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/jpg",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileFilter = (req, file, cb) => {
    if (allowTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"));
    }  
};

export const upload = multer({ storage, limits:{
    fileSize: 10 * 1024 * 1024,
    files: 5
  }, 
    fileFilter 
});