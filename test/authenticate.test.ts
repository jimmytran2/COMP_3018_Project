import { Request, Response } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/error";

// Have to mock googles function "verifyIdToken"
jest.mock("../config/firebaseConfig", () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
}));

describe("authenticate middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      locals: {},
    };
    nextFunction = jest.fn();
  });

  it("should call next passing authenticationError when no token is provided", async () => {
    const expectedError: AuthenticationError = new AuthenticationError(
      "Unauthorized: No token provided",
      "TOKEN_NOT_FOUND"
    );
    mockRequest.headers = {};

    await authenticate(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(expectedError);
  });

  it("should call next passing authenticationError when malformed/invalid token is provided", async () => {
    const expectedError: AuthenticationError = new AuthenticationError(
      "Unauthorized: No token provided",
      "TOKEN_NOT_FOUND"
    );
    mockRequest.headers = {
      authorization: "invalid-token",
    };

    await authenticate(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(expectedError);
  });

  it("should call next() when token is valid", async () => {
    mockRequest.headers = {
      authorization: "Bearer mock-token",
    };

    (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
      uid: "mock-uid",
      role: "user",
    });

    await authenticate(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(auth.verifyIdToken).toHaveBeenCalledWith("mock-token");
    expect(mockResponse.locals).toEqual({
      uid: "mock-uid",
      role: "user",
    });
    expect(nextFunction).toHaveBeenCalled();
  });
});
