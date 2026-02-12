import express from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get('/health', (req, res) => {   
    res.json({message: 'Hello, World!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

