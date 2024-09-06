import { ErrorCode, ErrorStatusCode, HttpException } from "./root";

class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors?: any) {
    super(message, errorCode, ErrorStatusCode.UNAUTHORIZED, errors);
  }
}

export { UnauthorizedException };
