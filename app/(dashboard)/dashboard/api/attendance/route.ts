import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/drizzle/db";
import { userAttendance } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return NextResponse.json({message: 'Unauthorized'}, { status: 401 })

    const userId = session?.user.id;
    console.log("🚀 ~ file: route.ts:15 ~ GET ~ userId:", userId)

    const currentDate = new Date()
      .toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      .split(",")[0];

    const attendanceRecord = await db
      .select({
        checkInTime: userAttendance.checkInTime,
        checkOutTime: userAttendance.checkOutTime,
      })
      .from(userAttendance)
      .where(eq(userAttendance.userId, Number(userId)))
      
    console.log("🚀 ~ file: route.ts:27 ~ GET ~ attendanceRecord:", attendanceRecord)


    const parsedCheckInTime = new Date(attendanceRecord[0].checkInTime)
    .toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    .split(",")[0];

    console.log("🚀 ~ file: route.ts:33 ~ GET ~ parsedCheckInTime:", parsedCheckInTime)

    if (parsedCheckInTime === currentDate) {
      if (attendanceRecord[0].checkOutTime) {
        return NextResponse.json(
          { message: "User already attend and checked out!" },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: "User already attend" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Error fetching current attendance" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const { checkOutTime } = await request.json();
    const res = await db
      .update(userAttendance)
      .set({ checkOutTime })
      .where(eq(userAttendance.userId, Number(userId)));

    return NextResponse.json({ res });
  } catch (error) {
    console.error(error);
  }
}
