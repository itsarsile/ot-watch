import { db } from "@/drizzle/db";
import { userAttendance } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const {
      checkInTime,
      latitude,
      longitude,
      otLocation,
      photo,
      salesProfileId,
      superVisorProfileId,
    } = await request.json();

    if (salesProfileId) {
      const res = await db.insert(userAttendance).values({
        salesProfileId,
        checkInTime,
        latitude,
        longitude,
        otLocation,
        photo,
      });

      return NextResponse.json({ res }, { status: 201, statusText: "Success" });
    }

    if (superVisorProfileId) {
      const res = await db.insert(userAttendance).values({
        superVisorProfileId,
        checkInTime,
        latitude,
        longitude,
        otLocation,
        photo,
      });

      return NextResponse.json({ res }, { status: 201, statusText: "Success" });
    }
  } catch (error) {
    console.error(error);
  }
}