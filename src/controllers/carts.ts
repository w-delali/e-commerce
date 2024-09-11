import { Request, Response } from "express";
import { CartSchema, ChangeQuantitySchema } from "../schema/carts";
import { prismaClient } from "../../prisma/prisma-client";
import { CartItems } from "@prisma/client";

const addCartItem = async (req: Request, res: Response) => {
  const validData = CartSchema.parse(req.body);
  await prismaClient.product.findFirstOrThrow({
    where: { id: validData.productId },
  });
  let cart: CartItems;
  const existingCart = await prismaClient.cartItems.findFirst({
    where: { productId: validData.productId },
  });
  if (existingCart) {
    cart = await prismaClient.cartItems.update({
      where: {
        id: existingCart.id,
      },
      data: {
        quantity: existingCart.quantity + validData.quantity,
      },
    });
  } else {
    cart = await prismaClient.cartItems.create({
      data: {
        userId: req.user.id,
        productId: validData.productId,
        quantity: validData.quantity,
      },
    });
  }
  res.json(cart);
};
const getCartItems = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItems.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
const deleteCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prismaClient.cartItems.delete({
    where: { id: +id, userId: req.user.id },
  });
  res.json({ success: true });
};
const changeItemQuantity = async (req: Request, res: Response) => {
  const validData = ChangeQuantitySchema.parse(req.body);
  const { id } = req.params;
  const updatedCart = await prismaClient.cartItems.update({
    where: { id: +id, userId: req.user.id },
    data: { quantity: validData.quantity },
  });
  res.json(updatedCart);
};

export { addCartItem, getCartItems, deleteCartItem, changeItemQuantity };
