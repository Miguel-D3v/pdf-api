import express from 'express';
import multer from 'multer';       
import { convertController } from '../controllers/convertImage.js';


const upload = multer({ 
    dest: 'uploads/',
    limits :{
        files:5,
        fileSize: 5 * 1024 * 1024
    }
 });
const router = express.Router();

router.post('/convert', upload.array('files',5), convertController);

export default router;