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
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @route POST /
 * @description Creates a new course
 *
 * @openapi
 * /api/v1/course:
 *   post:
 *     summary: Creates a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             name: "Biology 101"
 *             room: "B204"
 *             studentCount: 25
 *     responses:
 *       201:
 *         description: The newly created course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "C101"
 *                 name: "Biology 101"
 *                 room: "B204"
 *                 studentCount: 25
 *               message: "Course created"
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
  validateRequest(courseSchema),
  courseController.createCourse
);

/**
 * @route GET /
 * @description Gets all courses
 *
 * @openapi
 * /api/v1/course:
 *   get:
 *     summary: Gets all existing courses
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of courses retrieved
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
 *                     $ref: '#/components/schemas/Course'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 - id: "C101"
 *                   name: "Biology 101"
 *                   room: "B204"
 *                   studentCount: 25
 *                 - id: "C102"
 *                   name: "Introduction to Programming"
 *                   room: "A101"
 *                   studentCount: 30
 *               message: "Courses retrieved"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "teacher", "student"] }),
  courseController.getAllCourses
);

/**
 * @route GET /:id
 * @description Gets a course with the corresponding id
 *
 * @openapi
 * /api/v1/course/{id}:
 *   get:
 *     summary: Gets a course by id
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "C101"
 *         required: true
 *         description: ID of the course to be retrieved
 *     responses:
 *       200:
 *         description: The course with the corresponding id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "C101"
 *                 name: "Biology 101"
 *                 room: "B204"
 *                 studentCount: 25
 *               message: "Course retrieved"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "teacher", "student"] }),
  courseController.getCourseById
);

/**
 * @route PUT /:id
 * @description Updates an existing course
 *
 * @openapi
 * /api/v1/course/{id}:
 *   put:
 *     summary: Updates an existing course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "C101"
 *         required: true
 *         description: ID of the course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             name: "Physics 101"
 *             room: "B102"
 *             studentCount: 30
 *     responses:
 *       200:
 *         description: The updated course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Course'
 *                 message:
 *                   type: string
 *             example:
 *               status: "success"
 *               data:
 *                 id: "C101"
 *                 name: "Physics 101"
 *                 room: "B102"
 *                 studentCount: 30
 *               message: "Course updated"
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
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(courseSchema),
  courseController.updateCourse
);

/**
 * @route DELETE /:id
 * @description Deletes a course
 *
 * @openapi
 * /api/v1/course/{id}:
 *   delete:
 *     summary: Deletes an existing course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "C101"
 *         required: true
 *         description: ID of the course to delete
 *     responses:
 *       200:
 *         description: Course deleted
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
 *               message: "Course deleted"
 *       403:
 *         description: Unauthorized - Insufficient role
 *       500:
 *         description: Internal Server Error
 */

router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(deleteCourseSchema),
  courseController.deleteCourse
);

export default router;
