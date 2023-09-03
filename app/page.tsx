import { getServerSession } from "next-auth";
import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) redirect(`/dashboard/${session?.user?.username}`)
  return (
    <main>
      <LoginForm />
    </main>
  );
}
