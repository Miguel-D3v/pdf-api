import { convertToPDF } from "../services/convertImage.js";
import { cleanup } from "../utils/cleanup.js";
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
            return res.download(absolutePath);
        }

        res.json({
            message: "Files converted successfully",
            pdfPaths
        });

    } catch (error) {
        console.error("Error in convertController:", error);
        res.status(500).json({ error: "Failed to convert files" });
    }
    finally {
        await cleanup(files, pdfPaths);
    }
}
