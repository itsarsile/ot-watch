import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { omit } from "lodash";
import { db } from "@/drizzle/db";
import { User, adminProfile, salesProfile } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { signJwt } from "@/lib/jwt";
import { superVisorProfile } from "@/drizzle/schema";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check if the user exists
    const existingUser = await db
      .select()
      .from(User)
      .where(eq(User.username, username));

    if (existingUser.length === 0)
      return NextResponse.json({ message: "User not found" }, { status: 400 });

    const passwordMatch = await bcrypt.compare(
      password,
      existingUser[0].password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Password incorrect" },
        { status: 401 }
      );
    }

    if (existingUser[0].role === "ADMIN") {
      const user = await db
        .select({
          id: User.id,
          username: User.username,
          avatar: User.avatarUrl,
          role: User.role,
          name: adminProfile.name,
          nik: adminProfile.nik,
          phone: adminProfile.phoneNumber,
        })
        .from(User)
        .where(eq(User.id, existingUser[0].id))
        .leftJoin(adminProfile, eq(adminProfile.userId, existingUser[0].id));

      return NextResponse.json({ user: user[0] }, { status: 200 });
    }

    if (existingUser[0].role === "USER") {
      const user = await db
        .select({
          id: User.id,
          username: User.username,
          avatar: User.avatarUrl,
          role: User.role,
          branch: salesProfile.branch,
          agency: salesProfile.agency,
          name: salesProfile.name,
          kcontact: salesProfile.kcontact,
          phone: salesProfile.phoneNumber,
        })
        .from(User)
        .where(eq(User.id, existingUser[0].id))
        .leftJoin(salesProfile, eq(salesProfile.userId, existingUser[0].id));
      return NextResponse.json({ user: user[0] }, { status: 200 });
    }

    const user = await db
      .select({
        id: User.id,
        username: User.username,
        avatar: User.avatarUrl,
        role: User.role,
        branch: superVisorProfile.branch,
        agency: superVisorProfile.agency,
        name: superVisorProfile.name,
        kcontact: superVisorProfile.kcontact,
        phone: superVisorProfile.phoneNumber,
      })
      .from(User)
      .where(eq(User.id, existingUser[0].id))
      .leftJoin(
        superVisorProfile,
        eq(superVisorProfile.userId, existingUser[0].id)
      );
    return NextResponse.json({ user: user[0] }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const cookiesValue = request.cookies.get("jwt");
  return NextResponse.json({ cookiesValue });
}
