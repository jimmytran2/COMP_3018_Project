import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAssignmentBySubject,
  getAssignmentByStatus,
} from "../src/api/v1/controllers/assignmentControllers";
import type { Assignment } from "../src/api/v1/models/assignmentModel";

jest.mock("../src/api/v1/controllers/assignmentControllers", () => ({
  createAssignment: jest.fn((req, res) => res.status(201).send()),
  getAllAssignments: jest.fn((req, res) => res.status(200).send()),
  getAssignmentById: jest.fn((req, res) => res.status(200).send()),
  updateAssignment: jest.fn((req, res) => res.status(200).send()),
  deleteAssignment: jest.fn((req, res) => res.status(200).send()),
  getAssignmentBySubject: jest.fn((req, res) => res.status(200).send()),
  getAssignmentByStatus: jest.fn((req, res) => res.status(200).send()),
}));

jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((req: Request, res: Response, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(
    () =>
      (req: Request, res: Response, next: NextFunction): void =>
        next()
  );
});

jest.mock("../src/api/v1/middleware/rateLimiter", () => ({
  apiLimiter: (req: any, res: any, next: any) => next(),
}));

describe("Assignment Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST api/v1/assignment", () => {
    it("should call createAssignment controller", async () => {
      const mockAssignment: Assignment = {
        id: "A12",
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      await request(app).post("/api/v1/assignment").send(mockAssignment);
      expect(createAssignment).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/assignment", () => {
    it("should call getAllAssignments controller", async () => {
      await request(app).get("/api/v1/assignment");
      expect(getAllAssignments).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/assignment/:id", () => {
    it("should call getAssignmentById controller", async () => {
      const mockId: string = "A12";

      await request(app).get(`/api/v1/assignment/${mockId}`);
      expect(getAssignmentById).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/assignemnt/:id", () => {
    it("should call updateAssignment controller", async () => {
      const mockAssignment: Partial<Assignment> = {
        id: "A12",
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      const mockId: string = "A12";

      await request(app)
        .put(`/api/v1/assignment/${mockId}`)
        .send(mockAssignment);
      expect(updateAssignment).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/assignment/:id", () => {
    it("should call deleteAssignment controller", async () => {
      const mockId: string = "A123";
      await request(app).delete(`/api/v1/assignment/${mockId}`);
      expect(deleteAssignment).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/assignment/subject/:subject", () => {
    it("should call getAssignmentBySubject controller", async () => {
      const mockSubject: string = "Science";
      await request(app).get(`/api/v1/assignment/subject/${mockSubject}`);
      expect(getAssignmentBySubject).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/assignment/status/:status", () => {
    it("should call getAssignmentByStatus controller", async () => {
      const mockStatus: string = "ongoing";
      await request(app).get(`/api/v1/assignment/status/${mockStatus}`);
      expect(getAssignmentByStatus).toHaveBeenCalled();
    });
  });
});
