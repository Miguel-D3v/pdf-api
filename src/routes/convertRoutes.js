import express from 'express';
import { convertImage }  from '../controllers/convertImageController.js';

const router = express.Router();

router.post('/convert', convertImage);  

export default  router;