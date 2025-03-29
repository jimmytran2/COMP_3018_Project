// https://medium.com/@Nelsonalfonso/understanding-custom-errors-in-typescript-a-complete-guide-f47a1df9354c

/**
 * Class representing a validation error.
 * Extends the built-in Error class to include an error code.
 */
export class ValidationError extends Error {
  code: string;
  statusCode: number;

  /**
   * Creates a new ValidationError instance.
   * @param {string} message - The error message.
   * @param {string} code - The error code.
   * @param {number} statusCode - The the http response code.
   */
  constructor(
    message: string,
    code: string = "VALIDATION_ERROR",
    statusCode: number = 400
  ) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Class representing a repository error.
 * Extends the built-in Error class to include an error code.
 */
export class RepositoryError extends Error {
  code: string;
  statusCode: number;

  /**
   * Creates a new RepositoryError instance.
   * @param {string} message - The error message.
   * @param {string} code - The error code.
   * @param {number} statusCode - The the http response code.
   */
  constructor(
    message: string,
    code: string = "REPOSITORY_ERROR",
    statusCode: number = 500
  ) {
    super(message);
    this.name = "RepositoryError";
    this.code = code;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, RepositoryError.prototype);
  }
}

/**
 * Class representing a service error.
 * Extends the built-in Error class to include an error code.
 */
export class ServiceError extends Error {
  code: string;
  statusCode: number;

  /**
   * Creates a new ServiceError instance.
   * @param {string} message - The error message.
   * @param {string} code - The error code.
   * @param {number} statusCode - The the http response code.
   */
  constructor(
    message: string,
    code: string = "SERVICE_ERROR",
    statusCode: number = 500
  ) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
    this.statusCode = statusCode;
  }
}
