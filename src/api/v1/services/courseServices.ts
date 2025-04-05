/**
 * Course Service (courseServices.ts)
 *
 * This file defines functions for managing course data.
 */
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { Course } from "../models/courseModel";
import { ServiceError } from "../errors/error";

const COLLECTION: string = "courses";

/**
 * @description Create a new course
 * @param {Partial<Course>} course - course data
 * @returns {Promise<Course>} promise that is resolved to the course that is created
 * @throws {Error} - unable to create course
 */
export const createCourse = async (
  course: Partial<Course>
): Promise<Course> => {
  try {
    const id: string = await createDocument(COLLECTION, course);
    return { id, ...course } as Course;
  } catch {
    throw new ServiceError(`Could not create course`);
  }
};

/**
 * @description Gets all courses
 * @returns {Promise<Course[]>} promise that is resolved to all courses that are retrieved
 * @throws {Error} - unable to retrieve courses
 */
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
      COLLECTION
    );

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Course;
    });
  } catch (error) {
    throw new ServiceError(`Could not retrieve courses: ${error}`);
  }
};

/**
 * @description Gets course by course id
 * @param {string} id - unique id for a course
 * @returns {Promise<Course>} promise that is resolved to the course thats retrieved
 * @throws {Error} course id is not found
 */
export const getCourseById = async (id: string): Promise<Course> => {
  try {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    return snapshot.data() as Course;
  } catch {
    throw new ServiceError(`Could not retrieve course with id: ${id}`);
  }
};

/**
 * @description Updates an existing course
 * @param {string} id - unique id for a course
 * @param {Partial<Course>} course - object containing course data to be updated
 * @returns {Promise<Course>} promise that is resolved to the course thats been updated
 * @throws {Error} course id is not found
 */
export const updateCourse = async (
  id: string,
  course: Partial<Course>
): Promise<Course> => {
  try {
    await updateDocument(COLLECTION, id, course);
    return { id, ...course } as Course;
  } catch {
    throw new ServiceError(`Unable to update course with id: ${id}`);
  }
};

/**
 * @description Deletes an existing course
 * @param {string} id - a unique id for a course
 * @returns {Promise<void>}
 * @throws {Error} unable to delete course
 */
export const deleteCourse = async (id: string): Promise<void> => {
  try {
    const course: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    if (!course) {
      throw new Error(`Course with id: ${id} does not exist.`);
    }
    await deleteDocument(COLLECTION, id);
  } catch {
    throw new ServiceError(`Unable to delete course with id: ${id}`);
  }
};
