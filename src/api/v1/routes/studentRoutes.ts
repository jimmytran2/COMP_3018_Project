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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *           example:
 *             name: "Michael Scott"
 *             email: "michaelscott@dmifflin.com"
 *             GPA: 1.2
 *     responses:
 *       201:
 *         description: The newly created student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "S123"
 *                 name: "Michael Scott"
 *                 email: "michaelscott@dmifflin.com"
 *                 GPA: 1.2
 *               message: "Student created"
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
 *         description: The list of students retrieved
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
 *                     $ref: '#/components/schemas/Student'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 - id: "S123"
 *                   name: "Michael Scott"
 *                   email: "michaelscott@dmifflin.com"
 *                   GPA: 1.2
 *                 - id: "S124"
 *                   name: "Dwight Schrute"
 *                   email: "dschrute@dmifflin.com"
 *                   GPA: 3.5
 *               message: "Students retrieved"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
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
 *           example: "S123"
 *         required: true
 *         description: ID of the student to be retrieved
 *     responses:
 *       200:
 *         description: The student with the corresponding id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "S123"
 *                 name: "Michael Scott"
 *                 email: "michaelscott@dmifflin.com"
 *                 GPA: 1.2
 *               message: "Student retrieved"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
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
 *           example: "S123"
 *         required: true
 *         description: ID of the student to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *           example:
 *             name: "Michael Scott"
 *             email: "michaelscott@dmifflin.com"
 *             GPA: 1.2
 *     responses:
 *       200:
 *         description: The updated student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "S123"
 *                 name: "Michael Scott"
 *                 email: "michaelscott@dmifflin.com"
 *                 GPA: 1.2
 *               message: "Student updated"
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
 *           example: "S123"
 *         required: true
 *         description: ID of the student to be deleted
 *     responses:
 *       200:
 *         description: Student deleted
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
 *               message: "Student deleted"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(deleteStudentSchema),
  studentController.deleteStudent
);

export default router;
