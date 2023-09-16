import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const users = await db.query.user.findMany({
      where: not(eq(user.role, "ADMIN")),
      columns: {
        id: true,
        role: true,
        username: true,
        avatarUrl: true,
      },
      with: {
        salesProfile: true,
        superVisorProfile: true,
      },
    });

    const filteredUsers = users.map((user) => ({
      id: user.id,
      role: user.role,
      name: user.superVisorProfile[0]?.name || user.salesProfile[0]?.name || "",
      branch:
        user.superVisorProfile[0]?.branch || user.salesProfile[0]?.branch || "",
      agency:
        user.superVisorProfile[0]?.agency || user.salesProfile[0]?.agency || "",
      status:
        user.superVisorProfile[0]?.status || user.salesProfile[0]?.status || "",
      kcontact:
        user.superVisorProfile[0]?.kcontact ||
        user.salesProfile[0]?.kcontact ||
        "",
      phoneNumber:
        user.superVisorProfile[0]?.phoneNumber ||
        user.salesProfile[0]?.phoneNumber ||
        "",
      userId: user.id,
    }));

    return NextResponse.json({ filteredUsers });
  } catch (error) {
    return NextResponse.json(error, {status: 500})
  }
}