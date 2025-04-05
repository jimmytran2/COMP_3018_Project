import {
  runTransaction,
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getDocumentsByFieldValue,
} from "../src/api/v1/repositories/firestoreRepository";
import {
  mockFirestoreCollection,
  mockFirestoreQuery,
  mockFirestoreTransaction,
  MockFirestoreCollection,
  MockFirestoreQuery,
} from "./utils/mockFireBaseHelper";
import { RepositoryError } from "../src/api/v1/errors/error";

jest.mock("../config/firebaseConfig", () => ({
  __esModule: true,
  default: {
    collection: jest.fn(),
    runTransaction: jest.fn(),
    batch: jest.fn(),
  },
}));

import db from "../config/firebaseConfig";

describe("Firestore Repository", () => {
  const mockCollectionName: string = "testCollection";
  const mockDocId: string = "mockDocId";
  const mockData: { id: string; name: string; value: number } = {
    id: mockDocId,
    name: "Test Document",
    value: 42,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("runTransaction", () => {
    it("should execute a transaction successfully", async () => {
      const mockOperation: jest.Mock = jest.fn().mockResolvedValue("success");
      (db.runTransaction as jest.Mock).mockImplementation(async (callback) => {
        return await callback(mockFirestoreTransaction);
      });

      const result: unknown = await runTransaction(mockOperation);

      expect(result).toBe("success");
      expect(mockOperation).toHaveBeenCalled();
    });

    it("should throw a Error if transaction fails", async () => {
      (db.runTransaction as jest.Mock).mockRejectedValue(
        new Error("Transaction failed")
      );

      await expect(runTransaction(jest.fn())).rejects.toThrow(Error);
    });
  });

  describe("createDocument", () => {
    it("should create a document with generated ID", async () => {
      const collectionRef: MockFirestoreCollection =
        mockFirestoreCollection(mockData);
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      const result: string = await createDocument(mockCollectionName, mockData);

      expect(result).toBe(mockDocId);
      expect(collectionRef.add).toHaveBeenCalledWith(mockData);
    });

    it("should create a document with provided ID", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        mockData,
        mockDocId
      );
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      const result: string = await createDocument(
        mockCollectionName,
        mockData,
        mockDocId
      );

      expect(result).toBe(mockDocId);
      expect(collectionRef.doc().set).toHaveBeenCalledWith(mockData);
    });

    it("should throw a Error if creation fails", async () => {
      const collectionRef: MockFirestoreCollection =
        mockFirestoreCollection(mockData);
      collectionRef.add.mockRejectedValue(new Error("Creation failed"));
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      await expect(
        createDocument(mockCollectionName, mockData)
      ).rejects.toThrow(Error);
    });
  });

  describe("getDocuments", () => {
    it("should return all documents from a collection", async () => {
      const mockDocs: {
        id: string;
        name: string;
        value: number;
      }[] = [mockData, { ...mockData, id: "mockDocId2" }];
      const queryRef: MockFirestoreQuery = mockFirestoreQuery(mockDocs);
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      const result: FirebaseFirestore.QuerySnapshot = await getDocuments(
        mockCollectionName
      );

      expect(result.docs).toHaveLength(mockDocs.length);
      expect(result.docs[0].data()).toEqual(mockDocs[0]);
    });

    it("should throw a Error if retrieval fails", async () => {
      const queryRef: MockFirestoreQuery = mockFirestoreQuery([]);
      queryRef.get.mockRejectedValue(new Error("Retrieval failed"));
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      await expect(getDocuments(mockCollectionName)).rejects.toThrow(Error);
    });
  });

  describe("getDocumentById", () => {
    it("should return a document by ID", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        mockData,
        mockDocId
      );
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      const result: FirebaseFirestore.DocumentSnapshot | null =
        await getDocumentById(mockCollectionName, mockDocId);

      expect(result!.data()).toEqual(mockData);
    });

    it("should throw an error if document doesn't exist", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        {},
        mockDocId
      );
      collectionRef.doc().get.mockResolvedValue({ exists: false });
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      // Use async/await with expect to catch the thrown error
      await expect(
        getDocumentById(mockCollectionName, mockDocId)
      ).rejects.toThrow(
        `Document not found in collection ${mockCollectionName} with id ${mockDocId}`
      );
    });

    it("should throw a Error if retrieval fails", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        mockData,
        mockDocId
      );
      collectionRef.doc().get.mockRejectedValue(new Error("Retrieval failed"));
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      await expect(
        getDocumentById(mockCollectionName, mockDocId)
      ).rejects.toThrow(Error);
    });
  });

  describe("getDocumentsByFieldValue", () => {
    const mockCollectionName: string = "testCollection";
    const mockFieldName: string = "status";
    const mockFieldValue: string = "active";
    const mockLimit: number = 5;

    it("should return documents matching the field value", async () => {
      const mockDocs: { id: string; status: string; name: string }[] = [
        { id: "doc1", status: "active", name: "Active User 1" },
        { id: "doc2", status: "active", name: "Active User 2" },
      ];
      const queryRef: MockFirestoreQuery = mockFirestoreQuery(mockDocs);
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      const result: FirebaseFirestore.QuerySnapshot =
        await getDocumentsByFieldValue(
          mockCollectionName,
          mockFieldName,
          mockFieldValue
        );

      expect(queryRef.where).toHaveBeenCalledWith(
        mockFieldName,
        "==",
        mockFieldValue
      );
      expect(result.docs).toHaveLength(mockDocs.length);
      expect(result.docs[0].data()).toEqual(mockDocs[0]);
      expect(result.docs[1].data()).toEqual(mockDocs[1]);
    });

    it("should apply limit when specified", async () => {
      const mockDocs: { id: string; status: string; name: string }[] = [
        { id: "doc1", status: "active", name: "Active User 1" },
      ];
      const queryRef: MockFirestoreQuery = mockFirestoreQuery(mockDocs);
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      await getDocumentsByFieldValue(
        mockCollectionName,
        mockFieldName,
        mockFieldValue,
        mockLimit
      );

      expect(queryRef.where).toHaveBeenCalledWith(
        mockFieldName,
        "==",
        mockFieldValue
      );
      expect(queryRef.limit).toHaveBeenCalledWith(mockLimit);
    });

    it("should throw a RepositoryError if no documents are found", async () => {
      const queryRef: MockFirestoreQuery = mockFirestoreQuery([]);
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      await expect(
        getDocumentsByFieldValue(
          mockCollectionName,
          mockFieldName,
          mockFieldValue
        )
      ).rejects.toThrow(
        `No documents found in collection ${mockCollectionName} where ${mockFieldName} == ${mockFieldValue}`
      );
      expect(queryRef.where).toHaveBeenCalledWith(
        mockFieldName,
        "==",
        mockFieldValue
      );
    });

    it("should not apply limit when it's not specified", async () => {
      const mockDocs: { id: string; status: string; name: string }[] = [
        { id: "doc1", status: "active", name: "Active User 1" },
      ];
      const queryRef: MockFirestoreQuery = mockFirestoreQuery(mockDocs);
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      await getDocumentsByFieldValue(
        mockCollectionName,
        mockFieldName,
        mockFieldValue
      );

      expect(queryRef.limit).not.toHaveBeenCalled();
    });

    it("should not apply limit when it's less than or equal to 0", async () => {
      const mockDocs: { id: string; status: string; name: string }[] = [
        { id: "doc1", status: "active", name: "Active User 1" },
      ];
      const queryRef: MockFirestoreQuery = mockFirestoreQuery(mockDocs);
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      await getDocumentsByFieldValue(
        mockCollectionName,
        mockFieldName,
        mockFieldValue,
        0
      );

      expect(queryRef.limit).not.toHaveBeenCalled();
    });

    it("should throw a RepositoryError if query fails", async () => {
      const queryRef: MockFirestoreQuery = mockFirestoreQuery([]);
      queryRef.get.mockRejectedValue(new Error("Query failed"));
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      await expect(
        getDocumentsByFieldValue(
          mockCollectionName,
          mockFieldName,
          mockFieldValue
        )
      ).rejects.toThrow(
        `Failed to fetch documents from ${mockCollectionName} where ${mockFieldName} == ${mockFieldValue}`
      );
    });

    it("should pass through RepositoryError if thrown from within", async () => {
      const customError: RepositoryError = new RepositoryError(
        "Custom error message",
        "CUSTOM_ERROR",
        400
      );
      const queryRef: MockFirestoreQuery = mockFirestoreQuery([]);
      queryRef.get.mockRejectedValue(customError);
      (db.collection as jest.Mock).mockReturnValue(queryRef);

      await expect(
        getDocumentsByFieldValue(
          mockCollectionName,
          mockFieldName,
          mockFieldValue
        )
      ).rejects.toThrow(customError);
    });
  });

  describe("updateDocument", () => {
    it("should update a document", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        mockData,
        mockDocId
      );
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      await updateDocument(mockCollectionName, mockDocId, { value: 43 });

      expect(collectionRef.doc().update).toHaveBeenCalledWith({
        value: 43,
      });
    });

    it("should throw a Error if update fails", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        mockData,
        mockDocId
      );
      collectionRef.doc().update.mockRejectedValue(new Error("Update failed"));
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      await expect(
        updateDocument(mockCollectionName, mockDocId, { value: 43 })
      ).rejects.toThrow(Error);
    });
  });

  describe("deleteDocument", () => {
    it("should delete a document", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        mockData,
        mockDocId
      );
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      await deleteDocument(mockCollectionName, mockDocId);

      expect(collectionRef.doc().delete).toHaveBeenCalled();
    });

    it("should throw a Error if deletion fails", async () => {
      const collectionRef: MockFirestoreCollection = mockFirestoreCollection(
        mockData,
        mockDocId
      );
      collectionRef
        .doc()
        .delete.mockRejectedValue(new Error("Deletion failed"));
      (db.collection as jest.Mock).mockReturnValue(collectionRef);

      await expect(
        deleteDocument(mockCollectionName, mockDocId)
      ).rejects.toThrow(Error);
    });
  });
});
