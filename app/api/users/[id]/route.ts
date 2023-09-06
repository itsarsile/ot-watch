import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const users = await db.query.user.findMany({
      where: eq(user.id, Number(id)),
      columns: {
        id: true,
        username: true,
        avatarUrl: true,
        role: true,
      },
      with: {
        salesProfile: {
          columns: {
            kcontact: true,
            name: true,
            agency: true,
            branch: true,
            phoneNumber: true,
            status: true,
          },
        },
        superVisorProfile: {
          columns: {
            kcontact: true,
            name: true,
            agency: true,
            branch: true,
            phoneNumber: true,
            status: true,
          },
        },
      },
    });

    const usersProfile = users.map((user) => ({
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

    return NextResponse.json(usersProfile[0]);
  } catch (error) {
    console.error(error)
  }
}
