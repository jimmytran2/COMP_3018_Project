import Joi, { ObjectSchema } from "joi";

export const assignmentSchema: ObjectSchema = Joi.object({
  id: Joi.string().optional().messages({
    "string.empty": "ID cannot be empty",
    "string.base": "ID must be a string",
  }),
  name: Joi.string().required().messages({
    "any.required": "Assignment name is required",
    "string.empty": "Assignment name cannot be empty",
    "string.base": "Assignment must be a string",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description cannot be empty",
    "string.base": "Description must be a string",
  }),
  subject: Joi.string().required().messages({
    "any.required": "Subject is required",
    "string.empty": "Subject cannot be empty",
    "string.base": "Subject must be a string",
  }),
  dueDate: Joi.date().iso().required().messages({
    "any.required": "Due date is required",
    "date.iso": "Due date must be in ISO format (e.g. 2025-12-25)",
  }),
  status: Joi.string()
    .valid("ongoing", "closed", "graded", "pending")
    .required()
    .messages({
      "any.only":
        'Status must be one of "ongoing", "closed","graded", or "pending"',
    }),
});

export const deleteAssignmentSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  }),
});
