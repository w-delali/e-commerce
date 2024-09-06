import { ErrorStatusCode, HttpException } from "./root";

class InternalServerException extends HttpException {
  constructor(message, errors) {
    super(message, null, ErrorStatusCode.INTERNAL_SERVER_ERROR, errors);
  }
}
export { InternalServerException };
