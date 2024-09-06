import { ErrorCode, ErrorStatusCode, HttpException } from "./root";

class UnprocessableEntityException extends HttpException {
  constructor(message, errors) {
    super(
      message,
      ErrorCode.UNPROCESSABLE_ENTITY,
      ErrorStatusCode.BAD_REQUEST,
      errors,
    );
  }
}
export { UnprocessableEntityException };
