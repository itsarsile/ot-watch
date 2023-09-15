import { db } from "@/drizzle/db";
import { visitorReport } from "@/drizzle/schema";
import { and, eq, ilike, lt, lte, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
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
    const { searchParams } = new URL(request.url);
    const dateQueryString = searchParams.get("date");
    const dateQuery =
      dateQueryString && new Date(dateQueryString).toISOString().split("T")[0];

    const session = await getServerSession(authOptions);
    if (session?.user.role === "ADMIN") {
      let query = db.select().from(visitorReport);

      if (dateQuery) {
        query = query.where(
          and(sql`DATE(${visitorReport.createdAt}) = ${dateQuery}`)
        );
      }
      const visitorReports = await query;

      return NextResponse.json(visitorReports, { status: 200 });
    }

    const userId = session?.user.id;
    if (session) {
      let query = db
        .select()
        .from(visitorReport)
        .where(eq(visitorReport.userId, Number(userId)));

      if (dateQuery) {
        query = query.where(
          and(
            sql`DATE(${visitorReport.createdAt}) = ${dateQuery}`,
            eq(visitorReport.userId, Number(userId))
          )
        );
      }

      const visitorReports = await query;

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

export async function PUT(request: Request) {
  try {
    const {
      visitorName,
      visitorPhone,
      visitorAddress,
      visitorNeeds,
      visitorOtherNeeds,
      visitorDealing,
      visitorTrackId,
      reportId,
    } = await request.json();
    console.log("🚀 ~ file: route.ts:90 ~ PUT ~ reportId:", reportId);

    const finalVisitorNeeds =
      visitorNeeds === "other" ? visitorOtherNeeds : visitorNeeds;

    await db
      .update(visitorReport)
      .set({
        visitorName,
        visitorPhone,
        visitorAddress,
        visitorNeeds: finalVisitorNeeds,
        visitorDealing,
        visitorTrackId,
      })
      .where(eq(visitorReport.id, reportId));

    return NextResponse.json(
      { message: "Visitor report updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while updating visitor report", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { reportId } = await request.json();

    await db.delete(visitorReport).where(eq(visitorReport.id, reportId));

    return NextResponse.json(
      { message: "Visitor report deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while deleting visitor report" },
      { status: 500 }
    );
  }
}
