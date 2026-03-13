import { Router } from "express";
import { uploadMultiPdfs } from "../middlewares/uploadMultiPdfMiddleware.js";
import { joinPdf } from "../controllers/joinPdfController.js";

const router = Router();

/**
 * @swagger
 * /join-pdf:
 *   post:
 *     summary: Mescla múltiplos PDFs em um único arquivo
 *     tags: [PDF]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: PDFs mesclados com sucesso
 *       400:
 *         description: Erro na requisição
 */

router.post("/join-pdf", uploadMultiPdfs, joinPdf);

export default router;