import { getServerSession } from "next-auth";
import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Open Table Watch'
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) redirect(`/dashboard/${session?.user?.username}`)
  return (
    <main>
      <LoginForm />
    </main>
  );
}
