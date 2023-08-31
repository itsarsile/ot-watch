import { db } from "@/drizzle/db";
import { superVisorProfile } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supervisors = await db.select().from(superVisorProfile)
    console.log("🚀 ~ file: route.ts:8 ~ GET ~ response:", supervisors)
    return NextResponse.json({supervisors, message: 'Fetching supervisor successfully' }, {status: 200});
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching supervisor data" },
      { status: 500 }
    );
  }
}
