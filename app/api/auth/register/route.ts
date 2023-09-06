import { db } from '@/drizzle/db';
import { user } from '@/drizzle/schema';
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from login API!" });
}

export async function POST(request: Request) {
  try {
    const { username, password, role } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    const res = await db.insert(user).values({
       username,
       password: hashedPassword,
       role, 
    })
    return NextResponse.json(
      { username, hashedPassword },
      { status: 201, statusText: "Success" }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
