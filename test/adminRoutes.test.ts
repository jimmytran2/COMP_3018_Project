import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";

import { setCustomClaims } from "../src/api/v1/controllers/adminControllers";

jest.mock("../src/api/v1/controllers/adminControllers", () => ({
  setCustomClaims: jest.fn((req, res) => res.status(200).send()),
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

describe("Admin Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/admins/setCustomClaims", () => {
    it("should call setCustomClaims controller", async () => {
      await request(app).post("/api/v1/admin/setCustomClaims");
      expect(setCustomClaims).toHaveBeenCalled();
    });
  });
});
