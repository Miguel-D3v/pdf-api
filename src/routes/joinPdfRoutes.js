import { Router } from "express";
import { uploadMultiPdfs } from "../middlewares/uploadMultiPdfMiddleware.js";
import { joinPdf } from "../controllers/joinPdfController.js";

const router = Router();

router.post("/join_pdf", uploadMultiPdfs, joinPdf);

export default router;