/**
 * Assignment Controller (assignmentController.ts)
 *
 * This file defines controllers for handling requests and responses related to assignments.
 * The controllers interact with the assignment services to performance logic for
 * CRUD operations on the assignment
 */

import { Request, Response, NextFunction } from "express";
import * as assignmentService from "../services/assignmentServices";
import type { Assignment } from "../models/assignmentModel";
import { successResponse } from "../models/responseModel";

/**
 * @description Create a new assignment
 * @route POST /
 * @returns {Promise<void>}
 */
export const createAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newAssignment: Assignment = await assignmentService.createAssignment(
      req.body
    );
    res.status(201).json(successResponse(newAssignment, "Assignment created"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get all assignments
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assignments: Assignment[] =
      await assignmentService.getAllAssignments();
    res.status(200).json(successResponse(assignments, "Assignments retrieved"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get assignment with corresponding id
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getAssignmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assignment: Assignment = await assignmentService.getAssignmentById(
      req.params.id
    );
    res.status(200).json(successResponse(assignment, "Assignment retrieved"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update an existing assignment
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedAssignment: Assignment =
      await assignmentService.updateAssignment(req.params.id, req.body);
    res
      .status(200)
      .json(successResponse(updatedAssignment, "Assignment updated"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete an assignment
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await assignmentService.deleteAssignment(req.params.id);
    res.status(200).json(successResponse(undefined, "Assignment deleted"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get assignments under a subject
 * @route GET /subject/:subject
 * @returns {Promise<void>}
 */
export const getAssignmentBySubject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assignments: Assignment[] =
      await assignmentService.getAssignmentBySubject(req.params.subject);
    res
      .status(200)
      .json(successResponse(assignments, "Assignments from subject"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get assignments with a given status
 * @route GET /subject/:status
 * @returns {Promise<void>}
 */
export const getAssignmentByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const assignments: Assignment[] =
      await assignmentService.getAssignmentByStatus(req.params.status);
    res
      .status(200)
      .json(successResponse(assignments, "Assignments with status"));
  } catch (error) {
    next(error);
  }
};
