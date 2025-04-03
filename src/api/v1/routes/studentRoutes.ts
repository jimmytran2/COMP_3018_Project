/**
 * Student Routes (studentRoutes.ts)
 *
 * This file defines the routes for managing students in our application.
 * It uses the Express framework for routing and makes calls to the student controller
 * (studentController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as studentController from "../controllers/studentControllers";
import { validateRequest } from "../middleware/validate";
import {
  studentSchema,
  deleteStudentSchema,
} from "../validation/studentValidation";

const router: Router = express.Router();

router.post(
  "/",
  validateRequest(studentSchema),
  studentController.createStudent
);

router.get("/", studentController.getAllStudents);

router.get("/:id", studentController.getStudentById);

router.put(
  "/:id",
  validateRequest(studentSchema),
  studentController.updateStudent
);

router.delete(
  "/:id",
  validateRequest(deleteStudentSchema),
  studentController.deleteStudent
);

export default router;
