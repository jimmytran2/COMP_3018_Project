/**
 * Assignment Service (assignmentServices.ts)
 *
 * This file defines functions for managing assignment data.
 */

import {
  createDocument,
  getDocuments,
  getDocumentById,
  getDocumentsByFieldValue,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { Assignment } from "../models/assignmentModel";
import { ServiceError } from "../errors/error";

const COLLECTION: string = "assignments";

/**
 * @description Create a new assignment
 * @param {Partial<Assignment>} assignment data
 * @returns {Promise<Assignment>} promise that is resolved to the assignment thats created
 * @throws {ServiceError} - unable to create assignment
 */
export const createAssignment = async (
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  try {
    const id: string = await createDocument(COLLECTION, assignment);
    return { id, ...assignment } as Assignment;
  } catch {
    throw new ServiceError("Could not create assignment");
  }
};

/**
 * @description Gets all assignments
 * @returns {Promise<Assignment[]>} promise that is resolved to all assignments that are retrieved
 * @throws {ServiceError} - unable to retrieve assignments
 */
export const getAllAssignments = async (): Promise<Assignment[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
      COLLECTION
    );

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Assignment;
    });
  } catch {
    throw new ServiceError("Could not retrieve assignments");
  }
};

/**
 * @description Gets assignment by assignment id
 * @param {string} id - unique id for an assignment
 * @returns {Promise<Assignment>} promise that is resolved when to the assignment thats retrieved
 * @throws {Error} assignment id is not found
 */
export const getAssignmentById = async (id: string): Promise<Assignment> => {
  try {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    return snapshot.data() as Assignment;
  } catch {
    throw new ServiceError(`Could not retrieve assignment with id: ${id}`);
  }
};

/**
 * @description Updates an existing assignment
 * @param {string} id - a unique id for an assignment
 * @param {Partial<Assignment>} assignment - object containing assignment data to be updated
 * @returns {Promise<Assignment>} promise that is resolved to the assignment thats been updated
 * @throws {Error} assignment id is not found
 */
export const updateAssignment = async (
  id: string,
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  try {
    await updateDocument(COLLECTION, id, assignment);
    return { id, ...assignment } as Assignment;
  } catch {
    throw new ServiceError(`Unable to update assignment with id: ${id}`);
  }
};

/**
 * @description Deletes an existing assignment
 * @param {string} id - a unqiue id for an assignment
 * @returns {Promise<void>}
 * @throws {Error} assignment id is not found
 */
export const deleteAssignment = async (id: string): Promise<void> => {
  try {
    const assignment: FirebaseFirestore.DocumentSnapshot =
      await getDocumentById(COLLECTION, id);

    if (!assignment) {
      throw new ServiceError(`Assignment with id: ${id} does not exist.`);
    }
    await deleteDocument(COLLECTION, id);
  } catch {
    throw new ServiceError(`Unable to delete assignment with id: ${id}`);
  }
};

/**
 * @description Gets assignments from a particular subject
 * @param {string} subject - subject of assignments(s)
 * @returns {Promise<Assignment[]>} promise that is resolved to an array of the assignments for a subject
 * @throws {ServiceError} no assignments from this subject
 */
export const getAssignmentBySubject = async (
  subject: string
): Promise<Assignment[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot =
      await getDocumentsByFieldValue(COLLECTION, "subject", subject);

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Assignment;
    });
  } catch {
    throw new ServiceError(`Could not retrieve assignments from ${subject}`);
  }
};

/**
 * @description Gets assignments with a particular status
 * @param {string} status - status of assignments(s)
 * @returns {Promise<Assignment[]>} promise that is resolved to an array of the assignments with a status
 * @throws {ServiceError} no assignments with this status
 */
export const getAssignmentByStatus = async (
  status: string
): Promise<Assignment[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot =
      await getDocumentsByFieldValue(COLLECTION, "status", status);

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Assignment;
    });
  } catch {
    throw new ServiceError(
      `Could not retrieve assignments with status: ${status}`
    );
  }
};
