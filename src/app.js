import express from "express";
import convertRoutes from "./routes/convertRoutes.js";
import joinPdfRoutes from "./routes/joinPdfRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import helmet from "helmet";
import { ipLimiter } from "./middlewares/rateLimit.js";

const app = express();
app.set("trust proxy", 1); // Habilita o trust proxy para obter o IP real do cliente
app.disable("x-powered-by");
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/v1", ipLimiter, convertRoutes);
app.use("/api/v1", ipLimiter, joinPdfRoutes);
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