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
import { NotFoundException } from "./exceptions/not-found";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (e) {
      let exception: HttpException;
      if (e instanceof HttpException) {
        exception = e;
      } else if (e instanceof ZodError) {
        const issues = e.issues.map(
          (issue) => `${issue.path}: ${issue.message}`,
        );
        exception = new UnprocessableEntityException(
          "Validation failed: " + issues.join(", "),
          e.issues,
        );
      } else if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          exception = new NotFoundException(
            e.message,
            ErrorCode.DATABASE_ERROR,
          );
        } else if (e.code === "P2002") {
          exception = new BadRequestException(
            `Unique constraint violation: ${e.meta?.target}`,
            ErrorCode.DATABASE_ERROR,
          );
        } else {
          exception = new BadRequestException(
            `Database error: ${e.message}`,
            ErrorCode.DATABASE_ERROR,
          );
        }
      } else if (e instanceof PrismaClientUnknownRequestError) {
        exception = new InternalServerException(
          "Unknown Database Error",
          e.message,
        );
      } else if (e instanceof PrismaClientRustPanicError) {
        exception = new InternalServerException("Database Panic", e.message);
      } else if (e instanceof PrismaClientInitializationError) {
        exception = new InternalServerException(
          "Database Initialization Error",
          e.message,
        );
      } else {
        console.error("Unhandled error: ", e);
        exception = new HttpException(
          "Something went wrong!" + e.message,
          ErrorCode.SERVER_ERROR,
          ErrorStatusCode.INTERNAL_SERVER_ERROR,
          e,
        );
      }
      next(exception);
    }
  };
};
