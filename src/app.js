import express from "express";
import convertRoutes from "./routes/convertRoutes.js";
import joinPdfRoutes from "./routes/joinPdfRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/api/v1", convertRoutes);
app.use("/api/v1", joinPdfRoutes);
app.get("/api/v1/health", (req, res) => {
  res.json({ message: "ok" });
});

app.use((req, res, next) => {
  const err = new Error('Rota não encontrada');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

export default app;