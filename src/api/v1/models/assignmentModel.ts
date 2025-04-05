/**
 * @interface Assignment
 * @description Represents an assignment object
 *
 * @openapi
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for an assignment
 *         name:
 *           type: string
 *           description: Title or name of the assignment
 *         description:
 *           type: string
 *           description: Detailed description of the assignment
 *         subject:
 *           type: string
 *           description: Subject the assignment is related to
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Due date for the assignment (e.g. 2025-12-25)
 *         status:
 *           type: string
 *           description: Current status of the assignment (i.e., "ongoing", "closed", or "graded")
 */
export type Assignment = {
  id: string;
  name: string;
  description: string;
  subject: string;
  dueDate: string;
  status: string;
};
