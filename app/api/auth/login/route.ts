import { login } from "@/lib/auth/login";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "field canot be empty" },
        { status: 400 },
      );
    }
    const user = await login(email, password);
    return NextResponse.json(
      {
        message: "login sucesfesf",
        user,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      { status: 400 },
    );
  }
}
