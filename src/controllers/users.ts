import { Request, Response } from "express";
import { AddressSchema } from "../schema/users";
import { prismaClient } from "../../prisma/prisma-client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);
  const address = await prismaClient.address.create({
    data: { ...req.body, userId: req.user.id },
  });
  res.json(address);
};
const deleteAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prismaClient.address.delete({
      where: { id },
    });

    res.json({
      success: true,
    });
  } catch (e) {
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND,
    );
  }
};
const listAddress = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const addresses = await prismaClient.address.findMany({
    where: {
      userId,
    },
  });
  res.json({
    status: "success",
    data: addresses,
  });
};

export { addAddress, deleteAddress, listAddress };
