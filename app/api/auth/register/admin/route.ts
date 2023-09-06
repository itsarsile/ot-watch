import { db } from "@/drizzle/db";
import { user, adminProfile } from "@/drizzle/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password, name, nik, phoneNumber } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await db
      .insert(user)
      .values({
        username,
        password: hashedPassword,
        role: "ADMIN",
      })
      .returning({ insertedId: user.id });


    const profile = await db.insert(adminProfile).values({
      name,
      nik,
      phoneNumber,
      userId: users[0].insertedId,
    });

    return NextResponse.json(
      { user, profile },
      { status: 201, statusText: "Success" }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal server error" });
  }
}
