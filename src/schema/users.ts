import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export { SignUpSchema };
