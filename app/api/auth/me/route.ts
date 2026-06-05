import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verifikasi dan pecah isi tokennya
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      name: string;
    };

    return NextResponse.json({
      authenticated: true,
      user: decoded,
    });
  } catch (error) {
    // Jika token kedaluwarsa atau tidak valid
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
