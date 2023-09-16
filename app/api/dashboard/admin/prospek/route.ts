import { db } from "@/drizzle/db";
import { visitorReport } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json({ message: "Unauthorized" })
    }
    const data = await db.execute(sql`
      select
        DATE_TRUNC('day', ${visitorReport.createdAt}) as tgl_laporan,
        count(case when ${visitorReport.visitorDealing} = 'dealing' then 1 else null end) as dealing,
        count(case when ${visitorReport.visitorDealing} = 'prospek' then 1 else null end) as prospek
      from
        ${visitorReport}
      where
        (${visitorReport.visitorDealing} = 'dealing' or ${visitorReport.visitorDealing} = 'prospek')
        and ${visitorReport.createdAt} >= current_date - interval '30 days'
      group by
        DATE_TRUNC('day' ,${visitorReport.createdAt})
    `);

const response = data.map((item: any) => ({
    tgl_laporan: item.tgl_laporan,
    prospek: item.prospek,
    dealing: item.dealing,
  }));


    return NextResponse.json({
      message: "Successfully retrieved data",
      response,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while fetching analytics" },
      { status: 500 }
    );
  }
}
