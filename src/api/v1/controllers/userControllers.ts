/**
 * User Controller (userController.ts)
 *
 * This file defines controllers for handling requests and responses related to users.
 * The controllers interact with the user services to performance logic for
 * CRUD operations on the users
 */

import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userServices";
import type { User } from "../models/userModels";

/**
 * @description Create a new user
 * @route POST /
 * @returns {Promise<void>}
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser: User = await userService.createUser(req.body);
    res.status(201).json({ message: "User created", data: newUser });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get all users
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: User[] = await userService.getAllUsers();
    res.status(200).json({ message: "Users retrieved", data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Gets user with corresponding id
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: User = await userService.getUserById(req.params.id);
    res.status(200).json({ message: "User retrieved", data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update an existing user
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedUser: User = await userService.updateUser(
      req.params.id,
      req.body
    );

    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a user
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
