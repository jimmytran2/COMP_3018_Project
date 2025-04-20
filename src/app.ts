import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

// Local imports
import studentRoutes from "./api/v1/routes/studentRoutes";
import assignmentRoutes from "./api/v1/routes/assignmentRoutes";
import courseRoutes from "./api/v1/routes/courseRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
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
app.use("/api/v1/assignment", assignmentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);
export default app;
