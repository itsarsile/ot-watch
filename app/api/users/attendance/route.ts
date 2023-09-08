import { db } from "@/drizzle/db";
import { userAttendance } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { checkInTime, latitude, longitude, otLocation, photo, userId } =
      await request.json();

    const res = await db.insert(userAttendance).values({
      userId,
      checkInTime,
      latitude,
      longitude,
      otLocation,
      photo,
    });

    return NextResponse.json({ res }, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
