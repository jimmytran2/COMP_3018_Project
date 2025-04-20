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
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *           example:
 *             name: "Research Paper"
 *             description: "Write a 10-page paper on climate change."
 *             subject: "Science"
 *             dueDate: "2025-01-01"
 *             status: "assigned"
 *     responses:
 *       201:
 *         description: The newly created assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Assignment'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "A123"
 *                 name: "Research Paper"
 *                 description: "Write a 10-page paper on climate change."
 *                 subject: "Science"
 *                 dueDate: "2025-01-01"
 *                 status: "assigned"
 *               message: "Assignment created"
 *       400:
 *         description: Invalid inputs
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["teacher"] }),
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
 *     security:
 *       bearerAuth: []
 *     responses:
 *       200:
 *         description: The assignments retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Assignment'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 - id: "A123"
 *                   name: "Research Paper"
 *                   description: "Write a 10-page paper on climate change."
 *                   subject: "Science"
 *                   dueDate: "2025-05-01"
 *                   status: "assigned"
 *                 - id: "B456"
 *                   name: "Math Homework"
 *                   description: "Complete problems 1-20 from Chapter 5."
 *                   subject: "Mathematics"
 *                   dueDate: "2025-04-25"
 *                   status: "closed"
 *               message: "Assignments retrieved"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["teacher", "student"] }),
  assignmentController.getAllAssignments
);

/**
 * @route GET /:id
 * @description Gets an assignment with corresponding id
 *
 * @openapi
 * /api/v1/assignment/{id}:
 *   get:
 *     summary: Gets assignment with corresponding id
 *     tags: [Assignment]
 *     security:
 *       bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "A123"
 *         required: true
 *         description: ID of the assignment to be retrieved
 *     responses:
 *       200:
 *         description: The assignment with the corresponding id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Assignment'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "A123"
 *                 name: "Research Paper"
 *                 description: "Write a 10-page paper on climate change."
 *                 subject: "Science"
 *                 dueDate: "2025-05-01"
 *                 status: "assigned"
 *               message: "Assignment retrieved"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["teacher", "student"] }),
  assignmentController.getAssignmentById
);

/**
 * @route PUT /:id
 * @description Updates an existing assignment
 *
 * @openapi
 * /api/v1/assignment/{id}:
 *   put:
 *     summary: Updates an existing assignment
 *     tags: [Assignment]
 *     security:
 *       bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "A123"
 *         required: true
 *         description: ID of the assignment to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *           example:
 *             name: "Research Paper"
 *             description: "Write a 10-page paper on climate change."
 *             subject: "Science"
 *             dueDate: "2025-05-01"
 *             status: "completed"
 *     responses:
 *       200:
 *         description: The updated assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Assignment'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "A123"
 *                 name: "Research Paper"
 *                 description: "Write a 10-page paper on climate change."
 *                 subject: "Science"
 *                 dueDate: "2025-05-01"
 *                 status: "completed"
 *               message: "Assignment updated"
 *       400:
 *         description: Invalid inputs
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["teacher"] }),
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
 *     summary: Deletes an existing assignment
 *     tags: [Assignment]
 *     security:
 *       bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "A123"
 *         required: true
 *         description: ID of the assignment to be deleted
 *     responses:
 *       200:
 *         description: Assignment deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               message: "Assignment deleted"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["teacher"] }),
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
 *     security:
 *       bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *           example: "Math"
 *         required: true
 *         description: name of subject to retrieve assignments from
 *     responses:
 *       200:
 *         description: the assignments under the subject
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Assignment'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 - id: "B456"
 *                   name: "Math Homework"
 *                   description: "Complete problems 1-20 from Chapter 5."
 *                   subject: "Math"
 *                   dueDate: "2025-04-25"
 *                   status: "closed"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/subject/:subject",
  authenticate,
  isAuthorized({ hasRole: ["teacher", "student"] }),
  assignmentController.getAssignmentBySubject
);

/**
 * @route GET /status/:status
 * @description Gets all assignments by status
 *
 * @openapi
 * /api/v1/assignment/status/{status}:
 *   get:
 *     summary: Gets all assignments with a particular status
 *     tags: [Assignment]
 *     security:
 *       bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           example: "ongoing"
 *         required: true
 *         description: the status associated with the assignments
 *     responses:
 *       200:
 *         description: the assignments with the particular status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Assignment'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 - id: "B456"
 *                   name: "Math Homework"
 *                   description: "Complete problems 1-20 from Chapter 5."
 *                   subject: "Math"
 *                   dueDate: "2025-04-25"
 *                   status: "ongoing"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/status/:status",
  authenticate,
  isAuthorized({ hasRole: ["teacher", "student"] }),
  assignmentController.getAssignmentByStatus
);

export default router;
