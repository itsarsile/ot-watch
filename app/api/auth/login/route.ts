import bcrypt from "bcryptjs";
import { omit } from 'lodash'
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check if the user exists
    const existingUser = await db
      .select()
      .from(User)
      .where(eq(User.username, username));

    if (existingUser.length === 0) return NextResponse.json({ message: "User not found" }, { status: 400 });

    const user = existingUser[0]

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch) {
        return NextResponse.json({ user: existingUser }, { status: 200 })
    } else {
        return NextResponse.json({ message: 'Password incorrect'}, { status: 401 })
    }

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
