/**
 * User Service (userServices.ts)
 *
 * This file defines functions for managing user data.
 */
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { User } from "../models/userModels";
import { ServiceError } from "../errors/error";

const COLLECTION: string = "users";

/**
 * @description Create a new user
 * @param {Partial<User>} user - user data
 * @returns {Promise<User>} promise that is resolved to the user that is created
 * @throws {Error} - unable to create user
 */
export const createUser = async (user: Partial<User>): Promise<User> => {
  try {
    const id: string = await createDocument(COLLECTION, user);
    return { id, ...user } as User;
  } catch {
    throw new ServiceError(`Could not create user`);
  }
};

/**
 * @description Gets all users
 * @returns {Promise<User[]>} promise that is resolved to all users that are retrieved
 * @throws {Error} - unable to retrieve users
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
      COLLECTION
    );

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as User;
    });
  } catch (error) {
    throw new ServiceError(`Could not retrieve users: ${error}`);
  }
};

/**
 * @description Gets user by user id
 * @param {string} id - unique id for a user
 * @returns {Promise<User>} promise that is resolved to the user thats retrieved
 * @throws {Error} user id is not found
 */
export const getUserById = async (id: string): Promise<User> => {
  try {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    return snapshot.data() as User;
  } catch {
    throw new ServiceError(`Could not retrieve user with id: ${id}`);
  }
};

/**
 * @description Updates an existing user
 * @param {string} id - unique id for a user
 * @param {Partial<User>} user - object containing user data to be updated
 * @returns {Promise<User>} promise that is resolved to the user thats been updated
 * @throws {Error} user id is not found
 */
export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  try {
    await updateDocument(COLLECTION, id, user);
    return { id, ...user } as User;
  } catch {
    throw new ServiceError(`Unable to update user with id: ${id}`);
  }
};

/**
 * @description Deletes an existing user
 * @param {string} id - a unique id for a user
 * @returns {Promise<void>}
 * @throws {Error} unable to delete user
 */
export const deleteUser = async (id: string): Promise<void> => {
  try {
    const user: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    if (!user) {
      throw new Error(`User with id: ${id} does not exist.`);
    }
    await deleteDocument(COLLECTION, id);
  } catch {
    throw new ServiceError(`Unable to delete user with id: ${id}`);
  }
};
