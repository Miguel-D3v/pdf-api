import { convertToPDF } from "../services/convertImage.js";
import { cleanup } from "../utils/cleanup.js";
import { zipFiles } from "../utils/zipFiles.js";
import path from "path";

export async function convertController(req, res) {

    const files = req.files;
    let pdfPaths = [];

    if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    try {

        pdfPaths = await Promise.all(
            files.map(file => convertToPDF(file.path))
        );

        if (pdfPaths.length === 1) {
            const absolutePath = path.resolve(pdfPaths[0]);

            return res.download(absolutePath, async () => {
                await cleanup(files, pdfPaths);
            });
        }

        // ZIP
        await zipFiles(res, pdfPaths, "images-converted.zip");

        // 🔥 limpa depois que envio terminou
        await cleanup(files, pdfPaths);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to convert files" });
    }
}
