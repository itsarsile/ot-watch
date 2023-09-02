import { db } from "@/drizzle/db";
import { User, adminProfile } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password, name, nik, phoneNumber } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db
      .insert(User)
      .values({
        username,
        password: hashedPassword,
        role: "ADMIN",
      })
      .returning({ insertedId: User.id });

    console.log("🚀 ~ file: route.ts:19 ~ POST ~ user:", user[0].insertedId);

    const profile = await db.insert(adminProfile).values({
      name,
      nik,
      phoneNumber,
      userId: user[0].insertedId,
    });
    console.log("🚀 ~ file: route.ts:28 ~ profile ~ profile:", profile);

    return NextResponse.json(
      { user, profile },
      { status: 201, statusText: "Success" }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal server error" });
  }
}
