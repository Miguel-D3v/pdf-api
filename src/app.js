import express from 'express';
import convertRoutes from './routes/convertRoutes.js';
import joinPdfRoutes from './routes/joinPdfRoutes.js';

const app = express();

app.get('/health', (req, res) => {
  res.json({ message: 'ok' });
});
app.use(convertRoutes);
app.use(joinPdfRoutes)


export default app;