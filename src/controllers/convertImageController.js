import { convertImageBufferToPDF } from "../services/convertImage.js";

export async function convertImage(req, res) {
    try {
        const { buffer, mimeType } = req.file;
        const pdfBuffer = await convertImageBufferToPDF(buffer, mimeType);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=converted.pdf",
        })
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}