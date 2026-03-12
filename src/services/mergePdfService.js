import { PDFDocument } from "pdf-lib";

export default async function mergedPdfBuffers(pdfBuffers){
    const mergedPdf = await PDFDocument.create();

    for(const buffer of pdfBuffers){
        const pdf = await PDFDocument.load(buffer);
        const pages = await mergedPdf.copyPages(pdf,pdf.getPageIndices());

        pages.forEach((page) => mergedPdf.addPage(page));
    }

    const bytes = await mergedPdf.save();
    return Buffer.from(bytes);
}

