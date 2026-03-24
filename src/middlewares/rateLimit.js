import rateLimit from "express-rate-limit";

export const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true, // Retorna informações de rate limit nos headers
  legacyHeaders: false, // Desativa os headers legados
  message: {
    message: "Too many requests from this IP, try again later."
  }
});