import express from "express";
import { convertDocsController} from "../controllers/convertDocs.js";
import multer from "multer";

const upload = multer({
    dest: "uploads/",
    limits: {
        files: 5,
        fileSize: 10 * 1024 * 1024
    }
});

const router = express.Router();

router.post("/convert-docs",upload.array('files',5),convertDocsController);

export default router;