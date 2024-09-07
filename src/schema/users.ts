import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string(),
  pinCode: z.string().length(6),
  country: z.string(),
  city: z.string(),
});
export { SignUpSchema, AddressSchema };
