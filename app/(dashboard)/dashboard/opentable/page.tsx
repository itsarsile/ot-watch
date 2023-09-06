import React from "react";
import { MapsComponents } from "./OpenTableMaps";
import { cookies } from "next/headers";

async function getAttendanceData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/opentable/api/attendance`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
      cache: "no-store"
    }
  );

  if (res.ok) {
    return res.json();
  }
  console.error("Error fetching attendances");
}

async function OpenTablePage() {
  const attendanceData = await getAttendanceData();
  return (
    <div>
      <MapsComponents attendanceData={attendanceData}/>
    </div>
  );
}

export default OpenTablePage;
