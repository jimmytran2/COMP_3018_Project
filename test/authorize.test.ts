import { Request, Response } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/error";
import { MiddlewareFunction } from "src/api/v1/types/expressTypes";

describe("authorize middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      params: {},
    };
    mockResponse = {
      locals: {},
    };
    nextFunction = jest.fn();
  });

  it("should call next() when user has CORRECT required role", () => {
    mockResponse.locals = {
      uid: "user123",
      role: "admin",
    };

    const middleware: MiddlewareFunction = isAuthorized({ hasRole: ["admin"] });

    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith();
    // expect(nextFunction).toHaveBeenCalled();
    // Above was original, test would pass even if roles didnt match
    // Now test will properly check if you have the right "matching" role
  });

  it("should call next() when same user and allowSameUser is true", () => {
    mockRequest.params = { id: "user123" };
    mockResponse.locals = {
      uid: "user123",
      role: "admin",
    };

    const middleware: MiddlewareFunction = isAuthorized({
      hasRole: ["admin"],
      allowSameUser: true,
    });

    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith();
  });

  it("should throw AuthorizationError when user has insufficient role", () => {
    const expectedError: AuthorizationError = new AuthorizationError(
      "Forbidden: Insufficient role",
      "INSUFFICIENT_ROLE"
    );

    mockResponse.locals = {
      uid: "user123",
      role: "user",
    };

    const middleware: MiddlewareFunction = isAuthorized({ hasRole: ["admin"] });
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expectedError);
  });

  it("should throw error when role is missing", () => {
    const expectedError: AuthorizationError = new AuthorizationError(
      "Forbidden: No role found",
      "ROLE_NOT_FOUND"
    );
    mockResponse.locals = {
      uid: "user123",
    };

    const middleware: MiddlewareFunction = isAuthorized({ hasRole: ["admin"] });
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expectedError);
  });
});
