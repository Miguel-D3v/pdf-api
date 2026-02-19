import express from "express";
import pdfRoutes from './routes/Image.routes.js';
import docsRoutes from './routes/Docs.routes.js';
import { applySecurity } from './middlewares/security.js';
import { apiLimiter } from './middlewares/rateLimit.js';
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

applySecurity(app);
app.use(apiLimiter);

app.get('/health', (req, res) => {
    res.json({message: 'Hello, World!'});
});

app.use(pdfRoutes);
app.use(docsRoutes);    
app.use(errorHandler)

export default app;