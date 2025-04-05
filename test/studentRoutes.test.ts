import request from "supertest";
import app from "../src/app";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../src/api/v1/controllers/studentControllers";
import type { Student } from "../src/api/v1/models/studentModel";

jest.mock("../src/api/v1/controllers/studentControllers", () => ({
  createStudent: jest.fn((req, res) => res.status(201).send()),
  getAllStudents: jest.fn((req, res) => res.status(200).send()),
  getStudentById: jest.fn((req, res) => res.status(200).send()),
  updateStudent: jest.fn((req, res) => res.status(200).send()),
  deleteStudent: jest.fn((req, res) => res.status(200).send()),
}));

describe("Student Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST api/v1/student", () => {
    it("should call createStudent controller", async () => {
      const mockStudent: Student = {
        id: "S12",
        name: "Michael",
        email: "mscott@dunder.com",
        grade: 4.1,
      };

      await request(app).post("/api/v1/student").send(mockStudent);
      expect(createStudent).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/student", () => {
    it("should call getAllStudents controller", async () => {
      await request(app).get("/api/v1/student");
      expect(getAllStudents).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/student/:id", () => {
    it("should call getStudentsById controller", async () => {
      const mockId: string = "S12";

      await request(app).get(`/api/v1/student/${mockId}`);
      expect(getStudentById).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/student/:id", () => {
    it("should call updateStudent controller", async () => {
      const mockStudent: Partial<Student> = {
        id: "S12",
        name: "Michael",
        email: "mscott@dunder.com",
        grade: 4.1,
      };

      const mockId: string = "A123";

      await request(app).put(`/api/v1/student/${mockId}`).send(mockStudent);
      expect(updateStudent).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/student/:id", () => {
    it("should call deleteStudent controller", async () => {
      const mockId: string = "A123";
      await request(app).delete(`/api/v1/student/${mockId}`);
      expect(deleteStudent).toHaveBeenCalled();
    });
  });
});
