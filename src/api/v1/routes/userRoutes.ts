/**
 * User Routes (userRoutes.ts)
 *
 * This file defines the routes for managing users in our application.
 * It uses the Express framework for routing and makes calls to the user controller
 * (userController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as userController from "../controllers/userControllers";
import { validateRequest } from "../middleware/validate";
import { userSchema, deleteUserSchema } from "../validation/userValidation";

const router: Router = express.Router();

router.post("/", validateRequest(userSchema), userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", validateRequest(userSchema), userController.updateUser);

router.delete(
  "/:id",
  validateRequest(deleteUserSchema),
  userController.deleteUser
);

export default router;
