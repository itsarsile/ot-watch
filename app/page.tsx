import { getServerSession } from "next-auth";
import LoginForm from "./_components/LoginForm";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await getServerSession()

  if (session) redirect(`/dashboard/${session.user.username}`)
  return (
    <main>
      <LoginForm />
    </main>
  );
}
