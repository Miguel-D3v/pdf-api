import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import fs from "fs";    
import path from "path";

export const convertToPDF = async (imagePath) => {
  try {

    const imageBuffer = await sharp(imagePath)
    .png()
    .toBuffer();
 
    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedPng(imageBuffer);

    const page = pdfDoc.addPage([
        image.width, 
        image.height
    ]);
    page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height
    });

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(
        'output',
        path.basename(imagePath) + '.pdf'
    );
    await fs.promises.writeFile(outputPath, pdfBytes);
    return outputPath;
  } catch (error) {
    console.error("Error converting image to PDF:", error);
    throw error;
  }
};
