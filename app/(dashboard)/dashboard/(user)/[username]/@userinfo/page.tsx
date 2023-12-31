import React from "react";
import UserActions from "./UserActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "dotenv/config";
import { cookies } from "next/headers";
import VisitorReports from "./VisitorReports";
import ReportList from "./ReportList";

async function getUserData(userId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
  );
  if (!res.ok) {
    return <div>Anda belum log in</div>;
  }
  return res.json();
}

async function checkIfUserAttend() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/api/attendance`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  if (!res.ok) {
    console.log("Error fetching attendance status");
  }

  return res.status;
}

async function UserInfo() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const user = await getUserData(Number(userId));
  const checkAttend = await checkIfUserAttend();

  return (
    <>
      <UserActions userData={user} checkAttend={checkAttend} />
      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <div>
          <VisitorReports userId={Number(userId)} />
        </div>
        <div className="lg:col-span-2">
          <ReportList />
        </div>
      </div>
    </>
  );
}

export default UserInfo;
