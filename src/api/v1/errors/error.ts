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

/**
 * Class representing a authentication error.
 * Extends the built-in Error class to include an error code.
 */
export class AuthenticationError extends Error {
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
    code: string = "AUTHENTICATION_ERROR",
    statusCode: number = 401
  ) {
    super(message);
    this.name = "AuthenticationError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Class representing a authorization error.
 * Extends the built-in Error class to include an error code.
 */
export class AuthorizationError extends Error {
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
    code: string = "AUTHORIZATION_ERROR",
    statusCode: number = 403
  ) {
    super(message);
    this.name = "AuthorizationError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Class representing a rate limit error.
 * Extends the built-in Error class to include an error code.
 */
export class RateLimitError extends Error {
  code: string;
  statusCode: number;

  /**
   * Creates a new RateLimitError instance.
   * @param {string} message - The error message.
   * @param {string} code - The error code.
   * @param {number} statusCode - The HTTP response code.
   */
  constructor(
    message: string,
    code: string = "RATE_LIMIT_EXCEEDED",
    statusCode: number = 429
  ) {
    super(message);
    this.name = "RateLimitError";
    this.code = code;
    this.statusCode = statusCode;
  }
}
