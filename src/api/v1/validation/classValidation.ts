import Joi, { ObjectSchema } from "joi";

export const courseSchema: ObjectSchema = Joi.object({
  id: Joi.string().optional().messages({
    "string.empty": "ID cannot be empty",
    "string.base": "ID must be a string",
  }),
  name: Joi.string().required().messages({
    "any.required": "Course name is required",
    "string.empty": "Course name cannot be empty",
    "string.base": "Course name must be a string",
  }),
  room: Joi.string().required().messages({
    "any.required": "Room is required",
    "string.empty": "Room cannot be empty",
    "string.base": "Room must be a string",
  }),
  studentCount: Joi.number().integer().min(0).required().messages({
    "any.required": "Grade is required",
    "number.base": "Student count must be a number",
    "number.integer": "Student count must be an integer",
    "number.min": "Student count cannot be negative",
  }),
});

export const deleteClassSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  }),
});
