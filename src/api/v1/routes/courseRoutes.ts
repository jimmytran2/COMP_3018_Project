/**
 * Course Routes (courseRoutes.ts)
 *
 * This file defines the routes for managing courses in our application.
 * It uses the Express framework for routing and makes calls to the course controller
 * (courseController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as courseController from "../controllers/courseControllers";
import { validateRequest } from "../middleware/validate";
import {
  courseSchema,
  deleteCourseSchema,
} from "../validation/courseValidation";

const router: Router = express.Router();

router.post("/", validateRequest(courseSchema), courseController.createCourse);

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getCourseById);

router.put(
  "/:id",
  validateRequest(courseSchema),
  courseController.updateCourse
);

router.delete(
  "/:id",
  validateRequest(deleteCourseSchema),
  courseController.deleteCourse
);

export default router;
