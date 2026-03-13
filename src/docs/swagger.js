import swaggerJsdoc from "swagger-jsdoc";

const isProd = process.env.NODE_ENV === "production";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PDF Processing API",
      version: "v1",
      description: "API for converting images to PDF and merging PDF files.",
    },
    servers: [
      {
        url: isProd
          ? "https://pdf-api-n32o.onrender.com/api/v1"
          : "http://localhost:3000/api/v1",
        description: isProd ? "Production" : "Local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
});