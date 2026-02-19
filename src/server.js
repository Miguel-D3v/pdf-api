import express from 'express';
import { PORT } from './config/env.js';
import { applySecurity } from './middlewares/security.js';
import { apiLimiter } from './middlewares/rateLimit.js';
import pdfRoutes from './routes/Image.routes.js';
import docsRoutes from './routes/Docs.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';   

const app = express();

applySecurity(app);
app.use(apiLimiter);
app.get('/health', (req, res) => {   
    res.json({message: 'Hello, World!'});
});
app.use(pdfRoutes);
app.use(docsRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});