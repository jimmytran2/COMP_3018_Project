import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "../src/api/v1/services/studentServices";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../src/api/v1/repositories/firestoreRepository";
import { Student } from "../src/api/v1/models/studentModel";
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase-admin/firestore";

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  createDocument: jest.fn(),
  getDocuments: jest.fn(),
  getDocumentById: jest.fn(),
  updateDocument: jest.fn(),
  deleteDocument: jest.fn(),
}));

describe("Student Service", () => {
  describe("createStudent", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new student and return it", async () => {
      const mockId: string = "A123";
      const mockStudent: Partial<Student> = {
        name: "jimmy",
        email: "jimmy@email.com",
        grade: 1.2,
      };

      (createDocument as jest.Mock).mockResolvedValue(mockId);

      // Call the service
      const result: Student = await createStudent(mockStudent);

      // Assertions
      expect(createDocument).toHaveBeenCalledWith("students", mockStudent);
      expect(createDocument).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        id: mockId,
        ...mockStudent,
      });
    });
  });

  describe("getAllStudents", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all students when the request is successful", async () => {
      // Mock data
      const mockDocs: QueryDocumentSnapshot[] = [
        {
          id: "student1",
          data: () =>
            ({
              name: "jimmy",
              email: "jimmy@email.com",
              grade: 1.2,
            } as DocumentData),
        } as QueryDocumentSnapshot,
        {
          id: "student2",
          data: () =>
            ({
              name: "mike",
              email: "mike@email.com",
              grade: 2.2,
            } as DocumentData),
        } as QueryDocumentSnapshot,
      ];

      const mockSnapshot: QuerySnapshot = {
        docs: mockDocs,
      } as QuerySnapshot;

      (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

      const result: Student[] = await getAllStudents();

      // Assertions
      expect(getDocuments).toHaveBeenCalledWith("students");
      expect(getDocuments).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        id: "student1",
        name: "jimmy",
        email: "jimmy@email.com",
        grade: 1.2,
      });

      expect(result[1]).toEqual({
        id: "student2",
        name: "mike",
        email: "mike@email.com",
        grade: 2.2,
      });
    });
  });
  describe("updateStudent", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should update the student and return the updated data", async () => {
      const mockId: string = "A123";
      const mockStudent: Partial<Student> = {
        name: "jimmy",
        email: "jimmy@email.com",
        grade: 1.2,
      };

      (updateDocument as jest.Mock).mockResolvedValue(undefined);

      const result: Student = await updateStudent(mockId, mockStudent);

      // Assert
      expect(updateDocument).toHaveBeenCalledWith(
        "students",
        mockId,
        mockStudent
      );
      expect(updateDocument).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        id: mockId,
        ...mockStudent,
      });
    });
  });

  describe("deleteStudent", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should delete the student", async () => {
      // Arrange
      const mockId = "A123";
      const mockStudent: Partial<Student> = {
        name: "jimmy",
        email: "jimmy@email.com",
        grade: 1.2,
      };

      // Act
      (getDocumentById as jest.Mock).mockResolvedValue(mockStudent);
      (deleteDocument as jest.Mock).mockResolvedValue(undefined);
      await deleteStudent(mockId);

      // Assertions
      expect(getDocumentById).toHaveBeenCalledWith("students", mockId);
      expect(deleteDocument).toHaveBeenCalledWith("students", mockId);
      expect(deleteDocument).toHaveBeenCalledTimes(1);
    });
  });
});
