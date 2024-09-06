import { ErrorCode, ErrorStatusCode, HttpException } from "./root";

class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, ErrorStatusCode.NOT_FOUND, null);
  }
}

export { NotFoundException };
