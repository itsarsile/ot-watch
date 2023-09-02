import React from "react";
import DashboardShell from "./_components/appshell.components";

function DashboardLayout(props: {
    children: React.ReactNode
}) {
  return (
    <DashboardShell>
        {props.children}
    </DashboardShell>
  );
}

export default DashboardLayout;
