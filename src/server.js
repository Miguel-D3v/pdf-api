import { PORT } from './config/env.js';
import app from './app.js';
import fs from "fs/promises";

await fs.mkdir("uploads", { recursive: true });
await fs.mkdir("output", { recursive: true });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});