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
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @route POST /
 * @description Creates a new student
 *
 * @openapi
 * /api/v1/student:
 *   post:
 *     summary: Creates a new student
 *     tags: [Student]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               GPA:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 4.5
 *     responses:
 *       201:
 *         description: The newly created student
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(studentSchema),
  studentController.createStudent
);

/**
 * @route GET /
 * @description Gets all students
 *
 * @openapi
 * /api/v1/student:
 *   get:
 *     summary: Gets all existing students
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: The list of students
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "teacher"] }),
  studentController.getAllStudents
);

/**
 * @route GET /:id
 * @description Gets a student with the corresponding id
 *
 * @openapi
 * /api/v1/student/{id}:
 *   get:
 *     summary: Gets a student by id
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the student to retrieve
 *     responses:
 *       200:
 *         description: The student with the corresponding id
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "teacher", "student"] }),
  studentController.getStudentById
);

/**
 * @route PUT /:id
 * @description Updates an existing student
 *
 * @openapi
 * /api/v1/student/{id}:
 *   put:
 *     summary: Updates an existing student
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the student to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               GPA:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 4.5
 *     responses:
 *       200:
 *         description: The updated student
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "teacher"] }),
  validateRequest(studentSchema),
  studentController.updateStudent
);

/**
 * @route DELETE /:id
 * @description Deletes a student
 *
 * @openapi
 * /api/v1/student/{id}:
 *   delete:
 *     summary: Deletes an existing student
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the student to delete
 *     responses:
 *       200:
 *         description: Student deleted
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(deleteStudentSchema),
  studentController.deleteStudent
);

export default router;
