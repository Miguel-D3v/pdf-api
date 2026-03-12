import Busboy from "busboy";
import { fileTypeFromBuffer } from "file-type";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; 

export function uploadMiddleware(req, res, next) {
  const busboy = Busboy({ 
    headers: req.headers ,
      limits: {
        files: 1, 
        fileSize : MAX_FILE_SIZE,
      }
  });

  let fileBuffer = [];
  let originalName = null;
  let hasError = false;

  busboy.on("filesLimit", () => {
    hasError = true;
    res.status(400).json({
      error: "Only one file is allowed",
    });
    req.unpipe(busboy);
  });

  busboy.on("file", (fieldname, file , info) => {
    originalName = info.filename;

    file.on("limit", () => {
      hasError = true;
      return res.status(413).json({
        error: "File size exceeds the limit of 5MB"
      });
       req.unpipe(busboy);
    });

    file.on("data", (chunk) => {
      fileBuffer.push(chunk);
    });
  });

   busboy.on("finish", async () => {
    if (hasError) return;

    if (fileBuffer.length === 0) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const buffer = Buffer.concat(fileBuffer);

    const detectedType = await fileTypeFromBuffer(buffer);

    if (!detectedType || !ALLOWED_MIME_TYPES.includes(detectedType.mime)) {
      return res.status(400).json({
        error: "Invalid file type. Only JPEG and PNG are allowed.",
      });
    }

    req.file = {
      buffer,
      mimeType: detectedType.mime,
      originalName,
    };

    next();
  });

  req.pipe(busboy);
}