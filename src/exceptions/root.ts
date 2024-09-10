//message, status code, error code, error

class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: any;
  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: ErrorStatusCode,
    errors: any,
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXIST,
  INCORRECT_PASSWORD,
  UNPROCESSABLE_ENTITY,
  DATABASE_ERROR,
  SERVER_ERROR,
  UNAUTHORIZED,
  PRODUCT_NOT_FOUND,
  ADDRESS_NOT_FOUND,
  ADDRESS_DOES_NOT_BELONG_USER,
}
enum ErrorStatusCode {
  BAD_REQUEST = 400, // Client error: Bad request
  UNAUTHORIZED = 401, // Client error: Unauthorized, authentication required
  FORBIDDEN = 403, // Client error: Forbidden, the server understands the request but refuses to authorize it
  NOT_FOUND = 404,
  // Client error: Resource not found
  INTERNAL_SERVER_ERROR = 500, // Server error: Internal server error
}

export { HttpException, ErrorStatusCode, ErrorCode };
