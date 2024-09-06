import { HttpException, ErrorStatusCode, ErrorCode } from "./root";

class BadRequestException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, ErrorStatusCode.BAD_REQUEST, null);
  }
}

export { BadRequestException };
