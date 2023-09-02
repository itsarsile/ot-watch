"use client";
import { fetcher } from "@/lib/fetcher";
import { Title } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import useSWR from "swr";



export const SalesForceData = () => {
  const { data, isLoading, } = useSWR('/api/users', fetcher);
  if (isLoading) {
    console.log("Loading data...");
  }

  let totalUsers = 0;
  for (let i = 0; 1 < data?.filteredUsers.length; i++) {
    totalUsers += data[i].length
  }
  console.log("🚀 ~ file: dataview.components.tsx:20 ~ SalesForceData ~ totalUsers:", totalUsers)

  const records = JSON.stringify(data?.filteredUsers)
  console.log("🚀 ~ file: dataview.components.tsx:14 ~ SalesForceData ~ records:", records)

  // const usersRows = data?.filteredUsers.map(user => user);
  // console.log("🚀 ~ file: dataview.components.tsx:14 ~ SalesForceData ~ usersRows:", usersRows)


  return (
    <>
      <Title order={4}>Akun Sales Force & SPV</Title>
      <DataTable
        records={data?.filteredUsers}
        columns={[
          { accessor: "name" },
          { accessor: "kcontact" },
          { accessor: "agency" },
          { accessor: "branch" },
          { accessor: "status" },
        ]}
      />
    </>
  );
};
