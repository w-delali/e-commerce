import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../prisma/prisma-client";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/auth-utils";
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  SignUpSchema.parse(req.body);
  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    throw new BadRequestException(
      "User already exist!",
      ErrorCode.USER_ALREADY_EXIST,
    );
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.send(user);
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new NotFoundException(
      "Invalid Credentials",
      ErrorCode.USER_NOT_FOUND,
    );
  }
  const isCorrectPassword = await verifyPassword(password, user.password);

  if (!isCorrectPassword) {
    throw new BadRequestException(
      "Invalid Credentials",
      ErrorCode.INCORRECT_PASSWORD,
    );
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.send({ user, token });
};

const me = async (req: Request, res: Response) => {
  res.send(req.user);
};

export { signup, login, me };
