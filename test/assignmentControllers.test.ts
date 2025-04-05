jest.mock("../src/api/v1/services/assignmentServices", () => ({
  createAssignment: jest.fn(),
  getAllAssignments: jest.fn(),
  getAssignmentById: jest.fn(),
  updateAssignment: jest.fn(),
  deleteAssignment: jest.fn(),
  getAssignmentBySubject: jest.fn(),
  getAssignmentByStatus: jest.fn(),
}));

import { Request, Response, NextFunction } from "express";
import * as assignmentController from "../src/api/v1/controllers/assignmentControllers";
import * as assignmentService from "../src/api/v1/services/assignmentServices";
import type { Assignment } from "../src/api/v1/models/assignmentModel";

jest.mock("../src/api/v1/services/assignmentServices");

describe("Assignment Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("createAssignment", () => {
    it("should handle a successful operation", async () => {
      const mockAssignment: Assignment = {
        id: "A12",
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      (assignmentService.createAssignment as jest.Mock).mockResolvedValue(
        mockAssignment
      );

      await assignmentController.createAssignment(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Assignment created",
        data: mockAssignment,
        status: "success",
      });
    });
  });

  describe("getAllAssignments", () => {
    it("should handle a successful operation", async () => {
      const mockAssignments: Assignment[] = [
        {
          id: "A12",
          name: "science exp",
          description: "volcano",
          subject: "Science",
          dueDate: "1999-12-25",
          status: "graded",
        },
      ];

      (assignmentService.getAllAssignments as jest.Mock).mockResolvedValue(
        mockAssignments
      );

      await assignmentController.getAllAssignments(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Assignments retrieved",
        data: mockAssignments,
        status: "success",
      });
    });
  });

  describe("getAssignmentById", () => {
    it("should handle a succesful opereation", async () => {
      const mockAssignment: Assignment = {
        id: "A12",
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      (assignmentService.getAssignmentById as jest.Mock).mockResolvedValue(
        mockAssignment
      );

      await assignmentController.getAssignmentById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Assignment retrieved",
        data: mockAssignment,
        status: "success",
      });
    });
  });

  describe("updateAssignment", () => {
    it("should handle successful operation", async () => {
      const mockAssignment: Assignment = {
        id: "A12",
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      (assignmentService.updateAssignment as jest.Mock).mockResolvedValue(
        mockAssignment
      );

      await assignmentController.updateAssignment(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Assignment updated",
        data: mockAssignment,
        status: "success",
      });
    });
  });

  describe("deleteAssignment", () => {
    it("should handle successfull operation", async () => {
      (assignmentService.deleteAssignment as jest.Mock).mockResolvedValue(
        undefined
      );

      await assignmentController.deleteAssignment(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Assignment deleted",
        status: "success",
      });
    });
  });

  describe("getAssignmentBySubject", () => {
    it("should handle a succesful operation", async () => {
      const mockAssignment: Assignment[] = [
        {
          id: "A12",
          name: "science exp",
          description: "volcano",
          subject: "Science",
          dueDate: "1999-12-25",
          status: "graded",
        },
      ];

      (assignmentService.getAssignmentBySubject as jest.Mock).mockResolvedValue(
        mockAssignment
      );

      await assignmentController.getAssignmentBySubject(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Assignments from subject retrieved",
        data: mockAssignment,
        status: "success",
      });
    });
  });

  describe("getAssignmentByStatus", () => {
    it("should handle a succesful opereation", async () => {
      const mockAssignment: Assignment[] = [
        {
          id: "A12",
          name: "science exp",
          description: "volcano",
          subject: "Science",
          dueDate: "1999-12-25",
          status: "graded",
        },
      ];

      (assignmentService.getAssignmentByStatus as jest.Mock).mockResolvedValue(
        mockAssignment
      );

      await assignmentController.getAssignmentByStatus(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Assignments with status retrieved",
        data: mockAssignment,
        status: "success",
      });
    });
  });
});
