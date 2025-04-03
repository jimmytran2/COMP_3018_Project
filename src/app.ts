import express, { Express } from "express";
import morgan from "morgan";
import studentRoutes from "./api/v1/routes/studentRoutes";
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

// define GET route for health check
/**
 * @openapi
 * /api/v1/health:
 *  get:
 *   summary: Get health status of the application
 *   tags: [Health]
 *   responses:
 *    200:
 *     description: The application's status, uptime, the current timestamp, and version
 */
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use("/api/v1/student", studentRoutes);

app.use(errorHandler);
export default app;
