import { db } from "@/drizzle/db";
import { visitorReport } from "@/drizzle/schema";
import { eq, ilike, lt, lte, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const {searchParams} = new URL(request.url)
    const dateQueryString = searchParams.get("date")
    const userId = session?.user.id;
    const dateQuery =  dateQueryString && new Date(dateQueryString).toISOString().split('T')[0]
    if (session) {

      let query = db
        .select()
        .from(visitorReport)
        .where(eq(visitorReport.userId, Number(userId)))
      
        if (dateQuery) {
          query = query.where(
            sql`DATE(${visitorReport.createdAt}) = ${dateQuery}`
          )
        }

        const visitorReports = await query

      // const visitorReports = db.execute(sql`
      //   SELECT * FROM ${visitorReport}
      //   WHERE ${visitorReport.userId} = ${userId}
      //   -- AND DATE(${visitorReport.createdAt}) = ${dateQuery}
      // `)

      return NextResponse.json(visitorReports, { status: 200 });
    }
    return NextResponse.json({ message: "Couldn't retrieve visitor report" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
