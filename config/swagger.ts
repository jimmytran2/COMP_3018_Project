import swaggerUi from "swagger-ui-express";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import { Express } from "express";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/v1/routes/*.ts"], // Path to the API docs when routes are in separate files
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerDocs: any = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
