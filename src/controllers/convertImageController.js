import  Busboy  from "busboy";
import { convertImageBufferToPDF } from "../services/convertImage.js";

 export function convertImage(req, res) {
    const busboy = Busboy({ headers: req.headers });

    let fileBuffer = [];
    let mimeType;

    busboy.on("file", (fieldname, file, info) => {
        mimeType = info.mimeType;
        file.on("data", (data) => {
            fileBuffer.push(data);
        });
    });

    busboy.on("finish", async () => {
        try { 
            const buffer = Buffer.concat(fileBuffer);

            const pdfBuffer = await convertImageBufferToPDF(buffer , mimeType);

           res.set({
                   "Content-Type": "application/pdf",
                   "Content-Disposition": "attachment; filename=converted.pdf"
                });
            res.send(pdfBuffer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    req.pipe(busboy);
}

