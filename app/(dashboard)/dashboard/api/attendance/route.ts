import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/drizzle/db";
import { userAttendance } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    const currentDate = new Date().toISOString().split("T")[0];
    const [{ checkInTime, checkOutTime }] = await db
      .select({
        checkInTime: userAttendance.checkInTime,
        checkOutTime: userAttendance.checkOutTime,
      })
      .from(userAttendance)
      .where(eq(userAttendance.userId, Number(userId)));

    const parsedCheckInTime = new Date(checkInTime).toISOString().split("T")[0];

    if (parsedCheckInTime === currentDate) {
      if (checkOutTime) {
        return NextResponse.json(
          { message: "User already attend and checked out!" },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: "User already attend " },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "User not attended" }, { status: 404 });
  } catch (error) {
    console.error(error);
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
