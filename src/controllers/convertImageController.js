import { convertImageBufferToPDF } from "../services/convertImage.js";

function removeExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}

export async function convertImage(req, res) {
  try {
    const { buffer, mimeType, originalName } = req.file;

    const pdfBuffer = await convertImageBufferToPDF(buffer, mimeType);

    const baseName = originalName
      ? removeExtension(originalName)
      : `converted-${Date.now()}`;

    const outputName = `${baseName}.pdf`;

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${outputName}"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}