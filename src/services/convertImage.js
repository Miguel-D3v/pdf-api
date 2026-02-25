import { PDFDocument } from "pdf-lib";

export async function convertImageBufferToPDF(imageBuffer, mimeType) {
    const pdfDoc = await PDFDocument.create();

    let embeddedImage;

    if (mimeType === "image/png") {
        embeddedImage = await pdfDoc.embedPng(imageBuffer);
    } else if (mimeType === "image/jpeg") {
        embeddedImage = await pdfDoc.embedJpg(imageBuffer);
    } else {
        throw new Error("Unsupported image type");
    }

    const { width, height } = embeddedImage.scale(1);

    const page = pdfDoc.addPage([width, height]);
    page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width,
        height,
    });

    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes);
}

