import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("user not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("wrong password");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }, // Token hangus dalam 7 hari
  );
  return {user,token};
}
