import Busboy from "busboy";
import { fileTypeFromBuffer } from "file-type";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = ["application/pdf"];

export function uploadMultiPdfs(req, res, next) {
  const busboy = Busboy({
    headers: req.headers,
    limits: {
      files: MAX_FILES,
      fileSize: MAX_FILE_SIZE,
    },
  });

  const files = [];
  let hasError = false;

  busboy.on("filesLimit", () => {
    hasError = true;
    res.status(400).json({ error: "Maximum 5 PDF files allowed" });
    req.unpipe(busboy);
  });

  busboy.on("file", (fieldname, file, info) => {
    const chunks = [];

    file.on("limit", () => {
      hasError = true;
      res.status(413).json({ error: "File too large (max 10MB each)" });
      req.unpipe(busboy);
    });

    file.on("data", (data) => {
      chunks.push(data);
    });

    file.on("end", async () => {
      if (hasError) return;

      const buffer = Buffer.concat(chunks);


      if (buffer.length === 0) {
        hasError = true;
        return res.status(400).json({ error: "Empty file is not allowed" });
      }

      const detected = await fileTypeFromBuffer(buffer);

      if (!detected || !ALLOWED_MIME.includes(detected.mime)) {
        hasError = true;
        return res.status(400).json({ error: "Only PDF files are allowed" });
      }

      files.push({ buffer });
    });
  });

  busboy.on("finish", () => {
    if (hasError) return;

    if (files.length === 0) {
      return res.status(400).json({ error: "No PDF files uploaded" });
    }

    req.files = files;
    next();
  });

  req.pipe(busboy);
}