/**
 * Student Service (studentServices.ts)
 *
 * This file defines functions for managing student data.
 */
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { Student } from "../models/studentModel";
import { ServiceError } from "../errors/error";

const COLLECTION: string = "students";

/**
 * @description Create a new student
 * @param {Partial<Student>} student - student data
 * @returns {Promise<Student>} promise that is resolved to the student that is created
 * @throws {Error} - unable to create student
 */
export const createStudent = async (
  student: Partial<Student>
): Promise<Student> => {
  try {
    const id: string = await createDocument(COLLECTION, student);
    return { id, ...student } as Student;
  } catch {
    throw new ServiceError(`Could not create student`);
  }
};

/**
 * @description Gets all students
 * @returns {Promise<Student[]>} promise that is resolved to all students that are retrieved
 * @throws {Error} - unable to retrieve students
 */
export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
      COLLECTION
    );

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Student;
    });
  } catch (error) {
    throw new ServiceError(`Could not retrieve students: ${error}`);
  }
};

/**
 * @description Gets student by student id
 * @param {string} id - unique id for a student
 * @returns {Promise<Student>} promise that is resolved to the student thats retrieved
 * @throws {Error} student id is not found
 */
export const getStudentById = async (id: string): Promise<Student> => {
  try {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    return snapshot.data() as Student;
  } catch {
    throw new ServiceError(`Could not retrieve student with id: ${id}`);
  }
};

/**
 * @description Updates an existing student
 * @param {string} id - unique id for a student
 * @param {Partial<Student>} student - object containing student data to be updated
 * @returns {Promise<Student>} promise that is resolved to the student thats been updated
 * @throws {Error} student id is not found
 */
export const updateStudent = async (
  id: string,
  student: Partial<Student>
): Promise<Student> => {
  try {
    await updateDocument(COLLECTION, id, student);
    return { id, ...student } as Student;
  } catch {
    throw new ServiceError(`Unable to update student with id: ${id}`);
  }
};

/**
 * @description Deletes an existing student
 * @param {string} id - a unique id for a student
 * @returns {Promise<void>}
 * @throws {Error} unable to delete student
 */
export const deleteStudent = async (id: string): Promise<void> => {
  try {
    const student: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    if (!student) {
      throw new Error(`Student with id: ${id} does not exist.`);
    }
    await deleteDocument(COLLECTION, id);
  } catch {
    throw new ServiceError(`Unable to delete student with id: ${id}`);
  }
};
