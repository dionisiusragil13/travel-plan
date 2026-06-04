import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function register(email: string, password: string) {
  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) {
    throw new Error("email sudah digunakan");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}
