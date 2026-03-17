import express from 'express';
import { convertImage }  from '../controllers/convertImageController.js';
import { uploadMiddleware} from '../middlewares/uploadMiddleware.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const router = express.Router();
router.post('/convert', uploadMiddleware, asyncHandler(convertImage));

export default router;