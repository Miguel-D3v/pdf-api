import app from "./app.js";
import { PORT } from "./config/env.js";
import fs from "fs/promises";

const startServer = async () => {
  try {
    await fs.mkdir("uploads", { recursive: true });
    await fs.mkdir("output", { recursive: true });

    console.log("📁 Pastas garantidas:");
    console.log(" - uploads/");
    console.log(" - output/");
    console.log("CWD:", process.cwd());

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
