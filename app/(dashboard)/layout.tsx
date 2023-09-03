import React from "react";
import DashboardShell from "./_components/appshell.components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function DashboardLayout(props: {
    children: React.ReactNode
}) {
  const session = await getServerSession()
  if(!session?.user) redirect('/')  

  return (
    <DashboardShell>
        {props.children}
    </DashboardShell>
  );
}

export default DashboardLayout;
