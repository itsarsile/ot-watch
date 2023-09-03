import { UsersActions } from "../_components/button.components";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cookies } from "next/headers";

async function getUsersData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }
  return res.json();
}

async function UsersPage() {
  const data = await getUsersData();
  return (
    <div className="flex flex-col gap-5 ">
      <UsersActions />
      {/* <SalesForceData /> */}
      <DataTable columns={columns} data={data.filteredUsers} />
    </div>
  );
}

export default UsersPage;
