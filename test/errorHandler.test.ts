import { Request, Response, NextFunction } from "express";
import {
  ValidationError,
  RepositoryError,
  ServiceError,
} from "../src/api/v1/errors/error";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import { errorResponse } from "../src/api/v1/models/responseModel";

console.error = jest.fn();

describe("Error Handler Middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should handle ValidationError with custom status code and error code", () => {
    const testError: ValidationError = new ValidationError(
      "Could not be validated"
    );

    errorHandler(testError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("Could not be validated", "VALIDATION_ERROR")
    );
  });

  it("should handle RepositoryError with custom status code and error code", () => {
    const testError: RepositoryError = new RepositoryError(
      "Document not found"
    );

    errorHandler(testError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("Document not found", "REPOSITORY_ERROR")
    );
  });

  it("should handle ServiceError with custom status code and error code", () => {
    const testError: ServiceError = new ServiceError("Invalid input");

    errorHandler(testError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("Invalid input", "SERVICE_ERROR")
    );
  });

  it("should handle basic Error object with default status and code", () => {
    const testError: Error = new Error("Basic error");

    errorHandler(testError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse(
        "An unexpected error occurred. Please try again.",
        "UNKNOWN_ERROR"
      )
    );
    expect(console.error).toHaveBeenCalledWith("Error: Basic error");
  });

  it("should handle null errors", () => {
    const testError: null = null;

    errorHandler(testError, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
    );
    expect(console.error).toHaveBeenCalledWith(
      "Error: null or undefined error received"
    );
  });
});
