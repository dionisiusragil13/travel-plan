import { generateTripPlan } from "@/service/gemini.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, duration, budget, style, group, preference } = body;

    if (
      !destination ||
      !duration ||
      !budget ||
      !style ||
      !group ||
      !preference
    ) {
      return NextResponse.json(
        { message: "field canot be empty" },
        { status: 400 },
      );
    }
    const plan = await generateTripPlan({
      destination,
      duration,
      budget,
      style,
      group,
      preference,
    });
    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { error: "Failed to generate trip plan" },
      { status: 500 },
    );
  }
}
