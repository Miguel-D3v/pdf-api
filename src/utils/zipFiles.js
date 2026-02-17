import archiver from "archiver";
import path from "path";


export function zipFiles(res, filePaths, zipName = "files.zip") {
   return new Promise((resolve, reject) => {

    res.atachment(zipName);

    const archive = archiver("zip", {
        zlib: { level: 9 }
    });
    archive.pipe(res);
    archive.on("error", err => reject(err));

    // adiciona arquivos 
    filePaths.forEach(file => {
        archive.file(file, { name: path.basename(file) });
    }
    );

    archive.finalize();
    archive.on("end", () => resolve());
   });
}

