jest.mock("../src/api/v1/services/courseServices", () => ({
  createCourse: jest.fn(),
  getAllCourses: jest.fn(),
  getCourseById: jest.fn(),
  updateCourse: jest.fn(),
  deleteCourse: jest.fn(),
}));

import { Request, Response, NextFunction } from "express";
import * as courseController from "../src/api/v1/controllers/courseControllers";
import * as courseService from "../src/api/v1/services/courseServices";
import type { Course } from "../src/api/v1/models/courseModel";

jest.mock("../src/api/v1/services/courseServices");

describe("Course Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("createCourse", () => {
    it("should handle a successful operation", async () => {
      const mockCourse: Course = {
        id: "COMP-3020",
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      (courseService.createCourse as jest.Mock).mockResolvedValue(mockCourse);

      await courseController.createCourse(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Course created",
        data: mockCourse,
        status: "success",
      });
    });
  });

  describe("getAllCourses", () => {
    it("should handle a successful operation", async () => {
      const mockCourse: Course[] = [
        {
          id: "COMP-3020",
          name: "Networking 101",
          room: "P302",
          studentCount: 12,
        },
      ];

      (courseService.getAllCourses as jest.Mock).mockResolvedValue(mockCourse);

      await courseController.getAllCourses(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Courses retrieved",
        data: mockCourse,
        status: "success",
      });
    });
  });

  describe("getCourseById", () => {
    it("should handle a successful operation", async () => {
      const mockCourse: Course = {
        id: "COMP-3020",
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      (courseService.getCourseById as jest.Mock).mockResolvedValue(mockCourse);

      await courseController.getCourseById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Course retrieved",
        data: mockCourse,
        status: "success",
      });
    });
  });

  describe("updateCourse", () => {
    it("should handle a successful operation", async () => {
      const mockCourse: Course = {
        id: "COMP-3020",
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      (courseService.updateCourse as jest.Mock).mockResolvedValue(mockCourse);

      await courseController.updateCourse(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Course updated",
        data: mockCourse,
        status: "success",
      });
    });
  });

  describe("deleteCourse", () => {
    it("should handle a successful operation", async () => {
      (courseService.deleteCourse as jest.Mock).mockResolvedValue(undefined);

      await courseController.deleteCourse(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Course deleted",
        status: "success",
      });
    });
  });
});
