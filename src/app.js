import express from 'express';
import convertRoutes from './routes/convertRoutes.js';
import joinPdfRoutes from './routes/joinPdfRoutes.js';

const app = express();


app.use("/api/v1",convertRoutes);
app.use("/api/v1",joinPdfRoutes)
app.get("/api/v1/health", (req, res) => {
  res.json({ message: 'ok' });
});

export default app;