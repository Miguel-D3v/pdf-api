import express from 'express';
import { convertImage }  from '../controllers/convertImageController.js';
import { uploadMiddleware} from '../middlewares/uploadMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /convert:
 *   post:
 *     summary: Converte imagem para PDF
 *     tags: [PDF]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: PDF gerado com sucesso
 *       400:
 *         description: Erro na requisição
 */

router.post('/convert', uploadMiddleware, convertImage);  

export default  router;