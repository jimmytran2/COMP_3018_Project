import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";

import { getUserDetails } from "../src/api/v1/controllers/userControllers";

jest.mock("../src/api/v1/controllers/userControllers", () => ({
  getUserDetails: jest.fn((req, res) => res.status(200).send()),
}));

jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((req: Request, res: Response, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(
    () =>
      (req: Request, res: Response, next: NextFunction): void =>
        next()
  );
});

describe("User Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/user/getUserDetails", () => {
    it("should call getUserDetails controller", async () => {
      await request(app).get("/api/v1/user/getUserDetails");
      expect(getUserDetails).toHaveBeenCalled();
    });
  });
});
