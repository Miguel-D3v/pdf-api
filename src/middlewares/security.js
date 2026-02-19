import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import express from "express";

export function applySecurity(app) {
    app.disable("x-powered-by");
    app.use(helmet());
    app.use(cors({   
         origin: "*",
         methods: ["GET,POST"],
        }));
    app.use(hpp());
    app.use(morgan("dev"));
    app.use(express.json({ limit: "10mb" }));
}