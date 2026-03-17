import { Router } from "express";
import { uploadMultiPdfs } from "../middlewares/uploadMultiPdfMiddleware.js";
import { joinPdf } from "../controllers/joinPdfController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();
router.post("/join-pdf", uploadMultiPdfs, asyncHandler(joinPdf));

export default router;