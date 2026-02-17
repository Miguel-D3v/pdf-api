import { convertDocs } from '../services/convertDocs.js';
import { cleanup } from '../utils/cleanup.js';
import { zipFiles } from '../utils/zipFiles.js';
import path from 'path';

export async function convertDocsController(req, res) {
    const files = req.files;
    let pdfPaths = [];

    if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    try {

        pdfPaths = await Promise.all(
            files.map(file => convertDocs(file.path))
        );

        if (pdfPaths.length === 1) {

            const absolutePath = path.resolve(pdfPaths[0]);

            return res.download(absolutePath)
        }

      if(pdfPaths.length === 1) {

        const absolutePath = path.resolve(pdfPaths[0]);
        return res.download(absolutePath , async ()=> {
            await cleanup(files, pdfPaths);
        });
        }

        await zipFiles(res, pdfPaths, "converted.zip");
        await cleanup(files, pdfPaths);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Conversion failed" });
    }
    finally {
        await cleanup(files, pdfPaths);
    }
}
