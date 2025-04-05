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

/**
 * @route POST /
 * @description Creates a new assignment
 *
 * @openapi
 * /api/v1/assignment:
 *   post:
 *     summary: Creates a new assignment
 *     tags: [Assignment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               subject:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created assignment
 */
router.post(
  "/",
  validateRequest(assignmentSchema),
  assignmentController.createAssignment
);

/**
 * @route GET /
 * @description Gets all assignments
 *
 * @openapi
 * /api/v1/assignment:
 *   get:
 *     summary: Gets all existing assignments
 *     tags: [Assignment]
 *     responses:
 *       200:
 *         description: The assignments retrieved
 */
router.get("/", assignmentController.getAllAssignments);

/**
 * @route GET /:id
 * @description Gets a assignment with corresponding id
 *
 * @openapi
 * /api/v1/assignment/{id}:
 *   get:
 *     summary: Gets assignment with corresponding id
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the assignment to be retrieved
 *     responses:
 *       200:
 *         description: the assignment with the corresponding id
 */
router.get("/:id", assignmentController.getAssignmentById);

/**
 * @route PUT /:id
 * @description Updates an existing assignment
 *
 * @openapi
 * /api/v1/assignment/{id}:
 *   put:
 *     summary: updates an existing assignment
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the assignment to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               subject:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: the updated assignment
 */
router.put(
  "/:id",
  validateRequest(assignmentSchema),
  assignmentController.updateAssignment
);

/**
 * @route DELETE /:id
 * @description Deletes an assignment
 *
 * @openapi
 * /api/v1/assignment/{id}:
 *   delete:
 *     summary: deletes an existing assignment
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the assignment to be deleted
 *     responses:
 *       200:
 *         description: assignment deleted
 */
router.delete(
  "/:id",
  validateRequest(deleteAssignmentSchema),
  assignmentController.deleteAssignment
);

/**
 * @route GET /subject/:subject
 * @description Gets all assignments under a subject
 *
 * @openapi
 * /api/v1/assignment/subject/{subject}:
 *   get:
 *     summary: Gets all assignments under a subject
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: name of subject to retrieve assignments from
 *     responses:
 *       200:
 *         description: the assignments under the subject
 */
router.get("/subject/:subject", assignmentController.getAssignmentBySubject);

/**
 * @route GET /status/:status
 * @description Gets all assignments with a status
 *
 * @openapi
 * /api/v1/assignment/status/{status}:
 *   get:
 *     summary: Gets all assignments with a particular status
 *     tags: [Assignment]
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: the status associated with the assignments
 *     responses:
 *       200:
 *         description: the assignments with the particular status
 */
router.get("/status/:status", assignmentController.getAssignmentByStatus);

export default router;
