import { NextFunction, Request, Response } from "express";
import { ErrorCode, ErrorStatusCode, HttpException } from "./exceptions/root";
import { ZodError } from "zod";
import { UnprocessableEntityException } from "./exceptions/unprocessable-entity";
import { BadRequestException } from "./exceptions/bad-request";
import { InternalServerException } from "./exceptions/internal-server-error";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (e) {
      let exception: HttpException;
      if (e instanceof HttpException) {
        exception = e;
      } else if (e instanceof ZodError) {
        exception = new UnprocessableEntityException(
          "Unprocessable Entity",
          e.issues,
        );
      } else if (e instanceof PrismaClientKnownRequestError) {
        // Known Prisma errors (e.g., unique constraint violation)
        exception = new BadRequestException(
          "Database Error",
          ErrorCode.DATABASE_ERROR,
        );
      } else if (e instanceof PrismaClientUnknownRequestError) {
        // Prisma error for unknown reasons
        exception = new InternalServerException(
          "Unknown Database Error",
          e.message,
        );
      } else if (e instanceof PrismaClientRustPanicError) {
        // Prisma panic (rare case)
        exception = new InternalServerException("Database Panic", e.message);
      } else if (e instanceof PrismaClientInitializationError) {
        // Initialization error in Prisma
        exception = new InternalServerException(
          "Database Initialization Error",
          e.message,
        );
      } else {
        // Handle unknown errors
        exception = new HttpException(
          "Something went wrong!",
          ErrorCode.SERVER_ERROR,
          ErrorStatusCode.INTERNAL_SERVER_ERROR,
          e,
        );
      }
      next(exception);
    }
  };
};
