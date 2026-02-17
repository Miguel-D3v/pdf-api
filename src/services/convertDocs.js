import { spawn } from 'child_process';
import path from 'path';

export const convertDocs = (docPath) => {
  return new Promise((resolve, reject) => {

    const sofficePath =
      'C:\\Program Files\\LibreOffice\\program\\soffice.exe';

    const outputDir = path.resolve('output');

    const args = [
      '--headless',
      '--convert-to',
      'pdf',
      '--outdir',
      outputDir,
      path.resolve(docPath)
    ];

    const proc = spawn(sofficePath, args);

    proc.on('error', (err) => {
      console.error("LibreOffice spawn error:", err);
      reject(err);
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error("Conversion failed"));
      }

      const fileName = path.parse(docPath).name;
      const pdfPath = path.join(outputDir, fileName + '.pdf');

      resolve(pdfPath);
    });

  });
};
