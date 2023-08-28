import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"
import { omit } from 'lodash'
import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { signJwt } from "@/lib/jwt";

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

    if (!passwordMatch) {
        return NextResponse.json({ message: 'Password incorrect'}, { status: 401 })
    }    

    const userWithoutPassword = omit(user, ['password'])
    const accessToken = signJwt({user: userWithoutPassword.id}, {
        expiresIn: '1h'
    })

    const response =  NextResponse.json({ user: userWithoutPassword }, { status: 200 })
    response.cookies.set({
        name: 'jwt',
        value: accessToken,
        httpOnly: true,
    })
    return response
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
    const cookiesValue = request.cookies.get('jwt')
    return NextResponse.json({cookiesValue})
}
