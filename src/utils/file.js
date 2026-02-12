import fs from "fs";


export async function cleanup(files, pdfPaths) {
  try {

    for (const file of files) {
      await fs.promises.unlink(file.path);
    }
    for (const pdf of pdfPaths) {
      await fs.promises.unlink(pdf);
    }

  } catch (err) {
    console.error("Erro ao limpar arquivos:", err);
  }
}