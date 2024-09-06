import { compare, hash } from "bcrypt";

const SALT_ROUNDS = 10;

const hashPassword = async (password: string) => {
  return await hash(password, SALT_ROUNDS);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
