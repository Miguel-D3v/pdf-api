import express from 'express';
import { convertImage }  from '../controllers/convertImageController.js';
import { uploadMiddleware} from '../middlewares/uploadMiddleware.js';

const router = express.Router();
router.post('/convert', uploadMiddleware, convertImage);  

export default  router;