/**
 * @interface Student
 * @description Represents a student object
 *
 * @openapi
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for a student
 *         name:
 *           type: string
 *           description: Full name of the student
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the student
 *         GPA:
 *           type: number
 *           minimum: 0
 *           maximum: 4.5
 *           description: Grade point average (GPA) of the student, ranging from 0 to 4.5
 */
export type Student = {
  id: string;
  name: string;
  email: string;
  GPA: number;
};
