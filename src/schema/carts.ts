import { z } from "zod";

const CartSchema = z
  .object({
    productId: z.number(),
    quantity: z.number(),
  })
  .strict();
const ChangeQuantitySchema = z
  .object({
    quantity: z.number().positive(),
  })
  .strict();
export { CartSchema, ChangeQuantitySchema };
