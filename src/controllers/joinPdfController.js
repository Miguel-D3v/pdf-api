import  mergePdfBuffers  from "../services/mergePdfService.js";

export async function joinPdf(req, res) {
  try {
    const buffers = req.files.map((f) => f.buffer);

    const merged = await mergePdfBuffers(buffers);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=merged.pdf",
    });

    res.send(merged);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}