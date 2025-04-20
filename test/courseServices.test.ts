import {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} from "../src/api/v1/services/courseServices";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../src/api/v1/repositories/firestoreRepository";
import { Course } from "../src/api/v1/models/courseModel";
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

describe("Course Service", () => {
  describe("createCourse", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new course and return it", async () => {
      const mockId: string = "A123";
      const mockCourse: Partial<Course> = {
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      (createDocument as jest.Mock).mockResolvedValue(mockId);

      // Call the service
      const result: Course = await createCourse(mockCourse);

      // Assertions
      expect(createDocument).toHaveBeenCalledWith("courses", mockCourse);
      expect(createDocument).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        id: mockId,
        ...mockCourse,
      });
    });
  });

  describe("getAllCourses", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all courses when the request is successful", async () => {
      // Mock data
      const mockDocs: QueryDocumentSnapshot[] = [
        {
          id: "course1",
          data: () =>
            ({
              name: "Networking 101",
              room: "P302",
              studentCount: 12,
            } as DocumentData),
        } as QueryDocumentSnapshot,
        {
          id: "course2",
          data: () =>
            ({
              name: "Backend Dev",
              room: "W212",
              studentCount: 21,
            } as DocumentData),
        } as QueryDocumentSnapshot,
      ];

      const mockSnapshot: QuerySnapshot = {
        docs: mockDocs,
      } as QuerySnapshot;

      (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

      const result: Course[] = await getAllCourses();

      // Assertions
      expect(getDocuments).toHaveBeenCalledWith("courses");
      expect(getDocuments).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        id: "course1",
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      });

      expect(result[1]).toEqual({
        id: "course2",
        name: "Backend Dev",
        room: "W212",
        studentCount: 21,
      });
    });
  });
  describe("updateCourse", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should update the course and return the updated data", async () => {
      const mockId: string = "A123";
      const mockCourse: Partial<Course> = {
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      (updateDocument as jest.Mock).mockResolvedValue(undefined);

      const result: Course = await updateCourse(mockId, mockCourse);

      // Assert
      expect(updateDocument).toHaveBeenCalledWith(
        "courses",
        mockId,
        mockCourse
      );
      expect(updateDocument).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        id: mockId,
        ...mockCourse,
      });
    });
  });

  describe("deleteCourse", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should delete the course", async () => {
      // Arrange
      const mockId = "A123";
      const mockCourse: Partial<Course> = {
        name: "Networking 101",
        room: "P302",
        studentCount: 12,
      };

      // Act
      (getDocumentById as jest.Mock).mockResolvedValue(mockCourse);
      (deleteDocument as jest.Mock).mockResolvedValue(undefined);
      await deleteCourse(mockId);

      // Assertions
      expect(getDocumentById).toHaveBeenCalledWith("courses", mockId);
      expect(deleteDocument).toHaveBeenCalledWith("courses", mockId);
      expect(deleteDocument).toHaveBeenCalledTimes(1);
    });
  });
});
