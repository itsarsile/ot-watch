import { db } from "@/drizzle/db";
import { visitorReport } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      visitorName,
      visitorPhone,
      visitorAddress,
      visitorNeeds,
      visitorOtherNeeds,
      visitorDealing,
      visitorTrackId,
      userId,
    } = await request.json();

    const finalVisitorNeeds =
      visitorNeeds === "other" ? visitorOtherNeeds : visitorNeeds;

    await db.insert(visitorReport).values({
      visitorName,
      visitorPhone,
      visitorAddress,
      visitorNeeds: finalVisitorNeeds,
      visitorDealing,
      visitorTrackId,
      userId,
    });

    return NextResponse.json(
      { message: "Success creating visitor report" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}

export async function GET() {
  try {
    const visitorReports = await db.select().from(visitorReport);
    return NextResponse.json(visitorReports, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
