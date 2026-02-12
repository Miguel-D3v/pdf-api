import { convertToPDF } from "../services/convert_service.js";
import { cleanup } from "../utils/file.js";
import path from "path";

export async function convertController (req, res){

    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    try {
        const pdfPaths = await Promise.all(
            files.map(file => convertToPDF(file.path))
        );
        
    if (pdfPaths.length === 1) {

      const pdf = pdfPaths[0];

      const absolutePath = path.resolve(pdf);

      return res.download(absolutePath,async () => {
        await cleanup(files, pdfPaths);
      });
    } 
    res.json({ 
        message: "Files converted successfully",
        pdfPaths: pdfPaths  
    });

     await cleanup(files, pdfPaths);

    } catch (error) {
        console.error("Error in convertController:", error);
        res.status(500).json({ error: "Failed to convert files" });
    }
};