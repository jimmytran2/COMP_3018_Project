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

/**
 * @route POST /
 * @description Creates a new course
 *
 * @openapi
 * /api/v1/course:
 *   post:
 *     summary: Creates a new course
 *     tags: [Course]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               room:
 *                 type: string
 *               studentCount:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: The newly created course
 */
router.post("/", validateRequest(courseSchema), courseController.createCourse);

/**
 * @route GET /
 * @description Gets all courses
 *
 * @openapi
 * /api/v1/course:
 *   get:
 *     summary: Gets all existing courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: The list of courses retrieved
 */
router.get("/", courseController.getAllCourses);

/**
 * @route GET /:id
 * @description Gets a course with the corresponding id
 *
 * @openapi
 * /api/v1/course/{id}:
 *   get:
 *     summary: Gets a course by id
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the course to be retrieved
 *     responses:
 *       200:
 *         description: The course with the corresponding id
 */
router.get("/:id", courseController.getCourseById);

/**
 * @route PUT /:id
 * @description Updates an existing course
 *
 * @openapi
 * /api/v1/course/{id}:
 *   put:
 *     summary: Updates an existing course
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               room:
 *                 type: string
 *               studentCount:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: The updated course
 */
router.put(
  "/:id",
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
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the course to delete
 *     responses:
 *       200:
 *         description: Course deleted
 */
router.delete(
  "/:id",
  validateRequest(deleteCourseSchema),
  courseController.deleteCourse
);

export default router;
