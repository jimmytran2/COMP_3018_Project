import { validate } from "../src/api/v1/middleware/validate";
import { assignmentSchema } from "../src/api/v1/validation/assignmentValidation";
import { courseSchema } from "../src/api/v1/validation/courseValidation";
import { studentSchema } from "../src/api/v1/validation/studentValidation";
import { Assignment } from "src/api/v1/models/assignmentModel";
import { Course } from "src/api/v1/models/courseModel";
import { Student } from "src/api/v1/models/studentModel";

describe("Validate function for assignments", () => {
  it("should not throw an error for valid assignment data", () => {
    const data: Assignment = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      subject: "Science",
      dueDate: "1999-12-25",
      status: "graded",
    };

    expect(() => validate(assignmentSchema, data)).not.toThrow();
  });

  it("should throw an error for an empty name", () => {
    const data: Assignment = {
      id: "A12",
      name: "",
      description: "volcano",
      subject: "Science",
      dueDate: "1999-12-25",
      status: "graded",
    };

    expect(() => validate(assignmentSchema, data)).toThrow();
  });

  it("should throw an error for a missing name", () => {
    const data: Partial<Assignment> = {
      id: "A12",
      description: "volcano",
      subject: "Science",
      dueDate: "1999-12-25",
      status: "graded",
    };

    expect(() => validate(assignmentSchema, data)).toThrow();
  });

  it("should throw an error for an empty subject", () => {
    const data: Assignment = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      subject: "",
      dueDate: "1999-12-25",
      status: "graded",
    };

    expect(() => validate(assignmentSchema, data)).toThrow();
  });

  it("should throw an error for a missing subject", () => {
    const data: Partial<Assignment> = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      dueDate: "1999-12-25",
      status: "graded",
    };

    expect(() => validate(assignmentSchema, data)).toThrow();
  });

  it("should throw an error for a misformatted date", () => {
    const data: Assignment = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      subject: "science",
      dueDate: "December 25 2025",
      status: "graded",
    };

    expect(() => validate(assignmentSchema, data)).toThrow();
  });

  it("should throw an error for a invalid status", () => {
    const data: Assignment = {
      id: "A12",
      name: "science exp",
      description: "volcano",
      subject: "science",
      dueDate: "December 25 2025",
      status: "missing",
    };

    expect(() => validate(assignmentSchema, data)).toThrow();
  });
});

describe("Validate function for courses", () => {
  it("should not throw an error for valid assignment data", () => {
    const data: Course = {
      id: "COMP-3020",
      name: "Networking 101",
      room: "P302",
      studentCount: 12,
    };

    expect(() => validate(courseSchema, data)).not.toThrow();
  });

  it("should throw an error for empty name", () => {
    const data: Course = {
      id: "COMP-3020",
      name: "",
      room: "P302",
      studentCount: 12,
    };

    expect(() => validate(courseSchema, data)).toThrow();
  });

  it("should throw an error for missing room", () => {
    const data: Partial<Course> = {
      id: "COMP-3020",
      name: "Networking 101",
      studentCount: 12,
    };

    expect(() => validate(courseSchema, data)).toThrow();
  });

  it("should throw an error for negative studentCount", () => {
    const data: Partial<Course> = {
      id: "COMP-3020",
      name: "Networking 101",
      room: "P302",
      studentCount: -12,
    };

    expect(() => validate(courseSchema, data)).toThrow();
  });
});

describe("Validate function for students", () => {
  it("should not throw an error for valid student data", () => {
    const data: Student = {
      id: "S12",
      name: "Michael",
      email: "mscott@dunder.com",
      grade: 4.1,
    };

    expect(() => validate(studentSchema, data)).not.toThrow();
  });

  it("should throw an error for empty student name", () => {
    const data: Student = {
      id: "S12",
      name: "",
      email: "mscott@dunder.com",
      grade: 4.1,
    };

    expect(() => validate(studentSchema, data)).toThrow();
  });

  it("should throw an error for missing email", () => {
    const data: Partial<Student> = {
      id: "S12",
      name: "Michael",
      grade: 4.1,
    };

    expect(() => validate(studentSchema, data)).toThrow();
  });

  it("should throw an error for invalid email format", () => {
    const data: Student = {
      id: "S12",
      name: "Michael",
      email: "mscottdundercom",
      grade: 4.1,
    };

    expect(() => validate(studentSchema, data)).toThrow();
  });

  it("should throw an error for negative grade", () => {
    const data: Student = {
      id: "S12",
      name: "Michael",
      email: "mscottdundercom",
      grade: -4.5,
    };

    expect(() => validate(studentSchema, data)).toThrow();
  });

  it("should throw an error for a grade over the max", () => {
    const data: Student = {
      id: "S12",
      name: "Michael",
      email: "mscottdundercom",
      grade: 100,
    };

    expect(() => validate(studentSchema, data)).toThrow();
  });
});
