import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("user not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("wrong password");
  }
  return user;
}
