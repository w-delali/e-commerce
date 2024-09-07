import { z } from "zod";

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  tags: z.array(z.string()),
});

export { ProductSchema };
