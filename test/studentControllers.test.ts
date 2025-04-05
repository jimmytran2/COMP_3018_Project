jest.mock("../src/api/v1/services/studentServices", () => ({
  createStudent: jest.fn(),
  getAllStudents: jest.fn(),
  getStudentById: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
}));

import { Request, Response, NextFunction } from "express";
import * as studentController from "../src/api/v1/controllers/studentControllers";
import * as studentService from "../src/api/v1/services/studentServices";
import type { Student } from "../src/api/v1/models/studentModel";

jest.mock("../src/api/v1/services/studentServices");

describe("Student Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("createStudent", () => {
    it("should handle a succesful operation", async () => {
      const mockStudent: Student = {
        id: "S12",
        name: "Michael",
        email: "mscott@dunder.com",
        grade: 4.1,
      };

      (studentService.createStudent as jest.Mock).mockResolvedValue(
        mockStudent
      );

      await studentController.createStudent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Student created",
        data: mockStudent,
        status: "success",
      });
    });
  });

  describe("getAllStudents", () => {
    it("should handle a successful operation", async () => {
      const mockStudents: Student[] = [
        {
          id: "S12",
          name: "Michael",
          email: "mscott@dunder.com",
          grade: 4.1,
        },
      ];

      (studentService.getAllStudents as jest.Mock).mockResolvedValue(
        mockStudents
      );

      await studentController.getAllStudents(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Students retrieved",
        data: mockStudents,
        status: "success",
      });
    });
  });

  describe("getStudentById", () => {
    it("should handle a successful operation", async () => {
      const mockStudent: Student = {
        id: "S12",
        name: "Michael",
        email: "mscott@dunder.com",
        grade: 4.1,
      };

      (studentService.getStudentById as jest.Mock).mockResolvedValue(
        mockStudent
      );

      await studentController.getStudentById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Student retrieved",
        data: mockStudent,
        status: "success",
      });
    });
  });

  describe("updateStudent", () => {
    it("should handle a successful operation", async () => {
      const mockStudent: Student = {
        id: "S12",
        name: "Michael",
        email: "mscott@dunder.com",
        grade: 4.1,
      };
      (studentService.updateStudent as jest.Mock).mockResolvedValue(
        mockStudent
      );

      await studentController.updateStudent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Student updated",
        data: mockStudent,
        status: "success",
      });
    });
  });

  describe("deleteStudent", () => {
    it("should handle a successful operation", async () => {
      (studentService.deleteStudent as jest.Mock).mockResolvedValue(undefined);

      await studentController.deleteStudent(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Student deleted",
        status: "success",
      });
    });
  });
});
