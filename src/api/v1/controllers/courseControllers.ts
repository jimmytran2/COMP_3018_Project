/**
 * Course Controller (courseController.ts)
 *
 * This file defines controllers for handling requests and responses related to courses.
 * The controllers interact with the course services to performance logic for
 * CRUD operations on the courses
 */

import { Request, Response, NextFunction } from "express";
import * as courseService from "../services/courseServices";
import type { Course } from "../models/courseModel";
import { successResponse } from "../models/responseModel";

/**
 * @description Create a new course
 * @route POST /
 * @returns {Promise<void>}
 */
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newCourse: Course = await courseService.createCourse(req.body);
    res.status(201).json(successResponse(newCourse, "Course created"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get all courses
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const courses: Course[] = await courseService.getAllCourses();
    res.status(200).json(successResponse(courses, "Courses retrieved"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Gets course with corresponding id
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const course: Course = await courseService.getCourseById(req.params.id);
    res.status(200).json(successResponse(course, "Course retrieved"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update an existing course
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedCourse: Course = await courseService.updateCourse(
      req.params.id,
      req.body
    );
    res.status(200).json(successResponse(updatedCourse, "Course updated"));
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a course
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(200).json(successResponse(undefined, "Course deleted"));
  } catch (error) {
    next(error);
  }
};
