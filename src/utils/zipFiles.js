import archiver from "archiver";
import path from "path";

export function zipFiles(res, filePaths, zipName = "files.zip") {
  return new Promise((resolve, reject) => {

    res.attachment(zipName);

    const archive = archiver("zip", {
      zlib: { level: 9 }
    });

    archive.on("error", err => reject(err));

    // resolve quando resposta terminar
    res.on("close", () => resolve());

    archive.pipe(res);

    filePaths.forEach(file => {
      archive.file(file, { name: path.basename(file) });
    });

    archive.finalize();
  });
}
