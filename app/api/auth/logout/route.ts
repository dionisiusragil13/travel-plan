import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Hapus cookie dengan cara mengosongkan nilai dan set maxAge ke 0
    cookieStore.set("session_token", "", {
      path: "/",
      maxAge: 0,
    });

    return NextResponse.json({ message: "Logout berhasil" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus session cookie" },
      { status: 500 },
    );
  }
}
