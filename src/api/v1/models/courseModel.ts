/**
 * @interface Course
 * @description Represents a course object
 *
 * @openapi
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for a course
 *         name:
 *           type: string
 *           description: Name of the course
 *         room:
 *           type: string
 *           description: Room where the course is held
 *         studentCount:
 *           type: integer
 *           minimum: 0
 *           description: Number of students enrolled in the course (must be at least 0)
 */
export type Course = {
  id: string;
  name: string;
  room: string;
  studentCount: number;
};
