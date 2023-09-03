import { getServerSession } from "next-auth";
import { UsersActions } from "../_components/button.components";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";

async function getUsersData() {
  const res = await fetch(`http://localhost:3000/api/users`, { cache: 'no-cache'});
  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }
  return res.json();
}

async function UsersPage() {
  const data = await getUsersData();
  console.log("🚀 ~ file: page.tsx:17 ~ UsersPage ~ data:", data)
  return (
    <div className="flex flex-col gap-5 ">
      <UsersActions />
      {/* <SalesForceData /> */}
      <DataTable columns={columns} data={data.filteredUsers} />
    </div>
  );
}

export default UsersPage;
