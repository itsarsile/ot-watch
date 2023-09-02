import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { eq, not, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter, createRouter } from "next-connect";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.get(async (req) => {
  try {
    const users = await db.query.User.findMany({
      where: not(eq(User.role, "ADMIN")),
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
    console.error(error);
  }
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export default router;
