import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/drizzle/db";
import {
  user,
  salesProfile,
  superVisorProfile,
  userAttendance,
} from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todayAttendances = await db.execute(sql`
      SELECT ${userAttendance.longitude}, 
             ${userAttendance.latitude}, 
            ${userAttendance.otLocation}, 
             "checkInTime" at time zone 'Asia/Jakarta' AS "checkInTime", 
             "checkOutTime" at time zone 'Asia/Jakarta' AS "checkOutTime", 
             ${userAttendance.photo},
             ${user.username}, 
        COALESCE(${salesProfile.name}, ${superVisorProfile.name}) as profileName,
        COALESCE(${salesProfile.kcontact}, ${superVisorProfile.kcontact}) AS profileKContact,
        COALESCE(${salesProfile.phoneNumber}, ${superVisorProfile.phoneNumber}) AS profilePhoneNumber,
        COALESCE(${salesProfile.agency}, ${superVisorProfile.agency}) as profileAgency
      FROM ${userAttendance}
      JOIN ${user} ON ${userAttendance.userId} = ${user.id}
      LEFT JOIN ${salesProfile} on ${userAttendance.userId} = ${salesProfile.userId}
      LEFT JOIN ${superVisorProfile} on ${userAttendance.userId} = ${superVisorProfile.userId}
      WHERE 
      "checkInTime" at time zone 'UTC+7' >= current_date at time zone 'UTC+7'
      and "checkInTime" at time zone 'UTC+7' < (current_date + interval '1 day') at time zone 'UTC+7'
    `);

    return NextResponse.json({
      todayAttendances,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error fetching user attendance",
      error: error.message,
    });
  }
}
