import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";
import { getUserDetails } from "../src/api/v1/controllers/userControllers";
import { UserRecord } from "firebase-admin/auth";

jest.mock("../config/firebaseConfig");

describe("getUserDetails Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      params: { uid: "user123" },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should return user details when given a valid UID", async () => {
    const mockUser: Partial<UserRecord> = {
      uid: "testUser123",
    };

    (auth.getUser as jest.Mock).mockResolvedValue(mockUser);

    await getUserDetails(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: { uid: "testUser123" },
      message: undefined,
      status: "success",
    });
  });

  it("should call next() passing an error if it fails", async () => {
    const expectedError: Error = new Error("An error has occured");
    (auth.getUser as jest.Mock).mockRejectedValue(expectedError);

    await getUserDetails(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalledWith(expectedError);
  });
});
