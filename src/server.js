import express from 'express';
import { PORT } from './config/env.js';
import pdfRoutes from './routes/Image.routes.js';
import docsRoutes from './routes/Docs.routes.js';

const app = express();

app.get('/health', (req, res) => {   
    res.json({message: 'Hello, World!'});
});
app.use(pdfRoutes);
app.use(docsRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});