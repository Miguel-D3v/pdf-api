import multer from "multer";

export const errorHandler = (err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        switch (err.code) {
            case "LIMIT_FILE_COUNT":
                return res.status(400).json({ error: "Maximum of 5 files allowed" });
            case "LIMIT_FILE_SIZE":
                return res.status(400).json({ error: "File size exceeds the limit of 5MB" });
            case "LIMIT_UNEXPECTED_FILE":
                return res.status(400).json({ error: "Unexpected file field " });

            default:
                return res.status(400).json({ error: "Upload failed" 

                });
        }
    }

    if(err.message === "Invalid file type") {
        return res.status(400).json({
            error: err.message
        });
    }

     console.error("Unhandled error:", err);
        res.status(500).json({ error: "Internal Server Error" });
};