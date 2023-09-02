import { db } from "@/drizzle/db";
import { superVisorProfile, User, salesProfile } from "@/drizzle/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      username,
      password,
      name,
      kcontact,
      phoneNumber,
      type,
      agency,
      branch,
      supervisors,
    } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (type === "Sales Force") {
      const user = await db
        .insert(User)
        .values({
          username,
          password: hashedPassword,
          role: "USER",
        })
        .returning({ insertedId: User.id });

      if (supervisors) {
        let spvkcontact = supervisors[0].split(" - ")[1] || null;
        const spvId = await db
          .select({ id: superVisorProfile.id })
          .from(superVisorProfile)
          .where(eq(superVisorProfile.kcontact, spvkcontact));

        console.log("🚀 ~ file: route.ts:40 ~ POST ~ findSupervisorId:", spvId)

        const profile = await db.insert(salesProfile).values({
          name,
          kcontact,
          phoneNumber,
          agency,
          branch,
          superVisorProfileId: spvId[0].id,
          userId: user[0].insertedId,
        });
        console.log("🚀 ~ file: route.ts:28 ~ profile ~ profile:", profile);
        return NextResponse.json(
          { user, profile },
          { status: 201, statusText: "Success" }
        );
      }
    }

    if (type === "Sales Supervisor") {
      const user = await db
        .insert(User)
        .values({
          username,
          password: hashedPassword,
          role: "SUPERVISOR",
        })
        .returning({ insertedId: User.id });

      const profile = await db.insert(superVisorProfile).values({
        name,
        kcontact,
        phoneNumber,
        agency,
        branch,
        userId: user[0].insertedId,
      });

      return NextResponse.json(
        { user, profile },
        { status: 201, statusText: "Success" }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
