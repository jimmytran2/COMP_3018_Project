import { Request, Response, NextFunction } from "express";
import {
  ValidationError,
  RepositoryError,
  ServiceError,
} from "../errors/error";
import { errorResponse } from "../models/responseModel";

/**
 * Global error handling middleware for an Express application.
 * Catches all errors passed to next() and formats them into a consistent response format.
 *
 * @param err - The error object passed from previous middleware or route handlers
 * @param req - Express request object
 * @param res - Express response object
 * @param _next - Express next function (unused but required for Express error middleware signature)
 *
 * Features:
 * - Handles both standard and custom errors
 * - Provides consistent error response format
 * - Logs errors for debugging
 *
 * @example
 * // In your Express app setup after all other middleware and controllers, it needs to be last:
 * app.use(errorHandler);
 *
 * // In your route handlers:
 * router.get('/users/:id', async (req, res, next) => {
 *   try {
 *     // ... your logic
 *   } catch (error) {
 *     // Add custom properties if needed
 *     error.statusCode = 404;
 *     error.code = "USER_NOT_FOUND";
 *     next(error);
 *   }
 * });
 */
const errorHandler = (
  err: Error | null,
  req: Request,
  res: Response,
  _next: NextFunction // Underscore prefix indicates this parameter is required but unused
): void => {
  if (!err) {
    console.error("Error: null or undefined error received");
    res
      .status(500)
      .json(errorResponse("An unexpected error occurred", "UNKNOWN_ERROR"));
    return;
  }

  // Log the full error details for debugging
  console.error(`Error: ${err.message}`);

  // Send a sanitized error response to the client
  // We don't send the actual error message to avoid exposing sensitive details
  if (
    err instanceof ValidationError ||
    err instanceof RepositoryError ||
    err instanceof ServiceError
  ) {
    res.status(err.statusCode).json(errorResponse(err.message, err.code));
  } else {
    // Generic error response for unhandled errors
    res
      .status(500)
      .json(
        errorResponse(
          "An unexpected error occurred. Please try again.",
          "UNKNOWN_ERROR"
        )
      );
  }
};

export default errorHandler;
