import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

import convertRoutes from "./routes/convertRoutes.js";
import joinPdfRoutes from "./routes/joinPdfRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/v1", convertRoutes);
app.use("/api/v1", joinPdfRoutes);
app.get("/api/v1/health", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;