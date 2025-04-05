import {
  createAssignment,
  getAllAssignments,
  updateAssignment,
  deleteAssignment,
} from "../src/api/v1/services/assignmentServices";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../src/api/v1/repositories/firestoreRepository";
import { Assignment } from "../src/api/v1/models/assignmentModel";
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

describe("Assignment Service", () => {
  describe("createAssignment", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new assignment and return it", async () => {
      const mockId: string = "A123";
      const mockAssignment: Partial<Assignment> = {
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      (createDocument as jest.Mock).mockResolvedValue(mockId);

      // Call the service
      const result: Assignment = await createAssignment(mockAssignment);

      // Assertions
      expect(createDocument).toHaveBeenCalledWith(
        "assignments",
        mockAssignment
      );
      expect(createDocument).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        id: mockId,
        ...mockAssignment,
      });
    });
  });

  describe("getAllAssignments", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all assignment when the request is successful", async () => {
      // Mock data
      const mockDocs: QueryDocumentSnapshot[] = [
        {
          id: "assignment1",
          data: () =>
            ({
              name: "science exp",
              description: "volcano",
              subject: "Science",
              dueDate: "1999-12-25",
              status: "graded",
            } as DocumentData),
        } as QueryDocumentSnapshot,
        {
          id: "assignment2",
          data: () =>
            ({
              name: "english paper",
              description: "hamlet",
              subject: "English",
              dueDate: "2012-01-01",
              status: "closed",
            } as DocumentData),
        } as QueryDocumentSnapshot,
      ];

      const mockSnapshot: QuerySnapshot = {
        docs: mockDocs,
      } as QuerySnapshot;

      (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

      const result: Assignment[] = await getAllAssignments();

      // Assertions
      expect(getDocuments).toHaveBeenCalledWith("assignments");
      expect(getDocuments).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        id: "assignment1",
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      });

      expect(result[1]).toEqual({
        id: "assignment2",
        name: "english paper",
        description: "hamlet",
        subject: "English",
        dueDate: "2012-01-01",
        status: "closed",
      });
    });
  });
  describe("updateAssignment", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should update the assignment and return the updated data", async () => {
      const mockId: string = "A123";
      const mockAssignment: Partial<Assignment> = {
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      (updateDocument as jest.Mock).mockResolvedValue(undefined);

      const result: Assignment = await updateAssignment(mockId, mockAssignment);

      // Assert
      expect(updateDocument).toHaveBeenCalledWith(
        "assignments",
        mockId,
        mockAssignment
      );
      expect(updateDocument).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        id: mockId,
        ...mockAssignment,
      });
    });
  });

  describe("deleteAssignment", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should delete the assignment", async () => {
      // Arrange
      const mockId = "A123";
      const mockAssignment: Partial<Assignment> = {
        name: "science exp",
        description: "volcano",
        subject: "Science",
        dueDate: "1999-12-25",
        status: "graded",
      };

      // Act
      (getDocumentById as jest.Mock).mockResolvedValue(mockAssignment);
      (deleteDocument as jest.Mock).mockResolvedValue(undefined);
      await deleteAssignment(mockId);

      // Assertions
      expect(getDocumentById).toHaveBeenCalledWith("assignments", mockId);
      expect(deleteDocument).toHaveBeenCalledWith("assignments", mockId);
      expect(deleteDocument).toHaveBeenCalledTimes(1);
    });
  });
});
