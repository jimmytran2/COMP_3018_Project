import Joi, { ObjectSchema } from "joi";

export const userSchema: ObjectSchema = Joi.object({
  id: Joi.string().optional().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
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
});

export const deleteUserSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  }),
});
