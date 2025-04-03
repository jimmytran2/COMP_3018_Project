/**
 * Student Controller (studentController.ts)
 *
 * This file defines controllers for handling requests and responses related to students.
 * The controllers interact with the student services to performance logic for
 * CRUD operations on the students
 */

import { Request, Response, NextFunction } from "express";
import * as studentService from "../services/studentServices";
import type { Student } from "../models/studentModel";
import { successResponse } from "../models/responseModel";

/**
 * @description Create a new student
 * @route POST /
 * @returns {Promise<void>}
 */
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newStudent: Student = await studentService.createStudent(req.body);
    res.status(201).json(successResponse(newStudent, "Student created"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get all students
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const students: Student[] = await studentService.getAllStudents();
    res.status(200).json(successResponse(students, "Students retrieved"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Gets student with corresponding id
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const student: Student = await studentService.getStudentById(req.params.id);
    res.status(200).json(successResponse(student, "Student retrieved"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update an existing student
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedStudent: Student = await studentService.updateStudent(
      req.params.id,
      req.body
    );

    res.status(200).json(successResponse(updatedStudent, "Student updated"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a student
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(200).json(successResponse(undefined, "Student deleted"));
  } catch (error) {
    next(error);
  }
};
