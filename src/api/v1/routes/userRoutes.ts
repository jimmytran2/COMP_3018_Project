/**
 * User Routes (userRoutes.ts)
 *
 * This file defines the routes for managing users in our application.
 * It uses the Express framework for routing and makes calls to the user controller
 * (userController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as userController from "../controllers/userControllers";

const router: Router = express.Router();

router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
