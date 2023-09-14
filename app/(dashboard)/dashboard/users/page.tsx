import { getServerSession } from "next-auth";
import { UsersActions } from "../_components/button.components";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semua Akun - OT Watch"
}

async function getUsersData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: { Cookie: cookies().toString() },
    cache: 'no-store' 
  });
  return res.json();
}

async function UsersPage() {
  const session = await getServerSession(authOptions)
  if (session?.user.role !== 'ADMIN') redirect('/')
  const data = await getUsersData();

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-col gap-5 ">
      <UsersActions />
      {/* <SalesForceData /> */}
      <DataTable columns={columns} data={data?.filteredUsers} />
    </div>
  );
}

export default UsersPage;
