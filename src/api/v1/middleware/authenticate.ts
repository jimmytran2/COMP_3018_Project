import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/error";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";
import { auth } from "../../../../config/firebaseConfig";

/**
 * Express middleware that authenticates requests using Firebase Auth
 *
 * This middleware:
 * 1. Extracts the JWT token from the Authorization header
 * 2. Verifies the token with Firebase Auth
 * 3. Makes the user ID and role available to downstream middleware and route handlers
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function to pass control to the next middleware
 * @returns A Promise that resolves when authentication is complete
 * @throws {AuthenticationError} When the token is missing or invalid
 */
const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Extract token from Authorization header
  // The format should be: "Bearer <token>"
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(
      new AuthenticationError(
        "Unauthorized: No token provided",
        "TOKEN_NOT_FOUND"
      )
    );
  }

  try {
    // Verify the token with Firebase Auth
    // This will throw an error if the token is invalid or expired
    const decodedIdToken: DecodedIdToken = await auth.verifyIdToken(token);

    // Store user information in res.locals for downstream middleware
    // This makes the user ID and role available to route handlers
    res.locals.uid = decodedIdToken.uid;
    res.locals.role = decodedIdToken.role;

    // Continue to the next middleware or route handler
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(
        new AuthenticationError(
          `Unauthorized: ${getErrorMessage(error)}`,
          getErrorCode(error)
        )
      );
    } else {
      return next(
        new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID")
      );
    }
  }
};

export default authenticate;
