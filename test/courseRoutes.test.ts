import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../src/api/v1/controllers/courseControllers";
import type { Course } from "../src/api/v1/models/courseModel";

jest.mock("../src/api/v1/controllers/courseControllers", () => ({
  createCourse: jest.fn((req, res) => res.status(201).send()),
  getAllCourses: jest.fn((req, res) => res.status(200).send()),
  getCourseById: jest.fn((req, res) => res.status(200).send()),
  updateCourse: jest.fn((req, res) => res.status(200).send()),
  deleteCourse: jest.fn((req, res) => res.status(200).send()),
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

describe("Course Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST api/v1/course", () => {
    it("should call createCourse controller", async () => {
      const mockCourse: Course = {
        id: "COMP-3020",
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      await request(app).post("/api/v1/course").send(mockCourse);
      expect(createCourse).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/course", () => {
    it("should call getAllCourses controller", async () => {
      await request(app).get("/api/v1/course");
      expect(getAllCourses).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/course/:id", () => {
    it("should call getCourseById controller", async () => {
      const mockId: string = "A123";

      await request(app).get(`/api/v1/course/${mockId}`);
      expect(getCourseById).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/course/:id", () => {
    it("should call updateCourse controller", async () => {
      const mockCourse: Partial<Course> = {
        id: "COMP-3020",
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      const mockId: string = "A123";

      await request(app).put(`/api/v1/course/${mockId}`).send(mockCourse);
      expect(updateCourse).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/course/:id", () => {
    it("should call deleteCourse controller", async () => {
      const mockId: string = "A123";
      await request(app).delete(`/api/v1/course/${mockId}`);
      expect(deleteCourse).toHaveBeenCalled();
    });
  });
});
