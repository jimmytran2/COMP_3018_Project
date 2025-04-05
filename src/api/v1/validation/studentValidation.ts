import Joi, { ObjectSchema } from "joi";

export const studentSchema: ObjectSchema = Joi.object({
  id: Joi.string().optional().messages({
    "string.empty": "ID cannot be empty",
    "string.base": "ID must be a string",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
    "string.base": "Name must be a string",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ca", "org"] },
    })
    .required()
    .messages({
      "any.required": "Email is required",
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
    }),
  grade: Joi.number().min(0).max(4.5).required().messages({
    "any.required": "Grade is required",
    "number.base": "Grade must be a number",
    "number.min": "Grade cannot be less than 0",
    "number.max": "Grade cannot be greater than 4.5",
  }),
});

export const deleteStudentSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  }),
});
