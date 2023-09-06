import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Dashboard - OT Watch",
};

async function UserDashboardLayout(props: {
  children: React.ReactNode;
  userinfo: React.ReactNode;
  admininfo: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      {props.children}
      {session?.user.role === "ADMIN" ? props.admininfo : props.userinfo}
    </>
  );
}

export default UserDashboardLayout;
