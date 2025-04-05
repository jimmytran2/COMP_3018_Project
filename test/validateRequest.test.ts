import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { assignmentSchema } from "../src/api/v1/validation/assignmentValidation";
import { courseSchema } from "../src/api/v1/validation/courseValidation";
import { studentSchema } from "../src/api/v1/validation/studentValidation";
import { MiddlewareFunction } from "src/api/v1/types/expressTypes";

describe("validateRequest Middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    mockNext = jest.fn();
  });

  it("should pass for valid inputs for assignmentSchema", () => {
    mockReq.body = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      subject: "Science",
      dueDate: "1999-12-25",
      status: "graded",
    };

    const middleware: MiddlewareFunction = validateRequest(assignmentSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should fail for empty inputs for assignmentSchema", () => {
    mockReq.body = {
      id: "",
      name: "",
      description: "",
      subject: "",
      dueDate: "",
      status: "",
    };

    const middleware: MiddlewareFunction = validateRequest(assignmentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for missing inputs for assignmentSchema", () => {
    mockReq.body = {
      no: "bodys home",
    };

    const middleware: MiddlewareFunction = validateRequest(assignmentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for invalid date format for assignmentSchema", () => {
    mockReq.body = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      subject: "Science",
      dueDate: "January 21, 1999",
      status: "graded",
    };

    const middleware: MiddlewareFunction = validateRequest(assignmentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for invalid status input for assignmentSchema", () => {
    mockReq.body = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      subject: "Science",
      dueDate: "1999-12-25",
      status: "missing",
    };

    const middleware: MiddlewareFunction = validateRequest(assignmentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should pass for valid inputs for courseSchema", () => {
    mockReq.body = {
      id: "COMP-3020",
      name: "Networking 101",
      room: "P302",
      studentCount: 12,
    };

    const middleware: MiddlewareFunction = validateRequest(courseSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should fail for empty inputs for courseSchema", () => {
    mockReq.body = {
      id: "",
      name: "",
      room: "",
      studentCount: "",
    };

    const middleware: MiddlewareFunction = validateRequest(courseSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for missing inputs for courseSchema", () => {
    mockReq.body = {
      hello: "...",
    };

    const middleware: MiddlewareFunction = validateRequest(courseSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for negative student count for courseSchema", () => {
    mockReq.body = {
      id: "COMP-3020",
      name: "Networking 101",
      room: "P302",
      studentCount: -99,
    };

    const middleware: MiddlewareFunction = validateRequest(courseSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should pass for valid inputs for studentSchema", () => {
    mockReq.body = {
      id: "S12",
      name: "Michael",
      email: "mscott@dunder.com",
      grade: 4.1,
    };

    const middleware: MiddlewareFunction = validateRequest(studentSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should fail for empty inputs for studentSchema", () => {
    mockReq.body = {
      id: "",
      name: "",
      email: "",
      grade: "",
    };

    const middleware: MiddlewareFunction = validateRequest(studentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for missing inputs for studentSchema", () => {
    mockReq.body = {
      missing: "inputs",
    };

    const middleware: MiddlewareFunction = validateRequest(studentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for negative grade for studentSchema", () => {
    mockReq.body = {
      id: "S12",
      name: "Michael",
      email: "mscott@dunder.com",
      grade: -99,
    };

    const middleware: MiddlewareFunction = validateRequest(studentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for above maximum grade for studentSchema", () => {
    mockReq.body = {
      id: "S12",
      name: "Michael",
      email: "mscott@dunder.com",
      grade: 99,
    };

    const middleware: MiddlewareFunction = validateRequest(studentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for invalid email format for studentSchema", () => {
    mockReq.body = {
      id: "S12",
      name: "Michael",
      email: "mscottdundercom",
      grade: 4.1,
    };

    const middleware: MiddlewareFunction = validateRequest(studentSchema);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
