/**
 * Branch Service (branchServices.ts)
 *
 * This file defines functions for managing branch data.
 */

import { User } from "../models/userModels";

const jimmy: User = {
  id: "jimmy",
  name: "jimmy",
  email: "jimmy",
};
export const createUser = async (user: {
  id: string;
  name: string;
  email: string;
}): Promise<User> => {
  const newUser: User = { ...user };
  return newUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  return [jimmy];
};

export const getUserById = async (id: string): Promise<User> => {
  return jimmy;
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  return jimmy;
};

export const deleteUser = async (id: string): Promise<void> => {
  console.log("deleted");
};
