import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/drizzle/db";
import { visitorReport } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" });
    }

    const data = await db.execute(sql`
            select
            DATE_TRUNC('day', ${visitorReport.createdAt}) as tgl_laporan,
  count(
    case
      when ("visitorNeeds" = 'Keluhan Pelanggan') then 1
      else null
    end
  ) as keluhan_pelanggan,
  count(
    case
      when ("visitorNeeds" = 'Daftar IndiHome') then 1
      else null
    end
  ) as daftar_indihome,
  count(
    case
      when ("visitorNeeds" = 'Tanya Seputar Produk') then 1
      else null
    end
  ) as tanya_seputar_produk,
  count(
    case
      when ("visitorNeeds" = 'Pembelian Orbit') then 1
      else null
    end
  ) as pembelian_orbit
from
  "visitorReport"
where
  ("visitorReport"."visitorNeeds" = 'Keluhan Pelanggan' or  "visitorReport"."visitorNeeds" = 'Daftar IndiHome' or "visitorReport"."visitorNeeds" = 'Tanya Seputar Produk' or "visitorReport"."visitorNeeds" = 'Pembelian Orbit')
  and "visitorReport"."createdAt" >= current_date - interval '30 days'
  group by
  DATE_TRUNC('day', "visitorReport"."createdAt")
  `);

  const response = data.map((item: any) => ({
    tgl_laporan: item.tgl_laporan,
    daftar_indihome: item.daftar_indihome,
    keluhan_pelanggan: item.keluhan_pelanggan,
    tanya_seputar_produk: item.tanya_seputar_produk,
    pembelian_orbit: item.pembelian_orbit,
  }));
    console.log("🚀 ~ file: route.ts:30 ~ GET ~ data:", data);
    return NextResponse.json(response);
  } catch (error) {
    //@ts-ignore
    return NextResponse.json({ error: error.message });
  }
}
