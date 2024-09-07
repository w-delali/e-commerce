import { Request, Response } from "express";
import { prismaClient } from "../../prisma/prisma-client";
import { ProductSchema } from "../schema/products";

const createProduct = async (req: Request, res: Response) => {
  ProductSchema.parse(req.body);
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  res.send(product);
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = req.body;
  ProductSchema.partial().parse(req.body);
  if (product.tags) {
    product.tags = product.tags.join(",");
  }
  const updatedProduct = await prismaClient.product.update({
    where: { id: +id },
    data: product,
  });
  res.send(updatedProduct);
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProduct = await prismaClient.product.delete({
    where: { id: +id },
  });
  res.send(deletedProduct);
};
const listProducts = async (req: Request, res: Response) => {
  const { skip = 0, take = 5 } = req.query;
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: +skip,
    take: +take,
  });
  res.json({ count, products });
};
const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prismaClient.product.findFirstOrThrow({
    where: { id: +id },
  });
  res.send(product);
};
export {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProductById,
};
