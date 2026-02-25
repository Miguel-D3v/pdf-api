import express from 'express';
import convertRoutes from './routes/convertRoutes.js';

const app = express();


app.use(convertRoutes);
app.get('/health', (req, res) => {
  res.json({ message: 'ok' });
});

export default app;