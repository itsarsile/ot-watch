import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    }).split(",")[0];
    return NextResponse.json({ time: currentDate });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user attendance" });
  }
}
