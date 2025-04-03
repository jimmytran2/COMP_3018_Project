/**
 * Assignment Routes (assignmentRoutes.ts)
 *
 * This file defines the routes for managing assignments in our application.
 * It uses the Express framework for routing and makes calls to the assignment controller
 * (assignmentController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as assignmentController from "../controllers/assignmentControllers";
import { validateRequest } from "../middleware/validate";
import {
  assignmentSchema,
  deleteAssignmentSchema,
} from "../validation/assignmentValidation";

const router: Router = express.Router();

router.post(
  "/",
  validateRequest(assignmentSchema),
  assignmentController.createAssignment
);

router.get("/", assignmentController.getAllAssignments);

router.get("/:id", assignmentController.getAssignmentById);

router.put(
  "/:id",
  validateRequest(assignmentSchema),
  assignmentController.updateAssignment
);

router.delete(
  "/:id",
  validateRequest(deleteAssignmentSchema),
  assignmentController.deleteAssignment
);

router.get("/subject/:subject", assignmentController.getAssignmentBySubject);

router.get("/status/:status", assignmentController.getAssignmentByStatus);

export default router;
